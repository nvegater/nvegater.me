---
title: Gatsby nodes WTF
date: '2019-03-17'
published: true
layout: post
tags: ['information', 'gatsby']
category: example
---

## What is gatsby and more importantly, why?

> Gatsby.js is a static PWA (Progressive Web App) generator.
> It pulls only the critical HTML, CSS, data, and JavaScript
> so that your site can load as fast as possible, even offline.

> -said by [this guys](https://snipcart.com/blog/choose-best-static-site-generator)

Basically it means frontend without databases and servers.
Gatsby builds the whole site as static files,
including dynamic content.

When one page loads, Gatsby pre-fetches resources
for other pages under the hood,
so navigating through a site feels very fast.
(also when re-opening the site, all resources will be cached automatically)

### Why use this features?

At least my reasoning:
* No need of compiling files while the user is on the page. FAST AF
* Git and MDX for content updates. [mdx???](./understanding_mdx.md)

There are more advantages I cant confirm yet:
* Delegation of server side and database operations to Gatsby
(instead of that, using graphQL to pull data to the website).
* Lesser complexity: seems like everyone agrees. Yet to be seen.


I built this site copy pasting (almost) everything from
[this Gatsby-Typescript tutorial](https://jeffrafter.com/gatsby-with-typescript/ "Tutorial gatsby-typescript-graphql").

It worked out fine, but I dont understand exactly how some stuff function under the hood.
Specially regarding the configuration in `gatsby-node.js` (check it in
[here](https://github.com/nvegater/nvegater.me/blob/master/gatsby-node.js))

## `gatsby-node.js`
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

Since `exports.createPages = ({graphql, actions}) => {....}` is implemented first
I will start there.

The usual approach when using react is
to create `.tsx` React components in `src/pages`.
Gatsy can do this differently, they called this
"creating pages programatically from data".


