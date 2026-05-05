/**
 * Tests for Large Crane Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { largeCraneRecipes } from "../lib/recipes/trains/largeCranes";

describe("Large Crane Vehicles", () => {
  describe("Recipe availability", () => {
    test("BMS - Overseer Sky-Hauler has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSOverseerSkyHauler)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSOverseerSkyHauler);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS - Overseer Sky-Hauler is in the large crane recipes map", () => {
      expect(largeCraneRecipes.has(Vehicles.BMSOverseerSkyHauler)).toBe(true);
    });

    test("large crane recipes map has correct size", () => {
      expect(largeCraneRecipes.size).toBe(1);
    });
  });

  describe("BMS - Overseer Sky-Hauler (Large Crane)", () => {
    let bmsOverseerSkyHaulerRecipes: IRecipe[];
    let bmsOverseerSkyHaulerRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsOverseerSkyHaulerRecipes = RecipiesByStuff.get(
        Vehicles.BMSOverseerSkyHauler
      )!;
      bmsOverseerSkyHaulerRecipeTree = {
        stuff: Vehicles.BMSOverseerSkyHauler,
        selectedRecipe: bmsOverseerSkyHaulerRecipes[0],
        recipes: bmsOverseerSkyHaulerRecipes,
        required: [],
      };
    });

    test("has correct Crane Railway Track recipe requirements", () => {
      const recipe = bmsOverseerSkyHaulerRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 250 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSOverseerSkyHauler, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsOverseerSkyHaulerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsOverseerSkyHaulerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 250 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsOverseerSkyHaulerRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 500 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsOverseerSkyHaulerRecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsOverseerSkyHaulerRecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });
});
