import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== TRAILERS =====

// Rooster - Junkwagon (Base Trailer) recipes
const roosterJunkwagonRecipes: IRecipe[] = [
  // Garage production: 10 x Refined Materials → 1 x Rooster - Junkwagon
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 10 }],
    [{ stuff: Vehicles.RoosterJunkwagon, count: 1 }]
  ),
  // Mass Production Factory: 72 x Refined Materials → 3 crates of 3 x Rooster - Junkwagon (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 72 }],
    [{ stuff: Vehicles.RoosterJunkwagon, count: 9 }]
  ),
  // Mass Production Factory: 90 x Refined Materials → 4 crates of 3 x Rooster - Junkwagon (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 90 }],
    [{ stuff: Vehicles.RoosterJunkwagon, count: 12 }]
  ),
  // Mass Production Factory: 105 x Refined Materials → 5 crates of 3 x Rooster - Junkwagon (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 105 }],
    [{ stuff: Vehicles.RoosterJunkwagon, count: 15 }]
  ),
];

// Rooster - Lamploader (Fuel Trailer Variant) recipes
const roosterLamploaderRecipes: IRecipe[] = [
  // Small Assembly Station: 10 x Processed Construction Materials + 5 x Assembly Materials II + 1 x Rooster - Junkwagon → 1 x Rooster - Lamploader
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
      { stuff: Vehicles.RoosterJunkwagon, count: 1 },
    ],
    [{ stuff: Vehicles.RoosterLamploader, count: 1 }]
  ),
];

// Rooster - Tumblebox (Material Trailer Variant) recipes
const roosterTumbleboxRecipes: IRecipe[] = [
  // Small Assembly Station: 10 x Processed Construction Materials + 5 x Assembly Materials II + 1 x Rooster - Junkwagon → 1 x Rooster - Tumblebox
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
      { stuff: Vehicles.RoosterJunkwagon, count: 1 },
    ],
    [{ stuff: Vehicles.RoosterTumblebox, count: 1 }]
  ),
];

export const trailerRecipes = new Map<string, IRecipe[]>([
  // Trailers
  [Vehicles.RoosterJunkwagon, roosterJunkwagonRecipes],
  [Vehicles.RoosterLamploader, roosterLamploaderRecipes],
  [Vehicles.RoosterTumblebox, roosterTumbleboxRecipes],
]);
