import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== SIEGE TANKS =====

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
  [Vehicles.HC7Ballista, hc7BallistaRecipes],
]);
