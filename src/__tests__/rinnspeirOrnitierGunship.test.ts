/**
 * Tests for Rinnspeir Ornitier-Class Gunship
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { navalVehicleRecipes } from "../lib/recipes/navalVehicles";

describe("Rinnspeir Ornitier-Class Gunship", () => {
  describe("Recipe availability", () => {
    test("has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.RinnspeirOrnitierClassGunship)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.RinnspeirOrnitierClassGunship);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("all recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.RinnspeirOrnitierClassGunship)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("is in the naval vehicle recipes map", () => {
      expect(navalVehicleRecipes.has(Vehicles.RinnspeirOrnitierClassGunship)).toBe(true);
    });
  });

  describe("Rinnspeir Ornitier-Class Gunship recipes", () => {
    let ornitierRecipes: IRecipe[];
    let ornitierRecipeTree: RecipeTree;

    beforeEach(() => {
      ornitierRecipes = RecipiesByStuff.get(Vehicles.RinnspeirOrnitierClassGunship)!;
      ornitierRecipeTree = {
        stuff: Vehicles.RinnspeirOrnitierClassGunship,
        selectedRecipe: ornitierRecipes[0],
        recipes: ornitierRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const shipyardRecipe = ornitierRecipes[0];
      expect(shipyardRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
      expect(shipyardRecipe.produced).toEqual([
        { stuff: Vehicles.RinnspeirOrnitierClassGunship, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(ornitierRecipes.length).toBe(4);

      // Check shipyard recipe (450 → 1)
      const shipyardRecipe = ornitierRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(shipyardRecipe).toBeDefined();
      expect(shipyardRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(shipyardRecipe!.required[0].count).toBe(450);

      // Check mass production recipes exist
      const massProduction = ornitierRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = ornitierRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(3240);

      const recipe12 = ornitierRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(4050);

      const recipe15 = ornitierRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(4725);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(ornitierRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(ornitierRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 1350 },
      ]);
    });

    test("calculates components correctly for mass production (9 units)", () => {
      const massProductionRecipe = ornitierRecipes.find(
        (r) => r.produced[0].count === 9
      )!;
      const massProductionTree: RecipeTree = {
        stuff: Vehicles.RinnspeirOrnitierClassGunship,
        selectedRecipe: massProductionRecipe,
        recipes: ornitierRecipes,
        required: [],
      };

      const result = calculateComponents(massProductionTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 3240 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.RinnspeirOrnitierClassGunship)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.RinnspeirOrnitierClassGunship,
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
