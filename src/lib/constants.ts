import { Liquids, Materials, RawResources, Vehicles } from "./models";

/**
 * Shared mapping of material/vehicle names to their icon file paths.
 * Icons are served locally for reliable loading and consistent performance.
 */
export const ICONS_MAP = new Map<string, string>([
  // Materials
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

  // Liquids
  [Liquids.Petrol, "icons/RefinedFuelIcon.svg"],
  [Liquids.HeavyOil, "icons/HeavyOilIcon.svg"],
  [Liquids.Water, "icons/WaterIcon.svg"],
  [Liquids.EnrichedOil, "icons/EnrichedOilIcon.svg"],
  [Liquids.Oil, "icons/OilIcon.svg"],

  // Raw Resources
  [RawResources.Salvage, "icons/SalvageIcon.svg"],
  [RawResources.Components, "icons/ComponentsIcon.svg"],
  [RawResources.Coke, "icons/CokeIcon.svg"],
  [RawResources.DamagedComponents, "icons/ComponentsDamagedIcon.svg"],
  [RawResources.Coal, "icons/CoalIcon.svg"],
  [RawResources.Sulfur, "icons/SulfurIcon.svg"],
  [RawResources.RareMetal, "icons/RareMaterialsIcon.svg"],
  [RawResources.HeavyExplosivePowder, "icons/HeavyExplosiveMaterialsIcon.svg"],

  // Vehicles
  [Vehicles.Xiphos, "icons/ArmoredCarVehicleIcon.svg"],
  [Vehicles.WaspNest, "icons/FieldCastellumIcon.svg"],
  [Vehicles.Koronides, "icons/FieldGunIcon.svg"],
  [Vehicles.Wolfhound, "icons/ATLauncherIcon.svg"],
  [Vehicles.CollinsCannon, "icons/ATFieldGunIcon.svg"],
  [Vehicles.BatteringRam, "icons/ConcreteMixerIcon.svg"],
  [Vehicles.Falconer, "icons/HeavyFieldCannonIcon.svg"],
  [Vehicles.Tisiphone, "icons/FieldCannonIcon.svg"],
  [Vehicles.Rampart, "icons/ATFieldGunIcon.svg"],
  [Vehicles.Smelter, "icons/HeavyFieldGunIcon.svg"],
  [Vehicles.Stockade, "icons/FlameVehicleIcon.svg"],
  [Vehicles.StygianBolt, "icons/RPGIcon.svg"],
]);
