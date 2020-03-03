import React, {FC} from "react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/head";
interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  },
  allMarkdownRemark: {
    group: {
      fieldValue: string
      totalCount: number
    }[]
  }}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {published: {ne: false}}}) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

interface Props {
  readonly data: PageQueryData;
}

const Tags:FC<Props> = ({data})=>{

  const siteTitle = data.site.siteMetadata.title;
  const group = data.allMarkdownRemark.group;

  return(
    <Layout title={siteTitle}>
      <Head title="All Tags" keywords={[`blog`, `gatsby`, `javascript`, `react`]}/>
      <article>
      <h1>
        All Tags:
      </h1>
        <div className={`page-content`}>
          {
            group.map((tag)=>
              tag && (
              <div key={tag.fieldValue}>
                <h3>
                  <Link to={`/tags/${tag.fieldValue}/`}>{tag.fieldValue}</Link>
                </h3>
                <small>
                  {tag.totalCount} post
                  {tag.totalCount === 1 ? '' : 's'}
                </small>
              </div>
              )
            )}
        </div>
      </article>
    </Layout>
  );
};

export default Tags;
