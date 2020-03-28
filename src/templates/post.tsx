import React, {FC} from "react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/head";
import styled from "styled-components";
import Img, {FixedObject, FluidObject} from "gatsby-image";

interface PageQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  markdownRemark: {
    id?: string
    excerpt?: string
    html: string
    frontmatter: {
      title: string
      date: string
      featuredImage?: {
        childImageSharp: {
          fluid: FluidObject;
          fixed: FixedObject;
        }
      };
    }
  }
}


// pageQuery is executed always before the component is being rendered
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 2500)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 125, height: 125) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

const StyledUl = styled('ul')`
  list-style-type: none;

  li::before {
    content: '' !important;
    padding-right: 0 !important;
  }
`;

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    previous?: any
    next?: any
  }
}

const PostTemplate:FC<Props> = ({data,pageContext})=>{

  const siteTitle = data.site.siteMetadata.title;
  const post = data.markdownRemark;

  let featuredImgFluid:FluidObject | undefined =
    data.markdownRemark.frontmatter.featuredImage !== undefined ?
      data.markdownRemark.frontmatter.featuredImage?.childImageSharp.fluid :
      undefined;

 /* let fixedImage:FixedObject | undefined =
    data.markdownRemark.frontmatter.featuredImage !== undefined ?
      data.markdownRemark.frontmatter.featuredImage?.childImageSharp.fixed :
      undefined;*/

  const {previous,next} = pageContext;

  return(
    <Layout title={siteTitle}>
      <Head title={post.frontmatter.title} description={post.excerpt}/>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <div className={`page-content`}>
          {
            featuredImgFluid !== undefined &&
            <Img fluid={featuredImgFluid}/>
          }
          {/*{
            fixedImage !== undefined &&
            <Img fixed={fixedImage}/>
          }*/}
          <div dangerouslySetInnerHTML={{__html: post.html}} />
          {/*https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html*/}
          {/*https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html*/}
          {/* content we are injecting was already properly escaped (by the gatsby-remark plugin) */}
          <StyledUl>
            {previous && (
              <li>
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              </li>
            )}
          </StyledUl>
        </div>
      </article>
    </Layout>
  );
};

export default PostTemplate;
