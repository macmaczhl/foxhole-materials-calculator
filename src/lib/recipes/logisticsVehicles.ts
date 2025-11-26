import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== FUEL TANKERS =====

// Dunne Fuelrunner 2d (Warden Fuel Tanker) recipes
const dunneFuelrunner2dRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x Dunne Fuelrunner 2d
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.DunneFuelrunner2d, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x Dunne Fuelrunner 2d (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.DunneFuelrunner2d, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x Dunne Fuelrunner 2d (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.DunneFuelrunner2d, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x Dunne Fuelrunner 2d (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.DunneFuelrunner2d, count: 15 }]
  ),
];

// RR-3 "Stolon" Tanker (Colonial Fuel Tanker) recipes
const rr3StolonTankerRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x RR-3 "Stolon" Tanker
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.RR3StolonTanker, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x RR-3 "Stolon" Tanker (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.RR3StolonTanker, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x RR-3 "Stolon" Tanker (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.RR3StolonTanker, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x RR-3 "Stolon" Tanker (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.RR3StolonTanker, count: 15 }]
  ),
];

// ===== CRANES =====

// BMS - Class 2 Mobile Auto-Crane recipes
const bmsClass2MobileAutoCraneRecipes: IRecipe[] = [
  // Garage production: 125 x Basic Materials → 1 x BMS - Class 2 Mobile Auto-Crane
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 125 }],
    [{ stuff: Vehicles.BMSClass2MobileAutoCrane, count: 1 }]
  ),
  // Mass Production Factory: 899 x Basic Materials → 3 crates of 3 x BMS - Class 2 Mobile Auto-Crane (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 899 }],
    [{ stuff: Vehicles.BMSClass2MobileAutoCrane, count: 9 }]
  ),
  // Mass Production Factory: 1124 x Basic Materials → 4 crates of 3 x BMS - Class 2 Mobile Auto-Crane (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1124 }],
    [{ stuff: Vehicles.BMSClass2MobileAutoCrane, count: 12 }]
  ),
  // Mass Production Factory: 1311 x Basic Materials → 5 crates of 3 x BMS - Class 2 Mobile Auto-Crane (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1311 }],
    [{ stuff: Vehicles.BMSClass2MobileAutoCrane, count: 15 }]
  ),
];

export const logisticsVehicleRecipes = new Map<string, IRecipe[]>([
  // Fuel Tankers
  [Vehicles.DunneFuelrunner2d, dunneFuelrunner2dRecipes],
  [Vehicles.RR3StolonTanker, rr3StolonTankerRecipes],
  // Cranes
  [Vehicles.BMSClass2MobileAutoCrane, bmsClass2MobileAutoCraneRecipes],
]);
