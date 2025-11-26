/**
 * Tests for Ambulance Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { ambulanceRecipes } from "../lib/recipes/ambulances";

describe("Ambulance Vehicles", () => {
  describe("Recipe availability", () => {
    test("Dunne Responder 3e has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.DunneResponder3e)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.DunneResponder3e);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("Dunne Responder 3e recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.DunneResponder3e)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("Dunne Responder 3e is in the ambulance recipes", () => {
      expect(ambulanceRecipes.has(Vehicles.DunneResponder3e)).toBe(true);
    });
  });

  describe("Dunne Responder 3e (Warden Ambulance)", () => {
    let dunneResponder3eRecipes: IRecipe[];
    let dunneResponder3eRecipeTree: RecipeTree;

    beforeEach(() => {
      dunneResponder3eRecipes = RecipiesByStuff.get(Vehicles.DunneResponder3e)!;
      dunneResponder3eRecipeTree = {
        stuff: Vehicles.DunneResponder3e,
        selectedRecipe: dunneResponder3eRecipes[0],
        recipes: dunneResponder3eRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = dunneResponder3eRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.DunneResponder3e, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(dunneResponder3eRecipes.length).toBe(4);

      // Check basic recipe (150 → 1)
      const basicRecipe = dunneResponder3eRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(150);

      // Check mass production recipes exist
      const massProduction = dunneResponder3eRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities (from wiki)
      // 3 crates: 1080 Basic Materials → 9 vehicles
      const recipe9 = dunneResponder3eRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(1080);

      // 4 crates: 1350 Basic Materials → 12 vehicles
      const recipe12 = dunneResponder3eRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1350);

      // 5 crates: 1575 Basic Materials → 15 vehicles
      const recipe15 = dunneResponder3eRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1575);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(dunneResponder3eRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(dunneResponder3eRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("Dunne Responder 3e can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.DunneResponder3e)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.DunneResponder3e,
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
