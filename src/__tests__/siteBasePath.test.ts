import {
  GITHUB_PAGES_BASE_PATH,
  resolveSiteAssetPrefix,
  resolveSiteBasePath,
} from "@/lib/siteBasePath";

describe("resolveSiteBasePath", () => {
  it("uses NEXT_PUBLIC_BASE_PATH when set", () => {
    expect(
      resolveSiteBasePath({
        NEXT_PUBLIC_BASE_PATH: "/custom",
        CI_BUILD_FOR_E2E: "true",
        NODE_ENV: "production",
        GITHUB_ACTIONS: "true",
      })
    ).toBe("/custom");
  });

  it("skips the GitHub Pages subdirectory for e2e CI builds", () => {
    expect(
      resolveSiteBasePath({
        CI_BUILD_FOR_E2E: "true",
        NODE_ENV: "production",
        GITHUB_ACTIONS: "true",
      })
    ).toBe("");
  });

  it("uses the GitHub Pages subdirectory for production Actions builds", () => {
    expect(
      resolveSiteBasePath({
        NODE_ENV: "production",
        GITHUB_ACTIONS: "true",
      })
    ).toBe(GITHUB_PAGES_BASE_PATH);
  });

  it("is empty for local production and development builds", () => {
    expect(resolveSiteBasePath({ NODE_ENV: "production" })).toBe("");
    expect(
      resolveSiteBasePath({ NODE_ENV: "development", GITHUB_ACTIONS: "true" })
    ).toBe("");
    expect(resolveSiteBasePath({})).toBe("");
  });
});

describe("resolveSiteAssetPrefix", () => {
  it("adds a trailing slash when a base path is present", () => {
    expect(
      resolveSiteAssetPrefix({
        NODE_ENV: "production",
        GITHUB_ACTIONS: "true",
      })
    ).toBe(`${GITHUB_PAGES_BASE_PATH}/`);
  });

  it("is empty when there is no base path", () => {
    expect(resolveSiteAssetPrefix({ CI_BUILD_FOR_E2E: "true" })).toBe("");
  });
});
