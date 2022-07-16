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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      // Alternatively:
      // 'react/jsx-runtime.js': 'react/jsx-runtime',
      // 'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
    };
    return config;
  },
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
