import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== ARMORED CARS =====

// T3 "Xiphos" vehicle recipes
const xiphosRecipes: IRecipe[] = [
  // Garage production: 25 x Refined Materials → 1 x T3 "Xiphos"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 25 }],
    [{ stuff: Vehicles.Xiphos, count: 1 }]
  ),
  // Mass Production Factory: 179 x Refined Materials → 3 crates of 3 x T3 "Xiphos" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 179 }],
    [{ stuff: Vehicles.Xiphos, count: 9 }]
  ),
  // Mass Production Factory: 224 x Refined Materials → 4 crates of 3 x T3 "Xiphos" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 224 }],
    [{ stuff: Vehicles.Xiphos, count: 12 }]
  ),
  // Mass Production Factory: 261 x Refined Materials → 5 crates of 3 x T3 "Xiphos" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 261 }],
    [{ stuff: Vehicles.Xiphos, count: 15 }]
  ),
];

// T5 "Percutio" vehicle recipes (Armored Car upgrade)
const percutioRecipes: IRecipe[] = [
  // Upgrade recipe: 10 x Construction Materials + 10 x Assembly Materials I + 1 x T3 "Xiphos" → 1 x T5 "Percutio"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Vehicles.Xiphos, count: 1 },
    ],
    [{ stuff: Vehicles.Percutio, count: 1 }]
  ),
];

// T8 "Gemini" vehicle recipes (Armored Car upgrade)
const geminiRecipes: IRecipe[] = [
  // Upgrade recipe: 10 x Construction Materials + 10 x Assembly Materials I + 1 x T3 "Xiphos" → 1 x T8 "Gemini"
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Vehicles.Xiphos, count: 1 },
    ],
    [{ stuff: Vehicles.Gemini, count: 1 }]
  ),
];

// O'Brien v.113 Gravekeeper vehicle recipes (Armored Car upgrade)
const oBrienGravekeeperRecipes: IRecipe[] = [
  // Upgrade recipe: 10 x Processed Construction Materials + 10 x Assembly Materials I + 1 x O'Brien V.110 → 1 x O'Brien v.113 Gravekeeper
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Vehicles.OBrienV110, count: 1 },
    ],
    [{ stuff: Vehicles.OBrienGravekeeper, count: 1 }]
  ),
];

// O'Brien v.121 Highlander vehicle recipes (Armored Car upgrade)
const oBrienHighlanderRecipes: IRecipe[] = [
  // Upgrade recipe: 5 x Processed Construction Materials + 5 x Assembly Materials I + 1 x O'Brien V.190 Knave → 1 x O'Brien v.121 Highlander
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsI, count: 5 },
      { stuff: Vehicles.OBrienKnave, count: 1 },
    ],
    [{ stuff: Vehicles.OBrienHighlander, count: 1 }]
  ),
];

// O'Brien v.101 Freeman vehicle recipes (Armored Car upgrade)
const oBrienFreemanRecipes: IRecipe[] = [
  // Upgrade recipe: 15 x Construction Materials + 15 x Assembly Materials I + 1 x O'Brien V.190 Knave → 1 x O'Brien v.101 Freeman
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.OBrienKnave, count: 1 },
    ],
    [{ stuff: Vehicles.OBrienFreeman, count: 1 }]
  ),
];

// O'Brien v.110 vehicle recipes (Base Armored Car)
const oBrienV110Recipes: IRecipe[] = [
  // Recipe 1: 25 x Refined Materials → 1 x O'Brien v.110
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 25 }],
    [{ stuff: Vehicles.OBrienV110, count: 1 }]
  ),
  // Recipe 2: 179 x Refined Materials → 9 x O'Brien v.110
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 179 }],
    [{ stuff: Vehicles.OBrienV110, count: 9 }]
  ),
  // Recipe 3: 224 x Refined Materials → 12 x O'Brien v.110
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 224 }],
    [{ stuff: Vehicles.OBrienV110, count: 12 }]
  ),
  // Recipe 4: 261 x Refined Materials → 15 x O'Brien v.110
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 261 }],
    [{ stuff: Vehicles.OBrienV110, count: 15 }]
  ),
];

// O'Brien V.130 Wild Jack vehicle recipes (Base Armored Car)
const oBrienWildJackRecipes: IRecipe[] = [
  // Recipe: 10 x Processed Construction Materials + 10 x Assembly Materials I → 1 x O'Brien V.130 Wild Jack
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
    ],
    [{ stuff: Vehicles.OBrienWildJack, count: 1 }]
  ),
];

// O'Brien V.190 Knave vehicle recipes (Base Armored Car)
const oBrienKnaveRecipes: IRecipe[] = [
  // Recipe 1: 40 x Refined Materials → 1 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 40 }],
    [{ stuff: Vehicles.OBrienKnave, count: 1 }]
  ),
  // Recipe 2: 288 x Refined Materials → 9 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 288 }],
    [{ stuff: Vehicles.OBrienKnave, count: 9 }]
  ),
  // Recipe 3: 360 x Refined Materials → 12 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 360 }],
    [{ stuff: Vehicles.OBrienKnave, count: 12 }]
  ),
  // Recipe 4: 420 x Refined Materials → 15 x O'Brien V.190 Knave
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 420 }],
    [{ stuff: Vehicles.OBrienKnave, count: 15 }]
  ),
];

