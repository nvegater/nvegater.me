import React, {FC} from "react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import Head from "../components/head";
import styled from "styled-components";
import {FixedObject, FluidObject} from "gatsby-image";
import {theme} from "../styles/theme";
import "tachyons";

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
  query BlogPostBySlug_two($slug: String!) {
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

const TachyonsStyles = styled.div`
.ba {
    border-style: solid;
    border-width: 1px;
}

.b--black {
    border-color: #000;
}

.b--transparent {
    border-color: transparent;
}

.db {
    display: block;
}

.dib {
    display: inline-block;
}

.b {
    font-weight: bold;
}

.fw6 {
    font-weight: 600;
}

.input-reset {
    -webkit-appearance: none;
       -moz-appearance: none;
}

.input-reset::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.lh-copy {
    line-height: 1.5;
}

.link {
    text-decoration: none;
    transition: color .15s ease-in;
}

.link:link, .link:visited {
    transition: color .15s ease-in;
}

.link:hover {
    transition: color .15s ease-in;
}

.link:active {
    transition: color .15s ease-in;
}

.link:focus {
    transition: color .15s ease-in;
    outline: 1px dotted currentColor;
}

.w-100 {
    width: 100%;
}

.black-80 {
    color: rgba(0, 0, 0, .8);
}

.black {
    color: #000;
}

.bg-transparent {
    background-color: transparent;
}

.hover-white:hover {
    color: black;
}

.hover-white:focus {
    color: black;
}

.hover-bg-black:hover {
    background-color: ${theme.colors.themeLighterAlt};
}

.hover-bg-black:focus {
    background-color: ${theme.colors.themeLighterAlt};
}

.pa0 {
    padding: 0;
}

.pa2 {
    padding: .5rem;
}

.pa4 {
    padding: 2rem;
}

.pv2 {
    padding-top: .5rem;
    padding-bottom: .5rem;
}

.ph0 {
    padding-left: 0;
    padding-right: 0;
}

.ph3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.ma0 {
    margin: 0;
}

.mt3 {
    margin-top: 1rem;
}

.mv3 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.mh0 {
    margin-left: 0;
    margin-right: 0;
}

.f4 {
    font-size: 1.25rem;
}

.f6 {
    font-size: .875rem;
}

.measure {
    max-width: 30em;
}

.center {
    margin-right: auto;
    margin-left: auto;
}

.dim {
    opacity: 1;
    transition: opacity .15s ease-in;
}

.dim:hover, .dim:focus {
    opacity: .5;
    transition: opacity .15s ease-in;
}

.dim:active {
    opacity: .8;
    transition: opacity .15s ease-out;
}

.grow {
    -moz-osx-font-smoothing: grayscale;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: transform .25s ease-out;
}

.grow:hover, .grow:focus {
    transform: scale(1.05);
}

.grow:active {
    transform: scale(.9);
}

.pointer:hover {
    cursor: pointer;
}
`;

interface Props {
  readonly data: PageQueryData
  readonly pageContext: {
    previous?: any
    next?: any
  }
}

const PostTachyons: FC<Props> = ({data, pageContext}) => {

  const siteTitle = data.site.siteMetadata.title;
  const post = data.markdownRemark;

  const {previous, next} = pageContext;

  console.log("using tachyons template.")

  return (
    <Layout title={siteTitle}>
      <Head title={post.frontmatter.title} description={post.excerpt}/>
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <div className={`page-content`}>
          <div dangerouslySetInnerHTML={{__html: post.html}}/>
          <TachyonsStyles>
            <main className="pa4 black-80">
              <form className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" type="email"
                           name="email-address" id="email-address"/>
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                           type="password" name="password" id="password"/>
                  </div>
                  <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                </fieldset>
                <div className="">
                  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                         value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                  <a href="#0" className="f6 link dim black db">Sign up</a>
                  <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                </div>
              </form>
            </main>
          </TachyonsStyles>

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

export default PostTachyons;
