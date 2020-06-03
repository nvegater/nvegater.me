const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

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
exports.createPages = ({graphql, actions}) => {
  return graphql(nodesQuery).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const markdownPosts = result.data.allMarkdownRemark.edges;

    const postTemplate = path.resolve(`./src/templates/post.tsx`);
    console.log("Folder path where the template for the posts is: ", postTemplate);
    const tagTemplate = path.resolve('./src/templates/tag.tsx');
    console.log("Folder path where the template for the tags is: ", tagTemplate);

    markdownPosts.forEach((markdownPost, index) => {
      const previousNode = index === markdownPosts.length - 1 ? null : markdownPosts[index + 1].node;
      const nextNode = index === 0 ? null : markdownPosts[index - 1].node;

      actions.createPage({
        path: markdownPost.node.fields.slug,
        component: postTemplate,
        context: {
          slug: markdownPost.node.fields.slug,
          previous: previousNode,
          next: nextNode,
        },
      })
    });

    // Iterate through each post, putting all found tags into `tags`
    const tags = markdownPosts
      .filter(post => post.node.frontmatter.tags === true)
      .map(post => post.node.frontmatter.tags);

    //Make Tags unique with Set so that there are no duplicates
    const uniqueTags = [...new Set(tags)];

    // Create tag pages
    uniqueTags.forEach(tag => {
      if (!tag) return;
      actions.createPage({
        path: `/tags/${tag}/`,
        component: tagTemplate,
        context: {
          tag,
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
    console.log("value created with createFilePath: ", value);
  }
};

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({page, actions}) => {
  const {createPage} = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/account/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/account/*"
    // Update the page.
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({stage, loader, actions}) => {
  if (stage === 'build-html') {
    /* During the build step, "auth0-js" will break because it relies on browser-specific API'S
    * Fortunately we dont need it during the build.
    * Using webpack's null loader, we ignore auth0-js during build.
    * (See src/utils/auth.js to see how we prevent this from breaking the app
    * */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loader.null()
          }
        ]
      }
    })
  }
}
