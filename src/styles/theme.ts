import styled, {css, createGlobalStyle} from 'styled-components'
import tufte from './tufte'

export {css, styled}; // huh?

export const theme = {
    colors: {
        themePrimary: '#8d94c4',
        themeLighterAlt: '#fafafd',
        themeLighter: '#ebecf6',
        themeLight: '#d9dced',
        themeTertiary: '#b7bcdc',
        themeSecondary: '#99a0cb',
        themeDarkAlt: '#7f86b1',
        themeDark: '#6b7195',
        themeDarker: '#4f536e',
        neutralLighterAlt: '#151f2a',
        neutralLighter: '#141f29',
        neutralLight: '#131e28',
        neutralQuaternaryAlt: '#121c25',
        neutralQuaternary: '#111a23',
        neutralTertiaryAlt: '#111922',
        neutralTertiary: '#8c938c',
        neutralSecondary: '#757b75',
        neutralPrimaryAlt: '#5e635e',
        neutralPrimary: '#d1dbd0', // Text Color
        neutralDark: '#303230',
        black: '#191a19',
        background: '#15202b',
        contrastLightest: '#dad9d9',
    },
};

// border box: to exclude padding from the weight/height dimensions of a div.
const reset = () => `
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0 !important;
  padding: 0;
}

::selection {
  background-color: ${theme.colors.themeLighter};
  color: rgba(0, 0, 0, 0.70);
}

a.anchor, a.anchor:hover, a.anchor:link {
  background: none !important;
}

figure {
  a.gatsby-resp-image-link {
    background: none;
  }

  span.gatsby-resp-image-wrapper {
    max-width: 100% !important;
  }
}
`;

export const GlobalStyle = createGlobalStyle`
${reset()}
${tufte()}
`;
