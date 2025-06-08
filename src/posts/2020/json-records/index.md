---
title: Efficient parsing of JSON record sets in Rust
date: '2020-07-17'
spoiler: Custom iterator on top of serde_json StreamDeserializer
tags: ["rust", "parsing", "sample"]
reddit: "https://www.reddit.com/r/rust/comments/hsq080/efficient_parsing_of_json_record_sets_in_rust"
---

JSON record set is an array of objects. [serde_json crate](https://crates.io/crates/serde_json) does not provide fast solution to parse it out of the box, but you can do something I came up with. I use [StreamDeserializer](https://docs.serde.rs/serde_json/struct.StreamDeserializer.html) and custom handling to skip array symbols like '[' or ','.

The code:

```rust
use crate::Error;
use async_std::io::SeekFrom;
use byteorder::ReadBytesExt;
use serde_json::{Deserializer, Map, Value};
use std::io::{Read, Seek};

type Record = Map<String, Value>;

pub struct JsonRecords<'de, R>
where
    R: Read + Seek,
{
    reader: &'de mut R,
    is_array_start: bool,
}

impl<'de, R> JsonRecords<'de, R>
where
    R: Read + Seek,
{
    #[inline]
    pub fn new(reader: &'de mut R) -> Self {
        Self {
            reader,
            is_array_start: true,
        }
    }

    #[inline]
    fn skip_array_start(&mut self) -> Result<(), Error> {
        self.skip_char(b'[')?;
        self.is_array_start = false;
        Ok(())
    }

    fn skip_char(&mut self, val: u8) -> Result<(), Error> {
        self.skip_ws()?;
        let c = self.reader.read_u8()?;
        if c != val {
            return Err(Error::Parse(format!(
                "expect '{}', but was '{}'",
                val, c
            )));
        }
        Ok(())
    }

    fn skip_ws(&mut self) -> Result<(), Error> {
        loop {
            let c = self.peek()?;
            match c {
                b' ' | b'\n' | b'\r' => {
                    self.discard();
                    continue;
                }
                _ => break,
            }
        }
        Ok(())
    }

    #[inline]
    fn peek(&mut self) -> Result<u8, Error> {
        let result = self.reader.read_u8()?;
        self.reader.seek(SeekFrom::Current(-1))?;
        Ok(result)
    }

    #[inline]
    fn discard(&mut self) {
        self.reader.read_u8().unwrap();
    }

    #[inline]
    fn read_record(&mut self) -> Option<Result<Record, Error>> {
        let de = Deserializer::from_reader(&mut self.reader);
        let mut stream = de.into_iter();
        match stream.next() {
            None => None,
            Some(t) => match t {
                Ok(v) => Some(Ok(v)),
                Err(e) => Some(Err(e.into())),
            },
        }
    }
}

impl<'de, R> Iterator for JsonRecords<'de, R>
where
    R: Read + Seek,
{
    type Item = Result<Record, Error>;

    fn next(&mut self) -> Option<Self::Item> {
        if self.is_array_start {
            match self.skip_array_start() {
                Err(e) => return Some(Err(e)),
                Ok(()) => {}
            }
        }
        match self.skip_ws() {
            Err(e) => return Some(Err(e)),
            Ok(()) => {}
        }
        loop {
            match self.peek() {
                Err(e) => return Some(Err(e)),
                Ok(c) => match c {
                    b']' => {
                        self.discard();
                        let _ = self.skip_ws();
                        return None;
                    }
                    b',' => {
                        self.discard();
                        self.skip_ws().unwrap();
                        continue;
                    }
                    b'{' => return self.read_record(),
                    _ => {
                        return Some(Err(Error::Parse(format!(
                            "expected '{{' or ']', but got '{}'",
                            c as char
                        ))))
                    }
                },
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::json_records::JsonRecords;
    use crate::Error;
    use std::io::Cursor;

    #[test]
    fn test_json_array() -> Result<(), Error> {
        let json = "[{\"a\": 1}, {\"a\": 2}]";
        let mut cursor = Cursor::new(json.as_bytes().to_vec());
        let array = JsonRecords::new(&mut cursor);
        for rec in array {
            println!("{:?}", rec?);
        }
        Ok(())
    }
}
```

This allows to avoid allocation of intermediate vector for a bit faster processing of large datasets.

Enjoy! EOF :smile:
