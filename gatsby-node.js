const path = require(`path`)
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
    `,
    ).then(result => {
        if (result.errors) {
            throw result.errors
        }

        // Get the templates
        const postTemplate = path.resolve(`./src/templates/post.tsx`)
        const tagTemplate = path.resolve('./src/templates/tag.tsx')

        // Create post pages
        const posts = result.data.allMarkdownRemark.edges
        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node
            const next = index === 0 ? null : posts[index - 1].node

            actions.createPage({
                path: post.node.fields.slug,
                component: postTemplate,
                context: {
                    slug: post.node.fields.slug,
                    previous,
                    next,
                },
            })
        })

        // Iterate through each post, putting all found tags into `tags`
        let tags = []
        posts.forEach(post => {
            if (post.node.frontmatter.tags) {
                tags = tags.concat(post.node.frontmatter.tags)
            }
        })
        const uniqTags = [...new Set(tags)]

        // Create tag pages
        uniqTags.forEach(tag => {
            if (!tag) return
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

exports.onCreateNode = ({node, actions, getNode}) => {
    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode});
        actions.createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
};
