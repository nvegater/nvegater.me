---
title: Gatsby
date: '2019-03-26'
published: true
layout: post
tags: ['information', 'gatsby']
category: example
---

## Why?

While you're sleeping or enjoying a landing page, Gatsby pre-fetches resources under the hood.

Gatsby is "secretely cooking" content in advance without your consent.
Since the content is pre-cooked, it gets delivered faster, making the website feel more responsive.

> Gatsby.js is a static PWA (Progressive Web App) generator.
> It pulls only the critical HTML, CSS, data, and JavaScript
> so that your site can load as fast as possible, even offline.

> -said by [this guys](https://snipcart.com/blog/choose-best-static-site-generator)

Potentially it means frontend without databases and servers.
Gatsby builds the whole site as static files,
including dynamic content.

## Other advantages I like


* Git for website content changes.
* MDX (.. oh boy [mdx](/understanding_mdx/) )
* Instead of server side and database operations, delegation to Gatsby and GraphQL

## Understanding Gatsby


The end of [this Gatsby-Typescript tutorial](https://jeffrafter.com/gatsby-with-typescript/ "Tutorial gatsby-typescript-graphql")
will be the starting point.

Excellent tutorial but it doesnt go in depth.
Specially regarding the configuration in `gatsby-node.js` (check it in
[here](https://github.com/nvegater/nvegater.me/blob/master/gatsby-node.js))

## Exposing `gatsby-node.js`

The Gatsby API is requiring `gatsby-node.js`, therefore the methods in there will be exposed to it.


These 2 methods are returned to Gatsby [as the result of a require call:](https://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it)

```js
exports.createPages = ({graphql, actions}) => {....}
exports.onCreateNode = ({node, actions, getNode}) => { ...}
```

### `onCreateNode()`

Called by Gatsby everytime a new node is created. Okay...
What is a node? how it gets created?

### `createPages()`

The usual approach to add stuff to a website with react would be
to create a `<ReactComponents />.tsx` in `src/pages` folder.


Gatsy can do this differently, they called this
"creating pages programatically from data".

### End


[more Details](https://www.gatsbyjs.org/tutorial/part-seven/)




