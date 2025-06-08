---
title: Why PageFX is interesting for compiler writers?
date: '2019-08-12'
spoiler: PageFX is easy to learn
---

__TL;DR__ PageFX compiler is really interesting because it is compiler

In [my previous post](/flash-viewer-story/) I've shortly written about PageFX cross compiler.
Its code is available on [github](https://github.com/GrapeCity/pagefx) now.

## What makes this project interesting for compiler writers?

Here is my top reasons:
- Compilers are complicated things and so it is interesting for learning
- It has a lot of IL code generation (only getting native strings support were not easy to do)
- It has direct instruction-level translation between byte code formats
- It incrementally compiles only classes and methods called from program entry point
- It has smart linker that resolves dependency graph and emits only required resources extracted and transcoded (deserialized and serialized) from SWF files
- It has experimental generation of JavaScript code by implementing a little CIL interpretter in JavaScript
- It has experimental CIL interpretter written in C#

So please go ahead and learn PageFX reading its codebase.

You might also find interesting [this old project](https://github.com/sergeyt/cil.js) available on github.
It has declarative [CIL reader](https://github.com/sergeyt/cil.js/blob/master/src/runtime/meta.js) written in JavaScript.
This could be a starting point for full CIL interpreter in JavaScript.
You can take [this CIL interpretter](https://github.com/GrapeCity/pagefx/blob/master/source/libs/Core/JavaScript/core.js) as example and complete it.
Feel free to fork and play anyway.

If someone interested to get more details about PageFX project please [email me](mailto:stodyshev@gmail.com).
I can write a series of blog posts perhaps someone may find it interesting.

P.S. Anyone wanted to compile PageFX with latest C# compiler? Please send pull request :)
