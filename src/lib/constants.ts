import { Liquids, Materials, RawResources, Vehicles } from "./models";

/**
 * Shared mapping of material/vehicle names to their icon names.
 * Icon names are used to generate Foxhole wiki URLs for consistent loading.
 */
export const ICONS_MAP = new Map<string, string>([
  // Materials
  [Materials.ConstructionMaterials, "ConstructionMaterialsIcon"],
  [
    Materials.ProcessedConstructionMaterials,
    "ProcessedConstructionMaterialsIcon",
  ],
  [Materials.RefinedMaterials, "RefinedMaterialsIcon"],
  [Materials.BarbedWire, "BarbedWireMaterialItemIcon"],
  [Materials.MetalBeam, "MetalBeamMaterialItemIcon"],
  [Materials.Sandbag, "SandbagMaterialItemIcon"],
  [Materials.AssemblyMaterialsI, "AssemblyMaterials1Icon"],
  [Materials.AssemblyMaterialsII, "AssemblyMaterials2Icon"],
  [Materials.AssemblyMaterialsIII, "AssemblyMaterials3Icon"],
  [Materials.AssemblyMaterialsIV, "AssemblyMaterials4Icon"],
  [Materials.AssemblyMaterialsV, "AssemblyMaterials5Icon"],
  [Materials.SteelConstructionMaterials, "SteelConstructionMaterialsIcon"],
  [Materials.ConcreteMaterials, "ConcreteBagIcon"],
  [Materials.Pipe, "EngineRoomPipeIcon"],
  [Materials.RareAlloys, "FacilityMaterials09Icon"],
  [Materials.ThermalShielding, "FacilityMaterials11Icon"],
  [Materials.UnstableSubstances, "FacilityMaterials10Icon"],
  [Materials.FlameAmmo, "FlameAmmoIcon"],

  // Liquids
  [Liquids.Petrol, "RefinedFuelIcon"],
  [Liquids.HeavyOil, "FacilityOil1Icon"],
  [Liquids.Water, "WaterIcon"],
  [Liquids.EnrichedOil, "FacilityOil2Icon"],
  [Liquids.Oil, "OilIcon"],

  // Raw Resources
  [RawResources.Salvage, "SalvageIcon"],
  [RawResources.Components, "ComponentsIcon"],
  [RawResources.Coke, "CokeIcon"],
  [RawResources.DamagedComponents, "ComponentsDamagedIcon"],
  [RawResources.Coal, "CoalIcon"],
  [RawResources.Sulfur, "SulfurIcon"],
  [RawResources.RareMetal, "RareMaterialsIcon"],
  [RawResources.HeavyExplosivePowder, "HeavyExplosiveMaterialsIcon"],

  // Vehicles
  [Vehicles.Xiphos, "ArmoredCarVehicleIcon"],
  [Vehicles.Swallowtail, "FieldMachineGunIcon"],
  [Vehicles.Sagittarii, "FieldMachineGunIcon"],
  [Vehicles.WaspNest, "FieldMultiWItemIcon"],
  [Vehicles.Koronides, "FieldArtilleryColVehicleIcon"],
  [Vehicles.Wolfhound, "FieldCannonWVehicleIcon"],
  [Vehicles.CollinsCannon, "FieldAntiTankWarVehicleIcon"],
  [Vehicles.BatteringRam, "ConcreteMixerIcon"],
  [Vehicles.Falconer, "FieldMortarWIcon"],
  [Vehicles.Tisiphone, "FieldMortarCIcon"],
  [Vehicles.Alekto, "LargeFieldMortarCIcon"],
  [Vehicles.Rampart, "FieldCannonOffensiveWIcon"],
  [Vehicles.Smelter, "FieldATOffensiveCIcon"],
  [Vehicles.Stockade, "FieldCannonHeavyWIcon"],
  [Vehicles.StygianBolt, "FieldATHeavyCIcon"],
  [Vehicles.Acheron, "LandingCraftVehicleIcon"],
  [Vehicles.Doru, "LandingCraftOffensiveVehicleIcon"],
  [Vehicles.MulloyLPC, "LandingCraftWarVehicleIcon"],
  [Vehicles.Actaeon, "TanketteCVehicleIcon"],
  [Vehicles.Vesta, "TanketteFlameCIcon"],
  [Vehicles.Ixion, "TanketteOffensiveCVehicleIcon"],
  [Vehicles.Deioneus, "TanketteMultiCIcon"],
]);
