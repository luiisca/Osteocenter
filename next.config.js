/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: [
      "https://maps.googleapis.com",
      "lh3.googleusercontent.com",
      "media.graphassets.com",
      "cdn.sanity.io",
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/categorias",
        destination: "/blog/categorias/sintomas",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "https://osteocenter-admin.sanity.studio",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
