import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
