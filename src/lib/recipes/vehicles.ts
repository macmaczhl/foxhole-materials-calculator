import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

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

// 30-250 "Tisiphone" Field Cannon vehicle recipes
const tisiphoneRecipes: IRecipe[] = [
  // Garage production: Basic recipe for Tisiphone (placeholder - needs proper recipe from wiki)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 25 }],
    [{ stuff: Vehicles.Tisiphone, count: 1 }]
  ),
];

// 40-250 "Alekto" Heavy Cannon vehicle recipes
const alektoRecipes: IRecipe[] = [
  // Single recipe as per wiki requirements
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Materials.RareAlloys, count: 1 },
      { stuff: Vehicles.Tisiphone, count: 1 },
    ],
    [{ stuff: Vehicles.Alekto, count: 1 }]
  ),
];

// AB-8 "Acheron" Landing APC recipes
const acheronRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x AB-8 "Acheron"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.Acheron, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x AB-8 "Acheron" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.Acheron, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x AB-8 "Acheron" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.Acheron, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x AB-8 "Acheron" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.Acheron, count: 15 }]
  ),
];

// AB-11 "Doru" Landing APC recipes
const doruRecipes: IRecipe[] = [
  // Garage production: 5 x Processed Construction Materials + 3 x Assembly Materials III → 1 x AB-11 "Doru"
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
      { stuff: Vehicles.Acheron, count: 1 },
    ],
    [{ stuff: Vehicles.Doru, count: 1 }]
  ),
];

// Mulloy LPC Landing APC recipes
const mulloyLPCRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Mulloy LPC
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.MulloyLPC, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Mulloy LPC (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.MulloyLPC, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Mulloy LPC (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.MulloyLPC, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Mulloy LPC (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.MulloyLPC, count: 15 }]
  ),
];

// T12 "Actaeon" Tankette recipes
const actaeonRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Actaeon, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x T12 "Actaeon" Tankette (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Actaeon, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x T12 "Actaeon" Tankette (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Actaeon, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x T12 "Actaeon" Tankette (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Actaeon, count: 15 }]
  ),
];

// T14 "Vesta" Tankette recipes
const vestaRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Vesta, count: 1 }]
  ),
];

// T20 "Ixion" Tankette recipes
const ixionRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConcreteMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Ixion, count: 1 }]
  ),
];

// T13 "Deioneus" Rocket Battery recipes
const deioneusRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Deioneus, count: 1 }]
  ),
  // Mass Production Factory: 198 x Refined Materials → 3 crates of 3 x T13 "Deioneus" Rocket Battery (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 198 }],
    [{ stuff: Vehicles.Deioneus, count: 9 }]
  ),
  // Mass Production Factory: 247 x Refined Materials → 4 crates of 3 x T13 "Deioneus" Rocket Battery (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 247 }],
    [{ stuff: Vehicles.Deioneus, count: 12 }]
  ),
  // Mass Production Factory: 286 x Refined Materials → 5 crates of 3 x T13 "Deioneus" Rocket Battery (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 286 }],
    [{ stuff: Vehicles.Deioneus, count: 15 }]
  ),
];

export const vehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.Xiphos, xiphosRecipes],
  [Vehicles.Tisiphone, tisiphoneRecipes],
  [Vehicles.Alekto, alektoRecipes],
  [Vehicles.Acheron, acheronRecipes],
  [Vehicles.Doru, doruRecipes],
  [Vehicles.MulloyLPC, mulloyLPCRecipes],
  [Vehicles.Actaeon, actaeonRecipes],
  [Vehicles.Vesta, vestaRecipes],
  [Vehicles.Ixion, ixionRecipes],
  [Vehicles.Deioneus, deioneusRecipes],
]);
