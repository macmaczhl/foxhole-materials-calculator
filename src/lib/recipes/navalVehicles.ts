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

// BMS - Grouper (Motorboat) recipes
const bmsGrouperRecipes: IRecipe[] = [
  // Beach production: 60 x Basic Materials → 1 x BMS - Grouper
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 60 }],
    [{ stuff: Vehicles.BMSGrouper, count: 1 }]
  ),
];

// Type C - "Charon" (Gunboat) recipes
const typeCCharonRecipes: IRecipe[] = [
  // Shipyard production: 125 x Refined Materials → 1 x Type C - "Charon"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 125 }],
    [{ stuff: Vehicles.TypeCCharon, count: 1 }]
  ),
  // Mass Production Factory: 899 x Refined Materials → 3 crates of 3 x Type C - "Charon" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 899 }],
    [{ stuff: Vehicles.TypeCCharon, count: 9 }]
  ),
  // Mass Production Factory: 1124 x Refined Materials → 4 crates of 3 x Type C - "Charon" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1124 }],
    [{ stuff: Vehicles.TypeCCharon, count: 12 }]
  ),
  // Mass Production Factory: 1311 x Refined Materials → 5 crates of 3 x Type C - "Charon" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1311 }],
    [{ stuff: Vehicles.TypeCCharon, count: 15 }]
  ),
];

// BMS - Longhook (Landing Ship) recipes
const bmsLonghookRecipes: IRecipe[] = [
  // Dry Dock production: 8 x Naval Hull Segments + 15 x Naval Shell Plating → 1 x BMS - Longhook
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 8 },
      { stuff: Materials.NavalShellPlating, count: 15 },
    ],
    [{ stuff: Vehicles.BMSLonghook, count: 1 }]
  ),
];

// Callahan (Battleship - Warden) recipes
const callahanRecipes: IRecipe[] = [
  // Dry Dock production: 20 x Naval Hull Segments + 20 x Naval Shell Plating + 4 x Naval Turbine Components → 1 x Callahan
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 20 },
      { stuff: Materials.NavalShellPlating, count: 20 },
      { stuff: Materials.NavalTurbineComponents, count: 4 },
    ],
    [{ stuff: Vehicles.Callahan, count: 1 }]
  ),
];

// Titan (Battleship - Colonial) recipes
const titanRecipes: IRecipe[] = [
  // Dry Dock production: 20 x Naval Hull Segments + 20 x Naval Shell Plating + 4 x Naval Turbine Components → 1 x Titan
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 20 },
      { stuff: Materials.NavalShellPlating, count: 20 },
      { stuff: Materials.NavalTurbineComponents, count: 4 },
    ],
    [{ stuff: Vehicles.Titan, count: 1 }]
  ),
];

// Blacksteele (Destroyer - Warden) recipes
const blacksteeleRecipes: IRecipe[] = [
  // Dry Dock production: 12 x Naval Hull Segments + 12 x Naval Shell Plating → 1 x Blacksteele
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 12 },
      { stuff: Materials.NavalShellPlating, count: 12 },
    ],
    [{ stuff: Vehicles.Blacksteele, count: 1 }]
  ),
];

// Conqueror (Destroyer - Colonial) recipes
const conquerorRecipes: IRecipe[] = [
  // Dry Dock production: 12 x Naval Hull Segments + 12 x Naval Shell Plating → 1 x Conqueror
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 12 },
      { stuff: Materials.NavalShellPlating, count: 12 },
    ],
    [{ stuff: Vehicles.Conqueror, count: 1 }]
  ),
];

// BMS - Bowhead (Resource Ship) recipes
const bmsBowheadRecipes: IRecipe[] = [
  // Dry Dock production: 8 x Naval Hull Segments + 15 x Naval Shell Plating → 1 x BMS - Bowhead
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 8 },
      { stuff: Materials.NavalShellPlating, count: 15 },
    ],
    [{ stuff: Vehicles.BMSBowhead, count: 1 }]
  ),
];

// BMS - Bluefin (Storage Ship) recipes
const bmsBluefinRecipes: IRecipe[] = [
  // Dry Dock production: 25 x Naval Hull Segments + 25 x Naval Shell Plating → 1 x BMS - Bluefin
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 25 },
      { stuff: Materials.NavalShellPlating, count: 25 },
    ],
    [{ stuff: Vehicles.BMSBluefin, count: 1 }]
  ),
];

// Nakki (Submarine - Warden) recipes
const nakkiRecipes: IRecipe[] = [
  // Dry Dock production: 15 x Naval Hull Segments + 15 x Naval Shell Plating → 1 x Nakki
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 15 },
      { stuff: Materials.NavalShellPlating, count: 15 },
    ],
    [{ stuff: Vehicles.Nakki, count: 1 }]
  ),
];

// AC-b "Trident" (Submarine - Colonial) recipes
const acbTridentRecipes: IRecipe[] = [
  // Dry Dock production: 15 x Naval Hull Segments + 15 x Naval Shell Plating → 1 x AC-b "Trident"
  createRecipe(
    [
      { stuff: Materials.NavalHullSegments, count: 15 },
      { stuff: Materials.NavalShellPlating, count: 15 },
    ],
    [{ stuff: Vehicles.ACbTrident, count: 1 }]
  ),
];

export const navalVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSAquatipper, bmsAquatipperRecipes],
  [Vehicles.BMSIronship, bmsIronshipRecipes],
  [Vehicles.InterceptorPA12, interceptorPA12Recipes],
  [Vehicles.MacConmaraShorerunner, macConmaraShorerunnerRecipes],
  [Vehicles.RonanGunship74b1, ronanGunship74b1Recipes],
  [Vehicles.BMSGrouper, bmsGrouperRecipes],
  [Vehicles.TypeCCharon, typeCCharonRecipes],
  [Vehicles.BMSLonghook, bmsLonghookRecipes],
  [Vehicles.Callahan, callahanRecipes],
  [Vehicles.Titan, titanRecipes],
  [Vehicles.Blacksteele, blacksteeleRecipes],
  [Vehicles.Conqueror, conquerorRecipes],
  [Vehicles.BMSBowhead, bmsBowheadRecipes],
  [Vehicles.BMSBluefin, bmsBluefinRecipes],
  [Vehicles.Nakki, nakkiRecipes],
  [Vehicles.ACbTrident, acbTridentRecipes],
]);
