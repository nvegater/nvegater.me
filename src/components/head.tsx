import React, {FC, ReactNode} from 'react';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';

// TODO move query to graphQL file, configure top level schema. https://github.com/jimkyndemeyer/graphql-config-examples/tree/master/remote-schema-introspection
type StaticQueryData = {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: {
        name: string;
      }
    }
  }
}
const graphqlQuery =
  graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author {
          name
        }
      }
    }
  }
`;

interface HeadProps {
  readonly title: string
  readonly description?: string
  readonly lang?: string
  readonly keywords?: string[];
  children: ReactNode;
}

const Head:FC<HeadProps> = ({
                              title,
                              description,
                              lang,
                              keywords,
                              children}) => {

  console.log(description, keywords, children);

  return (
  <StaticQuery
    query={graphqlQuery}
    render={(data:StaticQueryData) => {
      console.log("Coming from the graphqlQuery", data);
      return (
        <Helmet
          htmlAttributes={{lang}}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        >

        </Helmet>
      )
    }}
  />
  );
};

export default Head;

