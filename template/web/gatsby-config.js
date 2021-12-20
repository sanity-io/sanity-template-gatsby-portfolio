// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')
const token = process.env.SANITY_READ_TOKEN

const isProd = process.env.NODE_ENV === 'production'
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || "false").toLowerCase() === "true"

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token,
        watchMode: !isProd && !previewEnabled,
        overlayDrafts: (!isProd || previewEnabled) && token,
      }
    }
  ]
}
