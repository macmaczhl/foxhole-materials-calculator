export interface Stuff {
  name: string;
}

export interface RecipeEntity {
  stuff: string;
  count: number;
}

export interface IRecipe {
  id: number;
  required: RecipeEntity[];
  produced: RecipeEntity[];
}

export interface RecipeTree {
  stuff: string;
  selectedRecipe: IRecipe;
  recipes: IRecipe[];
  required: RecipeTree[];
}

export enum Materials {
  ConstructionMaterials = "Construction Materials",
  ProcessedConstructionMaterials = "Processed Construction Materials",
  RefinedMaterials = "Refined Materials",
  BarbedWire = "Barbed Wire",
  MetalBeam = "Metal Beam Wire",
  Sandbag = "Sandbag",
  SteelConstructionMaterials = "Steel Construction Materials",
  ConcreteMaterials = "Concrete Materials",
  Pipe = "Pipe",
  RareAlloys = "Rare Alloys",
  ThermalShielding = "Thermal Shielding",
  UnstableSubstances = "Unstable Substances",
  FlameAmmo = "Flame Ammo",
  AssemblyMaterialsI = "Assembly Materials I",
  AssemblyMaterialsII = "Assembly Materials II",
  AssemblyMaterialsIII = "Assembly Materials III",
  AssemblyMaterialsIV = "Assembly Materials IV",
  AssemblyMaterialsV = "Assembly Materials V",
}

export enum Liquids {
  Petrol = "Petrol",
  HeavyOil = "Heavy Oil",
  Water = "Water",
  EnrichedOil = "Enriched Oil",
  Oil = "Oil",
}

export enum Vehicles {
  Xiphos = 'T3 "Xiphos"',
  // Warden Armored Cars
  O_Brien_V_101_Freeman = 'O\'Brien V.101 Freeman',
  O_Brien_V_121_Highlander = 'O\'Brien V.121 Highlander',
  O_Brien_V_130_Wild_Jack = 'O\'Brien V.130 Wild Jack',
  O_Brien_V_110 = 'O\'Brien V.110',
  O_Brien_V_113_Gravekeeper = 'O\'Brien V.113 Gravekeeper',
  // Colonial Armored Cars
  T5_Percutio = 'T5 "Percutio"',
  T8_Gemini = 'T8 "Gemini"',
}

export enum RawResources {
  Salvage = "Salvage",
  Components = "Components",
  Coke = "Coke",
  DamagedComponents = "Damaged Components",
  Coal = "Coal",
  Sulfur = "Sulfur",
  RareMetal = "Rare Metal",
  HeavyExplosivePowder = "Heavy Explosive Powder",
}

export const availableMaterials: Stuff[] = [
  { name: RawResources.Salvage },
  { name: RawResources.Components },
  { name: RawResources.Coke },
  { name: Materials.ConstructionMaterials },
  { name: Materials.ProcessedConstructionMaterials },
  { name: Materials.RefinedMaterials },
  { name: Materials.BarbedWire },
  { name: Materials.MetalBeam },
  { name: Materials.Sandbag },
  { name: Materials.AssemblyMaterialsI },
  { name: Materials.AssemblyMaterialsII },
  { name: Materials.AssemblyMaterialsIII },
  { name: Materials.AssemblyMaterialsIV },
  { name: Materials.AssemblyMaterialsV },
  { name: Materials.SteelConstructionMaterials },
  { name: Materials.ConcreteMaterials },
  { name: Materials.Pipe },
  { name: Materials.RareAlloys },
  { name: Materials.ThermalShielding },
  { name: Materials.UnstableSubstances },
  { name: Materials.FlameAmmo },
  { name: Liquids.Petrol },
  { name: Liquids.HeavyOil },
  { name: Liquids.Water },
  { name: Liquids.EnrichedOil },
  { name: Liquids.Oil },
  { name: Vehicles.Xiphos },
  { name: Vehicles.O_Brien_V_101_Freeman },
  { name: Vehicles.O_Brien_V_121_Highlander },
  { name: Vehicles.O_Brien_V_130_Wild_Jack },
  { name: Vehicles.O_Brien_V_110 },
  { name: Vehicles.O_Brien_V_113_Gravekeeper },
  { name: Vehicles.T5_Percutio },
  { name: Vehicles.T8_Gemini },
];

export const stuffList: Stuff[] = availableMaterials;

// Item grouping for search panel
export enum ItemGroup {
  Vehicle = "Vehicle",
  Components = "Components",
  RawResources = "Raw Resources",
}

export interface GroupedStuff {
  group: ItemGroup;
  items: Stuff[];
}

// Categorize an item into its appropriate group
export function getItemGroup(itemName: string): ItemGroup {
  // Check if it's a vehicle
  if (Object.values(Vehicles).includes(itemName as Vehicles)) {
    return ItemGroup.Vehicle;
  }

  // Check if it's a basic raw resource that can be crafted (Components, Coke)
  if (itemName === RawResources.Components || itemName === RawResources.Coke) {
    return ItemGroup.RawResources;
  }

  // Everything else (Materials.*, Liquids.*) is considered Components (processed/manufactured materials)
  return ItemGroup.Components;
}

// Create grouped and ordered list of items
export function createGroupedStuffList(): GroupedStuff[] {
  const groups = new Map<ItemGroup, Stuff[]>();

  // Initialize groups
  groups.set(ItemGroup.Vehicle, []);
  groups.set(ItemGroup.Components, []);
  groups.set(ItemGroup.RawResources, []);

  // Categorize all items
  availableMaterials.forEach((item) => {
    const group = getItemGroup(item.name);
    groups.get(group)!.push(item);
  });

  // Return in the specified order: Vehicle, Components, Raw Resources
  return [
    { group: ItemGroup.Vehicle, items: groups.get(ItemGroup.Vehicle)! },
    { group: ItemGroup.Components, items: groups.get(ItemGroup.Components)! },
    {
      group: ItemGroup.RawResources,
      items: groups.get(ItemGroup.RawResources)!,
    },
  ];
}

export const groupedStuffList: GroupedStuff[] = createGroupedStuffList();
