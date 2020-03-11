import React, {FC} from "react";
import {graphql} from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/head";
interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
interface Props {
  readonly data: PageQueryData;
}

// TODO this is just a placeholder, is an aexample of how to add pages.
const About:FC<Props> = ({data})=>{

  const siteTitle = data.site.siteMetadata.title;

  return(
    <Layout title={siteTitle}>
      <Head title="All Tags" keywords={[`blog`, `gatsby`, `javascript`, `react`]}/>
      <article>
      No more text for you
      </article>
    </Layout>
  );
};

export default About;
