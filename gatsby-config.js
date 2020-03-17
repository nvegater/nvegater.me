'use strict'

module.exports = {
    siteMetadata: { // This will be accessed via "graphqlQuery"
        title: 'Nvegater',
        description: '[insert_smart_title_here_WIP]',
        siteUrl: 'https://nvegater.com',
        author: {
            name: 'Nicolas Vega Terrazas',
            url: 'https://github.com/nvegater',
            email: 'nico_vt@protonmail.com',
        },
        social: {
            github: 'https://github.com/nvegater',
        },
    },
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/posts`,
                name: `posts`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        { // Converts Markdown from source filessystems into HTML
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`, //resize of iframes
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-autolink-headers`, // adds link target to headers
                    `gatsby-remark-prismjs`, //Syntax highlighting for codeblocks
                    `gatsby-remark-copy-linked-files`, // copy linked files on build
                    `gatsby-remark-smartypants`, //convert to smart Quotes aps.
                ],
            },
        },
        {
            /*  Normal url is nvegater.com but there are other ways of accesing
            *   my content (eg. www.nvegater.com, nvegater.github.io etc..)
            *   this tells google to ignore any input url and use only the
            *   canonical
            * */
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://nvegater.com`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`, // only static asset so far
            options: {
                name: `Nicolas Vega Terrazas`,
                short_name: `Nico`,
                start_url: `/`,
                background_color: `#1c1a1a`,
                theme_color: `#d9b6be`,
                display: `minimal-ui`,
                icon: `static/logo.png`,
            },
          //import Logo from '../../static/logo.png'
          //<img src={Logo} width={24} />
          //https://www.gatsbyjs.org/docs/importing-assets-into-files/
        },
        {
            resolve: `gatsby-plugin-google-analytics`, // to inject all Google analytics scripts
            options: {
                // trackingId: `ADD YOUR TRACKING ID HERE`,
            },
        },
        `gatsby-plugin-react-helmet`, //<head>'s custom content
        `gatsby-plugin-sharp`,// enhance and size images
        `gatsby-plugin-styled-components`, //enables patterns of styled components
        `gatsby-plugin-typescript`, // OF COURSE
        `gatsby-transformer-sharp`, // enhance and size images
        {
          /*
          * intercepts local links from Markdown
          * and other non-react pages
          * and does a client-side pushState
          * to avoid the browser having to refresh the page.
          * */
          resolve: `gatsby-plugin-catch-links`,
          options: {
          },
        },

    ],
};
