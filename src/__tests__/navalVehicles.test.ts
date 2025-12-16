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
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.MacConmaraShorerunner,
      ];

      navalVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all naval vehicle recipes have valid requirements", () => {
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.MacConmaraShorerunner,
      ];

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
      expect(navalVehicleRecipes.has(Vehicles.BMSIronship)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.MacConmaraShorerunner)).toBe(
        true
      );
      expect(navalVehicleRecipes.size).toBe(3);
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
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.MacConmaraShorerunner,
      ];

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

  describe("BMS - Ironship (Freighter)", () => {
    let bmsIronshipRecipes: IRecipe[];
    let bmsIronshipRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsIronshipRecipes = RecipiesByStuff.get(Vehicles.BMSIronship)!;
      bmsIronshipRecipeTree = {
        stuff: Vehicles.BMSIronship,
        selectedRecipe: bmsIronshipRecipes[0],
        recipes: bmsIronshipRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const shipyardRecipe = bmsIronshipRecipes[0];
      expect(shipyardRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 500 },
      ]);
      expect(shipyardRecipe.produced).toEqual([
        { stuff: Vehicles.BMSIronship, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(bmsIronshipRecipes.length).toBe(4);

      // Check basic recipe (500 → 1)
      const basicRecipe = bmsIronshipRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(500);

      // Check mass production recipes exist
      const massProduction = bmsIronshipRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = bmsIronshipRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(3600);

      const recipe12 = bmsIronshipRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(4500);

      const recipe15 = bmsIronshipRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(5250);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsIronshipRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 500 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsIronshipRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 1500 },
      ]);
    });
  });

  describe("MacConmara Shorerunner (Landing Ship)", () => {
    let macConmaraShorerunnerRecipes: IRecipe[];
    let macConmaraShorerunnerRecipeTree: RecipeTree;

    beforeEach(() => {
      macConmaraShorerunnerRecipes = RecipiesByStuff.get(
        Vehicles.MacConmaraShorerunner
      )!;
      macConmaraShorerunnerRecipeTree = {
        stuff: Vehicles.MacConmaraShorerunner,
        selectedRecipe: macConmaraShorerunnerRecipes[0],
        recipes: macConmaraShorerunnerRecipes,
        required: [],
      };
    });

    test("has correct base ship recipe requirements", () => {
      const baseShipRecipe = macConmaraShorerunnerRecipes[0];
      expect(baseShipRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
      expect(baseShipRecipe.produced).toEqual([
        { stuff: Vehicles.MacConmaraShorerunner, count: 1 },
      ]);
    });

    test("has single recipe (no mass production)", () => {
      expect(macConmaraShorerunnerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(macConmaraShorerunnerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(macConmaraShorerunnerRecipeTree, 5);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 50 },
      ]);
    });
  });
});
