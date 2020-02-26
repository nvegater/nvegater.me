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
  readonly lang: string | "en" // Standard is English
  readonly keywords: string[] | [];
  children: ReactNode;
}

const Head: FC<HeadProps> = ({
                               title,
                               description,
                               lang,
                               keywords,
                               children
                             }) => {

  console.log(description, keywords, children);

  return (
    <StaticQuery
      query={graphqlQuery}
      render={
        (data: StaticQueryData) => {
          const metaDescription = description || data.site.siteMetadata.description;
          return (
            <Helmet
              htmlAttributes={{lang}} title={title} titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              meta={
                [
                  {
                    name: `description`,
                    content: metaDescription,
                  },
                  {
                    property: `og:title`,
                    content: title,
                  },
                  {
                    property: `og:description`,
                    content: metaDescription,
                  },
                  {
                    property: `og:type`,
                    content: `website`,
                  },
                  {
                    name: `twitter:card`,
                    content: `summary`,
                  },
                  {
                    name: `twitter:creator`,
                    content: data.site.siteMetadata.author.name,
                  },
                  {
                    name: `twitter:title`,
                    content: title,
                  },
                  {
                    name: `twitter:description`,
                    content: metaDescription,
                  },
                ].concat(
                  keywords.length > 0 ? {
                    name: 'keyboards',
                    content: keywords.join(', ')
                  } : []
                )
              }/>
          )
        }
      }
    />
  );
};

export default Head;

