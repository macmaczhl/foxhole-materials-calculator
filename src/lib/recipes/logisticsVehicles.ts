import { IRecipe, Materials, Vehicles } from "../models";
import { createRecipe } from "./base";

// ===== TRUCKS =====

// R-1 Hauler (Colonial Truck) recipes
const r1HaulerRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x R-1 Hauler
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.R1Hauler, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x R-1 Hauler (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.R1Hauler, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x R-1 Hauler (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.R1Hauler, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x R-1 Hauler (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.R1Hauler, count: 15 }]
  ),
];

// Dunne Transport (Warden Truck) recipes
const dunneTransportRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x Dunne Transport
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.DunneTransport, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x Dunne Transport (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.DunneTransport, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x Dunne Transport (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.DunneTransport, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x Dunne Transport (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.DunneTransport, count: 15 }]
  ),
];

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

// ===== TRANSPORT BUSES =====

// Dunne Caravaner 2f (Warden Transport Bus) recipes
const dunneCaravaner2fRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x Dunne Caravaner 2f
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.DunneCaravaner2f, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x Dunne Caravaner 2f (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.DunneCaravaner2f, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x Dunne Caravaner 2f (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.DunneCaravaner2f, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x Dunne Caravaner 2f (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.DunneCaravaner2f, count: 15 }]
  ),
];

// R-15 - "Chariot" (Colonial Transport Bus) recipes
const r15ChariotRecipes: IRecipe[] = [
  // Garage production: 100 x Basic Materials → 1 x R-15 - "Chariot"
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 100 }],
    [{ stuff: Vehicles.R15Chariot, count: 1 }]
  ),
  // Mass Production Factory: 720 x Basic Materials → 3 crates of 3 x R-15 - "Chariot" (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 720 }],
    [{ stuff: Vehicles.R15Chariot, count: 9 }]
  ),
  // Mass Production Factory: 900 x Basic Materials → 4 crates of 3 x R-15 - "Chariot" (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 900 }],
    [{ stuff: Vehicles.R15Chariot, count: 12 }]
  ),
  // Mass Production Factory: 1050 x Basic Materials → 5 crates of 3 x R-15 - "Chariot" (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1050 }],
    [{ stuff: Vehicles.R15Chariot, count: 15 }]
  ),
];

export const logisticsVehicleRecipes = new Map<string, IRecipe[]>([
  // Trucks
  [Vehicles.R1Hauler, r1HaulerRecipes],
  [Vehicles.DunneTransport, dunneTransportRecipes],
  // Fuel Tankers
  [Vehicles.DunneFuelrunner2d, dunneFuelrunner2dRecipes],
  [Vehicles.RR3StolonTanker, rr3StolonTankerRecipes],
  // Cranes
  [Vehicles.BMSClass2MobileAutoCrane, bmsClass2MobileAutoCraneRecipes],
  // Transport Buses
  [Vehicles.DunneCaravaner2f, dunneCaravaner2fRecipes],
  [Vehicles.R15Chariot, r15ChariotRecipes],
]);
