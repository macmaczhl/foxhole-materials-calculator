import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== FIELD AT RIFLES AND MACHINE GUNS =====

// Duncan's Coin 20mm Field AT Rifle recipes
const duncansCoin20mmRecipes: IRecipe[] = [
  // Small Assembly Station (Motor Pool): 30 x Construction Materials + 20 x Assembly Materials II + 1 x Swallowtail 988/127-2 → 1 x Duncan's Coin 20mm
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 30 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Vehicles.Swallowtail, count: 1 },
    ],
    [{ stuff: Vehicles.DuncansCoin20mm, count: 1 }]
  ),
];

// GA6 "Cestus" Field AT Rifle recipes
const ga6CestusRecipes: IRecipe[] = [
  // Small Assembly Station (Motor Pool): 30 x Construction Materials + 20 x Assembly Materials II + 1 x G40 "Sagittarii" → 1 x GA6 "Cestus"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 30 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Vehicles.Sagittarii, count: 1 },
    ],
    [{ stuff: Vehicles.GA6Cestus, count: 1 }]
  ),
];

// Swallowtail 988/127-2 field machine gun recipes
const swallowtailRecipes: IRecipe[] = [
  // Garrison: 15 x Refined Materials → 1 x Swallowtail 988/127-2
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 15 }],
    [{ stuff: Vehicles.Swallowtail, count: 1 }]
  ),
  // Mass Production Factory: 120 x Refined Materials → 3 crates of 3 x Swallowtail (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 120 }],
    [{ stuff: Vehicles.Swallowtail, count: 9 }]
  ),
  // Mass Production Factory: 150 x Refined Materials → 4 crates of 3 x Swallowtail (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 150 }],
    [{ stuff: Vehicles.Swallowtail, count: 12 }]
  ),
];

// G40 "Sagittarii" field machine gun recipes
const sagittariiRecipes: IRecipe[] = [
  // Garrison: 15 x Refined Materials → 1 x G40 "Sagittarii"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 15 }],
    [{ stuff: Vehicles.Sagittarii, count: 1 }]
  ),
  // Mass Production Factory: 120 x Refined Materials → 3 crates of 3 x Sagittarii (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 120 }],
    [{ stuff: Vehicles.Sagittarii, count: 9 }]
  ),
  // Mass Production Factory: 150 x Refined Materials → 4 crates of 3 x Sagittarii (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 150 }],
    [{ stuff: Vehicles.Sagittarii, count: 12 }]
  ),
];

// ===== FIELD GUNS AND ARTILLERY =====

// Rycker 4/3-F Wasp Nest recipes (Bunker-building vehicle)
const waspNestRecipes: IRecipe[] = [
  // Field Bunker production: 20 x Processed Construction Materials + 15 x Assembly Materials II + 3 x Assembly Materials IV → 1 x Wasp Nest
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsII, count: 15 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 },
    ],
    [{ stuff: Vehicles.WaspNest, count: 1 }]
  ),
];

// 120-68 "Koronides" Field Gun recipes (Heavy Artillery)
const koronidesRecipes: IRecipe[] = [
  // Garage production: 50 x Refined Materials → 1 x Koronides Field Gun
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 50 }],
    [{ stuff: Vehicles.Koronides, count: 1 }]
  ),
  // Mass Production Factory: 360 x Refined Materials → 3 crates of 3 x Koronides Field Gun (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 360 }],
    [{ stuff: Vehicles.Koronides, count: 9 }]
  ),
  // Mass Production Factory: 450 x Refined Materials → 4 crates of 3 x Koronides Field Gun (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 450 }],
    [{ stuff: Vehicles.Koronides, count: 12 }]
  ),
  // Mass Production Factory: 525 x Refined Materials → 5 crates of 3 x Koronides Field Gun (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 525 }],
    [{ stuff: Vehicles.Koronides, count: 15 }]
  ),
];

// Balfour Wolfhound 40mm recipes (Anti-Tank)
const wolfhoundRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Wolfhound 40mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.Wolfhound, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Wolfhound 40mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.Wolfhound, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Wolfhound 40mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.Wolfhound, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Wolfhound 40mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.Wolfhound, count: 15 }]
  ),
];

// Collins Cannon 68mm recipes (Anti-Tank Field Gun)
const collinsCannonRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Collins Cannon 68mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.CollinsCannon, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Collins Cannon 68mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.CollinsCannon, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Collins Cannon 68mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.CollinsCannon, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Collins Cannon 68mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.CollinsCannon, count: 15 }]
  ),
];

