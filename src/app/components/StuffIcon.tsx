import { Liquids, Materials, RawResources, Vehicles } from "@/lib/models";
import Image from "next/image";

// Helper function to check if a material is a liquid
const isLiquid = (stuffName: string): boolean => {
  return Object.values(Liquids).includes(stuffName as Liquids);
};

interface StuffIconProps {
  stuffName: string;
  count: number;
}

const ICONS_MAP = new Map<string, string>([
  [Materials.ConstructionMaterials, "icons/ConstructionMaterialsIcon.svg"],
  [
    Materials.ProcessedConstructionMaterials,
    "icons/ProcessedConstructionMaterialsIcon.svg",
  ],
  [Materials.RefinedMaterials, "icons/RefinedMaterialsIcon.svg"],
  [Materials.BarbedWire, "icons/BarbedWireMaterialItemIcon.svg"],
  [Materials.MetalBeam, "icons/MetalBeamMaterialItemIcon.svg"],
  [Materials.Sandbag, "icons/SandbagMaterialItemIcon.svg"],
  [Materials.AssemblyMaterialsI, "icons/AssemblyMaterials1Icon.svg"],
  [Materials.AssemblyMaterialsII, "icons/AssemblyMaterials2Icon.svg"],
  [Materials.AssemblyMaterialsIII, "icons/AssemblyMaterials3Icon.svg"],
  [Materials.AssemblyMaterialsIV, "icons/AssemblyMaterials4Icon.svg"],
  [Materials.AssemblyMaterialsV, "icons/AssemblyMaterials5Icon.svg"],
  [
    Materials.SteelConstructionMaterials,
    "icons/SteelConstructionMaterialsIcon.svg",
  ],
  [Materials.ConcreteMaterials, "icons/ConcreteBagIcon.svg"],
  [Materials.Pipe, "icons/PipeIcon.svg"],
  [Materials.RareAlloys, "icons/RareAlloyIcon.svg"],
  [Materials.ThermalShielding, "icons/ThermalShieldingIcon.svg"],
  [Materials.UnstableSubstances, "icons/UnstableSubstancesIcon.svg"],
  [Materials.FlameAmmo, "icons/FlameAmmoIcon.svg"],

  [Liquids.Petrol, "icons/RefinedFuelIcon.svg"],
  [Liquids.HeavyOil, "icons/HeavyOilIcon.svg"],
  [Liquids.Water, "icons/WaterIcon.svg"],
  [Liquids.EnrichedOil, "icons/EnrichedOilIcon.svg"],
  [Liquids.Oil, "icons/OilIcon.svg"],

  [RawResources.Salvage, "icons/SalvageIcon.svg"],
  [RawResources.Components, "icons/ComponentsIcon.svg"],
  [RawResources.Coke, "icons/CokeIcon.svg"],
  [RawResources.DamagedComponents, "icons/ComponentsDamagedIcon.svg"],
  [RawResources.Coal, "icons/CoalIcon.svg"],
  [RawResources.Sulfur, "icons/SulfurIcon.svg"],
  [RawResources.RareMetal, "icons/RareMaterialsIcon.svg"],
  [RawResources.HeavyExplosivePowder, "icons/HeavyExplosiveMaterialsIcon.svg"],

  [Vehicles.Xiphos, "icons/ArmoredCarVehicleIcon.svg"],
]);

export function StuffIcon({ stuffName, count }: StuffIconProps) {
  const iconPostfix = ICONS_MAP.get(stuffName);
  const displayCount = isLiquid(stuffName) ? `${count}L` : count;

  return (
    <div className="icon-tile relative">
      {iconPostfix ? (
        <Image
          alt={stuffName}
          src={`/${iconPostfix}`}
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
