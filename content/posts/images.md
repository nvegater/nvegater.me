---
title: Images, manipulation with Gatsby
date: '2019-03-28'
published: true
layout: post
tags: ['gatsby', 'images']
category: example
featuredImage: ../assets/nhippdezember.jpg
---

Image by Nikolaus Hipp, check more over [here](https://www.nikolaus-hipp.de/).

Its a nice image right? Its "fluid" thanks to

```javascript
import Img, {FluidObject} from "gatsby-image";
```

Fluid means the image is responsive, it adapts to the size of the container. Fluid images offer some other possibilities:

```javascript
export interface FluidObject {
  aspectRatio: number; //  as in 16:9. x:y aspect ratio. x units wide and y units high.
  src: string
  srcSet: string
  sizes: string
  base64?: string
  tracedSVG?: string
  srcWebp?: string
  srcSetWebp?: string
  media?: string
}
```

I define the Nikolas's image in jpg format in the "featuredImage" property of the frontmatter of this post:
 ```markdown
 ---
 title: Images
 date: '2019-03-26'
 published: true
 layout: post
 tags: ['css', 'style', 'theme']
 category: example
 featuredImage: ../assets/nhippdezember.jpg
 ---
```

and query it like this into the [Post.tsx](https://github.com/nvegater/nvegater.me/blob/master/src/templates/post.tsxs)
:

```graphql
featuredImage {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
```
Fixed static characteristics instead of fluid? no problem:
```graphql
featuredImage {
          childImageSharp {
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
```

I could also call an image like this:
```
![Nikolas](../assets/nhippdezember.jpg)
```
![Nikolas](../assets/nhippdezember.jpg?)

like this:
```html
<img src="../assets/nhippdezember.jpg" alt="Niko"
	title="Niko's oainting" width="150" height="100" />
```
<img src="../assets/nhippdezember.jpg" alt="Niko"
	title="Niko's oainting" width="150" height="100" />

like this:
```
<img src="../assets/nhippdezember.jpg" alt="" height="42" width="42"/>
```
<img src="../assets/nhippdezember.jpg" alt="drawing" height="42" width="42"/>


This page will be more or less my reminder of how to use images in gatsby.
Its honestly, trickier than what (in my opinion) should be.
If I want to use a different size of the image than the container size (100%) I expected it to be more intuitive
than changing a GraphQL query.

Maybe I find another easier way of doing that in the future. Its enough image research for now.

Also, my cousin made this logo that I use for testing:

![Logo](../assets/logo.png)

