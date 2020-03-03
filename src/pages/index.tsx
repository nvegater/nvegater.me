import React, {FC} from "react";
import {graphql, Link} from "gatsby";

import Layout from "../components/Layout";
import Head from "../components/head";
import Bio from "../components/bio";


interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
        }
      }
    }[]
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {published: {ne: false}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;

// pages in Gatsby are given as input the result of a GraphQL Query.
interface Props {
  readonly data: PageQueryData;
}

const Index:FC <Props> = ({data})=>{
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout title={siteTitle}>
      <Head
        title={"All posts"}
        keywords={['blog', 'gatsby', 'markdown', 'react']}
      />
      <Bio/>
      <article>
        <div className={'page-content'}>
          {
            posts.map(({node}) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                  <div key={node.fields.slug}>
                    <h3>
                      <Link to={node.fields.slug}>{title}</Link>
                    </h3>
                    <small>{node.frontmatter.date}</small>
                    <p dangerouslySetInnerHTML={{__html: node.excerpt}} />
                  </div>
                );
              }
            )
          }
        </div>
      </article>
    </Layout>
  );
};

export default Index;
