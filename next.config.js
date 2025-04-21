const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false
  },
  webpack: (config) => {
    config.resolve.alias['next-mdx-import-source-file'] = path.resolve(__dirname, 'lib/next-mdx-import-source-file');
    return config;
  }
});
