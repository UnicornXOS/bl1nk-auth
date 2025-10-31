import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    domains: [],
    remotePatterns: [],
  },
  async rewrites() {
    return [
      // Map standard well-known JWKS endpoint to API route to avoid Windows path issues
      { source: '/.well-known/jwks.json', destination: '/api/jwks' },
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
