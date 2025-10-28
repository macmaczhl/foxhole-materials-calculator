import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== ASSAULT TANKS =====

// 85K-b "Falchion" Assault Tank recipes
const falchionRecipes: IRecipe[] = [
  // Garage production: 135 x Refined Materials → 1 x 85K-b "Falchion"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 135 }],
    [{ stuff: Vehicles.Falchion, count: 1 }]
  ),
  // Mass Production Factory: 971 x Refined Materials → 3 crates of 5 x 85K-b "Falchion" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 971 }],
    [{ stuff: Vehicles.Falchion, count: 15 }]
  ),
  // Mass Production Factory: 1214 x Refined Materials → 4 crates of 5 x 85K-b "Falchion" (20 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1214 }],
    [{ stuff: Vehicles.Falchion, count: 20 }]
  ),
  // Mass Production Factory: 1416 x Refined Materials → 5 crates of 5 x 85K-b "Falchion" (25 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1416 }],
    [{ stuff: Vehicles.Falchion, count: 25 }]
  ),
];

// 85K-a "Spatha" Assault Tank recipes
const spathaRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x 85K-b "Falchion" + 8 x Processed Construction Materials + 10 x Assembly Materials I + 8 x Assembly Materials IV → 1 x 85K-a "Spatha"
  createRecipe(
    [
      { stuff: Vehicles.Falchion, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 8 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIV, count: 8 },
    ],
    [{ stuff: Vehicles.Spatha, count: 1 }]
  ),
];
// 85V-g "Talos" Assault Tank recipes
const talosRecipes: IRecipe[] = [
  // Small Assembly Station (Weapons Platform) production:
  // 15 Processed Construction Materials + 10 Assembly Materials I +
  // 15 Assembly Materials III + 15 Assembly Materials IV + 1 85K-b "Falchion" → 1 85V-g "Talos"
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Materials.AssemblyMaterialsIV, count: 15 },
      { stuff: Vehicles.Falchion, count: 1 },
    ],
    [{ stuff: Vehicles.Talos, count: 1 }]
  ),
];

// 86K-a "Bardiche" Assault Tank recipes
const bardicheRecipes: IRecipe[] = [
  // Garage production: 165 x Refined Materials → 1 x 86K-a "Bardiche"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 165 }],
    [{ stuff: Vehicles.Bardiche, count: 1 }]
  ),
  // Mass Production Factory: 1187 x Refined Materials → 3 crates of 3 x 86K-a "Bardiche" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1187 }],
    [{ stuff: Vehicles.Bardiche, count: 9 }]
  ),
  // Mass Production Factory: 1484 x Refined Materials → 4 crates of 3 x 86K-a "Bardiche" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1484 }],
    [{ stuff: Vehicles.Bardiche, count: 12 }]
  ),
  // Mass Production Factory: 1731 x Refined Materials → 5 crates of 3 x 86K-a "Bardiche" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1731 }],
    [{ stuff: Vehicles.Bardiche, count: 15 }]
  ),
];

export const assaultTankRecipes = new Map<string, IRecipe[]>([
  // Assault Tanks
  [Vehicles.Falchion, falchionRecipes],
  [Vehicles.Spatha, spathaRecipes],
  [Vehicles.Talos, talosRecipes],
  [Vehicles.Bardiche, bardicheRecipes],
]);
