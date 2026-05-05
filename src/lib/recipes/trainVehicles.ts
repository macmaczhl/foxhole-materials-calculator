import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== TRAIN VEHICLES =====

// BMS Holdout (Infantry Car) recipes
const bmsHoldoutRecipes: IRecipe[] = [
  // Large Assembly Station: 20 x Processed Construction Materials + 15 x Assembly Materials II + 5 x Assembly Materials III → 1 x BMS Holdout
  createRecipe(
    [
      { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsII, count: 15 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
    ],
    [{ stuff: Vehicles.BMSHoldout, count: 1 }]
  ),
];

export const trainVehicleRecipes = new Map<string, IRecipe[]>([
  [Vehicles.BMSHoldout, bmsHoldoutRecipes],
]);
