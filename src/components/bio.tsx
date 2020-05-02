import React, {FC} from "react";
import {StaticQuery, graphql} from 'gatsby'

// TODO move query to graphQL file, configure top level schema. https://github.com/jimkyndemeyer/graphql-config-examples/tree/master/remote-schema-introspection
type StaticQueryData = {
  site: {
    siteMetadata: {
      description: string
      social: {
        github: string
      }
    }
  }
}
// this query access siteMetadata in gatsby-config.js.
// pageQuery is executed always before the component is being rendered
// TODO rename?
const graphQLquery = graphql`
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
  return (
    <StaticQuery
      query={graphQLquery}
      render={
        (data:StaticQueryData) => {
        const {description, social} = data.site.siteMetadata;
        return (
        <div>
          <h1>
            {description}
          </h1>
          <p>
            Nicolás Vega
            <br />
            <a href={social.github}>Github</a>
          </p>
        </div>)
      }}

    />
  );
};

export default Bio;
