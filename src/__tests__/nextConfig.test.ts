import nextConfig from "../../next.config";

describe("next.config", () => {
  it("exports a static site with resolved paths", () => {
    expect(nextConfig.output).toBe("export");
    expect(nextConfig.trailingSlash).toBe(true);
    expect(nextConfig.basePath).toBe("");
    expect(nextConfig.assetPrefix).toBe("");
  });
});
