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

After trying and failing to console log:

`gatsby-node.js`
```js
      console.log(postTemplate);
      console.log(tagTemplate);
```

I will try to break this down, but first read the [gatsby tutorial section.](https://www.gatsbyjs.org/tutorial/part-one/)
