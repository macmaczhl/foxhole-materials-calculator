import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foxhole.wiki.gg',
        port: '',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
