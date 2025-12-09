import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== NAVAL VEHICLES =====

// BMS - Aquatipper (Barge) recipes
const bmsAquatipperRecipes: IRecipe[] = [
  // Shipyard production: 150 x Basic Materials → 1 x BMS - Aquatipper
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 150 }],
    [{ stuff: Vehicles.BMSAquatipper, count: 1 }]
  ),
  // Mass Production Factory: 1080 x Basic Materials → 3 crates of 3 x BMS - Aquatipper (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1080 }],
    [{ stuff: Vehicles.BMSAquatipper, count: 9 }]
  ),
  // Mass Production Factory: 1350 x Basic Materials → 4 crates of 3 x BMS - Aquatipper (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1350 }],
    [{ stuff: Vehicles.BMSAquatipper, count: 12 }]
  ),
  // Mass Production Factory: 1575 x Basic Materials → 5 crates of 3 x BMS - Aquatipper (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1575 }],
    [{ stuff: Vehicles.BMSAquatipper, count: 15 }]
  ),
];

// BMS - Ironship (Freighter) recipes
const bmsIronshipRecipes: IRecipe[] = [
  // Shipyard production: 500 x Basic Materials → 1 x BMS - Ironship
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 500 }],
    [{ stuff: Vehicles.BMSIronship, count: 1 }]
  ),
  // Mass Production Factory: 3600 x Basic Materials → 3 crates of 3 x BMS - Ironship (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 3600 }],
    [{ stuff: Vehicles.BMSIronship, count: 9 }]
  ),
  // Mass Production Factory: 4500 x Basic Materials → 4 crates of 3 x BMS - Ironship (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 4500 }],
    [{ stuff: Vehicles.BMSIronship, count: 12 }]
  ),
  // Mass Production Factory: 5250 x Basic Materials → 5 crates of 3 x BMS - Ironship (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 5250 }],
    [{ stuff: Vehicles.BMSIronship, count: 15 }]
  ),
];

export const navalVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSAquatipper, bmsAquatipperRecipes],
  [Vehicles.BMSIronship, bmsIronshipRecipes],
]);
