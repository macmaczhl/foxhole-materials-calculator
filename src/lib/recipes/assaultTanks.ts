import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== ASSAULT TANKS =====

// 90T-v "Nemesis" Assault Tank recipes
const nemesisRecipes: IRecipe[] = [
  // Garage production: 150 x Refined Materials → 1 x 90T-v "Nemesis"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 150 }],
    [{ stuff: Vehicles.Nemesis, count: 1 }]
  ),
  // Mass Production Factory: 1080 x Refined Materials → 3 crates of 3 x 90T-v "Nemesis" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1080 }],
    [{ stuff: Vehicles.Nemesis, count: 9 }]
  ),
  // Mass Production Factory: 1350 x Refined Materials → 4 crates of 3 x 90T-v "Nemesis" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1350 }],
    [{ stuff: Vehicles.Nemesis, count: 12 }]
  ),
  // Mass Production Factory: 1575 x Refined Materials → 5 crates of 3 x 90T-v "Nemesis" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1575 }],
    [{ stuff: Vehicles.Nemesis, count: 15 }]
  ),
];

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

export const assaultTankRecipes = new Map<string, IRecipe[]>([
  // Assault Tanks
  [Vehicles.Nemesis, nemesisRecipes],
  [Vehicles.Falchion, falchionRecipes],
]);
