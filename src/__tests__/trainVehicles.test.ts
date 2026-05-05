/**
 * Tests for Train Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { trainVehicleRecipes } from "../lib/recipes/trainVehicles";

describe("Train Vehicles", () => {
  describe("Recipe availability", () => {
    test("all train vehicles have recipes defined", () => {
      const trainVehicles = [Vehicles.BMSHoldout];

      trainVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all train vehicle recipes have valid requirements", () => {
      const trainVehicles = [Vehicles.BMSHoldout];

      trainVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("train vehicles are in the train vehicle recipes map", () => {
      expect(trainVehicleRecipes.has(Vehicles.BMSHoldout)).toBe(true);
      expect(trainVehicleRecipes.size).toBe(1);
    });
  });

  describe("BMS Holdout (Infantry Car)", () => {
    let bmsHoldoutRecipes: IRecipe[];
    let bmsHoldoutRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsHoldoutRecipes = RecipiesByStuff.get(Vehicles.BMSHoldout)!;
      bmsHoldoutRecipeTree = {
        stuff: Vehicles.BMSHoldout,
        selectedRecipe: bmsHoldoutRecipes[0],
        recipes: bmsHoldoutRecipes,
        required: [],
      };
    });

    test("has correct large assembly station recipe requirements", () => {
      const recipe = bmsHoldoutRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
        { stuff: Materials.AssemblyMaterialsIII, count: 5 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSHoldout, count: 1 },
      ]);
    });

    test("has only large assembly station recipe (no mass production)", () => {
      expect(bmsHoldoutRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsHoldoutRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 20 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
        { stuff: Materials.AssemblyMaterialsIII, count: 5 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsHoldoutRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 60 },
        { stuff: Materials.AssemblyMaterialsII, count: 45 },
        { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all train vehicles can be calculated without errors", () => {
      const trainVehicles = [Vehicles.BMSHoldout];

      trainVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipeTree: RecipeTree = {
          stuff: vehicle,
          selectedRecipe: recipes[0],
          recipes: recipes,
          required: [],
        };

        expect(() => calculateComponents(recipeTree, 1)).not.toThrow();
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      });
    });
  });
});
