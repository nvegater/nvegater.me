import React, {FC} from 'react';
import Helmet from 'react-helmet';
import {StaticQuery, graphql, useStaticQuery} from 'gatsby';

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

interface HeadProps {
  readonly title: string
  readonly description?: string
  readonly lang?: string
  readonly keywords?: string[]
}

interface Site {
  siteMetadata: {
    authorName: string
    description: string
    siteUrl: string
    title: string
  }
}

interface LayoutQueryData {
  site: Site
}

// TODO move query to graphQL file, configure top level schema. https://github.com/jimkyndemeyer/graphql-config-examples/tree/master/remote-schema-introspection
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
const useLayoutQuery = (): StaticQueryData => {
  const {site}: LayoutQueryData = useStaticQuery(graphqlQuery);
  return { site }
};

const Head:FC<HeadProps> = ({title,description,lang,keywords}) =>{

  const {site} = useLayoutQuery();
  return (
  <StaticQuery
    query={graphqlQuery}
    render={ ():StaticQueryData => {
      const {site}: Site = useStaticQuery(graphqlQuery);
      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          meta={[
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
            keywords.length > 0
              ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
              : [],
          )}
        />
      )
    }}}
  />
  );
};

export default Head;

