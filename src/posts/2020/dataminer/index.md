---
title: Data Miner
date: '2020-07-15'
spoiler: Declarative web scraper implemented using AngularSharp
tags: ["csharp", "scraping", "sample"]
reddit: "https://www.reddit.com/r/dotnet/comments/hsprjn/declarative_web_scraper_using_angularsharp_and"
---

> TL;DR see the code at https://github.com/lingvograph/dataminer/blob/master/Program.cs#L18

This small program takes YAML file that defines how to parse HTML page and outputs tuples of structured data.

Sample YAML file to extract data from [Macmillan Dictionary](https://www.macmillandictionary.com/):

```yaml
- selector: .PRON
  term: transcription
# tags
- selector: .PART-OF-SPEECH
  uniq: true
  term: tag
- selector: .SYNTAX-CODING
  unique: true
  term: tag
- selector: .DEFINITION
  term: definition
- selector: .EXAMPLES
  term: in
- selector: .PHR-XREF
  term: in
- selector: .synonyms .theslink
  exclude: "..."
  term: synonym
- selector: .audio_play_button
  audio:
    - "@data-src-mp3"
    - "@data-src-ogg"
```

And the core part of parser looks like:

```csharp
private static async Task Parse(DataSource src, Input input)
{
    var url = src.Url(input);
    var config = Configuration.Default.WithDefaultLoader();
    var context = BrowsingContext.New(config);
    var doc = await context.OpenAsync(url);
    var root = src.Schema.RootNode as YamlSequenceNode;
    if (root == null)
    {
        throw new InvalidOperationException("Expect list of nodes");
    }

    IEnumerable<object> Exec(YamlMappingNode query)
    {
        var selector = query["selector"].ToString();
        var term = query.Get("term");
        var audio = query.Get("audio");
        var exclude = query.Get("exclude")?.ToString();
        var uniq = query.Get("uniq")?.ToString() == "true";
        var set = new HashSet<string>();
        foreach (var elem in doc.QuerySelectorAll(selector))
        {
            if (term != null)
            {
                var name = term.ToString();
                var text = elem.TextContent.Strip();
                if (exclude != null && text.Equals(exclude)) continue;
                if (uniq && set.Contains(text)) continue;
                yield return $"({name},lang={input.Lang},text=\"{text}\")";
                if (uniq) set.Add(text);
                continue;
            }

            if (audio is YamlSequenceNode seq)
            {
                foreach (var cmd in seq.Children.Select(t => t.ToString()))
                {
                    var val = (cmd.StartsWith("@")
                        ? elem.GetAttribute(cmd.Substring(1))
                        : elem.TextContent);
                    val = val.Strip();
                    if (string.IsNullOrEmpty(val))
                    {
                        continue;
                    }

                    yield return $"(audio,url=\"{val}\")";
                }
            }
        }
    }

    foreach (var child in root.Children.OrEmpty())
    {
        var query = child as YamlMappingNode;
        if (query == null)
        {
            Console.Error.WriteLine("skip node {0}", child);
            continue;
        }

        foreach (var result in Exec(query))
        {
            Console.WriteLine(result);
        }
    }
}
```

## Status

It is prototype and pretty much experimental code. It can be easily modified for your needs

## Tools

It is done with:

- [.NET](https://dotnet.microsoft.com/) - it needs dotnet runtime for execution
- [CSharp](https://github.com/dotnet/csharplang) - yeah it is implemented in C# language
- [AngularSharp](https://github.com/AngleSharp/AngleSharp) - core thing to parse HTML and traverse the document tree
- [YamlDotNet](https://github.com/aaubry/YamlDotNet) - YAML parser

Enjoy! EOF :smile:
