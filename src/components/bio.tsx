import React, {FC} from "react";
import {graphql, useStaticQuery} from 'gatsby'

type SiteDetails = {
  site: {
    siteMetadata: {
      description: string
      social: {
        github: string
      }
    }
  }
}

const siteDetails = graphql`
  query {
    site {
      siteMetadata {
        description
        social {
          github
        }
      }
    }
  }
`;

const Bio: FC = () => {
  const queryResult:SiteDetails = useStaticQuery(siteDetails);
  const {description, social} = queryResult.site.siteMetadata;
  return <div>
    <h2>
      {description}
      Nicolás Vega Terrazas
    </h2>
    <p>
      <a href={social.github}>Github</a>
    </p>
  </div>
};

export default Bio;
