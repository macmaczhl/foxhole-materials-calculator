/**
 * Tests for Trailers
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { trailerRecipes } from "../lib/recipes/trailers";

describe("Trailers", () => {
  describe("Recipe availability", () => {
    test("all trailers have recipes defined", () => {
      const trailers = [
        Vehicles.RoosterJunkwagon,
        Vehicles.RoosterLamploader,
        Vehicles.RoosterTumblebox,
      ];

      trailers.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all trailer recipes have valid requirements", () => {
      const trailers = [
        Vehicles.RoosterJunkwagon,
        Vehicles.RoosterLamploader,
        Vehicles.RoosterTumblebox,
      ];

      trailers.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("trailers are in the trailer recipes map", () => {
      expect(trailerRecipes.has(Vehicles.RoosterJunkwagon)).toBe(true);
      expect(trailerRecipes.has(Vehicles.RoosterLamploader)).toBe(true);
      expect(trailerRecipes.has(Vehicles.RoosterTumblebox)).toBe(true);
      expect(trailerRecipes.size).toBe(3);
    });
  });

  describe("Rooster - Junkwagon (Base Trailer)", () => {
    let junkwagonRecipes: IRecipe[];
    let junkwagonRecipeTree: RecipeTree;

    beforeEach(() => {
      junkwagonRecipes = RecipiesByStuff.get(Vehicles.RoosterJunkwagon)!;
      junkwagonRecipeTree = {
        stuff: Vehicles.RoosterJunkwagon,
        selectedRecipe: junkwagonRecipes[0],
        recipes: junkwagonRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = junkwagonRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 10 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.RoosterJunkwagon, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(junkwagonRecipes.length).toBe(4);

      // Check basic recipe (10 → 1)
      const basicRecipe = junkwagonRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(basicRecipe!.required[0].count).toBe(10);

      // Check mass production recipes exist
      const massProduction = junkwagonRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = junkwagonRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(72);

      const recipe12 = junkwagonRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(90);

      const recipe15 = junkwagonRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(105);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(junkwagonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 10 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(junkwagonRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 30 },
      ]);
    });
  });

  describe("Rooster - Lamploader (Fuel Trailer Variant)", () => {
    let lamploaderRecipes: IRecipe[];
    let lamploaderRecipeTree: RecipeTree;

    beforeEach(() => {
      lamploaderRecipes = RecipiesByStuff.get(Vehicles.RoosterLamploader)!;
      lamploaderRecipeTree = {
        stuff: Vehicles.RoosterLamploader,
        selectedRecipe: lamploaderRecipes[0],
        recipes: lamploaderRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const assemblyRecipe = lamploaderRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
        { stuff: Vehicles.RoosterJunkwagon, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.RoosterLamploader, count: 1 },
      ]);
    });

    test("has only one recipe (Small Assembly Station variant)", () => {
      expect(lamploaderRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(lamploaderRecipeTree, 1);

      // Should show direct requirements in initial
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 10,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 5,
      });
      expect(result.initial).toContainEqual({
        stuff: Vehicles.RoosterJunkwagon,
        count: 1,
      });
    });
  });

  describe("Rooster - Tumblebox (Material Trailer Variant)", () => {
    let tumbleboxRecipes: IRecipe[];
    let tumbleboxRecipeTree: RecipeTree;

    beforeEach(() => {
      tumbleboxRecipes = RecipiesByStuff.get(Vehicles.RoosterTumblebox)!;
      tumbleboxRecipeTree = {
        stuff: Vehicles.RoosterTumblebox,
        selectedRecipe: tumbleboxRecipes[0],
        recipes: tumbleboxRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const assemblyRecipe = tumbleboxRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
        { stuff: Vehicles.RoosterJunkwagon, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.RoosterTumblebox, count: 1 },
      ]);
    });

    test("has only one recipe (Small Assembly Station variant)", () => {
      expect(tumbleboxRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(tumbleboxRecipeTree, 1);

      // Should show direct requirements in initial
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 10,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 5,
      });
      expect(result.initial).toContainEqual({
        stuff: Vehicles.RoosterJunkwagon,
        count: 1,
      });
    });
  });

  describe("Recipe calculation integration", () => {
    test("all trailers can be calculated without errors", () => {
      const trailers = [
        Vehicles.RoosterJunkwagon,
        Vehicles.RoosterLamploader,
        Vehicles.RoosterTumblebox,
      ];

      trailers.forEach((vehicle) => {
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

  describe("Variant trailers have identical upgrade costs", () => {
    test("Lamploader and Tumblebox have identical upgrade requirements", () => {
      const lamploaderRecipes = RecipiesByStuff.get(
        Vehicles.RoosterLamploader
      )!;
      const tumbleboxRecipes = RecipiesByStuff.get(Vehicles.RoosterTumblebox)!;

      expect(lamploaderRecipes.length).toBe(tumbleboxRecipes.length);

      // Compare each recipe's requirements (should be identical)
      lamploaderRecipes.forEach((lamploaderRecipe, index) => {
        const tumbleboxRecipe = tumbleboxRecipes[index];
        expect(lamploaderRecipe.required).toEqual(tumbleboxRecipe.required);
        expect(lamploaderRecipe.produced[0].count).toBe(
          tumbleboxRecipe.produced[0].count
        );
      });
    });
  });
});
