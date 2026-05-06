import { Materials, Vehicles, IRecipe } from "../../models";
import { createRecipe } from "../base";

// ===== AMPHIBIOUS SCOUT AIRCRAFT =====

// Luminary Mk. IV Herald (Warden Amphibious Scout Aircraft) recipes
const luminaryMkIVHeraldRecipes: IRecipe[] = [
  // Aircraft Hangar production: 80 x Refined Materials → 1 x Luminary Mk. IV Herald
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 80 }],
    [{ stuff: Vehicles.LuminaryMkIVHerald, count: 1 }]
  ),
];

// A51 Venti "Daedalus" (Colonial Amphibious Scout Aircraft) recipes
const a51VentiDaedalusRecipes: IRecipe[] = [
  // Aircraft Hangar production: 80 x Refined Materials → 1 x A51 Venti "Daedalus"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 80 }],
    [{ stuff: Vehicles.A51VentiDaedalus, count: 1 }]
  ),
];

export const amphibiousScoutAircraftRecipes = new Map<string, IRecipe[]>([
  [Vehicles.LuminaryMkIVHerald, luminaryMkIVHeraldRecipes],
  [Vehicles.A51VentiDaedalus, a51VentiDaedalusRecipes],
]);