// O'Brien V.200 Squire vehicle recipes (Advanced Armored Car upgrade)
const oBrienSquireRecipes: IRecipe[] = [
  // Complex upgrade recipe: 35 x Processed Construction Materials + 10 x Assembly Materials I + 8 x Assembly Materials III + 1 x O'Brien V.190 Knave → 1 x O'Brien V.200 Squire
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 35 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 8 },
      { stuff: Vehicles.OBrienKnave, count: 1 },
    ],
    [{ stuff: Vehicles.OBrienSquire, count: 1 }]
  ),
];

// ===== LANDING APCS =====

// AB-8 "Acheron" Landing APC recipes
const acheronRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x AB-8 "Acheron"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.Acheron, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x AB-8 "Acheron" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.Acheron, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x AB-8 "Acheron" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.Acheron, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x AB-8 "Acheron" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.Acheron, count: 15 }]
  ),
];

// AB-11 "Doru" Landing APC recipes
const doruRecipes: IRecipe[] = [
  // Garage production: 5 x Processed Construction Materials + 3 x Assembly Materials III → 1 x AB-11 "Doru"
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
      { stuff: Vehicles.Acheron, count: 1 },
    ],
    [{ stuff: Vehicles.Doru, count: 1 }]
  ),
];

// Mulloy LPC Landing APC recipes
const mulloyLPCRecipes: IRecipe[] = [
  // Garage production: 20 x Refined Materials → 1 x Mulloy LPC
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 20 }],
    [{ stuff: Vehicles.MulloyLPC, count: 1 }]
  ),
  // Mass Production Factory: 144 x Refined Materials → 3 crates of 3 x Mulloy LPC (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 144 }],
    [{ stuff: Vehicles.MulloyLPC, count: 9 }]
  ),
  // Mass Production Factory: 180 x Refined Materials → 4 crates of 3 x Mulloy LPC (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 180 }],
    [{ stuff: Vehicles.MulloyLPC, count: 12 }]
  ),
  // Mass Production Factory: 210 x Refined Materials → 5 crates of 3 x Mulloy LPC (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 210 }],
    [{ stuff: Vehicles.MulloyLPC, count: 15 }]
  ),
];

// ===== TANKETTES =====

// T12 "Actaeon" Tankette recipes
const actaeonRecipes: IRecipe[] = [
  // Garage production: 35 x Refined Materials → 1 x T12 "Actaeon" Tankette
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 35 }],
    [{ stuff: Vehicles.Actaeon, count: 1 }]
  ),
  // Mass Production Factory: 251 x Refined Materials → 3 crates of 3 x T12 "Actaeon" Tankette (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 251 }],
    [{ stuff: Vehicles.Actaeon, count: 9 }]
  ),
  // Mass Production Factory: 314 x Refined Materials → 4 crates of 3 x T12 "Actaeon" Tankette (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 314 }],
    [{ stuff: Vehicles.Actaeon, count: 12 }]
  ),
  // Mass Production Factory: 366 x Refined Materials → 5 crates of 3 x T12 "Actaeon" Tankette (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 366 }],
    [{ stuff: Vehicles.Actaeon, count: 15 }]
  ),
];

// T14 "Vesta" Tankette recipes
const vestaRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Vesta, count: 1 }]
  ),
];

// T20 "Ixion" Tankette recipes
const ixionRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ConcreteMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Ixion, count: 1 }]
  ),
];

// T13 "Deioneus" Rocket Battery recipes
const deioneusRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
      { stuff: Vehicles.Actaeon, count: 1 },
    ],
    [{ stuff: Vehicles.Deioneus, count: 1 }]
  ),
  // Mass Production Factory: 198 x Refined Materials → 3 crates of 3 x T13 "Deioneus" Rocket Battery (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 198 }],
    [{ stuff: Vehicles.Deioneus, count: 9 }]
  ),
  // Mass Production Factory: 247 x Refined Materials → 4 crates of 3 x T13 "Deioneus" Rocket Battery (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 247 }],
    [{ stuff: Vehicles.Deioneus, count: 12 }]
  ),
  // Mass Production Factory: 286 x Refined Materials → 5 crates of 3 x T13 "Deioneus" Rocket Battery (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 286 }],
    [{ stuff: Vehicles.Deioneus, count: 15 }]
  ),
];

// ===== HALF-TRACKS =====

// HH-a "Javelin" half-truck recipes (based on wiki feedback)
const javelinRecipes: IRecipe[] = [
  // Garage production: 55 x Refined Materials → 1 x HH-a "Javelin"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 55 }],
    [{ stuff: Vehicles.Javelin, count: 1 }]
  ),
  // Mass Production Factory: 395 x Refined Materials → 3 crates of 3 x HH-a "Javelin" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 395 }],
    [{ stuff: Vehicles.Javelin, count: 9 }]
  ),
  // Mass Production Factory: 494 x Refined Materials → 4 crates of 3 x HH-a "Javelin" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 494 }],
    [{ stuff: Vehicles.Javelin, count: 12 }]
  ),
  // Mass Production Factory: 576 x Refined Materials → 5 crates of 3 x HH-a "Javelin" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 576 }],
    [{ stuff: Vehicles.Javelin, count: 15 }]
  ),
];

