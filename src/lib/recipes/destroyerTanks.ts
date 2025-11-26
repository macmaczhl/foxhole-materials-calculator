import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== DESTROYER TANKS =====

// Noble Widow MK. XIV Destroyer Tank recipes
const nobleWidowMkXIVRecipes: IRecipe[] = [
  // Garage production: 160 x Refined Materials → 1 x Noble Widow MK. XIV
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 160 }],
    [{ stuff: Vehicles.NobleWidowMkXIV, count: 1 }]
  ),
  // Mass Production Factory: 1152 x Refined Materials → 3 crates of 3 x Noble Widow MK. XIV (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1152 }],
    [{ stuff: Vehicles.NobleWidowMkXIV, count: 9 }]
  ),
  // Mass Production Factory: 1440 x Refined Materials → 4 crates of 3 x Noble Widow MK. XIV (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1440 }],
    [{ stuff: Vehicles.NobleWidowMkXIV, count: 12 }]
  ),
  // Mass Production Factory: 1680 x Refined Materials → 5 crates of 3 x Noble Widow MK. XIV (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1680 }],
    [{ stuff: Vehicles.NobleWidowMkXIV, count: 15 }]
  ),
];

// Noble Firebrand Mk. XVII Destroyer Tank recipes
// Small Assembly Station (Tank Factory): 10 PCMats + 10 Assembly II + 15 Assembly III + 1 Noble Widow MK. XIV → 1 Noble Firebrand Mk. XVII
const nobleFirebrandMkXVIIRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Vehicles.NobleWidowMkXIV, count: 1 },
    ],
    [{ stuff: Vehicles.NobleFirebrandMkXVII, count: 1 }]
  ),
];

export const destroyerTankRecipes = new Map<string, IRecipe[]>([
  // Destroyer Tanks
  [Vehicles.NobleWidowMkXIV, nobleWidowMkXIVRecipes],
  [Vehicles.NobleFirebrandMkXVII, nobleFirebrandMkXVIIRecipes],
]);
