import { Liquids } from "@/lib/models";
import { ICONS_MAP } from "@/lib/constants";
import Image from "next/image";

// Helper function to check if a material is a liquid
const isLiquid = (stuffName: string): boolean => {
  return Object.values(Liquids).includes(stuffName as Liquids);
};

interface StuffIconProps {
  stuffName: string;
  count: number;
}

export function StuffIcon({ stuffName, count }: StuffIconProps) {
  const iconPath = ICONS_MAP.get(stuffName);
  const displayCount = isLiquid(stuffName) ? `${count}L` : count;

  return (
    <div className="icon-tile relative">
      {iconPath ? (
        <Image
          alt={stuffName}
          src={`/${iconPath}`}
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
