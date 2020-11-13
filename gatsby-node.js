const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

// This query retrieves all the markdown files
// from the content/posts/ folder
// Sorts them "newer first"
const nodesQuery = `
  {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            tags
            title
          }
        }
      }
    }
  }
`

// inject:
// MD posts from /content/posts ----> in the post.tsx template.
exports.createPages = ({graphql, actions}) => {
  return graphql(nodesQuery).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const markdownPosts = result.data.allMarkdownRemark.edges;

    markdownPosts.forEach((currentPost, index) => {
      const isLastPost = index === markdownPosts.length - 1; // no need of previous post
      const previousPost = isLastPost ? null : markdownPosts[index + 1].node;

      const isNewestPost = index === 0; // no need of "next post"
      const nextPost = isNewestPost ? null : markdownPosts[index - 1].node;

      const nameOfPage = currentPost.node.fields.slug;

      actions.createPage({
        path: nameOfPage,
        component: path.resolve(`./src/templates/post.tsx`), // inject post in this component
        context: {
          slug: nameOfPage,
          previous: previousPost,
          next: nextPost,
        },
      })
    });

    // Get tags, if available
    const tags = markdownPosts
      .filter(post => post.node.frontmatter.tags === true)
      .map(post => post.node.frontmatter.tags);

    // Remove duplicatedTags
    const uniqueTags = [...new Set(tags)];

    // Create tag pages
    uniqueTags.forEach(tag => {
      if (!tag) return;
      actions.createPage({
        path: `/tags/${tag}/`,
        component: path.resolve('./src/templates/tag.tsx'),
        context: {
          tag, // context can pass anything to tag.tsx
        },
      })
    })

  })
};

exports.onCreateNode = ({node, actions, getNode}) => { // Slug is a simplified name (directory friendly)
                                                       // Generate a slug for each created node.
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    actions.createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
};
