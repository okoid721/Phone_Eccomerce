/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com', 'lh3.googleusercontent.com'],
  },
};
module.exports = {
  // ...
  async rewrites() {
    return [
      {
        source: '/api/paystack/callback',
        destination: '/api/paystack/callback', // Your actual API route path
      },
    ];
  },
};

module.exports = nextConfig;
