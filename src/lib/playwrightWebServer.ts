export const PLAYWRIGHT_BASE_URL = "http://localhost:3000";

export function getPlaywrightWebServerCommand(isCi: boolean): string {
  if (isCi) {
    return "python3 -m http.server 3000 --directory out --bind 127.0.0.1";
  }

  return "npm run dev";
}
