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

// Gallagher Thornfall Mk. VI Cruiser Tank recipes
const gallagherThornfallMkVIRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x Gallagher Brigand Mk. I + 60 x Processed Construction Materials + 10 x Assembly Materials I + 15 x Assembly Materials III + 15 x Assembly Materials IV → 1 x Gallagher Thornfall Mk. VI
  createRecipe(
    [
      { stuff: Vehicles.GallagherBrigandMkI, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 60 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Materials.AssemblyMaterialsIV, count: 15 },
    ],
    [{ stuff: Vehicles.GallagherThornfallMkVI, count: 1 }]
  ),
];

export const cruiserTankRecipes = new Map<string, IRecipe[]>([
  // Cruiser Tanks
  [Vehicles.GallagherBrigandMkI, gallagherBrigandMkIRecipes],
  [Vehicles.GallagherThornfallMkVI, gallagherThornfallMkVIRecipes],
]);
