import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== LIGHT TANKS =====

// H-5 "Hatchet" Light Tank recipes
const h5HatchetRecipes: IRecipe[] = [
  // Garage production: 115 x Refined Materials → 1 x H-5 "Hatchet"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 115 }],
    [{ stuff: Vehicles.H5Hatchet, count: 1 }]
  ),
  // Mass Production Factory: 827 x Refined Materials → 3 crates of 3 x H-5 "Hatchet" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 827 }],
    [{ stuff: Vehicles.H5Hatchet, count: 9 }]
  ),
  // Mass Production Factory: 1034 x Refined Materials → 4 crates of 3 x H-5 "Hatchet" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1034 }],
    [{ stuff: Vehicles.H5Hatchet, count: 12 }]
  ),
  // Mass Production Factory: 1206 x Refined Materials → 5 crates of 3 x H-5 "Hatchet" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1206 }],
    [{ stuff: Vehicles.H5Hatchet, count: 15 }]
  ),
];

// H-10 "Pelekys" Light Tank Destroyer recipes
const h10PelekysRecipes: IRecipe[] = [
  // Small Assembly Station (Tank Factory): 8 x PCM + 20 x AM II + 5 x AM III + 1 x H-5 "Hatchet" → 1 x H-10 "Pelekys"
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 8 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
      { stuff: Vehicles.H5Hatchet, count: 1 },
    ],
    [{ stuff: Vehicles.H10Pelekys, count: 1 }]
  ),
];

export const lightTankRecipes = new Map<string, IRecipe[]>([
  // Light Tanks
  [Vehicles.H5Hatchet, h5HatchetRecipes],
  [Vehicles.H10Pelekys, h10PelekysRecipes],
]);
