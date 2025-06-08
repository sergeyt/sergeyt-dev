---
title: Notes on Parsing in Rust - Part 1
date: '2020-05-03'
spoiler: I am learning Rust
tags: ["rust"]
---

I am writing few parsers in Rust. And here are few notes about that atm.

- [nom](https://github.com/Geal/nom/) is good to make lexers, but it is quite verbose than [logos](https://github.com/maciejhirsz/logos)
- good tutorials on [pratt](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) or [shunting yard](https://matklad.github.io/2020/04/15/from-pratt-to-dijkstra.html) algorithms

## Zero allocations

I'd like to try interning strings to have zero-allocation lexer and expressions used in the app.
Each token just a slice to interned string in the global cache.

## Interesting links

- [Parsing series of integers with SIMD](http://0x80.pl/articles/simd-parsing-int-sequences.html)
