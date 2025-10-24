import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== SCOUT TANKS =====

// King Spire Mk. I Scout Tank recipes
const kingSpireMkIRecipes: IRecipe[] = [
  // Garage production: 70 x Refined Materials → 1 x King Spire Mk. I
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 70 }],
    [{ stuff: Vehicles.KingSpireMkI, count: 1 }]
  ),
  // Mass Production Factory: 504 x Refined Materials → 3 crates of 3 x King Spire Mk. I (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 504 }],
    [{ stuff: Vehicles.KingSpireMkI, count: 9 }]
  ),
  // Mass Production Factory: 630 x Refined Materials → 4 crates of 3 x King Spire Mk. I (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 630 }],
    [{ stuff: Vehicles.KingSpireMkI, count: 12 }]
  ),
  // Mass Production Factory: 735 x Refined Materials → 5 crates of 3 x King Spire Mk. I (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 735 }],
    [{ stuff: Vehicles.KingSpireMkI, count: 15 }]
  ),
];

// King Jester - Mk. I-1 Scout Tank recipes
const kingJesterMkI1Recipes: IRecipe[] = [
  // Small Assembly Station upgrade: 5 x Steel Construction Materials + 15 x Assembly Materials I + 3 x Assembly Materials III + 1 x Rare Alloys + 1 x King Spire Mk. I → 1 x King Jester - Mk. I-1
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
      { stuff: Materials.RareAlloys, count: 1 },
      { stuff: Vehicles.KingSpireMkI, count: 1 },
    ],
    [{ stuff: Vehicles.KingJesterMkI1, count: 1 }]
  ),
];

// King Gallant Mk. II Scout Tank recipes (upgraded vehicle)
const kingGallantMkIIRecipes: IRecipe[] = [
  // Small Assembly Station upgrade recipe: 5 x Processed Construction Materials + 5 x Assembly Materials III + 1 x King Spire Mk. I → 1 x King Gallant Mk. II
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
      { stuff: Vehicles.KingSpireMkI, count: 1 },
    ],
    [{ stuff: Vehicles.KingGallantMkII, count: 1 }]
  ),
];

export const tankRecipes = new Map<string, IRecipe[]>([
  // Scout Tanks
  [Vehicles.KingSpireMkI, kingSpireMkIRecipes],
  [Vehicles.KingJesterMkI1, kingJesterMkI1Recipes],
  [Vehicles.KingGallantMkII, kingGallantMkIIRecipes],
]);
