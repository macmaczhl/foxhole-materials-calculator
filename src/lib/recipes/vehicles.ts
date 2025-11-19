import { IRecipe } from "../models";
import { armouredFightingVehicleRecipes } from "./armouredFightingVehicles";
import { fieldWeaponRecipes } from "./fieldWeapons";
import { tankRecipes } from "./tanks";
import { logisticsVehicleRecipes } from "./logisticsVehicles";
import { scoutVehicleRecipes } from "./scoutVehicles";
import { lightTankRecipes } from "./lightTanks";
import { assaultTankRecipes } from "./assaultTanks";
import { destroyerTankRecipes } from "./destroyerTanks";

/**
 * Central registry of all vehicle recipes.
 * Vehicle recipes are now organized by category in separate files:
 * - armouredFightingVehicles.ts: Armored Cars, Tankettes, Landing APCs, Half-Tracks
 * - fieldWeapons.ts: Field AT Rifles, Machine Guns, Field Guns, Artillery
 * - tanks.ts: Scout Tanks (and future tank categories)
 * - lightTanks.ts: Light Tanks
 * - assaultTanks.ts: Assault Tanks
 * - destroyerTanks.ts: Destroyer Tanks
 * - logisticsVehicles.ts: Future logistics vehicles
 * - scoutVehicles.ts: Future scout vehicles
 */
export const vehicleRecipes = new Map<string, IRecipe[]>([
  ...armouredFightingVehicleRecipes,
  ...fieldWeaponRecipes,
  ...tankRecipes,
  ...logisticsVehicleRecipes,
  ...scoutVehicleRecipes,
  ...lightTankRecipes,
  ...assaultTankRecipes,
  ...destroyerTankRecipes,
]);
