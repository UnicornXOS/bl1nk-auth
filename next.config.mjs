import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async rewrites() {
    return [
      // Map standard well-known JWKS endpoint to our folder without a dot
      { source: '/.well-known/jwks.json', destination: '/.well-known/jwks' },
    ];
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

export default nextConfig;
