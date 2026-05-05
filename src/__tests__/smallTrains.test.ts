/**
 * Tests for Small Train Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { smallTrainRecipes } from "../lib/recipes/trains/smallTrains";

describe("Small Train Vehicles", () => {
  describe("Recipe availability", () => {
    test("BMS Linerunner has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSLinerunner)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSLinerunner);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Linerunner is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSLinerunner)).toBe(true);
      expect(smallTrainRecipes.size).toBe(1);
    });

    test("BMS Linerunner recipe has valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSLinerunner)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });
  });

  describe("BMS Linerunner (Small Flatbed Car)", () => {
    let bmsLinerunnerRecipes: IRecipe[];
    let bmsLinerunnerRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsLinerunnerRecipes = RecipiesByStuff.get(Vehicles.BMSLinerunner)!;
      bmsLinerunnerRecipeTree = {
        stuff: Vehicles.BMSLinerunner,
        selectedRecipe: bmsLinerunnerRecipes[0],
        recipes: bmsLinerunnerRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsLinerunnerRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSLinerunner, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsLinerunnerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsLinerunnerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsLinerunnerRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsII, count: 10 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsLinerunnerRecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsLinerunnerRecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });
});
