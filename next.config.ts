/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["newsapi.org"], // Use only the hostname (remove protocol and path)
  },
};

module.exports = nextConfig;
