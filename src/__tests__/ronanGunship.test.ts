/**
 * Tests for 74b-1 Ronan Gunship
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { navalVehicleRecipes } from "../lib/recipes/navalVehicles";

describe("74b-1 Ronan Gunship", () => {
  describe("Recipe availability", () => {
    test("has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.RonanGunship74b1)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.RonanGunship74b1);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("all recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.RonanGunship74b1)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("is in the naval vehicle recipes map", () => {
      expect(navalVehicleRecipes.has(Vehicles.RonanGunship74b1)).toBe(true);
    });
  });

  describe("74b-1 Ronan Gunship recipes", () => {
    let ronanRecipes: IRecipe[];
    let ronanRecipeTree: RecipeTree;

    beforeEach(() => {
      ronanRecipes = RecipiesByStuff.get(Vehicles.RonanGunship74b1)!;
      ronanRecipeTree = {
        stuff: Vehicles.RonanGunship74b1,
        selectedRecipe: ronanRecipes[0],
        recipes: ronanRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const shipyardRecipe = ronanRecipes[0];
      expect(shipyardRecipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 140 },
      ]);
      expect(shipyardRecipe.produced).toEqual([
        { stuff: Vehicles.RonanGunship74b1, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(ronanRecipes.length).toBe(4);

      // Check shipyard recipe (140 → 1)
      const shipyardRecipe = ronanRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(shipyardRecipe).toBeDefined();
      expect(shipyardRecipe!.required[0].stuff).toBe(
        Materials.RefinedMaterials
      );
      expect(shipyardRecipe!.required[0].count).toBe(140);

      // Check mass production recipes exist
      const massProduction = ronanRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = ronanRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(1008);

      const recipe12 = ronanRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1260);

      const recipe15 = ronanRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1470);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(ronanRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 140 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(ronanRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 420 },
      ]);
    });

    test("calculates components correctly for mass production (9 units)", () => {
      const massProductionRecipe = ronanRecipes.find(
        (r) => r.produced[0].count === 9
      )!;
      const massProductionTree: RecipeTree = {
        stuff: Vehicles.RonanGunship74b1,
        selectedRecipe: massProductionRecipe,
        recipes: ronanRecipes,
        required: [],
      };

      const result = calculateComponents(massProductionTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1008 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.RonanGunship74b1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.RonanGunship74b1,
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
