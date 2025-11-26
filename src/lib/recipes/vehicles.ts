import { IRecipe } from "../models";
import { armouredFightingVehicleRecipes } from "./armouredFightingVehicles";
import { fieldWeaponRecipes } from "./fieldWeapons";
import { tankRecipes } from "./tanks";
import { logisticsVehicleRecipes } from "./logisticsVehicles";
import { scoutVehicleRecipes } from "./scoutVehicles";
import { lightTankRecipes } from "./lightTanks";
import { assaultTankRecipes } from "./assaultTanks";
import { siegeTankRecipes } from "./siegeTanks";
import { destroyerTankRecipes } from "./destroyerTanks";
import { battleTankRecipes } from "./battleTanks";
import { cruiserTankRecipes } from "./cruiserTanks";
import { trailerRecipes } from "./trailers";
import { superTankRecipes } from "./superTanks";
import { lightUtilityVehicleRecipes } from "./lightUtilityVehicles";
import { motorcycleRecipes } from "./motorcycles";

/**
 * Central registry of all vehicle recipes.
 * Vehicle recipes are now organized by category in separate files:
 * - armouredFightingVehicles.ts: Armored Cars, Tankettes, Landing APCs, Half-Tracks
 * - fieldWeapons.ts: Field AT Rifles, Machine Guns, Field Guns, Artillery
 * - tanks.ts: Scout Tanks (and future tank categories)
 * - lightTanks.ts: Light Tanks
 * - assaultTanks.ts: Assault Tanks
 * - siegeTanks.ts: Siege Tanks
 * - destroyerTanks.ts: Destroyer Tanks
 * - battleTanks.ts: Battle Tanks
 * - cruiserTanks.ts: Cruiser Tanks
 * - superTanks.ts: Super Tanks
 * - logisticsVehicles.ts: Fuel Tankers
 * - trailers.ts: Trailers
 * - scoutVehicles.ts: Future scout vehicles
 * - lightUtilityVehicles.ts: Light Utility Vehicles
 * - motorcycles.ts: Motorcycles
 */
export const vehicleRecipes = new Map<string, IRecipe[]>([
  ...armouredFightingVehicleRecipes,
  ...fieldWeaponRecipes,
  ...tankRecipes,
  ...logisticsVehicleRecipes,
  ...trailerRecipes,
  ...scoutVehicleRecipes,
  ...lightTankRecipes,
  ...assaultTankRecipes,
  ...siegeTankRecipes,
  ...destroyerTankRecipes,
  ...battleTankRecipes,
  ...cruiserTankRecipes,
  ...superTankRecipes,
  ...lightUtilityVehicleRecipes,
  ...motorcycleRecipes,
]);
