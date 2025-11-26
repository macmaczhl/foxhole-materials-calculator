/**
 * Tests for Construction Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { constructionVehicleRecipes } from "../lib/recipes/constructionVehicles";

describe("Construction Vehicles", () => {
  describe("Recipe availability", () => {
    test("all construction vehicles have recipes defined", () => {
      const constructionVehicles = [
        Vehicles.BMSUniversalAssemblyRig,
        Vehicles.BMSFabricator,
      ];

      constructionVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all construction vehicle recipes have valid requirements", () => {
      const constructionVehicles = [
        Vehicles.BMSUniversalAssemblyRig,
        Vehicles.BMSFabricator,
      ];

      constructionVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("construction vehicles are in the construction vehicle recipes", () => {
      expect(
        constructionVehicleRecipes.has(Vehicles.BMSUniversalAssemblyRig)
      ).toBe(true);
      expect(constructionVehicleRecipes.has(Vehicles.BMSFabricator)).toBe(true);
      expect(constructionVehicleRecipes.size).toBe(2);
    });
  });

  describe("BMS - Universal Assembly Rig (Construction Vehicle)", () => {
    let cvRecipes: IRecipe[];
    let cvRecipeTree: RecipeTree;

    beforeEach(() => {
      cvRecipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig)!;
      cvRecipeTree = {
        stuff: Vehicles.BMSUniversalAssemblyRig,
        selectedRecipe: cvRecipes[0],
        recipes: cvRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = cvRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(cvRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = cvRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = cvRecipes.filter((r) => r.produced[0].count > 1);
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = cvRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = cvRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = cvRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(cvRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(cvRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("BMS - Fabricator (Advanced Construction Vehicle)", () => {
    let acvRecipes: IRecipe[];
    let acvRecipeTree: RecipeTree;

    beforeEach(() => {
      acvRecipes = RecipiesByStuff.get(Vehicles.BMSFabricator)!;
      acvRecipeTree = {
        stuff: Vehicles.BMSFabricator,
        selectedRecipe: acvRecipes[0],
        recipes: acvRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = acvRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
        { stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.BMSFabricator, count: 1 },
      ]);
    });

    test("has only one recipe (assembly station)", () => {
      expect(acvRecipes.length).toBe(1);
    });

    test("requires a BMS - Universal Assembly Rig as input", () => {
      const recipe = acvRecipes[0];
      const cvRequirement = recipe.required.find(
        (r) => r.stuff === Vehicles.BMSUniversalAssemblyRig
      );
      expect(cvRequirement).toBeDefined();
      expect(cvRequirement!.count).toBe(1);
    });

    test("requires Processed Construction Materials", () => {
      const recipe = acvRecipes[0];
      const pcmRequirement = recipe.required.find(
        (r) => r.stuff === Materials.ProcessedConstructionMaterials
      );
      expect(pcmRequirement).toBeDefined();
      expect(pcmRequirement!.count).toBe(10);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(acvRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
        { stuff: Vehicles.BMSUniversalAssemblyRig, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(acvRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
        { stuff: Vehicles.BMSUniversalAssemblyRig, count: 2 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all construction vehicles can be calculated without errors", () => {
      const constructionVehicles = [
        Vehicles.BMSUniversalAssemblyRig,
        Vehicles.BMSFabricator,
      ];

      constructionVehicles.forEach((vehicle) => {
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
