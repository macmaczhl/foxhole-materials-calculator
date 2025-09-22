import {
  IRecipe,
  Liquids,
  Materials,
  RawResources,
  RecipeEntity,
  Vehicles,
} from "./models";

let recipeId = 1;
function createRecipe(
  required: RecipeEntity[],
  produced: RecipeEntity[]
): IRecipe {
  return {
    id: recipeId++,
    required,
    produced,
  };
}

function createEmptyRecipe(stuff: string): IRecipe {
  return {
    id: recipeId++,
    required: [],
    produced: [{ stuff, count: 1 }],
  };
}

function emptyRecipePair(stuff: string): [string, IRecipe[]] {
  return [stuff, [createEmptyRecipe(stuff)]];
}

const constructionMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 10 }],
    [{ stuff: Materials.ConstructionMaterials, count: 1 }]
  ),
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 25 }],
    [
      { stuff: Materials.ConstructionMaterials, count: 1 },
      { stuff: Materials.BarbedWire, count: 5 },
    ]
  ),
  createRecipe(
    [
      { stuff: Liquids.Petrol, count: 25 },
      { stuff: RawResources.Salvage, count: 10 },
    ],
    [{ stuff: Materials.ConstructionMaterials, count: 3 }]
  ),
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 25 }],
    [
      { stuff: Materials.ConstructionMaterials, count: 1 },
      { stuff: Materials.MetalBeam, count: 1 },
    ]
  ),
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 25 }],
    [
      { stuff: Materials.ConstructionMaterials, count: 1 },
      { stuff: Materials.Sandbag, count: 1 },
    ]
  ),
  createRecipe(
    [
      { stuff: RawResources.Salvage, count: 15 },
      { stuff: RawResources.Coke, count: 25 },
    ],
    [{ stuff: Materials.ConstructionMaterials, count: 3 }]
  ),
];

const processedConstructionMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 3 },
      { stuff: RawResources.Components, count: 20 },
    ],
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 1 }]
  ),
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 3 },
      { stuff: RawResources.Components, count: 55 },
      { stuff: Liquids.HeavyOil, count: 55 },
    ],
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 3 }]
  ),
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.MetalBeam, count: 1 },
      { stuff: Liquids.HeavyOil, count: 10 },
    ],
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 1 }]
  ),
];

const metalBeamsRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 25 }],
    [
      { stuff: Materials.MetalBeam, count: 1 },
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]
  ),
];

const bardedWireRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 25 }],
    [
      { stuff: Materials.BarbedWire, count: 5 },
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]
  ),
];

const sandbagRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 15 }],
    [
      { stuff: Materials.Sandbag, count: 5 },
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]
  ),
];

const componentsRecipes: IRecipe[] = [
  createEmptyRecipe(RawResources.Components),
  createRecipe(
    [{ stuff: RawResources.DamagedComponents, count: 75 }],
    [{ stuff: RawResources.Components, count: 5 }]
  ),
];

const cokeRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Coal, count: 200 }],
    [{ stuff: RawResources.Coke, count: 180 }]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: RawResources.Coke, count: 260 },
      { stuff: Liquids.HeavyOil, count: 60 },
    ]
  ),
  createRecipe(
    [{ stuff: RawResources.Coal, count: 200 }],
    [
      { stuff: RawResources.Coke, count: 165 },
      { stuff: RawResources.Sulfur, count: 15 },
    ]
  ),
];

const assemblyMaterialsIRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Salvage, count: 15 },
      { stuff: RawResources.Coke, count: 75 },
    ],
    [{ stuff: Materials.AssemblyMaterialsI, count: 1 }]
  ),
];

const assemblyMaterialsIIRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Salvage, count: 15 },
      { stuff: Liquids.Petrol, count: 50 },
    ],
    [{ stuff: Materials.AssemblyMaterialsII, count: 1 }]
  ),
];

const assemblyMaterialsIIIRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 3 },
      { stuff: RawResources.Sulfur, count: 20 },
    ],
    [{ stuff: Materials.AssemblyMaterialsIII, count: 1 }]
  ),
];

const assemblyMaterialsIVRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 1 },
      { stuff: Liquids.HeavyOil, count: 66 },
    ],
    [{ stuff: Materials.AssemblyMaterialsIV, count: 1 }]
  ),
];

const assemblyMaterialsVRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 3 },
      { stuff: RawResources.Coke, count: 245 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
    ],
    [{ stuff: Materials.AssemblyMaterialsV, count: 1 }]
  ),
];

const steelConstructionMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: RawResources.Coke, count: 200 },
      { stuff: RawResources.Sulfur, count: 65 },
      { stuff: Liquids.HeavyOil, count: 35 },
    ],
    [{ stuff: Materials.SteelConstructionMaterials, count: 1 }]
  ),
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 9 },
      { stuff: RawResources.Coke, count: 375 },
      { stuff: Liquids.EnrichedOil, count: 90 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [{ stuff: Materials.SteelConstructionMaterials, count: 3 }]
  ),
];

const concreteMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 15 },
      { stuff: Liquids.Oil, count: 100 },
    ]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 50 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 10 },
      { stuff: Liquids.Oil, count: 50 },
    ]
  ),
  createRecipe(
    [{ stuff: RawResources.Components, count: 20 }],
    [{ stuff: Materials.ConcreteMaterials, count: 1 }]
  ),
];

const pipeRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 3 }],
    [{ stuff: Materials.Pipe, count: 1 }]
  ),
];

const rareAlloysRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.RareMetal, count: 20 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: RawResources.Coke, count: 60 },
    ],
    [{ stuff: Materials.RareAlloys, count: 1 }]
  ),
];

const thermalShieldingRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 2 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
    ],
    [{ stuff: Materials.ThermalShielding, count: 1 }]
  ),
];

const unstableSubstancesRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.FlameAmmo, count: 3 },
      { stuff: RawResources.HeavyExplosivePowder, count: 8 },
    ],
    [{ stuff: Materials.UnstableSubstances, count: 1 }]
  ),
];

const flameAmmoRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 1 },
      { stuff: RawResources.HeavyExplosivePowder, count: 4 },
    ],
    [{ stuff: Materials.FlameAmmo, count: 1 }]
  ),
];

const petrolRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: Liquids.Oil, count: 50 }],
    [{ stuff: Liquids.Petrol, count: 50 }]
  ),
  createRecipe(
    [
      { stuff: Liquids.Oil, count: 40 },
      { stuff: Liquids.Water, count: 10 },
    ],
    [{ stuff: Liquids.Petrol, count: 50 }]
  ),
];

const heavyOilRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: RawResources.Coke, count: 260 },
      { stuff: Liquids.HeavyOil, count: 60 },
    ]
  ),
  createRecipe(
    [{ stuff: Liquids.Oil, count: 50 }],
    [{ stuff: Liquids.HeavyOil, count: 30 }]
  ),
];

const enrichedOilRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Coal, count: 100 }],
    [{ stuff: Liquids.EnrichedOil, count: 1 }]
  ),
  createRecipe(
    [
      { stuff: Liquids.HeavyOil, count: 30 },
      { stuff: RawResources.Sulfur, count: 60 },
    ],
    [{ stuff: Liquids.EnrichedOil, count: 30 }]
  ),
];

const oilRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 15 },
      { stuff: Liquids.Oil, count: 100 },
    ]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 50 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 10 },
      { stuff: Liquids.Oil, count: 50 },
    ]
  ),
  createRecipe(
    [{ stuff: Liquids.Water, count: 25 }],
    [{ stuff: Liquids.Oil, count: 100 }]
  ),
];

const waterRecipes: IRecipe[] = [createEmptyRecipe(Liquids.Water)];

// Refined Materials recipes
const refinedMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: RawResources.Components, count: 20 },
    ],
    [{ stuff: Materials.RefinedMaterials, count: 1 }]
  ),
];

