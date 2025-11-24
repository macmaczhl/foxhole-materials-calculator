import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== BATTLE TANKS =====

// Flood Juggernaut Mk. VII Battle Tank recipes
const floodJuggernautMkVIIRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 40 x Steel Construction Materials + 65 x Assembly Materials III + 30 x Assembly Materials IV + 45 x Assembly Materials V → 1 x Flood Juggernaut Mk. VII
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 40 },
      { stuff: Materials.AssemblyMaterialsIII, count: 65 },
      { stuff: Materials.AssemblyMaterialsIV, count: 30 },
      { stuff: Materials.AssemblyMaterialsV, count: 45 },
    ],
    [{ stuff: Vehicles.FloodJuggernautMkVII, count: 1 }]
  ),
];

export const battleTankRecipes = new Map<string, IRecipe[]>([
  // Battle Tanks
  [Vehicles.FloodJuggernautMkVII, floodJuggernautMkVIIRecipes],
]);
