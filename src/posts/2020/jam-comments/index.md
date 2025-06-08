---
title: Jamstack comments
date: '2020-07-24'
spoiler: How to make free comments for Jamstack sites
tags: ["jamstack", "reactjs", "sample"]
reddit: "https://www.reddit.com/r/JAMstack/comments/hwy3w1/jamstack_comments"
---

My site is a [Jamstack](https://jamstack.org/) site. It is built using [GatsbyJS](https://www.gatsbyjs.org/) powered by [ReactJS](https://reactjs.org/). In this post I gonna show how you can add a free comments to your site with the following pretty simple steps.

1. Use [Reddit](https://www.reddit.com/) as a service that stores comments.
2. Implement React component that shows reddit Comments.
3. Integrate component to the blog post template

## React Component

We gonna use [NextJS useSWR](https://github.com/vercel/swr) hook to fetch comments from reddit re-post.
Here a code snippet of this component.

```jsx
import React from 'react';
import useSWR from 'swr';
import moment from 'moment'; // to render relative time of the comment
import ContentLoader from 'react-content-loader'; // to render nice loader

export default function RedditComments({ reddit }) {
  if (!reddit) {
    return null;
  }
  const { data, error } = useSWR(reddit, fetcher);
  if (error) {
    // TODO render error
    return null;
  }
  const comments = data ? (
    data.map((item, i) => <Comment key={i} data={item.data} level={0} />)
  ) : (
    <Loader />
  );
  return (
    <div className="reddit">
      <a className="heading" href={reddit} target="_blank">
        Comments
      </a>
      {comments}
    </div>
  );
}
```

The full source code is available [here](https://github.com/tsvbits/tsvbits.github.io/blob/dev/src/components/Reddit.js).

## Component Integration

I've added a `reddit` metadata to each post having a reddit re-post.
After that I've extended [a blog post template](https://github.com/tsvbits/tsvbits.github.io/blob/dev/src/templates/blog-post.js#L197) to render comment block. 

```jsx
// ...
import Reddit from '../components/Reddit';

const BlogPostTemplate = ({ pageContext }) => {
  let {
    // ...
    // new metadata
    reddit,
  } = pageContext;

  // ... computing more state like translations

  return (
      <Layout>
        {/* main content is omitted */}
        <footer>
            <Reddit reddit={reddit}/>
            {/* other footer blocks */}
        </footer>
      </Layout>
  );
};
```

And voila it amazingly works.

Enjoy! :smile:
