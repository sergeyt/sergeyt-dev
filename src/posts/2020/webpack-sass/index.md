---
title: How to add style loaders to webpack
date: '2020-08-05'
spoiler: Step by step guide how to do that
tags: ["webpack", "web", "tooling"]
reddit: "https://www.reddit.com/r/webpack/comments/i416e9/how_to_add_style_loaders_to_webpack"
---

In this post I am going to show how to configure webpack adding support for [SASS](https://sass-lang.com/) and CSS files.
It is slightly inspired by [this post](https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/),
but implemented as standalone module that you can easily to add your project.

## Install dependencies

Step one.

Single line script for NPM:

`npm install --save-dev autoprefixer css-loader mini-css-extract-plugin postcss-loader postcss-preset-env sass-loader source-map-loader style-loader`

Single line script for Yarn:

`yarn add --dev autoprefixer css-loader mini-css-extract-plugin postcss-loader postcss-preset-env sass-loader source-map-loader style-loader`

## Webpack Configuration

Step two. Copy below code to file and name it as `webpack.sass.js`;

```javascript
const path = require("path");
const ExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";
const isDevelopment = NODE_ENV === "development";

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: [require("autoprefixer")({}), require("postcss-preset-env")({})],
  },
};

const sassOptions = {
  outputStyle: "expanded",
  includePaths: [path.resolve(__dirname, "node_modules")],
};

const sassLoader = {
  loader: "sass-loader",
  options: { sassOptions },
};

const rules = [
  {
    test: /\.css$/,
    use: [
      "source-map-loader",
      isDevelopment ? "style-loader" : ExtractPlugin.loader,
      "css-loader",
      postcssLoader,
    ],
  },
  {
    test: /\.scss$/,
    use: [
      "source-map-loader",
      isDevelopment ? "style-loader" : ExtractPlugin.loader,
      "css-loader",
      postcssLoader,
      sassLoader,
    ],
  },
];

module.exports = function withSass(config) {
  if (!config.module) {
    config.module = {};
  }
  if (!config.resolve) {
    config.resolve = {};
  }
  config.resolve.extensions = [...(config.resolve.extensions || []), ".scss"];
  config.module.rules = [...(config.module.rules || []), ...rules];
  config.plugins = [
    ...(config.plugins || []),
    new ExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ];
  return config;
};
```

Step three. Modify `webpack.config.js` as following pattern:

```javascript
const withSass = require("./webpack.sass.js");

// your base webpack config goes here
const baseConfig = {
    /// ...
};

// extend webpack config
const config = withSass(baseConfig);

module.exports = config;
```

Enjoy! EOF :smile:
