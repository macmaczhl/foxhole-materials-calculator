import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use static export for GitHub Pages (main branch)
  // Vercel will handle this automatically for PR previews
  output: process.env.VERCEL ? undefined : "export",
  trailingSlash: true,
  // GitHub Pages base path configuration
  // The configure-pages action should inject this, but we'll set it explicitly
  basePath:
    process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS
      ? "/foxhole-materials-calculator"
      : "",
  assetPrefix:
    process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS
      ? "/foxhole-materials-calculator/"
      : "",
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
