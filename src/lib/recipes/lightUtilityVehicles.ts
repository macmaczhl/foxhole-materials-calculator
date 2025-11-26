import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== LIGHT UTILITY VEHICLES =====

// UV-05a "Argonaut" (Colonial Light Utility Vehicle) recipes
const uv05aArgonautRecipes: IRecipe[] = [
  // Garage production: 10 x Refined Materials → 1 x UV-05a "Argonaut"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 10 }],
    [{ stuff: Vehicles.UV05aArgonaut, count: 1 }]
  ),
  // Mass Production Factory: 72 x Refined Materials → 3 crates of 3 x UV-05a "Argonaut" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 72 }],
    [{ stuff: Vehicles.UV05aArgonaut, count: 9 }]
  ),
  // Mass Production Factory: 90 x Refined Materials → 4 crates of 3 x UV-05a "Argonaut" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 90 }],
    [{ stuff: Vehicles.UV05aArgonaut, count: 12 }]
  ),
  // Mass Production Factory: 105 x Refined Materials → 5 crates of 3 x UV-05a "Argonaut" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 105 }],
    [{ stuff: Vehicles.UV05aArgonaut, count: 15 }]
  ),
];

export const lightUtilityVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.UV05aArgonaut, uv05aArgonautRecipes],
]);
