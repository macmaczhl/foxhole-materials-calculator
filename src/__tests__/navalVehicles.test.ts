/**
 * Tests for Naval Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { navalVehicleRecipes } from "../lib/recipes/navalVehicles";

describe("Naval Vehicles", () => {
  describe("Recipe availability", () => {
    test("all naval vehicles have recipes defined", () => {
      const navalVehicles = [Vehicles.BMSAquatipper];

      navalVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all naval vehicle recipes have valid requirements", () => {
      const navalVehicles = [Vehicles.BMSAquatipper];

      navalVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("naval vehicles are in the naval vehicle recipes map", () => {
      expect(navalVehicleRecipes.has(Vehicles.BMSAquatipper)).toBe(true);
      expect(navalVehicleRecipes.size).toBe(1);
    });
  });

  describe("BMS - Aquatipper (Barge)", () => {
    let bmsAquatipperRecipes: IRecipe[];
    let bmsAquatipperRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsAquatipperRecipes = RecipiesByStuff.get(Vehicles.BMSAquatipper)!;
      bmsAquatipperRecipeTree = {
        stuff: Vehicles.BMSAquatipper,
        selectedRecipe: bmsAquatipperRecipes[0],
        recipes: bmsAquatipperRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const shipyardRecipe = bmsAquatipperRecipes[0];
      expect(shipyardRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
      expect(shipyardRecipe.produced).toEqual([
        { stuff: Vehicles.BMSAquatipper, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(bmsAquatipperRecipes.length).toBe(4);

      // Check basic recipe (150 → 1)
      const basicRecipe = bmsAquatipperRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(150);

      // Check mass production recipes exist
      const massProduction = bmsAquatipperRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = bmsAquatipperRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(1080);

      const recipe12 = bmsAquatipperRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1350);

      const recipe15 = bmsAquatipperRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1575);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsAquatipperRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsAquatipperRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all naval vehicles can be calculated without errors", () => {
      const navalVehicles = [Vehicles.BMSAquatipper];

      navalVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipeTree: RecipeTree = {
          stuff: vehicle,
          selectedRecipe: recipes[0],
          recipes: recipes,
          required: [],
        };

        // Should not throw an error
        expect(() => {
          const result = calculateComponents(recipeTree, 1);
          expect(result.initial.length).toBeGreaterThan(0);
        }).not.toThrow();
      });
    });
  });
});
