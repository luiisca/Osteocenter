/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
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
    ],
  },
};

module.exports = nextConfig;
