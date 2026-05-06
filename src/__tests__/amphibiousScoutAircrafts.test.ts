/**
 * Tests for Amphibious Scout Aircraft
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { amphibiousScoutAircraftRecipes } from "../lib/recipes/aircrafts";

describe("Amphibious Scout Aircraft", () => {
  describe("Recipe availability", () => {
    test("all amphibious scout aircraft have recipes defined", () => {
      const aircraftVehicles = [
        Vehicles.LuminaryMkIVHerald,
        Vehicles.A51VentiDaedalus,
      ];

      aircraftVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all amphibious scout aircraft recipes have valid requirements", () => {
      const aircraftVehicles = [
        Vehicles.LuminaryMkIVHerald,
        Vehicles.A51VentiDaedalus,
      ];

      aircraftVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("amphibious scout aircraft are in the recipe map", () => {
      expect(amphibiousScoutAircraftRecipes.has(Vehicles.LuminaryMkIVHerald)).toBe(true);
      expect(amphibiousScoutAircraftRecipes.has(Vehicles.A51VentiDaedalus)).toBe(true);
      expect(amphibiousScoutAircraftRecipes.size).toBe(2);
    });
  });

  describe("Luminary Mk. IV Herald (Warden Amphibious Scout Aircraft)", () => {
    let heraldRecipes: IRecipe[];
    let heraldRecipeTree: RecipeTree;

    beforeEach(() => {
      heraldRecipes = RecipiesByStuff.get(Vehicles.LuminaryMkIVHerald)!;
      heraldRecipeTree = {
        stuff: Vehicles.LuminaryMkIVHerald,
        selectedRecipe: heraldRecipes[0],
        recipes: heraldRecipes,
        required: [],
      };
    });

    test("has correct aircraft hangar recipe requirements", () => {
      const recipe = heraldRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 80 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.LuminaryMkIVHerald, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(heraldRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(heraldRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 80 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(heraldRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 240 },
      ]);
    });
  });

  describe('A51 Venti "Daedalus" (Colonial Amphibious Scout Aircraft)', () => {
    let daedalusRecipes: IRecipe[];
    let daedalusRecipeTree: RecipeTree;

    beforeEach(() => {
      daedalusRecipes = RecipiesByStuff.get(Vehicles.A51VentiDaedalus)!;
      daedalusRecipeTree = {
        stuff: Vehicles.A51VentiDaedalus,
        selectedRecipe: daedalusRecipes[0],
        recipes: daedalusRecipes,
        required: [],
      };
    });

    test("has correct aircraft hangar recipe requirements", () => {
      const recipe = daedalusRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 80 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.A51VentiDaedalus, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(daedalusRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(daedalusRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 80 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(daedalusRecipeTree, 5);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 400 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all amphibious scout aircraft can be calculated without errors", () => {
      const aircraftVehicles = [
        Vehicles.LuminaryMkIVHerald,
        Vehicles.A51VentiDaedalus,
      ];

      aircraftVehicles.forEach((vehicle) => {
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
