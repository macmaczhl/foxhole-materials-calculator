import { ICONS_MAP } from "@/lib/constants";

/**
 * Service for generating Foxhole wiki icon URLs
 */
export class IconService {
  private static readonly WIKI_BASE_URL = "https://foxhole.wiki.gg/images/thumb";
  private static readonly DEFAULT_PIXELS = 24;

  /**
   * Gets the icon name from ICONS_MAP for a given stuff name
   * @param stuffName - The name of the stuff item
   * @returns The icon name with .png extension or null if not found
   */
  static getIconName(stuffName: string): string | null {
    const iconPath = ICONS_MAP.get(stuffName);
    if (!iconPath) {
      return null;
    }

    // Extract the icon name from the path and ensure it has .png extension
    const iconName = iconPath.replace("icons/", "").replace(/\.(svg|png)$/, "");
    return `${iconName}.png`;
  }

  /**
   * Generates a full Foxhole wiki URL for an icon
   * @param stuffName - The name of the stuff item
   * @param pixels - The pixel size for the icon (default: 24)
   * @returns The full wiki URL or null if icon not found
   */
  static getIconUrl(
    stuffName: string,
    pixels: number = this.DEFAULT_PIXELS
  ): string | null {
    const iconName = this.getIconName(stuffName);
    if (!iconName) {
      return null;
    }

    return `${this.WIKI_BASE_URL}/${iconName}/${pixels}px-${iconName}`;
  }

  /**
   * Checks if an icon exists for a given stuff name
   * @param stuffName - The name of the stuff item
   * @returns True if icon exists, false otherwise
   */
  static hasIcon(stuffName: string): boolean {
    return ICONS_MAP.has(stuffName);
  }
}
