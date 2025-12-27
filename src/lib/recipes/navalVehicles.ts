import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== NAVAL MATERIALS =====

// Naval Hull Segments recipes
const navalHullSegmentsRecipes: IRecipe[] = [
  // Small Assembly Station (Naval Works): 60 x Processed Construction Materials + 2 x Assembly Materials I + 2 x Assembly Materials II + 10 x Assembly Materials IV + 4 x Rare Alloys + 4 x Thermal Shielding → 1 x Naval Hull Segments
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 60 },
      { stuff: Materials.AssemblyMaterialsI, count: 2 },
      { stuff: Materials.AssemblyMaterialsII, count: 2 },
      { stuff: Materials.AssemblyMaterialsIV, count: 10 },
      { stuff: Materials.RareAlloys, count: 4 },
      { stuff: Materials.ThermalShielding, count: 4 },
    ],
    [{ stuff: Materials.NavalHullSegments, count: 1 }]
  ),
];

// Naval Shell Plating recipes
const navalShellPlatingRecipes: IRecipe[] = [
  // Small Assembly Station (Naval Works): 2 x Construction Materials + 1 x Thermal Shielding → 1 x Naval Shell Plating
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 2 },
      { stuff: Materials.ThermalShielding, count: 1 },
    ],
    [{ stuff: Materials.NavalShellPlating, count: 1 }]
  ),
];

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

// Interceptor PA-12 (Landing Ship) recipes
const interceptorPA12Recipes: IRecipe[] = [
  // BMS - Longhook production: 10 x Basic Materials → 1 x Interceptor PA-12
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 10 }],
    [{ stuff: Vehicles.InterceptorPA12, count: 1 }]
  ),
];

// MacConmara Shorerunner (Landing Ship) recipes
const macConmaraShorerunnerRecipes: IRecipe[] = [
  // Base Ship production: 10 x Basic Materials → 1 x MacConmara Shorerunner
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 10 }],
    [{ stuff: Vehicles.MacConmaraShorerunner, count: 1 }]
  ),
];

// 74b-1 Ronan Gunship (Gunboat) recipes
const ronanGunship74b1Recipes: IRecipe[] = [
  // Shipyard production: 140 x Refined Materials → 1 x 74b-1 Ronan Gunship
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 140 }],
    [{ stuff: Vehicles.RonanGunship74b1, count: 1 }]
  ),
  // Mass Production Factory: 1008 x Refined Materials → 3 crates of 3 x 74b-1 Ronan Gunship (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1008 }],
    [{ stuff: Vehicles.RonanGunship74b1, count: 9 }]
  ),
  // Mass Production Factory: 1260 x Refined Materials → 4 crates of 3 x 74b-1 Ronan Gunship (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1260 }],
    [{ stuff: Vehicles.RonanGunship74b1, count: 12 }]
  ),
  // Mass Production Factory: 1470 x Refined Materials → 5 crates of 3 x 74b-1 Ronan Gunship (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1470 }],
    [{ stuff: Vehicles.RonanGunship74b1, count: 15 }]
  ),
];

export const navalVehicleRecipes = new Map<string, IRecipe[]>([
  [Materials.NavalHullSegments, navalHullSegmentsRecipes],
  [Materials.NavalShellPlating, navalShellPlatingRecipes],
  [Vehicles.BMSAquatipper, bmsAquatipperRecipes],
  [Vehicles.BMSIronship, bmsIronshipRecipes],
  [Vehicles.InterceptorPA12, interceptorPA12Recipes],
  [Vehicles.MacConmaraShorerunner, macConmaraShorerunnerRecipes],
  [Vehicles.RonanGunship74b1, ronanGunship74b1Recipes],
]);
