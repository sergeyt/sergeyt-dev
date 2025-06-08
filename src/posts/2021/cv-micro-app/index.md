---
title: Micro app to render your JSON resume
date: '2021-01-10'
spoiler: JSON resume from github gist can be directly consumed
tags: ['reactjs', 'javascript', 'micro-app', 'cv', 'json-resume']
---

Last time I've quickly made a [React component](/json-resume) to render JSON resume.
Now I've extended [the CV page](/cv) to consume external resumes making the page to be a micro application. 
And now you can specify `src` query parameter to specify your resume.
You can simply store your resume as Github Gist like [mine one](https://gist.github.com/sergeyt/e0b12ea349dcbb7dd58bc80113eb43e0).
For example [src=c9dcfa1b37dec07fb2ee7f36d7278105](/cv?src=c9dcfa1b37dec07fb2ee7f36d7278105) is an url to display [Thomas Davis's](https://github.com/thomasdavis) resume.

Next possible steps:
* support more sections from JSON resume
* make the page to be mobile friendly
* make the page to be ready for printing

Enjoy! EOF :smile:
