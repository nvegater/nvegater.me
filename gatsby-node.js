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
exports.createPages = ({graphql, actions}) => {
    return graphql(
        `
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
    `).then(result => {
        if (result.errors) {
            throw result.errors
        }
        const postTemplate = path.resolve(`./src/templates/post.tsx`);
        const tagTemplate = path.resolve('./src/templates/tag.tsx');

      console.log(postTemplate);
      console.log(tagTemplate);

        // Create post pages
        const posts = result.data.allMarkdownRemark.edges; // take the posts from the GraphQLQuery
        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;

            /*
           passed a previous and next field (optional) to the context
           so that we generate a carousel at the bottom of each post.
            * */
            actions.createPage({
                path: post.node.fields.slug,
                component: postTemplate,
                context: {
                    slug: post.node.fields.slug,
                    previous, /*previous and next passed to the context. Each of the context fields
                                Will be transformed to props we can use in react templates.
                                Previous and next allows us to build a carousel in footer of pages*/
                    next,
                },
            })
        });

        // Iterate through each post, putting all found tags into `tags`
        let tags = [];
        posts.forEach(post => {
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

  console.log("creating");
    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode});
        actions.createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
};