// AA-2 Battering Ram recipes (Siege Vehicle)
const batteringRamRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x AA-2 Battering Ram
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.BatteringRam, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x AA-2 Battering Ram (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.BatteringRam, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x AA-2 Battering Ram (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.BatteringRam, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x AA-2 Battering Ram (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.BatteringRam, count: 15 }]
  ),
];

// Balfour Falconer 250mm recipes (Heavy Artillery)
const falconerRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x Falconer 250mm
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Falconer, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x Falconer 250mm (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Falconer, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x Falconer 250mm (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Falconer, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x Falconer 250mm (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Falconer, count: 15 }]
  ),
];

// 30-250 "Tisiphone" Field Cannon recipes (Field Artillery)
const tisiphoneRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x Tisiphone Field Cannon
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Tisiphone, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x Tisiphone Field Cannon (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Tisiphone, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x Tisiphone Field Cannon (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Tisiphone, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x Tisiphone Field Cannon (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Tisiphone, count: 15 }]
  ),
];

// 40-250 "Alekto" Heavy Cannon vehicle recipes
const alektoRecipes: IRecipe[] = [
  // Single recipe as per wiki requirements
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Materials.RareAlloys, count: 1 },
      { stuff: Vehicles.Tisiphone, count: 1 },
    ],
    [{ stuff: Vehicles.Alekto, count: 1 }]
  ),
];

// Balfour Rampart 68mm recipes (Anti-Tank)
const rampartRecipes: IRecipe[] = [
  // Production: 5 x Processed Construction Materials + 5 x Assembly Materials IV + 1 x Collins Cannon 68mm → 1 x Rampart 68mm
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
      { stuff: Vehicles.CollinsCannon, count: 1 },
    ],
    [{ stuff: Vehicles.Rampart, count: 1 }]
  ),
];

// 40-45 "Smelter" Heavy Field Gun recipes (Heavy Artillery)
const smelterRecipes: IRecipe[] = [
  // Production: 5 x Processed Construction Materials + 5 x Assembly Materials IV + 1 x AA-2 Battering Ram → 1 x Smelter Heavy Field Gun
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
      { stuff: Vehicles.BatteringRam, count: 1 },
    ],
    [{ stuff: Vehicles.Smelter, count: 1 }]
  ),
];

// Balfour Stockade 75mm recipes (Field Gun)
const stockadeRecipes: IRecipe[] = [
  // Production: 15 x Steel Construction Materials + 20 x Assembly Materials II + 15 x Assembly Materials III + 1 x Wolfhound 40mm → 1 x Stockade 75mm
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Vehicles.Wolfhound, count: 1 },
    ],
    [{ stuff: Vehicles.Stockade, count: 1 }]
  ),
];

// 945g "Stygian Bolt" recipes (Heavy Weapon/Launcher)
const stygianBoltRecipes: IRecipe[] = [
  // Production: 15 x Steel Construction Materials + 20 x Assembly Materials II + 15 x Assembly Materials III + 1 x AA-2 Battering Ram → 1 x Stygian Bolt
  createRecipe(
    [
      { stuff: Materials.SteelConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Vehicles.BatteringRam, count: 1 },
    ],
    [{ stuff: Vehicles.StygianBolt, count: 1 }]
  ),
];

export const fieldWeaponRecipes = new Map<string, IRecipe[]>([
  // Field AT Rifles and Machine Guns
  [Vehicles.DuncansCoin20mm, duncansCoin20mmRecipes],
  [Vehicles.GA6Cestus, ga6CestusRecipes],
  [Vehicles.Swallowtail, swallowtailRecipes],
  [Vehicles.Sagittarii, sagittariiRecipes],
  // Field Guns and Artillery
  [Vehicles.WaspNest, waspNestRecipes],
  [Vehicles.Koronides, koronidesRecipes],
  [Vehicles.Wolfhound, wolfhoundRecipes],
  [Vehicles.CollinsCannon, collinsCannonRecipes],
  [Vehicles.BatteringRam, batteringRamRecipes],
  [Vehicles.Falconer, falconerRecipes],
  [Vehicles.Tisiphone, tisiphoneRecipes],
  [Vehicles.Alekto, alektoRecipes],
  [Vehicles.Rampart, rampartRecipes],
  [Vehicles.Smelter, smelterRecipes],
  [Vehicles.Stockade, stockadeRecipes],
  [Vehicles.StygianBolt, stygianBoltRecipes],
]);
