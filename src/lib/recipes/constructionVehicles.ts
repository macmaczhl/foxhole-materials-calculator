import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== CONSTRUCTION VEHICLES =====

// BMS - Universal Assembly Rig (Construction Vehicle) recipes
const bmsUniversalAssemblyRigRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x BMS - Universal Assembly Rig
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x BMS - Universal Assembly Rig (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x BMS - Universal Assembly Rig (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.BMSUniversalAssemblyRig, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x BMS - Universal Assembly Rig (15 total)
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