// T3 "Xiphos" vehicle recipes
const xiphosRecipes: IRecipe[] = [
  // Garage production: 25 x Refined Materials → 1 x T3 "Xiphos"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 25 }],
    [{ stuff: Vehicles.Xiphos, count: 1 }]
  ),
  // Mass Production Factory: 179 x Refined Materials → 3 crates of 3 x T3 "Xiphos" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 179 }],
    [{ stuff: Vehicles.Xiphos, count: 9 }]
  ),
  // Mass Production Factory: 224 x Refined Materials → 4 crates of 3 x T3 "Xiphos" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 224 }],
    [{ stuff: Vehicles.Xiphos, count: 12 }]
  ),
  // Mass Production Factory: 261 x Refined Materials → 5 crates of 3 x T3 "Xiphos" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 261 }],
    [{ stuff: Vehicles.Xiphos, count: 15 }]
  ),
];

// Rycker 4/3-F Wasp Nest recipes (Bunker-building vehicle)
const waspNestRecipes: IRecipe[] = [
  // Field Bunker production: 20 x Processed Construction Materials + 15 x Assembly Materials II + 3 x Assembly Materials IV → 1 x Wasp Nest
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsII, count: 15 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 }
    ],
    [{ stuff: Vehicles.WaspNest, count: 1 }]
  ),
];

// 120-68 "Koronides" Field Gun recipes (Heavy Artillery)
const koronidesRecipes: IRecipe[] = [
  // Garage production: 50 x Refined Materials → 1 x Koronides Field Gun
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 50 }],
    [{ stuff: Vehicles.Koronides, count: 1 }]
  ),
  // Mass Production Factory: 360 x Refined Materials → 3 crates of 3 x Koronides Field Gun (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 360 }],
    [{ stuff: Vehicles.Koronides, count: 9 }]
  ),
  // Mass Production Factory: 450 x Refined Materials → 4 crates of 3 x Koronides Field Gun (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 450 }],
    [{ stuff: Vehicles.Koronides, count: 12 }]
  ),
  // Mass Production Factory: 525 x Refined Materials → 5 crates of 3 x Koronides Field Gun (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 525 }],
    [{ stuff: Vehicles.Koronides, count: 15 }]
  ),
];

// Balfour Wolfhound 40mm recipes (Anti-Tank)
const wolfhoundRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Wolfhound 40mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.Wolfhound, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Wolfhound 40mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.Wolfhound, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Wolfhound 40mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.Wolfhound, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Wolfhound 40mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.Wolfhound, count: 15 }]
  ),
];

// Collins Cannon 68mm recipes (Anti-Tank Field Gun)
const collinsCannonRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Collins Cannon 68mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.CollinsCannon, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Collins Cannon 68mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.CollinsCannon, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Collins Cannon 68mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.CollinsCannon, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Collins Cannon 68mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.CollinsCannon, count: 15 }]
  ),
];

// AA-2 Battering Ram recipes (Siege Vehicle)
const batteringRamRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x AA-2 Battering Ram
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.BatteringRam, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x AA-2 Battering Ram (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.BatteringRam, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x AA-2 Battering Ram (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.BatteringRam, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x AA-2 Battering Ram (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.BatteringRam, count: 15 }]
  ),
];

// Balfour Falconer 250mm recipes (Heavy Artillery)
const falconerRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x Falconer 250mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Falconer, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x Falconer 250mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Falconer, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x Falconer 250mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Falconer, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x Falconer 250mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Falconer, count: 15 }]
  ),
];

// 30-250 "Tisiphone" Field Cannon recipes (Field Artillery)
const tisiphoneRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x Tisiphone Field Cannon
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Tisiphone, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x Tisiphone Field Cannon (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Tisiphone, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x Tisiphone Field Cannon (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Tisiphone, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x Tisiphone Field Cannon (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Tisiphone, count: 15 }]
  ),
];

// Balfour Rampart 68mm recipes (Anti-Tank)
const rampartRecipes: IRecipe[] = [
  // Production: 5 x Processed Construction Materials + 5 x Assembly Materials IV + 1 x Collins Cannon 68mm → 1 x Rampart 68mm
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
      { stuff: Vehicles.CollinsCannon, count: 1 }
    ],
    [{ stuff: Vehicles.Rampart, count: 1 }]
  ),
];

