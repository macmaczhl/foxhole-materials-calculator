/**
 * Get the base path from environment variable
 * This is used for GitHub Pages deployment where assets need to be prefixed
 * with the repository name.
 */
export const getBasePath = (): string => {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
};
