import { Liquids } from "@/lib/models";
import { ICONS_MAP } from "@/lib/constants";
import Image from "next/image";

// Helper function to check if a material is a liquid
const isLiquid = (stuffName: string): boolean => {
  return Object.values(Liquids).includes(stuffName as Liquids);
};

// Helper function to get the base path from the current URL
const getBasePath = (): string => {
  if (typeof window !== "undefined") {
    // Check if we're on GitHub Pages by looking at the URL
    if (
      window.location.hostname === "macmaczhl.github.io" &&
      window.location.pathname.startsWith("/foxhole-materials-calculator")
    ) {
      console.log(
        "GitHub Pages detected, using base path: /foxhole-materials-calculator"
      );
      return "/foxhole-materials-calculator";
    }
    console.log("Not GitHub Pages, using empty base path");
  }
  // Fallback to environment variable or empty string
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  console.log("Using environment base path:", envBasePath);
  return envBasePath;
};

interface StuffIconProps {
  stuffName: string;
  count: number;
}

export function StuffIcon({ stuffName, count }: StuffIconProps) {
  const iconPath = ICONS_MAP.get(stuffName);
  const displayCount = isLiquid(stuffName) ? `${count}L` : count;

  // Get the base path from URL detection or environment variable
  const basePath = getBasePath();
  const fullIconPath = `${basePath}/${iconPath}`;

  console.log(
    `StuffIcon: ${stuffName}, basePath: "${basePath}", iconPath: "${iconPath}", fullPath: "${fullIconPath}"`
  );

  return (
    <div className="icon-tile relative">
      {iconPath ? (
        <Image
          alt={stuffName}
          src={fullIconPath}
          decoding="async"
          loading="lazy"
          width={60}
          height={60}
        />
      ) : (
        <span className="text-xs">{`${stuffName}(${displayCount})`}</span>
      )}
      <span className="count-badge">{displayCount}</span>
    </div>
  );
}
