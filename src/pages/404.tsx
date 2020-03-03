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

const NotFoundPage:FC<Props> = ({data})=>{

  const siteTitle = data.site.siteMetadata.title;

  return(
    <Layout title={siteTitle}>
      <Head title="404: Not found"/>
      <h1>
        not found...
      </h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;
