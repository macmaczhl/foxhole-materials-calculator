import { Materials, Vehicles, IRecipe, RecipeTree } from "../lib/models";
import { RecipiesByStuff } from "../lib/recipes";
import { calculateComponents } from "../lib/services/calculateComponents";

describe("Scout Tank Recipes", () => {
  describe("King Spire Mk. I", () => {
    let kingSpireRecipes: IRecipe[];

    beforeAll(() => {
      kingSpireRecipes = RecipiesByStuff.get(Vehicles.KingSpireMkI) || [];
    });

    test("has recipes defined", () => {
      expect(kingSpireRecipes).toBeDefined();
      expect(kingSpireRecipes.length).toBeGreaterThan(0);
    });

    test("garage recipe produces 1 vehicle for 70 refined materials", () => {
      const garageRecipe = kingSpireRecipes.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 70 &&
          r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.KingSpireMkI);
    });

    test("mass production recipes exist and are reasonable", () => {
      const massProductionRecipes = kingSpireRecipes.filter(
        (r) => r.produced[0].count > 1
      );

      expect(massProductionRecipes.length).toBe(3);

      // Check that mass production recipes produce multiple vehicles
      massProductionRecipes.forEach((recipe) => {
        const refinedMaterials = recipe.required[0].count;
        const vehiclesProduced = recipe.produced[0].count;
        expect(vehiclesProduced).toBeGreaterThan(1);
        expect(refinedMaterials).toBeGreaterThan(0);

        // Check reasonable ratio (should be around 50-70 per vehicle for mass production)
        const ratio = refinedMaterials / vehiclesProduced;
        expect(ratio).toBeGreaterThan(40);
        expect(ratio).toBeLessThan(80);
      });
    });

    test("calculation works correctly", () => {
      const mockRecipeTree: RecipeTree = {
        stuff: Vehicles.KingSpireMkI,
        selectedRecipe: kingSpireRecipes[0], // garage recipe
        recipes: kingSpireRecipes,
        required: [],
      };

      const result = calculateComponents(mockRecipeTree, 2);
      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 140 },
      ]);
    });
  });

  describe("King Gallant Mk. II", () => {
    let kingGallantRecipes: IRecipe[];

    beforeAll(() => {
      kingGallantRecipes = RecipiesByStuff.get(Vehicles.KingGallantMkII) || [];
    });

    test("has recipes defined", () => {
      expect(kingGallantRecipes).toBeDefined();
      expect(kingGallantRecipes.length).toBeGreaterThan(0);
    });

    test("recipe requires processed construction materials, assembly materials III, and King Spire Mk. I", () => {
      const recipe = kingGallantRecipes.find((r) => r.produced[0].count === 1);

      expect(recipe).toBeDefined();
      expect(recipe!.produced[0].stuff).toBe(Vehicles.KingGallantMkII);
      expect(recipe!.required.length).toBe(3);
      expect(recipe!.required[0].stuff).toBe(
        Materials.ProcessedConstructionMaterials
      );
      expect(recipe!.required[0].count).toBe(5);
      expect(recipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsIII);
      expect(recipe!.required[1].count).toBe(5);
      expect(recipe!.required[2].stuff).toBe(Vehicles.KingSpireMkI);
      expect(recipe!.required[2].count).toBe(1);
    });
  });

  describe("All new scout tanks", () => {
    test("all new vehicles are in RecipiesByStuff map", () => {
      expect(RecipiesByStuff.has(Vehicles.KingSpireMkI)).toBe(true);
      expect(RecipiesByStuff.has(Vehicles.KingGallantMkII)).toBe(true);
    });

    test("all recipes have correct structure", () => {
      const allNewVehicles = [
        Vehicles.KingSpireMkI,
        Vehicles.KingGallantMkII,
      ];

      allNewVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle) || [];
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.produced.length).toBe(1);
          expect(recipe.produced[0].stuff).toBe(vehicle);
        });
      });
    });

    test("King Spire base cost is reasonable", () => {
      const kingSpireRecipes = RecipiesByStuff.get(Vehicles.KingSpireMkI) || [];
      const kingSpireGarageRecipe = kingSpireRecipes.find(
        (r) => r.produced[0].count === 1
      );
      const kingSpireCost = kingSpireGarageRecipe!.required[0].count; // 70

      // King Spire costs 70 refined materials
      expect(kingSpireCost).toBe(70);
    });
  });
});
