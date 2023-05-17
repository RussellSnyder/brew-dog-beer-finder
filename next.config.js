/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        imageSizes: [640, 750, 828, 1080],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.punkapi.com',
            port: '',
            pathname: '/v2/**',
          },
        ],
      },
}

module.exports = nextConfig
