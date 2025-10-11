import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export default {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    mdxRs: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/, 
      use: [
        {
          loader: require.resolve('./config/mdx-pass-through.js')
        }
      ]
    });
    return config;
  }
};
