import { Materials, Vehicles, IRecipe } from "../../models";
import { createRecipe } from "../base";

// BMS Linerunner (Small Flatbed Car) recipes
const bmsLinerunnerRecipes: IRecipe[] = [
  // Small Assembly Station: 35 x Construction Materials + 15 x Assembly Materials I + 5 x Assembly Materials II → 1 x BMS Linerunner
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 35 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
    ],
    [{ stuff: Vehicles.BMSLinerunner, count: 1 }]
  ),
];

// BMS Mineseeker (Small Train Locomotive) recipes
const bmsMineseeker: IRecipe[] = [
  // Small Assembly Station: 125 x Construction Materials + 10 x Assembly Materials I + 20 x Assembly Materials II → 1 x BMS Mineseeker
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 125 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
    ],
    [{ stuff: Vehicles.BMSMineseeker, count: 1 }]
  ),
];

// BMS Railtruck (Small Container Car) recipes
const bmsRailtruckRecipes: IRecipe[] = [
  // Small Assembly Station: 35 x Construction Materials + 15 x Assembly Materials I + 5 x Assembly Materials II → 1 x BMS Railtruck
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 35 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Materials.AssemblyMaterialsII, count: 5 },
    ],
    [{ stuff: Vehicles.BMSRailtruck, count: 1 }]
  ),
];

// BMS Tinderbox (Small Liquid Container Car) recipes
const bmsTinderboxRecipes: IRecipe[] = [
  // Small Assembly Station: 35 x Construction Materials + 5 x Assembly Materials I + 15 x Assembly Materials II → 1 x BMS Tinderbox
  createRecipe(
    [
      { stuff: Materials.ConstructionMaterials, count: 35 },
      { stuff: Materials.AssemblyMaterialsI, count: 5 },
      { stuff: Materials.AssemblyMaterialsII, count: 15 },
    ],
    [{ stuff: Vehicles.BMSTinderbox, count: 1 }]
  ),
];

export const smallTrainRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSLinerunner, bmsLinerunnerRecipes],
  [Vehicles.BMSMineseeker, bmsMineseeker],
  [Vehicles.BMSRailtruck, bmsRailtruckRecipes],
  [Vehicles.BMSTinderbox, bmsTinderboxRecipes],
]);
