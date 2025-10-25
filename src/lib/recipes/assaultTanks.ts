import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== ASSAULT TANKS =====

// 85K-b "Falchion" Assault Tank recipes
const falchion85KbRecipes: IRecipe[] = [
  // Garage production: 135 x Refined Materials → 1 x 85K-b "Falchion"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 135 }],
    [{ stuff: Vehicles.Falchion85Kb, count: 1 }]
  ),
  // Mass Production Factory: 971 x Refined Materials → 3 crates of 5 x 85K-b "Falchion" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 971 }],
    [{ stuff: Vehicles.Falchion85Kb, count: 15 }]
  ),
  // Mass Production Factory: 1214 x Refined Materials → 4 crates of 5 x 85K-b "Falchion" (20 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1214 }],
    [{ stuff: Vehicles.Falchion85Kb, count: 20 }]
  ),
  // Mass Production Factory: 1416 x Refined Materials → 5 crates of 5 x 85K-b "Falchion" (25 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1416 }],
    [{ stuff: Vehicles.Falchion85Kb, count: 25 }]
  ),
];

export const assaultTankRecipes = new Map<string, IRecipe[]>([
  // Assault Tanks
  [Vehicles.Falchion85Kb, falchion85KbRecipes],
]);
