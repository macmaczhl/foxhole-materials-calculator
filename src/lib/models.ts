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

// Liquid can capacities in liters
export const LIQUID_CAN_CAPACITIES: Record<string, number> = {
  [Liquids.Petrol]: 50,
  [Liquids.HeavyOil]: 30,
  [Liquids.Water]: 50,
  [Liquids.EnrichedOil]: 30,
  [Liquids.Oil]: 50,
};

// Helper function to calculate number of cans needed for a liquid
export function calculateCanCount(liquidName: string, liters: number): number {
  const capacity = LIQUID_CAN_CAPACITIES[liquidName];
  if (!capacity) {
    return 0; // Not a recognized liquid with can capacity
  }
  return Math.ceil(liters / capacity);
}

export enum Vehicles {
  Xiphos = 'T3 "Xiphos"',
  Percutio = 'T5 "Percutio"',
  Gemini = 'T8 "Gemini"',
  OBrienGravekeeper = 'O\'Brien v.113 Gravekeeper',
  OBrienHighlander = 'O\'Brien v.121 Highlander',
  OBrienFreeman = 'O\'Brien v.101 Freeman',
  OBrienV110 = 'O\'Brien v.110',
  OBrienWildJack = 'O\'Brien V.130 Wild Jack',
  OBrienKnave = 'O\'Brien V.190 Knave',
  OBrienSquire = 'O\'Brien V.200 Squire',
  DuncansCoin20mm = "Duncan's Coin 20mm",
  GA6Cestus = 'GA6 "Cestus"',
  Swallowtail = 'Swallowtail 988/127-2',
  Sagittarii = 'G40 "Sagittarii"',
  WaspNest = 'Rycker 4/3-F Wasp Nest',
  Koronides = '120-68 "Koronides" Field Gun',
  Wolfhound = 'Balfour Wolfhound 40mm',
  CollinsCannon = 'Collins Cannon 68mm',
  BatteringRam = 'AA-2 Battering Ram',
  Falconer = 'Balfour Falconer 250mm',
  Tisiphone = '30-250 "Tisiphone" Field Cannon',
  Alekto = '40-250 "Alekto" Heavy Cannon',
  Rampart = 'Balfour Rampart 68mm',
  Smelter = '40-45 "Smelter" Heavy Field Gun',
  Stockade = 'Balfour Stockade 75mm',
  StygianBolt = '945g "Stygian Bolt"',
  Acheron = 'AB-8 "Acheron"',
  Doru = 'AB-11 "Doru"',
  MulloyLPC = "Mulloy LPC",
  Actaeon = 'T12 "Actaeon" Tankette',
  Vesta = 'T14 "Vesta" Tankette',
  Ixion = 'T20 "Ixion" Tankette',
  Deioneus = 'T13 "Deioneus" Rocket Battery',
  Javelin = 'HH-a "Javelin"',
  Hoplite = 'HH-b "Hoplite"',
  Peltast = 'HH-d "Peltast"',
  NiskaMkI = 'Niska Mk. I Gun Motor Carriage',
  NiskaMkII = 'Niska Mk. II Blinder',
  NiskaMkIII = 'Niska Mk. III Scar Twin',
  NiskaRyckerMkIX = 'Niska-Rycker Mk. IX Skycaller',
  KingSpireMkI = 'King Spire Mk. I',
  KingJesterMkI1 = 'King Jester - Mk. I-1',
  KingGallantMkII = 'King Gallant Mk. II',
  H5Hatchet = 'H-5 "Hatchet"',
  H8Kranesca = 'H-8 "Kranesca"',
  H10Pelekys = 'H-10 "Pelekys"',
  H19Vulcan = 'H-19 "Vulcan"',
  Falchion = '85K-b "Falchion"',
  Spatha = '85K-a "Spatha"',
  Talos = '85V-g "Talos"',
  SilverhandMkIV = 'Silverhand - Mk. IV',
  DevittMkIII = 'Devitt Mk. III',
  DevittIronhideMkIV = 'Devitt Ironhide Mk. IV',
  DevittCaineMkIVMMR = 'Devitt-Caine Mk. IV MMR',
  Bardiche = '86K-a "Bardiche"',
  Ranseur = '86K-c "Ranseur"',
  Nemesis = '90T-v "Nemesis"',
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
  { name: Vehicles.Percutio },
  { name: Vehicles.Gemini },
  { name: Vehicles.OBrienGravekeeper },
  { name: Vehicles.OBrienHighlander },
  { name: Vehicles.OBrienFreeman },
  { name: Vehicles.OBrienV110 },
  { name: Vehicles.OBrienWildJack },
  { name: Vehicles.OBrienKnave },
  { name: Vehicles.OBrienSquire },
  { name: Vehicles.DuncansCoin20mm },
  { name: Vehicles.GA6Cestus },
  { name: Vehicles.Swallowtail },
  { name: Vehicles.Sagittarii },
  { name: Vehicles.WaspNest },
  { name: Vehicles.Koronides },
  { name: Vehicles.Wolfhound },
  { name: Vehicles.CollinsCannon },
  { name: Vehicles.BatteringRam },
  { name: Vehicles.Falconer },
  { name: Vehicles.Tisiphone },
  { name: Vehicles.Alekto },
  { name: Vehicles.Rampart },
  { name: Vehicles.Smelter },
  { name: Vehicles.Stockade },
  { name: Vehicles.StygianBolt },
  { name: Vehicles.Acheron },
  { name: Vehicles.Doru },
  { name: Vehicles.MulloyLPC },
  { name: Vehicles.Actaeon },
  { name: Vehicles.Vesta },
  { name: Vehicles.Ixion },
  { name: Vehicles.Deioneus },
  { name: Vehicles.Javelin },
  { name: Vehicles.Hoplite },
  { name: Vehicles.Peltast },
  { name: Vehicles.NiskaMkI },
  { name: Vehicles.NiskaMkII },
  { name: Vehicles.NiskaMkIII },
  { name: Vehicles.NiskaRyckerMkIX },
  { name: Vehicles.KingSpireMkI },
  { name: Vehicles.KingJesterMkI1 },
  { name: Vehicles.KingGallantMkII },
  { name: Vehicles.H5Hatchet },
  { name: Vehicles.H8Kranesca },
  { name: Vehicles.H10Pelekys },
  { name: Vehicles.H19Vulcan },
  { name: Vehicles.Falchion },
  { name: Vehicles.Spatha },
  { name: Vehicles.Talos },
  { name: Vehicles.SilverhandMkIV },
  { name: Vehicles.DevittMkIII },
  { name: Vehicles.DevittIronhideMkIV },
  { name: Vehicles.DevittCaineMkIVMMR },
  { name: Vehicles.Bardiche },
  { name: Vehicles.Ranseur },
  { name: Vehicles.Nemesis },
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
