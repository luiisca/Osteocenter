/** @type {import('next').NextConfig} */
const path = require("path");

const STUDIO_REWRITE = {
  source: "/admin/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/admin/:path*"
      : "/admin/index.html",
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
};

module.exports = nextConfig;
