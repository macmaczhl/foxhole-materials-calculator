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

    test("garage recipe produces 1 vehicle for 35 refined materials", () => {
      const garageRecipe = actaeonRecipes.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 35 &&
          r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.produced[0].stuff).toBe(Vehicles.Actaeon);
    });

    test("mass production recipes exist and are reasonable", () => {
      const massProductionRecipes = actaeonRecipes.filter(
        (r) => r.produced[0].count > 1
      );

      expect(massProductionRecipes.length).toBe(3);

      // Check that mass production recipes produce multiple vehicles
      massProductionRecipes.forEach((recipe) => {
        const refinedMaterials = recipe.required[0].count;
        const vehiclesProduced = recipe.produced[0].count;
        expect(vehiclesProduced).toBeGreaterThan(1);
        expect(refinedMaterials).toBeGreaterThan(0);

        // Check reasonable ratio (should be around 20-30 per vehicle for mass production)
        const ratio = refinedMaterials / vehiclesProduced;
        expect(ratio).toBeGreaterThan(20);
        expect(ratio).toBeLessThan(30);
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
        { stuff: Materials.RefinedMaterials, count: 70 },
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

    test("recipe requires processed construction materials, assembly materials, and actaeon", () => {
      const recipe = vestaRecipes.find((r) => r.produced[0].count === 1);

      expect(recipe).toBeDefined();
      expect(recipe!.produced[0].stuff).toBe(Vehicles.Vesta);
      expect(recipe!.required.length).toBe(3);
      expect(recipe!.required[0].stuff).toBe(
        Materials.ProcessedConstructionMaterials
      );
      expect(recipe!.required[0].count).toBe(10);
      expect(recipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
      expect(recipe!.required[1].count).toBe(15);
      expect(recipe!.required[2].stuff).toBe(Vehicles.Actaeon);
      expect(recipe!.required[2].count).toBe(1);
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

    test("recipe requires concrete materials, assembly materials, and actaeon", () => {
      const recipe = ixionRecipes.find((r) => r.produced[0].count === 1);

      expect(recipe).toBeDefined();
      expect(recipe!.produced[0].stuff).toBe(Vehicles.Ixion);
      expect(recipe!.required.length).toBe(3);
      expect(recipe!.required[0].stuff).toBe(Materials.ConcreteMaterials);
      expect(recipe!.required[0].count).toBe(10);
      expect(recipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
      expect(recipe!.required[1].count).toBe(15);
      expect(recipe!.required[2].stuff).toBe(Vehicles.Actaeon);
      expect(recipe!.required[2].count).toBe(1);
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

    test("recipe requires processed construction materials, assembly materials, and actaeon", () => {
      const recipe = deioneusRecipes.find((r) => r.produced[0].count === 1);

      expect(recipe).toBeDefined();
      expect(recipe!.produced[0].stuff).toBe(Vehicles.Deioneus);
      expect(recipe!.required.length).toBe(4);
      expect(recipe!.required[0].stuff).toBe(
        Materials.ProcessedConstructionMaterials
      );
      expect(recipe!.required[0].count).toBe(20);
      expect(recipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
      expect(recipe!.required[1].count).toBe(15);
      expect(recipe!.required[2].stuff).toBe(Materials.AssemblyMaterialsIII);
      expect(recipe!.required[2].count).toBe(3);
      expect(recipe!.required[3].stuff).toBe(Vehicles.Actaeon);
      expect(recipe!.required[3].count).toBe(1);
    });

    test("mass production excess calculation", () => {
      const massProductionRecipe = deioneusRecipes.find(
        (r) => r.produced[0].count === 9
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
        { stuff: Vehicles.Deioneus, count: 8 },
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

    test("all recipes have correct structure", () => {
      const allNewVehicles = [
        Vehicles.Actaeon,
        Vehicles.Vesta,
        Vehicles.Ixion,
        Vehicles.Deioneus,
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

    test("actaeon tankette cost is reasonable compared to Xiphos", () => {
      const xiphosRecipes = RecipiesByStuff.get(Vehicles.Xiphos) || [];
      const xiphosGarageRecipe = xiphosRecipes.find(
        (r) => r.produced[0].count === 1
      );
      const xiphosCost = xiphosGarageRecipe!.required[0].count; // 25

      const actaeonRecipes = RecipiesByStuff.get(Vehicles.Actaeon) || [];
      const actaeonGarageRecipe = actaeonRecipes.find(
        (r) => r.produced[0].count === 1
      );
      const actaeonCost = actaeonGarageRecipe!.required[0].count; // 35

      // Actaeon costs more than Xiphos but that's expected for a tankette
      expect(actaeonCost).toBeGreaterThan(xiphosCost);
      expect(actaeonCost).toBe(35);
    });
  });
});
