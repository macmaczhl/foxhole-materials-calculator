import { Materials, RecipeTree, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Half-Truck Recipes", () => {
  // Helper function to create a recipe tree for testing
  const createRecipeTree = (
    vehicleName: Vehicles,
    recipeIndex: number = 0
  ): RecipeTree => {
    const recipes = RecipiesByStuff.get(vehicleName);
    if (!recipes || recipes.length === 0) {
      throw new Error(`No recipes found for ${vehicleName}`);
    }

    return {
      stuff: vehicleName,
      selectedRecipe: recipes[recipeIndex],
      recipes: recipes,
      required: [],
    };
  };

  describe("Javelin", () => {
    test("has garage production recipe", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Javelin);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const garageRecipe = recipes![0];
      expect(garageRecipe.required).toHaveLength(1);
      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.Javelin);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Javelin);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(20);
    });
  });

  describe("Hoplite", () => {
    test("has garage production recipe", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Hoplite);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const garageRecipe = recipes![0];
      expect(garageRecipe.required).toHaveLength(1);
      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.Hoplite);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Hoplite);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(22);
    });
  });

  describe("Peltast", () => {
    test("has garage production recipe", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Peltast);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const garageRecipe = recipes![0];
      expect(garageRecipe.required).toHaveLength(1);
      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.Peltast);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Peltast);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(24);
    });
  });

  describe("Niska vehicles", () => {
    test("Niska Mk. I has garage production recipe", () => {
      const recipes = RecipiesByStuff.get(Vehicles.NiskaMkI);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const garageRecipe = recipes![0];
      expect(garageRecipe.required).toHaveLength(1);
      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.NiskaMkI);
    });

    test("Niska Mk. II calculates materials correctly", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaMkII);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(32);
    });

    test("Niska Mk. III calculates materials correctly", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaMkIII);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(35);
    });

    test("Niska-Rycker Mk. IX calculates materials correctly", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaRyckerMkIX);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(40);
    });
  });

  describe("Mass production recipes", () => {
    test("Javelin mass production with excess calculation", () => {
      const recipeTree = createRecipeTree(Vehicles.Javelin, 1); // Second recipe (mass production)
      const result = calculateComponents(recipeTree, 1);

      // When requesting 1 vehicle but mass production makes 9, should show 8 excess
      expect(result.excessResult).toHaveLength(1);
      expect(result.excessResult[0].stuff).toBe(Vehicles.Javelin);
      expect(result.excessResult[0].count).toBe(8);
    });

    test("Peltast mass production without excess", () => {
      const recipeTree = createRecipeTree(Vehicles.Peltast, 1); // Second recipe (mass production)
      const result = calculateComponents(recipeTree, 9);

      // When requesting exactly 9 vehicles, no excess should be shown
      expect(result.excessResult).toHaveLength(0);
    });
  });
});
