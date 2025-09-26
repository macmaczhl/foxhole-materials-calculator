import { Liquids, calculateCanCount } from "@/lib/models";
import { IconService } from "@/lib/services/iconService";
import Image from "next/image";
import styles from "./StuffIcon.module.css";

// Helper function to check if a material is a liquid
const isLiquid = (stuffName: string): boolean => {
  return Object.values(Liquids).includes(stuffName as Liquids);
};

interface StuffIconProps {
  stuffName: string;
  count: number;
}

export function StuffIcon({ stuffName, count }: StuffIconProps) {
  const iconUrl = IconService.getIconUrl(stuffName, 60);
  const displayCount = isLiquid(stuffName) ? `${count}L` : count;

  // Calculate can information for liquids
  const canCount = isLiquid(stuffName)
    ? calculateCanCount(stuffName, count)
    : 0;
  const tooltipText =
    isLiquid(stuffName) && canCount > 0
      ? `${stuffName}: ${count}L (${canCount} can${canCount !== 1 ? "s" : ""})`
      : stuffName;

  return (
    <div className={styles.iconTile}>
      {iconUrl ? (
        <Image
          alt={stuffName}
          src={iconUrl}
          decoding="async"
          loading="lazy"
          width={60}
          height={60}
        />
      ) : (
        <span className="text-xs">{`${stuffName}(${displayCount})`}</span>
      )}
      <span className={styles.countBadge}>{displayCount}</span>
      <div className={styles.instantTooltip}>{tooltipText}</div>
    </div>
  );
}
