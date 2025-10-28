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

// 86K-a "Bardiche" Assault Tank recipes
const bardicheRecipes: IRecipe[] = [
  // Garage production: 165 x Refined Materials → 1 x 86K-a "Bardiche"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 165 }],
    [{ stuff: Vehicles.Bardiche, count: 1 }]
  ),
  // Mass Production Factory: 1187 x Refined Materials → 3 crates of 3 x 86K-a "Bardiche" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1187 }],
    [{ stuff: Vehicles.Bardiche, count: 9 }]
  ),
  // Mass Production Factory: 1484 x Refined Materials → 4 crates of 3 x 86K-a "Bardiche" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1484 }],
    [{ stuff: Vehicles.Bardiche, count: 12 }]
  ),
  // Mass Production Factory: 1731 x Refined Materials → 5 crates of 3 x 86K-a "Bardiche" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1731 }],
    [{ stuff: Vehicles.Bardiche, count: 15 }]
  ),
];

export const assaultTankRecipes = new Map<string, IRecipe[]>([
  // Assault Tanks
  [Vehicles.Falchion, falchionRecipes],
  [Vehicles.Bardiche, bardicheRecipes],
]);
