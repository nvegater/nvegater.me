'use strict'

module.exports = {
    siteMetadata: {
        title: 'Nvegater',
        description: 'Portofolio, Mediary and Blog of any-thing/one I find interesting',
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
            resolve: `gatsby-plugin-manifest`, //
            options: {
                name: `Nicolas Vega Terrazas`,
                short_name: `Nico`,
                start_url: `/`,
                background_color: `#1c1a1a`,
                theme_color: `#d9b6be`,
                display: `minimal-ui`,
                icon: `static/logo.png`,
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`, // to inject all Google analytics scripts
            options: {
                // trackingId: `ADD YOUR TRACKING ID HERE`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,// enhance and size images
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-typescript`,
        `gatsby-transformer-sharp`, // enhance and size images
    ],
};
