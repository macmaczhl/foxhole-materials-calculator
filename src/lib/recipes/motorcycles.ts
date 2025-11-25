import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== MOTORCYCLES =====

// 03MM "Caster" (Colonial Motorcycle) recipes
const o3mmCasterRecipes: IRecipe[] = [
  // Garage production: 85 x Basic Materials → 1 x 03MM "Caster"
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 85 }],
    [{ stuff: Vehicles.O3MMCaster, count: 1 }]
  ),
  // Mass Production Factory: 611 x Basic Materials → 3 crates of 3 x 03MM "Caster" (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 611 }],
    [{ stuff: Vehicles.O3MMCaster, count: 9 }]
  ),
  // Mass Production Factory: 764 x Basic Materials → 4 crates of 3 x 03MM "Caster" (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 764 }],
    [{ stuff: Vehicles.O3MMCaster, count: 12 }]
  ),
  // Mass Production Factory: 891 x Basic Materials → 5 crates of 3 x 03MM "Caster" (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 891 }],
    [{ stuff: Vehicles.O3MMCaster, count: 15 }]
  ),
];

export const motorcycleRecipes = new Map<string, IRecipe[]>([
  // Motorcycles
  [Vehicles.O3MMCaster, o3mmCasterRecipes],
]);
