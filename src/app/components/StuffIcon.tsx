import { Liquids, Materials, RawResources } from "@/lib/models";
import Image from 'next/image'

interface StuffIcon {
    stuffName: string
    count: number
}

const ICONS_MAP = new Map<string, string>([
  [Materials.ConstructionMaterials, 'images/f/f0/ConstructionMaterialsIcon.png'],
  [Materials.ProcessedConstructionMaterials, 'images/f/fa/ProcessedConstructionMaterialsIcon.png'],
  [Materials.BarbedWire, 'images/9/9b/BarbedWireMaterialItemIcon.png'],
  [Materials.MetalBeam, 'images/1/15/MetalBeamMaterialItemIcon.png'],
  [Materials.Sandbag, 'images/f/fe/SandbagMaterialItemIcon.png'],
  [Materials.AssemblyMaterialsI, 'images/2/28/AssemblyMaterials1Icon.png'],
  [Materials.AssemblyMaterialsII, 'images/f/f1/AssemblyMaterials2Icon.png'],
  [Materials.AssemblyMaterialsIII, 'images/1/16/AssemblyMaterials3Icon.png'],
  [Materials.AssemblyMaterialsIV, 'images/3/37/AssemblyMaterials4Icon.png'],
  [Materials.AssemblyMaterialsV, 'images/9/96/AssemblyMaterials5Icon.png'],
  [Materials.SteelConstructionMaterials, 'images/d/db/SteelConstructionMaterialsIcon.png'],
  [Materials.ConcreteMaterials, 'images/b/bd/ConcreteBagIcon.png'],
  [Materials.Pipe, 'images/thumb/2/2a/EngineRoomPipeIcon.png/100px-EngineRoomPipeIcon.png'],
  [Materials.RareAlloys, 'images/3/35/FacilityMaterials09Icon.png'],
  [Materials.ThermalShielding, 'images/a/a6/FacilityMaterials11Icon.png'],
  [Materials.UnstableSubstances, 'images/a/a2/FacilityMaterials10Icon.png'],
  [Materials.FlameAmmo, 'images/d/d1/FlameAmmoIcon.png'],

  [Liquids.Petrol, 'images/thumb/f/f1/RefinedFuelIcon.png/100px-RefinedFuelIcon.png'],
  [Liquids.HeavyOil, 'images/f/f3/FacilityOil1Icon.png'],
  [Liquids.Water, 'images/9/94/WaterIcon.png'],
  [Liquids.EnrichedOil, 'images/1/1d/FacilityOil2Icon.png'],
  [Liquids.Oil, 'images/b/b0/OilIcon.png'],

  [RawResources.Salvage, 'images/3/33/SalvageIcon.png'],
  [RawResources.Components, 'images/thumb/a/ac/ComponentsIcon.png/100px-ComponentsIcon.png'],
  [RawResources.Coke, 'images/d/d8/CokeIcon.png'],
  [RawResources.DamagedComponents, 'images/thumb/b/bd/ComponentsDamagedIcon.png/100px-ComponentsDamagedIcon.png'],
  [RawResources.Coal, 'images/8/88/CoalIcon.png'],
  [RawResources.Sulfur, 'images/thumb/b/be/SulfurIcon.png/100px-SulfurIcon.png'],
  [RawResources.RareMetal, 'images/e/ed/RareMaterialsIcon.png'],
  [RawResources.HeavyExplosivePowder, 'images/thumb/2/21/HeavyExplosiveMaterialsIcon.png/100px-HeavyExplosiveMaterialsIcon.png'],
]);

export function StuffIcon({ stuffName, count }: StuffIcon) {
  const iconPostfix = ICONS_MAP.get(stuffName);

  return <div className="bg-neutral-500 min-w-16 relative">
    {iconPostfix ? <Image
      alt={stuffName}
      src={`https://foxhole.wiki.gg/${iconPostfix}`}
      decoding="async" loading="lazy" width="60" height="60" data-file-width="60" data-file-height="60" /> : `${stuffName}(${count})`}
    <span className="absolute bottom-0 right-0 bg-cyan-50 px-1 text-sm">{count}</span>
  </div>;
}
