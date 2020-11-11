import React, {FC, ReactNode} from 'react';
import {Link} from 'gatsby';
import {GlobalStyle, styled} from '../styles/theme';

const StyledNav = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 16px;

    a {
      background: none;
    }
  }
`;

const StyledFooter = styled.footer`
  padding-top: 50px;
`;

interface LayoutProps {
  readonly title?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children, title}) => {
  console.log(title);
  return (
    <>
      <GlobalStyle/>
      {/*inject Global Style this inside the layout (not in the <head>)
        so that changes to the style
        will trigger a re-render when using hot-module-reloading.*/}
      <StyledNav className="navigation">
        <ul>
          <li>
            <Link to={'/'}>&</Link>
          </li>
          <li>
            <Link to={'/tags'}>Tags</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            <Link to={'/login'}>Login</Link>
          </li>
          <li>
            <Link to={'/blockchain'}>Blockchain</Link>
          </li>
          <li>
            <Link to={'/Chart'}>MDX-Chart</Link>
          </li>
          <li>
            <Link to={'/VeganStock'}>Vegan Stock</Link>
          </li>
        </ul>
      </StyledNav>
      <main className="content" role="main">
        {children}
      </main>
      <StyledFooter>
        © {new Date().getFullYear()},{` `}
        <a href="https://github.com/nvegater">github.com/nvegater</a>
      </StyledFooter>
    </>
  );
};

export default Layout;
