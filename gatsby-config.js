/**
 * @type {import('gatsby').GatsbyConfig}
 */

const path = require('path');

const gatsbyRequiredRules = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules',
);

module.exports = {
  siteMetadata: {
    title: 'GoodEworkers: Promote remote work in nonprofits',
    siteUrl: 'https://goodeworkers.org',
    siteMetaDescription: "GoodEworkers is a network that helps nonprofits find remote workers and mentors them on how to work from home. We also help nonprofits structure themselves to be more remote-friendly. Whether you're a nonprofit looking to hire remote workers or a remote worker looking to find a meaningful cause to work for, GoodEworkers can help."
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'none',
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: 'transparent',
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        rulePaths: [gatsbyRequiredRules],
        stages: ['develop'],
        extensions: ['js', 'jsx'],
        exclude: ['node_modules', 'bower_components', '.cache', 'public'],
      },
    },
  ],
};