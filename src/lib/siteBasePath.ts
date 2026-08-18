export type SitePathEnv = {
  NEXT_PUBLIC_BASE_PATH?: string;
  CI_BUILD_FOR_E2E?: string;
  NODE_ENV?: string;
  GITHUB_ACTIONS?: string;
};

export const GITHUB_PAGES_BASE_PATH = "/foxhole-materials-calculator";

export function resolveSiteBasePath(env: SitePathEnv = process.env): string {
  if (env.NEXT_PUBLIC_BASE_PATH) {
    return env.NEXT_PUBLIC_BASE_PATH;
  }

  // Lint-and-test builds the static export for Playwright at `/`.
  if (env.CI_BUILD_FOR_E2E === "true") {
    return "";
  }

  if (env.NODE_ENV === "production" && env.GITHUB_ACTIONS === "true") {
    return GITHUB_PAGES_BASE_PATH;
  }

  return "";
}

export function resolveSiteAssetPrefix(env: SitePathEnv = process.env): string {
  const basePath = resolveSiteBasePath(env);
  return basePath ? `${basePath}/` : "";
}
