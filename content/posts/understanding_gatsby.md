---
title: Gatsby nodes WTF
date: '2019-03-11'
published: true
layout: post
tags: ['information', 'gatsby']
category: example
---

I built this site copy pasting (almost) everything from
[this tutorial](https://jeffrafter.com/gatsby-with-typescript/ "Tutorial gatsby-typescript-graphql").

It worked out fine, but I dont understand exactly how some stuff function under the hood.
Specially regarding the configuration in `gatsby-node.js` (check it in
[here](https://github.com/nvegater/nvegater.me/blob/master/gatsby-node.js))

I will try to break `gatsby-node.js` down.
Starting with:
```js
exports.createPages = ({graphql, actions}) => {....}
exports.onCreateNode = ({node, actions, getNode}) => { ...}
```

Firstly understanding `exports...` seemed essential to me. So I found
[this great Stack Overflow answer](https://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it)
. In summary `createPages()` and `onCreateNode()` will be exposed to any internal code in the application
that requires the `gatsby-node.js`.
This two methods will be exposed, so the Gatsby API can call them.
What for? So Plugins like:
```js
const {createFilePath} = require(`gatsby-source-filesystem`);
```
can add pages.
[more Details ->](https://www.gatsbyjs.org/tutorial/part-seven/)
