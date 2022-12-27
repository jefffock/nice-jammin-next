/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

module.exports = nextConfig

module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  serverRuntimeConfig: {
    eggyBaseUrl: 'https://thecarton.net/api/v1',
    gooseBaseUrl: 'https://elgoose.net/api/v1',
    umphreysBaseUrl: 'https://allthings.umphreys.com/api/v1',
    neighborBaseUrl: 'https://neighbortunes.net/api/v1'
  }
};