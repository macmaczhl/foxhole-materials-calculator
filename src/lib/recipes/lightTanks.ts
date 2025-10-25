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

// H-19 "Vulcan" Light Tank recipes
const h19VulcanRecipes: IRecipe[] = [
  // Garage production: 125 x Refined Materials → 1 x H-19 "Vulcan"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 125 }],
    [{ stuff: Vehicles.H19Vulcan, count: 1 }]
  ),
  // Mass Production Factory: 900 x Refined Materials → 3 crates of 3 x H-19 "Vulcan" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 900 }],
    [{ stuff: Vehicles.H19Vulcan, count: 9 }]
  ),
  // Mass Production Factory: 1125 x Refined Materials → 4 crates of 3 x H-19 "Vulcan" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1125 }],
    [{ stuff: Vehicles.H19Vulcan, count: 12 }]
  ),
  // Mass Production Factory: 1313 x Refined Materials → 5 crates of 3 x H-19 "Vulcan" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1313 }],
    [{ stuff: Vehicles.H19Vulcan, count: 15 }]
  ),
];

export const lightTankRecipes = new Map<string, IRecipe[]>([
  // Light Tanks
  [Vehicles.H5Hatchet, h5HatchetRecipes],
  [Vehicles.H19Vulcan, h19VulcanRecipes],
]);
