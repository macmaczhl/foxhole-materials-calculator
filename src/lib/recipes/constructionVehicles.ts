import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== CONSTRUCTION VEHICLES =====

// BMS - Universal Assembly Rig (Construction Vehicle) recipes
const bmsUniversalAssemblyRigRecipes: IRecipe[] = [
  // Home Base/Garage production: 100 x Basic Materials → 1 x BMS - Universal Assembly Rig
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates (9 total vehicles, 3 per crate)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates (12 total vehicles, 3 per crate)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates (15 total vehicles, 3 per crate)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 15 }]
  ),
];

// BMS - Fabricator (Advanced Construction Vehicle) recipes
const bmsFabricatorRecipes: IRecipe[] = [
  // Small Assembly Station: 10 x Processed Construction Materials + 1 x BMS - Universal Assembly Rig → 1 x BMS - Fabricator
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 },
    ],
    [{ stuff: Vehicles.BMSFabricator, count: 1 }]
  ),
];

export const constructionVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSUniversalAssemblyRig, bmsUniversalAssemblyRigRecipes],
  [Vehicles.BMSFabricator, bmsFabricatorRecipes],
]);
