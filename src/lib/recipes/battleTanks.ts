import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== BATTLE TANKS =====

// Flood Mk. I Battle Tank recipes
const floodMkIRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 50 x Steel Construction Materials + 30 x Assembly Materials III + 60 x Assembly Materials IV + 35 x Assembly Materials V → 1 x Flood Mk. I
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 50 },
      { stuff: Materials.AssemblyMaterialsIII, count: 30 },
      { stuff: Materials.AssemblyMaterialsIV, count: 60 },
      { stuff: Materials.AssemblyMaterialsV, count: 35 },
    ],
    [{ stuff: Vehicles.FloodMkI, count: 1 }]
  ),
];

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

// Flood Mk. IX Stain Battle Tank recipes
const floodMkIXStainRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 150 x Steel Construction Materials + 65 x Assembly Materials III + 40 x Assembly Materials IV + 85 x Assembly Materials V → 1 x Flood Mk. IX Stain
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 150 },
      { stuff: Materials.AssemblyMaterialsIII, count: 65 },
      { stuff: Materials.AssemblyMaterialsIV, count: 40 },
      { stuff: Materials.AssemblyMaterialsV, count: 85 },
    ],
    [{ stuff: Vehicles.FloodMkIXStain, count: 1 }]
  ),
];

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

// Lance-25 "Hasta" Battle Tank Destroyer recipes
const lance25HastaRecipes: IRecipe[] = [
  // Large Assembly Station (Heavy Tank Assembly): 60 x Steel Construction Materials + 65 x Assembly Materials III + 45 x Assembly Materials IV + 65 x Assembly Materials V → 1 x Lance-25 "Hasta"
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 60 },
      { stuff: Materials.AssemblyMaterialsIII, count: 65 },
      { stuff: Materials.AssemblyMaterialsIV, count: 45 },
      { stuff: Materials.AssemblyMaterialsV, count: 65 },
    ],
    [{ stuff: Vehicles.Lance25Hasta, count: 1 }]
  ),
];

export const battleTankRecipes = new Map<string, IRecipe[]>([
  // Battle Tanks
  [Vehicles.FloodMkI, floodMkIRecipes],
  [Vehicles.FloodJuggernautMkVII, floodJuggernautMkVIIRecipes],
  [Vehicles.FloodMkIXStain, floodMkIXStainRecipes],
  [Vehicles.CullenPredatorMkIII, cullenPredatorMkIIIRecipes],
  [Vehicles.Lance25Hasta, lance25HastaRecipes],
]);
