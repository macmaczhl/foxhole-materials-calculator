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

export const smallTrainRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSLinerunner, bmsLinerunnerRecipes],
]);
