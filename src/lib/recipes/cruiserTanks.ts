import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== CRUISER TANKS =====

// Gallagher Brigand Mk. I Cruiser Tank recipes
const gallagherBrigandMkIRecipes: IRecipe[] = [
  // Garage production: 150 x Refined Materials → 1 x Gallagher Brigand Mk. I
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 150 }],
    [{ stuff: Vehicles.GallagherBrigandMkI, count: 1 }]
  ),
  // Mass Production Factory: 1080 x Refined Materials → 3 crates of 3 x Gallagher Brigand Mk. I (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1080 }],
    [{ stuff: Vehicles.GallagherBrigandMkI, count: 9 }]
  ),
  // Mass Production Factory: 1350 x Refined Materials → 4 crates of 3 x Gallagher Brigand Mk. I (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1350 }],
    [{ stuff: Vehicles.GallagherBrigandMkI, count: 12 }]
  ),
  // Mass Production Factory: 1575 x Refined Materials → 5 crates of 3 x Gallagher Brigand Mk. I (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1575 }],
    [{ stuff: Vehicles.GallagherBrigandMkI, count: 15 }]
  ),
];

// Gallagher Highwayman Mk. III Cruiser Tank recipes
const gallagherHighwaymanMkIIIRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x Gallagher Brigand Mk. I + 5 x PCM + 10 x AM II + 5 x AM III → 1 x Gallagher Highwayman Mk. III
  createRecipe(
    [
      { stuff: Vehicles.GallagherBrigandMkI, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
    ],
    [{ stuff: Vehicles.GallagherHighwaymanMkIII, count: 1 }]
  ),
];

export const cruiserTankRecipes = new Map<string, IRecipe[]>([
  // Cruiser Tanks
  [Vehicles.GallagherBrigandMkI, gallagherBrigandMkIRecipes],
  [Vehicles.GallagherHighwaymanMkIII, gallagherHighwaymanMkIIIRecipes],
]);
