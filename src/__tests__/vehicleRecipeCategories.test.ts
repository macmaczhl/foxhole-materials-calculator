/**
 * Tests for vehicle recipe organization by category
 */
import { Vehicles } from "../lib/models";
import { vehicleRecipes } from "../lib/recipes/vehicles";
import { armouredFightingVehicleRecipes } from "../lib/recipes/armouredFightingVehicles";
import { fieldWeaponRecipes } from "../lib/recipes/fieldWeapons";
import { tankRecipes } from "../lib/recipes/tanks";
import { logisticsVehicleRecipes } from "../lib/recipes/logisticsVehicles";
import { scoutVehicleRecipes } from "../lib/recipes/scoutVehicles";
import { lightTankRecipes } from "../lib/recipes/lightTanks";
import { assaultTankRecipes } from "../lib/recipes/assaultTanks";
import { destroyerTankRecipes } from "../lib/recipes/destroyerTanks";
import { battleTankRecipes } from "../lib/recipes/battleTanks";
import { cruiserTankRecipes } from "../lib/recipes/cruiserTanks";

describe("Vehicle Recipe Organization", () => {
  describe("Category Files", () => {
    test("armouredFightingVehicleRecipes contains armored cars", () => {
      expect(armouredFightingVehicleRecipes.has(Vehicles.Xiphos)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Percutio)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Gemini)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.OBrienV110)).toBe(
        true
      );
      expect(armouredFightingVehicleRecipes.has(Vehicles.OBrienKnave)).toBe(
        true
      );
      expect(armouredFightingVehicleRecipes.has(Vehicles.OBrienSquire)).toBe(
        true
      );
      expect(
        armouredFightingVehicleRecipes.has(Vehicles.OBrienGravekeeper)
      ).toBe(true);
      expect(
        armouredFightingVehicleRecipes.has(Vehicles.OBrienHighlander)
      ).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.OBrienFreeman)).toBe(
        true
      );
      expect(armouredFightingVehicleRecipes.has(Vehicles.OBrienWildJack)).toBe(
        true
      );
    });

    test("armouredFightingVehicleRecipes contains tankettes", () => {
      expect(armouredFightingVehicleRecipes.has(Vehicles.Actaeon)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Vesta)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Ixion)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Deioneus)).toBe(true);
    });

    test("armouredFightingVehicleRecipes contains landing APCs", () => {
      expect(armouredFightingVehicleRecipes.has(Vehicles.Acheron)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Doru)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.MulloyLPC)).toBe(
        true
      );
    });

    test("armouredFightingVehicleRecipes contains half-tracks", () => {
      expect(armouredFightingVehicleRecipes.has(Vehicles.Javelin)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Hoplite)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.Peltast)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.NiskaMkI)).toBe(true);
      expect(armouredFightingVehicleRecipes.has(Vehicles.NiskaMkII)).toBe(
        true
      );
      expect(armouredFightingVehicleRecipes.has(Vehicles.NiskaMkIII)).toBe(
        true
      );
      expect(
        armouredFightingVehicleRecipes.has(Vehicles.NiskaRyckerMkIX)
      ).toBe(true);
    });

    test("fieldWeaponRecipes contains field AT rifles and machine guns", () => {
      expect(fieldWeaponRecipes.has(Vehicles.DuncansCoin20mm)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.GA6Cestus)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Swallowtail)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Sagittarii)).toBe(true);
    });

    test("fieldWeaponRecipes contains field guns and artillery", () => {
      expect(fieldWeaponRecipes.has(Vehicles.WaspNest)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Koronides)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Wolfhound)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.CollinsCannon)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.BatteringRam)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Falconer)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Tisiphone)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Alekto)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Rampart)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Smelter)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.Stockade)).toBe(true);
      expect(fieldWeaponRecipes.has(Vehicles.StygianBolt)).toBe(true);
    });

    test("tankRecipes contains scout tanks", () => {
      expect(tankRecipes.has(Vehicles.KingSpireMkI)).toBe(true);
      expect(tankRecipes.has(Vehicles.KingJesterMkI1)).toBe(true);
      expect(tankRecipes.has(Vehicles.KingGallantMkII)).toBe(true);
    });

    test("assaultTankRecipes contains assault tanks", () => {
      expect(assaultTankRecipes.has(Vehicles.Falchion)).toBe(true);
    });

    test("destroyerTankRecipes contains destroyer tanks", () => {
      expect(destroyerTankRecipes.has(Vehicles.NobleWidowMkXIV)).toBe(true);
    });

    test("battleTankRecipes contains battle tanks", () => {
      expect(battleTankRecipes.has(Vehicles.FloodJuggernautMkVII)).toBe(true);
    });

    test("cruiserTankRecipes contains cruiser tanks", () => {
      expect(cruiserTankRecipes.has(Vehicles.GallagherBrigandMkI)).toBe(true);
      expect(cruiserTankRecipes.has(Vehicles.GallagherHighwaymanMkIII)).toBe(true);
      expect(cruiserTankRecipes.has(Vehicles.GallagherThornfallMkVI)).toBe(
        true
      );
    });

    test("logisticsVehicleRecipes is empty (placeholder)", () => {
      expect(logisticsVehicleRecipes.size).toBe(0);
    });

    test("scoutVehicleRecipes is empty (placeholder)", () => {
      expect(scoutVehicleRecipes.size).toBe(0);
    });
  });

  describe("Central Registry", () => {
    test("vehicleRecipes contains all vehicles from all categories", () => {
      const totalExpectedSize =
        armouredFightingVehicleRecipes.size +
        fieldWeaponRecipes.size +
        tankRecipes.size +
        logisticsVehicleRecipes.size +
        scoutVehicleRecipes.size +
        lightTankRecipes.size +
        assaultTankRecipes.size +
        destroyerTankRecipes.size +
        battleTankRecipes.size +
        cruiserTankRecipes.size;

      expect(vehicleRecipes.size).toBe(totalExpectedSize);
    });

    test("vehicleRecipes contains recipes from armouredFightingVehicles", () => {
      expect(vehicleRecipes.has(Vehicles.Xiphos)).toBe(true);
      expect(vehicleRecipes.has(Vehicles.Actaeon)).toBe(true);
      expect(vehicleRecipes.has(Vehicles.Acheron)).toBe(true);
      expect(vehicleRecipes.has(Vehicles.Javelin)).toBe(true);
    });

    test("vehicleRecipes contains recipes from fieldWeapons", () => {
      expect(vehicleRecipes.has(Vehicles.Swallowtail)).toBe(true);
      expect(vehicleRecipes.has(Vehicles.Wolfhound)).toBe(true);
    });

    test("vehicleRecipes contains recipes from tanks", () => {
      expect(vehicleRecipes.has(Vehicles.KingSpireMkI)).toBe(true);
    });

    test("all vehicle recipes return same data whether accessed from category or central registry", () => {
      // Test a sample from each category
      expect(vehicleRecipes.get(Vehicles.Xiphos)).toEqual(
        armouredFightingVehicleRecipes.get(Vehicles.Xiphos)
      );
      expect(vehicleRecipes.get(Vehicles.Swallowtail)).toEqual(
        fieldWeaponRecipes.get(Vehicles.Swallowtail)
      );
      expect(vehicleRecipes.get(Vehicles.KingSpireMkI)).toEqual(
        tankRecipes.get(Vehicles.KingSpireMkI)
      );
    });
  });

  describe("Recipe Integrity", () => {
    test("all vehicle recipes have at least one recipe", () => {
      for (const [, recipes] of vehicleRecipes.entries()) {
        expect(recipes.length).toBeGreaterThan(0);
        expect(recipes[0]).toHaveProperty("id");
        expect(recipes[0]).toHaveProperty("required");
        expect(recipes[0]).toHaveProperty("produced");
      }
    });

    test("vehicle recipes are properly categorized and not duplicated", () => {
      const allCategoryRecipes = [
        ...armouredFightingVehicleRecipes.keys(),
        ...fieldWeaponRecipes.keys(),
        ...tankRecipes.keys(),
        ...logisticsVehicleRecipes.keys(),
        ...scoutVehicleRecipes.keys(),
        ...lightTankRecipes.keys(),
        ...assaultTankRecipes.keys(),
        ...destroyerTankRecipes.keys(),
        ...battleTankRecipes.keys(),
        ...cruiserTankRecipes.keys(),
      ];

      // Check no duplicates across categories
      const uniqueVehicles = new Set(allCategoryRecipes);
      expect(uniqueVehicles.size).toBe(allCategoryRecipes.length);
    });
  });
});
