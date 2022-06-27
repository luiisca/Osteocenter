/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    }
  },
  images: {
    domains: ['https://maps.googleapis.com', 'lh3.googleusercontent.com', 'media.graphassets.com'],
  },
}

module.exports = nextConfig
