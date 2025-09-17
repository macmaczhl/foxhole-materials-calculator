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
  // Only one recipe per feedback: 10 x Construction Materials + 10 x Assembly Materials I → 1 x T3 "Xiphos"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 }
    ],
    [{ stuff: Vehicles.Xiphos, count: 1 }]
  ),
];

// T12 "Actaeon" Tankette vehicle recipes
const actaeonTanketteRecipes: IRecipe[] = [
  // Garage: 35 x Refined Materials → 1 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.ActaeonTankette, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 9 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.ActaeonTankette, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 12 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.ActaeonTankette, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 15 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.ActaeonTankette, count: 15 }]
  ),
];

// T5 "Percutio" vehicle recipes
const percutioRecipes: IRecipe[] = [
  // Only one recipe per feedback: 10 x Construction Materials + 10 x Assembly Materials I → 1 x T5 "Percutio"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 }
    ],
    [{ stuff: Vehicles.Percutio, count: 1 }]
  ),
];

// T8 "Gemini" vehicle recipes
const geminiRecipes: IRecipe[] = [
  // Only one recipe per feedback: 10 x Construction Materials + 10 x Assembly Materials I → 1 x T8 "Gemini"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 }
    ],
    [{ stuff: Vehicles.Gemini, count: 1 }]
  ),
];

// O'Brien v.113 Gravekeeper vehicle recipes
const oBrienGravekeeperRecipes: IRecipe[] = [
  // Only one recipe per feedback: 5 x Construction Materials + 5 x Assembly Materials I → 1 x O'Brien v.113 Gravekeeper
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsI, count: 5 }
    ],
    [{ stuff: Vehicles.OBrienGravekeeper, count: 1 }]
  ),
];

// O'Brien v.121 Highlander vehicle recipes
const oBrienHighlanderRecipes: IRecipe[] = [
  // Only one recipe per feedback: 15 x Construction Materials + 15 x Assembly Materials I → 1 x O'Brien v.121 Highlander
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 }
    ],
    [{ stuff: Vehicles.OBrienHighlander, count: 1 }]
  ),
];

// O'Brien v.101 Freeman vehicle recipes
const oBrienFreemanRecipes: IRecipe[] = [
  // Keep as is - no specific feedback to change this one
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.OBrienFreeman, count: 1 }]
  ),
];

// O'Brien v.110 vehicle recipes
const oBrienV110Recipes: IRecipe[] = [
  // Only one recipe per feedback: 10 x Processed Construction Materials + 10 x Assembly Materials I → 1 x O'Brien v.110
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 }
    ],
    [{ stuff: Vehicles.OBrienV110, count: 1 }]
  ),
];

// O'Brien V.130 Wild Jack vehicle recipes
const oBrienWildJackRecipes: IRecipe[] = [
  // Placeholder recipe - no specific feedback provided yet
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 }
    ],
    [{ stuff: Vehicles.OBrienWildJack, count: 1 }]
  ),
];

// O'Brien V.190 Knave vehicle recipes
const oBrienKnaveRecipes: IRecipe[] = [
  // Recipe 1: 40 x Refined Materials → 1 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 40 }],
    [{ stuff: Vehicles.OBrienKnave, count: 1 }]
  ),
  // Recipe 2: 288 x Refined Materials → 9 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 288 }],
    [{ stuff: Vehicles.OBrienKnave, count: 9 }]
  ),
  // Recipe 3: 360 x Refined Materials → 12 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 360 }],
    [{ stuff: Vehicles.OBrienKnave, count: 12 }]
  ),
  // Recipe 4: 420 x Refined Materials → 15 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 420 }],
    [{ stuff: Vehicles.OBrienKnave, count: 15 }]
  ),
];

// O'Brien V.200 Squire vehicle recipes
const oBrienSquireRecipes: IRecipe[] = [
  // Complex recipe per feedback: 35 x Processed Construction Materials + 10 x Assembly Materials I + 8 x Assembly Materials III + 1 x O'Brien V.190 Knave → 1 x O'Brien V.200 Squire
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 35 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 8 },
      { stuff: Vehicles.OBrienKnave, count: 1 }
    ],
    [{ stuff: Vehicles.OBrienSquire, count: 1 }]
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
  [Vehicles.ActaeonTankette, actaeonTanketteRecipes],
  [Vehicles.Percutio, percutioRecipes],
  [Vehicles.Gemini, geminiRecipes],
  [Vehicles.OBrienGravekeeper, oBrienGravekeeperRecipes],
  [Vehicles.OBrienHighlander, oBrienHighlanderRecipes],
  [Vehicles.OBrienFreeman, oBrienFreemanRecipes],
  [Vehicles.OBrienV110, oBrienV110Recipes],
  [Vehicles.OBrienWildJack, oBrienWildJackRecipes],
  [Vehicles.OBrienKnave, oBrienKnaveRecipes],
  [Vehicles.OBrienSquire, oBrienSquireRecipes],

  emptyRecipePair(RawResources.Salvage),
  emptyRecipePair(RawResources.DamagedComponents),
  emptyRecipePair(RawResources.Coal),
  emptyRecipePair(RawResources.Sulfur),
  emptyRecipePair(RawResources.RareMetal),
  emptyRecipePair(RawResources.HeavyExplosivePowder),
]);
