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
  [Vehicles.O_Brien_V_101_Freeman, "icons/OBrienV101FreemanIcon.svg"],
  [Vehicles.O_Brien_V_121_Highlander, "icons/OBrienV121HighlanderIcon.svg"],
  [Vehicles.O_Brien_V_130_Wild_Jack, "icons/OBrienV130WildJackIcon.svg"],
  [Vehicles.O_Brien_V_110, "icons/OBrienV110Icon.svg"],
  [Vehicles.O_Brien_V_113_Gravekeeper, "icons/OBrienV113GravekeeperIcon.svg"],
  [Vehicles.T5_Percutio, "icons/T5PercutioIcon.svg"],
  [Vehicles.T8_Gemini, "icons/T8GeminiIcon.svg"],
]);
