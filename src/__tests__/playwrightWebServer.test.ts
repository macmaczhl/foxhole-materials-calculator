import {
  PLAYWRIGHT_BASE_URL,
  getPlaywrightWebServerCommand,
} from "@/lib/playwrightWebServer";

describe("getPlaywrightWebServerCommand", () => {
  it("serves the static export on CI", () => {
    expect(getPlaywrightWebServerCommand(true)).toBe(
      "python3 -m http.server 3000 --directory out --bind 127.0.0.1"
    );
  });

  it("uses the Next.js dev server locally", () => {
    expect(getPlaywrightWebServerCommand(false)).toBe("npm run dev");
  });

  it("exposes the Playwright base URL", () => {
    expect(PLAYWRIGHT_BASE_URL).toBe("http://localhost:3000");
  });
});
