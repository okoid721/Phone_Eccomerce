/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
    minimumCacheTTL: 15000000,
  },
};

module.exports = nextConfig;