// 40-45 "Smelter" Heavy Field Gun recipes (Heavy Artillery)
const smelterRecipes: IRecipe[] = [
  // Production: 5 x Processed Construction Materials + 5 x Assembly Materials IV + 1 x AA-2 Battering Ram → 1 x Smelter Heavy Field Gun
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
      { stuff: Vehicles.BatteringRam, count: 1 }
    ],
    [{ stuff: Vehicles.Smelter, count: 1 }]
  ),
];

// Balfour Stockade 75mm recipes (Field Gun)
const stockadeRecipes: IRecipe[] = [
  // Production: 15 x Steel Construction Materials + 20 x Assembly Materials II + 15 x Assembly Materials III + 1 x Wolfhound 40mm → 1 x Stockade 75mm
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Vehicles.Wolfhound, count: 1 }
    ],
    [{ stuff: Vehicles.Stockade, count: 1 }]
  ),
];

// 945g "Stygian Bolt" recipes (Heavy Weapon/Launcher)
const stygianBoltRecipes: IRecipe[] = [
  // Production: 15 x Steel Construction Materials + 20 x Assembly Materials II + 15 x Assembly Materials III + 1 x AA-2 Battering Ram → 1 x Stygian Bolt
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Vehicles.BatteringRam, count: 1 }
    ],
    [{ stuff: Vehicles.StygianBolt, count: 1 }]
  ),
];

export const RecipiesByStuff = new Map<string, IRecipe[]>([
  [Materials.ConstructionMaterials, constructionMaterialsRecipes],
  [
    Materials.ProcessedConstructionMaterials,
    processedConstructionMaterialsRecipes,
  ],
  [Materials.RefinedMaterials, refinedMaterialsRecipes],
  [Materials.BarbedWire, bardedWireRecipes],
  [Materials.MetalBeam, metalBeamsRecipes],
  [Materials.Sandbag, sandbagRecipes],
  [RawResources.Components, componentsRecipes],
  [RawResources.Coke, cokeRecipes],
  [Materials.AssemblyMaterialsI, assemblyMaterialsIRecipes],
  [Materials.AssemblyMaterialsII, assemblyMaterialsIIRecipes],
  [Materials.AssemblyMaterialsIII, assemblyMaterialsIIIRecipes],
  [Materials.AssemblyMaterialsIV, assemblyMaterialsIVRecipes],
  [Materials.AssemblyMaterialsV, assemblyMaterialsVRecipes],
  [Materials.SteelConstructionMaterials, steelConstructionMaterialsRecipes],
  [Materials.ConcreteMaterials, concreteMaterialsRecipes],
  [Materials.Pipe, pipeRecipes],
  [Materials.RareAlloys, rareAlloysRecipes],
  [Materials.ThermalShielding, thermalShieldingRecipes],
  [Materials.UnstableSubstances, unstableSubstancesRecipes],
  [Materials.FlameAmmo, flameAmmoRecipes],
  [Liquids.Petrol, petrolRecipes],
  [Liquids.HeavyOil, heavyOilRecipes],
  [Liquids.Water, waterRecipes],
  [Liquids.EnrichedOil, enrichedOilRecipes],
  [Liquids.Oil, oilRecipes],

  [Vehicles.Xiphos, xiphosRecipes],
  [Vehicles.WaspNest, waspNestRecipes],
  [Vehicles.Koronides, koronidesRecipes],
  [Vehicles.Wolfhound, wolfhoundRecipes],
  [Vehicles.CollinsCannon, collinsCannonRecipes],
  [Vehicles.BatteringRam, batteringRamRecipes],
  [Vehicles.Falconer, falconerRecipes],
  [Vehicles.Tisiphone, tisiphoneRecipes],
  [Vehicles.Rampart, rampartRecipes],
  [Vehicles.Smelter, smelterRecipes],
  [Vehicles.Stockade, stockadeRecipes],
  [Vehicles.StygianBolt, stygianBoltRecipes],

  emptyRecipePair(RawResources.Salvage),
  emptyRecipePair(RawResources.DamagedComponents),
  emptyRecipePair(RawResources.Coal),
  emptyRecipePair(RawResources.Sulfur),
  emptyRecipePair(RawResources.RareMetal),
  emptyRecipePair(RawResources.HeavyExplosivePowder),
]);
