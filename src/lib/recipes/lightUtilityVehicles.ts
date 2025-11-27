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

// UV-24 "Icarus" (Colonial Light Utility Vehicle - RPG variant) recipes
const uv24IcarusRecipes: IRecipe[] = [
  // Small Assembly Station (Motor Pool): 3 x Construction Materials + 10 x Assembly Materials II + UV-05a "Argonaut" → 1 x UV-24 "Icarus"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 3 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
      { stuff: Vehicles.UV05aArgonaut, count: 1 },
    ],
    [{ stuff: Vehicles.UV24Icarus, count: 1 }]
  ),
];

// UV-5c "Odyssey" (Colonial Light Utility Vehicle - Utility variant) recipes
const uv5cOdysseyRecipes: IRecipe[] = [
  // Small Assembly Station (Motor Pool): 3 x Construction Materials + UV-05a "Argonaut" → 1 x UV-5c "Odyssey"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 3 },
      { stuff: Vehicles.UV05aArgonaut, count: 1 },
    ],
    [{ stuff: Vehicles.UV5cOdyssey, count: 1 }]
  ),
];

// Drummond 100a (Warden Light Utility Vehicle) recipes
const drummond100aRecipes: IRecipe[] = [
  // Garage production: 10 x Refined Materials → 1 x Drummond 100a
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 10 }],
    [{ stuff: Vehicles.Drummond100a, count: 1 }]
  ),
  // Mass Production Factory: 72 x Refined Materials → 3 crates of 3 x Drummond 100a (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 72 }],
    [{ stuff: Vehicles.Drummond100a, count: 9 }]
  ),
  // Mass Production Factory: 90 x Refined Materials → 4 crates of 3 x Drummond 100a (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 90 }],
    [{ stuff: Vehicles.Drummond100a, count: 12 }]
  ),
  // Mass Production Factory: 105 x Refined Materials → 5 crates of 3 x Drummond 100a (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 105 }],
    [{ stuff: Vehicles.Drummond100a, count: 15 }]
  ),
];

export const lightUtilityVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.UV05aArgonaut, uv05aArgonautRecipes],
  [Vehicles.UV24Icarus, uv24IcarusRecipes],
  [Vehicles.UV5cOdyssey, uv5cOdysseyRecipes],
  [Vehicles.Drummond100a, drummond100aRecipes],
]);
