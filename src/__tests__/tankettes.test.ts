import { Materials, Vehicles, IRecipe, RecipeTree } from "../lib/models";
import { RecipiesByStuff } from "../lib/recipes";
import { calculateComponents } from "../lib/services/calculateComponents";

describe("Tankette and Rocket Battery Recipes", () => {
  describe("T12 Actaeon Tankette", () => {
    let actaeonRecipes: IRecipe[];

    beforeAll(() => {
      actaeonRecipes = RecipiesByStuff.get(Vehicles.Actaeon) || [];
    });

    test("has recipes defined", () => {
      expect(actaeonRecipes).toBeDefined();
      expect(actaeonRecipes.length).toBeGreaterThan(0);
    });

    test("garage recipe produces 1 vehicle for 15 refined materials", () => {
      const garageRecipe = actaeonRecipes.find(r =>
        r.required.length === 1 &&
        r.required[0].stuff === Materials.RefinedMaterials &&
        r.required[0].count === 15 &&
        r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.Actaeon);
    });

    test("mass production recipes exist and are reasonable", () => {
      const massProductionRecipes = actaeonRecipes.filter(r =>
        r.produced[0].count > 1
      );

      expect(massProductionRecipes.length).toBe(3);

      // Check that mass production recipes produce multiple vehicles
      massProductionRecipes.forEach(recipe => {
        const refinedMaterials = recipe.required[0].count;
        const vehiclesProduced = recipe.produced[0].count;
        expect(vehiclesProduced).toBeGreaterThan(1);
        expect(refinedMaterials).toBeGreaterThan(0);

        // Check reasonable ratio (should be around 13-16 per vehicle for mass production)
        const ratio = refinedMaterials / vehiclesProduced;
        expect(ratio).toBeGreaterThan(10);
        expect(ratio).toBeLessThan(20);
      });
    });

    test("calculation works correctly", () => {
      const mockRecipeTree: RecipeTree = {
        stuff: Vehicles.Actaeon,
        selectedRecipe: actaeonRecipes[0], // garage recipe
        recipes: actaeonRecipes,
        required: [],
      };

      const result = calculateComponents(mockRecipeTree, 2);
      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 30 }
      ]);
    });
  });

  describe("T14 Vesta Tankette", () => {
    let vestaRecipes: IRecipe[];

    beforeAll(() => {
      vestaRecipes = RecipiesByStuff.get(Vehicles.Vesta) || [];
    });

    test("has recipes defined", () => {
      expect(vestaRecipes).toBeDefined();
      expect(vestaRecipes.length).toBeGreaterThan(0);
    });

    test("garage recipe produces 1 vehicle for 18 refined materials", () => {
      const garageRecipe = vestaRecipes.find(r =>
        r.required.length === 1 &&
        r.required[0].stuff === Materials.RefinedMaterials &&
        r.required[0].count === 18 &&
        r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.Vesta);
    });
  });

  describe("T20 Ixion Tankette", () => {
    let ixionRecipes: IRecipe[];

    beforeAll(() => {
      ixionRecipes = RecipiesByStuff.get(Vehicles.Ixion) || [];
    });

    test("has recipes defined", () => {
      expect(ixionRecipes).toBeDefined();
      expect(ixionRecipes.length).toBeGreaterThan(0);
    });

    test("garage recipe produces 1 vehicle for 20 refined materials", () => {
      const garageRecipe = ixionRecipes.find(r =>
        r.required.length === 1 &&
        r.required[0].stuff === Materials.RefinedMaterials &&
        r.required[0].count === 20 &&
        r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.Ixion);
    });
  });

  describe("T13 Deioneus Rocket Battery", () => {
    let deioneusRecipes: IRecipe[];

    beforeAll(() => {
      deioneusRecipes = RecipiesByStuff.get(Vehicles.Deioneus) || [];
    });

    test("has recipes defined", () => {
      expect(deioneusRecipes).toBeDefined();
      expect(deioneusRecipes.length).toBeGreaterThan(0);
    });

    test("garage recipe produces 1 vehicle for 22 refined materials", () => {
      const garageRecipe = deioneusRecipes.find(r =>
        r.required.length === 1 &&
        r.required[0].stuff === Materials.RefinedMaterials &&
        r.required[0].count === 22 &&
        r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.Deioneus);
    });

    test("mass production excess calculation", () => {
      const massProductionRecipe = deioneusRecipes.find(r =>
        r.produced[0].count === 9
      );

      expect(massProductionRecipe).toBeDefined();

      const mockRecipeTree: RecipeTree = {
        stuff: Vehicles.Deioneus,
        selectedRecipe: massProductionRecipe!,
        recipes: deioneusRecipes,
        required: [],
      };

      // Request 1 rocket battery but recipe produces 9, should show 8 excess
      const result = calculateComponents(mockRecipeTree, 1);
      expect(result.excessResult).toEqual([
        { stuff: Vehicles.Deioneus, count: 8 }
      ]);
    });
  });

  describe("All new vehicles", () => {
    test("all new vehicles are in RecipiesByStuff map", () => {
      expect(RecipiesByStuff.has(Vehicles.Actaeon)).toBe(true);
      expect(RecipiesByStuff.has(Vehicles.Vesta)).toBe(true);
      expect(RecipiesByStuff.has(Vehicles.Ixion)).toBe(true);
      expect(RecipiesByStuff.has(Vehicles.Deioneus)).toBe(true);
    });

    test("all recipes require only refined materials", () => {
      const allNewVehicles = [Vehicles.Actaeon, Vehicles.Vesta, Vehicles.Ixion, Vehicles.Deioneus];

      allNewVehicles.forEach(vehicle => {
        const recipes = RecipiesByStuff.get(vehicle) || [];
        recipes.forEach(recipe => {
          expect(recipe.required.length).toBe(1);
          expect(recipe.required[0].stuff).toBe(Materials.RefinedMaterials);
          expect(recipe.produced.length).toBe(1);
          expect(recipe.produced[0].stuff).toBe(vehicle);
        });
      });
    });

    test("tankettes cost less than Xiphos", () => {
      const xiphosRecipes = RecipiesByStuff.get(Vehicles.Xiphos) || [];
      const xiphosGarageRecipe = xiphosRecipes.find(r => r.produced[0].count === 1);
      const xiphosCost = xiphosGarageRecipe!.required[0].count; // 25

      const tankettes = [Vehicles.Actaeon, Vehicles.Vesta, Vehicles.Ixion];
      tankettes.forEach(tankette => {
        const recipes = RecipiesByStuff.get(tankette) || [];
        const garageRecipe = recipes.find(r => r.produced[0].count === 1);
        const tanketteCost = garageRecipe!.required[0].count;

        expect(tanketteCost).toBeLessThan(xiphosCost);
      });
    });
  });
});
