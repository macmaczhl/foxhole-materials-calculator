import { Materials, Vehicles, IRecipe } from "../../models";
import { createRecipe } from "../base";

// BMS - Overseer Sky-Hauler (Large Crane) recipes
const bmsOverseerSkyHaulerRecipes: IRecipe[] = [
  // Crane Railway Track: 250 x Processed Construction Materials → 1 x BMS - Overseer Sky-Hauler
  createRecipe(
    [{ stuff: Materials.ProcessedConstructionMaterials, count: 250 }],
    [{ stuff: Vehicles.BMSOverseerSkyHauler, count: 1 }]
  ),
];

export const largeCraneRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSOverseerSkyHauler, bmsOverseerSkyHaulerRecipes],
]);
