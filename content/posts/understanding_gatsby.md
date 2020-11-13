---
title: Gatsby, static pages with Graphql.
date: '2019-03-29'
published: true
layout: post
tags: ['graphql', 'gatsby', frontend]
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


Usually [this Gatsby-Typescript tutorial](https://jeffrafter.com/gatsby-with-typescript/ "Tutorial gatsby-typescript-graphql")
is enough to create a blog-website. Excellent high level tutorial and enough in most of the cases.


I'll dive deeper in the lakes of configuration in `gatsby-node.js` (check it in
[here](https://github.com/nvegater/nvegater.me/blob/master/gatsby-node.js))

## Exposing `gatsby-node.js`

The Gatsby API[^gatsbyAPI] reads `gatsby-node.js`, the methods in there will be exposed to it.

These 2 methods are returned to Gatsby [as the result of a require call:](https://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it)

[^gatsbyAPI]: Gatsby gives plugins and site builders many APIs for controlling websites data in the GraphQL data layer. [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/)

```js
exports.createPages = ({graphql, actions}) => {....}
exports.onCreateNode = ({node, actions, getNode}) => { ...}
```

First of all is important to clarify what nodes and pages are.


### Nodes


A node is only a fancy name for an object in a "graph"[^grapQL]:

[^grapQL]:  The most basic components of a GraphQL schema are object types,
    which just represent a kind of object you can fetch from a service.
    [more details here](https://graphql.org/learn/schema/)


To illustrate, copy-paste following query in this [link](http://localhost:8000/___graphql)
(when running a gatsby page in dev mode, its active automatically):

```graphql
{
  allFile {
    edges {
        previous {
              id
              frontmatter {
                title
              }
            }
        node {
              id
              frontmatter {
                title
              }
            }
        next {
              id
              frontmatter {
                title
              }
            }
    }
  }
}
```

The edges object contain 3 nodes: next, previous and node.
This is to create the Carrousel with arrows on the bottom of the page:

`<-- previousNode -- Node -- nextNode -->`

or (to illustrate that the posts get treated as nodes by Gatsby)

```javascript
const posts = result.data.allMarkdownRemark.edges;
```

`<-- null -- Post -- nextPost -->`


`<-- previousPost -- Post -- null -->`

### `onCreateNode()`

Called by Gatsby everytime a new node is created.



### `createPages()`

The usual approach to add stuff to a website with react would be
to create a `<ReactComponents />.tsx` in `src/pages` folder.


Gatsy can do this differently, they called this
"creating pages programatically from data".

to be continued...


[more Details](https://www.gatsbyjs.org/tutorial/part-seven/)




