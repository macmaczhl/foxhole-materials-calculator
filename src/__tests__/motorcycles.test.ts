/**
 * Tests for Motorcycles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { motorcycleRecipes } from "../lib/recipes/motorcycles";

describe("Motorcycles", () => {
  describe("Recipe availability", () => {
    test("all motorcycles have recipes defined", () => {
      const motorcycles = [Vehicles.O3MMCaster, Vehicles.O0MSStinger, Vehicles.KivelaPowerWheel801];

      motorcycles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all motorcycle recipes have valid requirements", () => {
      const motorcycles = [Vehicles.O3MMCaster, Vehicles.O0MSStinger, Vehicles.KivelaPowerWheel801];

      motorcycles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("motorcycles are in the motorcycle recipes", () => {
      expect(motorcycleRecipes.has(Vehicles.O3MMCaster)).toBe(true);
      expect(motorcycleRecipes.has(Vehicles.O0MSStinger)).toBe(true);
      expect(motorcycleRecipes.has(Vehicles.KivelaPowerWheel801)).toBe(true);
      expect(motorcycleRecipes.size).toBe(3);
    });
  });

  describe('03MM "Caster" (Colonial Motorcycle)', () => {
    let casterRecipes: IRecipe[];
    let casterRecipeTree: RecipeTree;

    beforeEach(() => {
      casterRecipes = RecipiesByStuff.get(Vehicles.O3MMCaster)!;
      casterRecipeTree = {
        stuff: Vehicles.O3MMCaster,
        selectedRecipe: casterRecipes[0],
        recipes: casterRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = casterRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 85 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.O3MMCaster, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(casterRecipes.length).toBe(4);

      // Check basic recipe (85 → 1)
      const basicRecipe = casterRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(85);

      // Check mass production recipes exist
      const massProduction = casterRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = casterRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(611);

      const recipe12 = casterRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(764);

      const recipe15 = casterRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(891);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(casterRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 85 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(casterRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 255 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all motorcycles can be calculated without errors", () => {
      const motorcycles = [Vehicles.O3MMCaster, Vehicles.O0MSStinger, Vehicles.KivelaPowerWheel801];

      motorcycles.forEach((vehicle) => {
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

  describe('00MS "Stinger" (Colonial MG Motorcycle)', () => {
    let stingerRecipes: IRecipe[];
    let stingerRecipeTree: RecipeTree;

    beforeEach(() => {
      stingerRecipes = RecipiesByStuff.get(Vehicles.O0MSStinger)!;
      stingerRecipeTree = {
        stuff: Vehicles.O0MSStinger,
        selectedRecipe: stingerRecipes[0],
        recipes: stingerRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const assemblyRecipe = stingerRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 5 },
        { stuff: Vehicles.O3MMCaster, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.O0MSStinger, count: 1 },
      ]);
    });

    test("has only one recipe (assembly production)", () => {
      expect(stingerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(stingerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 5 },
        { stuff: Vehicles.O3MMCaster, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(stingerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 15 },
        { stuff: Vehicles.O3MMCaster, count: 3 },
      ]);
    });
  });

  describe('Kivela Power Wheel 80-1 (Warden Motorcycle)', () => {
    let kivelaPowerWheel801Recipes: IRecipe[];
    let kivelaPowerWheel801RecipeTree: RecipeTree;

    beforeEach(() => {
      kivelaPowerWheel801Recipes = RecipiesByStuff.get(Vehicles.KivelaPowerWheel801)!;
      kivelaPowerWheel801RecipeTree = {
        stuff: Vehicles.KivelaPowerWheel801,
        selectedRecipe: kivelaPowerWheel801Recipes[0],
        recipes: kivelaPowerWheel801Recipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = kivelaPowerWheel801Recipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 85 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.KivelaPowerWheel801, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(kivelaPowerWheel801Recipes.length).toBe(4);

      // Check basic recipe (85 → 1)
      const basicRecipe = kivelaPowerWheel801Recipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(85);

      // Check mass production recipes exist
      const massProduction = kivelaPowerWheel801Recipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = kivelaPowerWheel801Recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(611);

      const recipe12 = kivelaPowerWheel801Recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(764);

      const recipe15 = kivelaPowerWheel801Recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(891);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(kivelaPowerWheel801RecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 85 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(kivelaPowerWheel801RecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 255 },
      ]);
    });
  });
});
