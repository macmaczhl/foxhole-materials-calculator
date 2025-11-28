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

// R-5 "Atlas" Hauler (Colonial Truck) recipes
const r5AtlasHaulerRecipes: IRecipe[] = [
  // Garage production: 120 x Basic Materials → 1 x R-5 "Atlas" Hauler
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 120 }],
    [{ stuff: Vehicles.R5AtlasHauler, count: 1 }]
  ),
  // Mass Production Factory: 864 x Basic Materials → 3 crates of 3 x R-5 "Atlas" Hauler (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 864 }],
    [{ stuff: Vehicles.R5AtlasHauler, count: 9 }]
  ),
  // Mass Production Factory: 1080 x Basic Materials → 4 crates of 3 x R-5 "Atlas" Hauler (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1080 }],
    [{ stuff: Vehicles.R5AtlasHauler, count: 12 }]
  ),
  // Mass Production Factory: 1260 x Basic Materials → 5 crates of 3 x R-5 "Atlas" Hauler (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1260 }],
    [{ stuff: Vehicles.R5AtlasHauler, count: 15 }]
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

// Dunne Leatherback 2a (Warden reinforced truck variant) recipes
const dunneLeatherback2aRecipes: IRecipe[] = [
  // Small Assembly Station production: 10 x Construction Materials + 1 x Dunne Transport → 1 x Dunne Leatherback 2a
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Vehicles.DunneTransport, count: 1 },
    ],
    [{ stuff: Vehicles.DunneLeatherback2a, count: 1 }]
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

// ===== HEAVY-DUTY TRUCKS =====

// Cnute Cliffwrest (Warden Heavy-Duty Truck) recipes
const cnuteCliffwrestRecipes: IRecipe[] = [
  // Small Assembly Station production: 40 x Processed Construction Materials → 1 x Cnute Cliffwrest
  createRecipe(
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 40 }],
    [{ stuff: Vehicles.CnuteCliffwrest, count: 1 }]
  ),
];

// AU-A150 Taurine Rigger (Colonial Heavy-Duty Truck) recipes
const auA150TaurineRiggerRecipes: IRecipe[] = [
  // Small Assembly Station production: 40 x Processed Construction Materials → 1 x AU-A150 Taurine Rigger
  createRecipe(
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 40 }],
    [{ stuff: Vehicles.AUA150TaurineRigger, count: 1 }]
  ),
];

// ===== FLATBED TRUCKS =====

// BMS - Packmule Flatbed recipes
const bmsPackmuleFlatbedRecipes: IRecipe[] = [
  // Garage production: 30 x Refined Materials → 1 x BMS - Packmule Flatbed
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 30 }],
    [{ stuff: Vehicles.BMSPackmuleFlatbed, count: 1 }]
  ),
  // Mass Production Factory: 216 x Refined Materials → 3 crates of 3 x BMS - Packmule Flatbed (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 216 }],
    [{ stuff: Vehicles.BMSPackmuleFlatbed, count: 9 }]
  ),
  // Mass Production Factory: 270 x Refined Materials → 4 crates of 3 x BMS - Packmule Flatbed (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 270 }],
    [{ stuff: Vehicles.BMSPackmuleFlatbed, count: 12 }]
  ),
  // Mass Production Factory: 315 x Refined Materials → 5 crates of 3 x BMS - Packmule Flatbed (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 315 }],
    [{ stuff: Vehicles.BMSPackmuleFlatbed, count: 15 }]
  ),
];

// ===== FIRE ENGINES =====

// Dunne Dousing Engine 3r (Warden Fire Engine) recipes
const dunneDousingEngine3rRecipes: IRecipe[] = [
  // Small Assembly Station production: 15 x Construction Materials + 5 x Assembly Materials II → 1 x Dunne Dousing Engine 3r
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
    ],
    [{ stuff: Vehicles.DunneDousingEngine3r, count: 1 }]
  ),
];

// R-12b "Salva" Flame Truck (Colonial Fire Engine) recipes
const r12bSalvaFlameTruckRecipes: IRecipe[] = [
  // Garage production: 150 x Basic Materials → 1 x R-12b "Salva" Flame Truck
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 150 }],
    [{ stuff: Vehicles.R12bSalvaFlameTruck, count: 1 }]
  ),
];

// ===== AMBULANCES =====

// R-12 "Salus" Ambulance recipes
const r12SalusAmbulanceRecipes: IRecipe[] = [
  // Garage production: 150 x Basic Materials → 1 x R-12 "Salus" Ambulance
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 150 }],
    [{ stuff: Vehicles.R12SalusAmbulance, count: 1 }]
  ),
  // Mass Production Factory: 1080 x Basic Materials → 3 crates of 3 x R-12 "Salus" Ambulance (9 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1080 }],
    [{ stuff: Vehicles.R12SalusAmbulance, count: 9 }]
  ),
  // Mass Production Factory: 1350 x Basic Materials → 4 crates of 3 x R-12 "Salus" Ambulance (12 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1350 }],
    [{ stuff: Vehicles.R12SalusAmbulance, count: 12 }]
  ),
  // Mass Production Factory: 1575 x Basic Materials → 5 crates of 3 x R-12 "Salus" Ambulance (15 total)
  createRecipe(
    [{ stuff: Materials.BasicMaterials, count: 1575 }],
    [{ stuff: Vehicles.R12SalusAmbulance, count: 15 }]
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

// ===== HARVESTERS =====

// BMS - Scrap Hauler (Harvester) recipes
const bmsScrapHaulerRecipes: IRecipe[] = [
  // Small Assembly Station production: 90 x Processed Construction Materials + 25 x Assembly Materials IV → 1 x BMS - Scrap Hauler
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 90 },
      { stuff: Materials.AssemblyMaterialsIV, count: 25 },
    ],
    [{ stuff: Vehicles.BMSScrapHauler, count: 1 }]
  ),
];

export const logisticsVehicleRecipes = new Map<string, IRecipe[]>([
  // Trucks
  [Vehicles.R1Hauler, r1HaulerRecipes],
  [Vehicles.R5AtlasHauler, r5AtlasHaulerRecipes],
  [Vehicles.DunneTransport, dunneTransportRecipes],
  [Vehicles.DunneLeatherback2a, dunneLeatherback2aRecipes],
  // Fuel Tankers
  [Vehicles.DunneFuelrunner2d, dunneFuelrunner2dRecipes],
  [Vehicles.RR3StolonTanker, rr3StolonTankerRecipes],
  // Heavy-Duty Trucks
  [Vehicles.CnuteCliffwrest, cnuteCliffwrestRecipes],
  [Vehicles.AUA150TaurineRigger, auA150TaurineRiggerRecipes],
  // Cranes
  [Vehicles.BMSClass2MobileAutoCrane, bmsClass2MobileAutoCraneRecipes],
  // Flatbed Trucks
  [Vehicles.BMSPackmuleFlatbed, bmsPackmuleFlatbedRecipes],
  // Fire Engines
  [Vehicles.DunneDousingEngine3r, dunneDousingEngine3rRecipes],
  [Vehicles.R12bSalvaFlameTruck, r12bSalvaFlameTruckRecipes],
  // Ambulances
  [Vehicles.R12SalusAmbulance, r12SalusAmbulanceRecipes],
  // Transport Buses
  [Vehicles.DunneCaravaner2f, dunneCaravaner2fRecipes],
  [Vehicles.R15Chariot, r15ChariotRecipes],
  // Harvesters
  [Vehicles.BMSScrapHauler, bmsScrapHaulerRecipes],
]);

