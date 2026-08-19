import type { NextConfig } from "next";
import {
  resolveSiteAssetPrefix,
  resolveSiteBasePath,
} from "./src/lib/siteBasePath";

const nextConfig: NextConfig = {
  // Use static export for GitHub Pages (main branch)
  // Vercel will handle this automatically for PR previews
  output: process.env.VERCEL ? undefined : "export",
  trailingSlash: true,
  // GitHub Pages base path configuration
  // The configure-pages action should inject this, but we'll set it explicitly
  basePath: resolveSiteBasePath(),
  assetPrefix: resolveSiteAssetPrefix(),
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
