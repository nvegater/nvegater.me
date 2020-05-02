const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);
/*
*
* GraphQL is an API that access a datastore- in this case Gatsby itself.
*
* gatsby-source-filesystem grabs all the files specified in directories from -config.js
* and transforms them using gatsby-transforming-remark.
*
* this provides a Resource containing the rendered Markdown.
*
* Gatsby will first look for a corresponding page created via createPages in this file
* If it doesn’t find the page there it will next look for a page in
* src/pages.
*
* According to the Gatsby structure docs:
* "Components under src/pages become pages automatically with paths based on their file name."
* For example, if a user goes to /about, Gatsby will try to find src/pages/about.tsx.
*
* Each page in the src/pages folder should export a default React component.
* Additionally, it can export a pageQuery constant.
* The pageQuery constant is a GraphQL query that will be executed prior to rendering the component.
*
* The results from the query will be passed into the component as a prop called data.
*
*/

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

    /*
      This basically turns this: `./src/templates/post.tsx`
      into this:
      /Users/admin-p00920345/dev/nvegater.me/src/templates/post.tsx
      So resolves the '.' into something that fits the computer (or server) where the page is running
      It depends on the operating system. With windows it gets super tricky. because the paths are different
    * */


    const postTemplate = path.resolve(`./src/templates/post.tsx`);
    console.log("Path for post template", postTemplate);
    const tagTemplate = path.resolve('./src/templates/tag.tsx');
    console.log("Path for tag template", tagTemplate);

    const postTachyons = path.resolve('./src/templates/postTachyons.tsx');
    console.log("Path for tag template", postTachyons);

    /*
      Takes all the posts from the
      content/posts/
      directory:

      /TODOS/
      /hello-world/
      /understanding_gatsby/
      /images/
      /understanding_mdx/

      */

    markdownPosts.forEach((markdownPost, index) => {
      const previousNode = index === markdownPosts.length - 1 ? null : markdownPosts[index + 1].node;
      const nextNode = index === 0 ? null : markdownPosts[index - 1].node;

      /*
     passed a previous and next field (optional) to the context
     so that we generate a carousel at the bottom of each post.
      * */
      actions.createPage({
        path: markdownPost.node.fields.slug,
        component: markdownPost.node.frontmatter.title === 'Taychons' ? postTachyons : postTemplate,
        context: {
          slug: markdownPost.node.fields.slug,
          previous: previousNode, /*previous and next passed to the context. Each of the context fields
                                Will be transformed to props we can use in react templates.
                                Previous and next allows us to build a carousel in footer of pages*/
          next: nextNode,
        },
      })
    });

    // Iterate through each post, putting all found tags into `tags`
    let tags = [];
    markdownPosts.forEach(post => {
      if (post.node.frontmatter.tags) {
        tags = tags.concat(post.node.frontmatter.tags)
      }
    });
    const uniqueTags = [...new Set(tags)]; //Make Tags unique with Set so that there are no duplicates

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
