import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== SIEGE TANKS =====

// HC-2 "Scorpion" Light Infantry Tank recipes
const hc2ScorpionRecipes: IRecipe[] = [
  // Garage production: 100 x Refined Materials → 1 x HC-2 "Scorpion"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 100 }],
    [{ stuff: Vehicles.HC2Scorpion, count: 1 }]
  ),
  // Mass Production Factory: 720 x Refined Materials → 3 crates of 3 x HC-2 "Scorpion" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 720 }],
    [{ stuff: Vehicles.HC2Scorpion, count: 9 }]
  ),
  // Mass Production Factory: 900 x Refined Materials → 4 crates of 3 x HC-2 "Scorpion" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 900 }],
    [{ stuff: Vehicles.HC2Scorpion, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Refined Materials → 5 crates of 3 x HC-2 "Scorpion" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1050 }],
    [{ stuff: Vehicles.HC2Scorpion, count: 15 }]
  ),
];

// HC-7 "Ballista" Siege Tank recipes
const hc7BallistaRecipes: IRecipe[] = [
  // Small Assembly Station upgrade: 15 x Processed Construction Materials + 15 x Assembly Materials II + 1 x HC-2 "Scorpion" → 1 x HC-7 "Ballista"
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 15 },
      { stuff: Vehicles.HC2Scorpion, count: 1 },
    ],
    [{ stuff: Vehicles.HC7Ballista, count: 1 }]
  ),
];

export const siegeTankRecipes = new Map<string, IRecipe[]>([
  // Siege Tanks
  [Vehicles.HC2Scorpion, hc2ScorpionRecipes],
  [Vehicles.HC7Ballista, hc7BallistaRecipes],
]);
