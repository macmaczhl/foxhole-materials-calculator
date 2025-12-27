import { Materials, RawResources, IRecipe } from "../models";
import { createRecipe, createEmptyRecipe } from "./base";

const basicMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Salvage, count: 2 }],
    [{ stuff: Materials.BasicMaterials, count: 1 }]
  ),
];

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
      { stuff: "Petrol", count: 25 },
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
      { stuff: "Heavy Oil", count: 55 },
    ],
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 3 }]
  ),
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.MetalBeam, count: 1 },
      { stuff: "Heavy Oil", count: 10 },
    ],
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 1 }]
  ),
];

const refinedMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: RawResources.Components, count: 20 },
    ],
    [{ stuff: Materials.RefinedMaterials, count: 1 }]
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

const barbedWireRecipes: IRecipe[] = [
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

const steelConstructionMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: RawResources.Coke, count: 200 },
      { stuff: RawResources.Sulfur, count: 65 },
      { stuff: "Heavy Oil", count: 35 },
    ],
    [{ stuff: Materials.SteelConstructionMaterials, count: 1 }]
  ),
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 9 },
      { stuff: RawResources.Coke, count: 375 },
      { stuff: "Enriched Oil", count: 90 },
      { stuff: "Water", count: 100 },
    ],
    [{ stuff: Materials.SteelConstructionMaterials, count: 3 }]
  ),
];

const concreteMaterialsRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: "Water", count: 100 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 15 },
      { stuff: "Oil", count: 100 },
    ]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: "Water", count: 50 },
    ],
    [
      { stuff: Materials.ConcreteMaterials, count: 1 },
      { stuff: RawResources.Sulfur, count: 10 },
      { stuff: "Oil", count: 50 },
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

// Ship Parts - Terminal materials (crafted at other facilities)
// Naval Hull Segments and Naval Shell Plating have recipes in navalVehicles.ts
const navalTurbineComponentsRecipes: IRecipe[] = [
  createEmptyRecipe(Materials.NavalTurbineComponents),
];

export const constructionMaterialRecipes = new Map<string, IRecipe[]>([
  [Materials.BasicMaterials, basicMaterialsRecipes],
  [Materials.ConstructionMaterials, constructionMaterialsRecipes],
  [
    Materials.ProcessedConstructionMaterials,
    processedConstructionMaterialsRecipes,
  ],
  [Materials.RefinedMaterials, refinedMaterialsRecipes],
  [Materials.BarbedWire, barbedWireRecipes],
  [Materials.MetalBeam, metalBeamsRecipes],
  [Materials.Sandbag, sandbagRecipes],
  [Materials.SteelConstructionMaterials, steelConstructionMaterialsRecipes],
  [Materials.ConcreteMaterials, concreteMaterialsRecipes],
  [Materials.Pipe, pipeRecipes],
  [Materials.RareAlloys, rareAlloysRecipes],
  [Materials.ThermalShielding, thermalShieldingRecipes],
  [Materials.UnstableSubstances, unstableSubstancesRecipes],
  [Materials.FlameAmmo, flameAmmoRecipes],
  [Materials.NavalTurbineComponents, navalTurbineComponentsRecipes],
]);
