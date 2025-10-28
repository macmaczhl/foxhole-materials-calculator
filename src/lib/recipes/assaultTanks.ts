import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== ASSAULT TANKS =====

// 85K-b "Falchion" Assault Tank recipes
const falchionRecipes: IRecipe[] = [
  // Garage production: 135 x Refined Materials → 1 x 85K-b "Falchion"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 135 }],
    [{ stuff: Vehicles.Falchion, count: 1 }]
  ),
  // Mass Production Factory: 971 x Refined Materials → 3 crates of 5 x 85K-b "Falchion" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 971 }],
    [{ stuff: Vehicles.Falchion, count: 15 }]
  ),
  // Mass Production Factory: 1214 x Refined Materials → 4 crates of 5 x 85K-b "Falchion" (20 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1214 }],
    [{ stuff: Vehicles.Falchion, count: 20 }]
  ),
  // Mass Production Factory: 1416 x Refined Materials → 5 crates of 5 x 85K-b "Falchion" (25 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1416 }],
    [{ stuff: Vehicles.Falchion, count: 25 }]
  ),
];

// Silverhand - Mk. IV Assault Tank recipes
const silverhandMkIVRecipes: IRecipe[] = [
  // Garage production: 155 x Refined Materials → 1 x Silverhand - Mk. IV
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 155 }],
    [{ stuff: Vehicles.SilverhandMkIV, count: 1 }]
  ),
  // Mass Production Factory: 1115 x Refined Materials → 3 crates of 3 x Silverhand - Mk. IV (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1115 }],
    [{ stuff: Vehicles.SilverhandMkIV, count: 9 }]
  ),
  // Mass Production Factory: 1394 x Refined Materials → 4 crates of 3 x Silverhand - Mk. IV (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1394 }],
    [{ stuff: Vehicles.SilverhandMkIV, count: 12 }]
  ),
  // Mass Production Factory: 1626 x Refined Materials → 5 crates of 3 x Silverhand - Mk. IV (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1626 }],
    [{ stuff: Vehicles.SilverhandMkIV, count: 15 }]
  ),
];

export const assaultTankRecipes = new Map<string, IRecipe[]>([
  // Assault Tanks
  [Vehicles.Falchion, falchionRecipes],
  [Vehicles.SilverhandMkIV, silverhandMkIVRecipes],
]);
