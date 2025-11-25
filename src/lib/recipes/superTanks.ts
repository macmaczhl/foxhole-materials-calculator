import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== SUPER TANKS =====

// Cullen Predator Mk. III Super Tank recipes
const cullenPredatorMkIIIRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 275 x Steel Construction Materials + 105 x Assembly Materials III + 95 x Assembly Materials IV + 105 x Assembly Materials V + 3 x Rare Alloys → 1 x Cullen Predator Mk. III
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 275 },
      { stuff: Materials.AssemblyMaterialsIII, count: 105 },
      { stuff: Materials.AssemblyMaterialsIV, count: 95 },
      { stuff: Materials.AssemblyMaterialsV, count: 105 },
      { stuff: Materials.RareAlloys, count: 3 },
    ],
    [{ stuff: Vehicles.CullenPredatorMkIII, count: 1 }]
  ),
];

// O-75b "Ares" Super Tank recipes
const o75bAresRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 275 x Steel Construction Materials + 105 x Assembly Materials III + 95 x Assembly Materials IV + 105 x Assembly Materials V + 3 x Rare Alloys → 1 x O-75b "Ares"
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 275 },
      { stuff: Materials.AssemblyMaterialsIII, count: 105 },
      { stuff: Materials.AssemblyMaterialsIV, count: 95 },
      { stuff: Materials.AssemblyMaterialsV, count: 105 },
      { stuff: Materials.RareAlloys, count: 3 },
    ],
    [{ stuff: Vehicles.O75bAres, count: 1 }]
  ),
];

export const superTankRecipes = new Map<string, IRecipe[]>([
  // Super Tanks
  [Vehicles.CullenPredatorMkIII, cullenPredatorMkIIIRecipes],
  [Vehicles.O75bAres, o75bAresRecipes],
]);
