/** @type {import('next').NextConfig} */
const path = require("path");

const STUDIO_REWRITE = {
  source: "/admin/:path*",
  destination: "https://osteocenter-admin.sanity.studio",
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [STUDIO_REWRITE],
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
    ];
  },
};

module.exports = nextConfig;
