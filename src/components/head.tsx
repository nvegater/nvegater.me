import React, {FC} from 'react';
import Helmet from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

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
  readonly lang?: string;
  readonly keywords?: string[];
}

const Head: FC<HeadProps> = ({
                               title,
                               description,
                               lang,
                               keywords,
                             }) => {

  const data:StaticQueryData = useStaticQuery(
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
    `
  );
  const metaDescription = description || data.site.siteMetadata.description;
  const keyWords = keywords !== undefined ? keywords : [];
  const langDefined = lang !== undefined ? lang : 'en';

  return (
    <Helmet
      htmlAttributes={{langDefined}} title={title} titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={
        metaForHelmet(metaDescription,title,data.site.siteMetadata.author.name,keyWords)
      }/>
  );
};

export default Head;