// HH-b "Hoplite" half-truck recipes (based on wiki feedback)
const hopliteRecipes: IRecipe[] = [
  // Only one recipe as per wiki: requires Javelin + materials
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 },
      { stuff: Vehicles.Javelin, count: 1 },
    ],
    [{ stuff: Vehicles.Hoplite, count: 1 }]
  ),
];

// HH-d "Peltast" half-truck recipes (based on wiki feedback)
const peltastRecipes: IRecipe[] = [
  // Only one recipe as per wiki: requires Javelin + materials
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 },
      { stuff: Vehicles.Javelin, count: 1 },
    ],
    [{ stuff: Vehicles.Peltast, count: 1 }]
  ),
];

// Niska Mk. I Gun Motor Carriage recipes (based on wiki feedback)
const niskaMkIRecipes: IRecipe[] = [
  // Garage production: 60 x Refined Materials → 1 x Niska Mk. I Gun Motor Carriage
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 60 }],
    [{ stuff: Vehicles.NiskaMkI, count: 1 }]
  ),
  // Mass Production Factory: 432 x Refined Materials → 3 crates of 3 x Niska Mk. I Gun Motor Carriage (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 432 }],
    [{ stuff: Vehicles.NiskaMkI, count: 9 }]
  ),
  // Mass Production Factory: 540 x Refined Materials → 4 crates of 3 x Niska Mk. I Gun Motor Carriage (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 540 }],
    [{ stuff: Vehicles.NiskaMkI, count: 12 }]
  ),
  // Mass Production Factory: 630 x Refined Materials → 5 crates of 3 x Niska Mk. I Gun Motor Carriage (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 630 }],
    [{ stuff: Vehicles.NiskaMkI, count: 15 }]
  ),
];

// Niska Mk. II Blinder recipes (based on wiki feedback)
const niskaMkIIRecipes: IRecipe[] = [
  // Only one recipe as per wiki: requires Niska Mk. I + materials
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 },
      { stuff: Vehicles.NiskaMkI, count: 1 },
    ],
    [{ stuff: Vehicles.NiskaMkII, count: 1 }]
  ),
];

// Niska Mk. III Scar Twin recipes (based on wiki feedback)
const niskaMkIIIRecipes: IRecipe[] = [
  // Only one recipe as per wiki: requires Niska Mk. I + materials
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
      { stuff: Vehicles.NiskaMkI, count: 1 },
    ],
    [{ stuff: Vehicles.NiskaMkIII, count: 1 }]
  ),
];

// Niska-Rycker Mk. IX Skycaller recipes (based on wiki feedback)
const niskaRyckerMkIXRecipes: IRecipe[] = [
  // Only one recipe as per wiki: requires Niska Mk. I + materials
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsIII, count: 8 },
      { stuff: Vehicles.NiskaMkI, count: 1 },
    ],
    [{ stuff: Vehicles.NiskaRyckerMkIX, count: 1 }]
  ),
];

export const armouredFightingVehicleRecipes = new Map<string, IRecipe[]>([
  // Armored Cars
  [Vehicles.Xiphos, xiphosRecipes],
  [Vehicles.Percutio, percutioRecipes],
  [Vehicles.Gemini, geminiRecipes],
  [Vehicles.OBrienGravekeeper, oBrienGravekeeperRecipes],
  [Vehicles.OBrienHighlander, oBrienHighlanderRecipes],
  [Vehicles.OBrienFreeman, oBrienFreemanRecipes],
  [Vehicles.OBrienV110, oBrienV110Recipes],
  [Vehicles.OBrienWildJack, oBrienWildJackRecipes],
  [Vehicles.OBrienKnave, oBrienKnaveRecipes],
  [Vehicles.OBrienSquire, oBrienSquireRecipes],
  // Landing APCs
  [Vehicles.Acheron, acheronRecipes],
  [Vehicles.Doru, doruRecipes],
  [Vehicles.MulloyLPC, mulloyLPCRecipes],
  // Tankettes
  [Vehicles.Actaeon, actaeonRecipes],
  [Vehicles.Vesta, vestaRecipes],
  [Vehicles.Ixion, ixionRecipes],
  [Vehicles.Deioneus, deioneusRecipes],
  // Half-Tracks
  [Vehicles.Javelin, javelinRecipes],
  [Vehicles.Hoplite, hopliteRecipes],
  [Vehicles.Peltast, peltastRecipes],
  [Vehicles.NiskaMkI, niskaMkIRecipes],
  [Vehicles.NiskaMkII, niskaMkIIRecipes],
  [Vehicles.NiskaMkIII, niskaMkIIIRecipes],
  [Vehicles.NiskaRyckerMkIX, niskaRyckerMkIXRecipes],
]);
