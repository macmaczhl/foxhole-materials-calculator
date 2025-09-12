import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export for GitHub Pages (main branch)
  // Vercel will handle this automatically for PR previews
  output: process.env.VERCEL ? undefined : "export",
  trailingSlash: true,
  basePath: process.env.VERCEL ? "" : process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.VERCEL
    ? ""
    : process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: process.env.VERCEL ? false : true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foxhole.wiki.gg",
        port: "",
        pathname: "/images/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
