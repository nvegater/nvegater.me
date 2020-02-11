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
    ],
};
