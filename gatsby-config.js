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
    title: 'GoodEWorkers',
    siteUrl: 'https://goodeworkers.org',
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