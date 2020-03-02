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

// this query access siteMetadata in gatsby-config.js.
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

const metaForHelmet = (
  metaDescription:string,
  title:string,
  authorName:string,
  keywords: string[] | []
) => {
  let metaProps = [
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
      content: authorName,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ];

  let keyWordsAvailable = keywords.length > 0;
  let metaPropsWithKeywords;

  if (keyWordsAvailable){
    metaPropsWithKeywords = metaProps.concat(
      {
        name: 'keywords',
        content: keywords.join(', ')
      }
    );
  }

  return metaPropsWithKeywords;

};


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
                metaForHelmet(metaDescription,title,data.site.siteMetadata.author.name,keywords)
              }/>
          )
        }
      }
    />
  );
};

export default Head;

