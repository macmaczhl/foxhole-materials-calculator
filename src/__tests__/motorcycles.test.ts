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
      const motorcycles = [Vehicles.O3MMCaster];

      motorcycles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all motorcycle recipes have valid requirements", () => {
      const motorcycles = [Vehicles.O3MMCaster];

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
      expect(motorcycleRecipes.size).toBe(1);
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
      const motorcycles = [Vehicles.O3MMCaster];

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
});
