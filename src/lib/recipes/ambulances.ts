import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== AMBULANCES =====

// Dunne Responder 3e (Warden Ambulance) recipes
const dunneResponder3eRecipes: IRecipe[] = [
  // Garage production: 150 x Basic Materials → 1 x Dunne Responder 3e
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 150 }],
    [{ stuff: Vehicles.DunneResponder3e, count: 1 }]
  ),
  // Mass Production Factory: 1080 x Basic Materials → 3 crates of 3 x Dunne Responder 3e (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1080 }],
    [{ stuff: Vehicles.DunneResponder3e, count: 9 }]
  ),
  // Mass Production Factory: 1350 x Basic Materials → 4 crates of 3 x Dunne Responder 3e (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1350 }],
    [{ stuff: Vehicles.DunneResponder3e, count: 12 }]
  ),
  // Mass Production Factory: 1575 x Basic Materials → 5 crates of 3 x Dunne Responder 3e (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1575 }],
    [{ stuff: Vehicles.DunneResponder3e, count: 15 }]
  ),
];

export const ambulanceRecipes = new Map<string, IRecipe[]>([
  [Vehicles.DunneResponder3e, dunneResponder3eRecipes],
]);
