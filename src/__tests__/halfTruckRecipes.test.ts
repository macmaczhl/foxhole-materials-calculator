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
    test("has garage production recipe with correct cost", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Javelin);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const garageRecipe = recipes![0];
      expect(garageRecipe.required).toHaveLength(1);
      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.required[0].count).toBe(55); // Updated from wiki
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.Javelin);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Javelin);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(1);
      expect(result.initial[0].stuff).toBe(Materials.RefinedMaterials);
      expect(result.initial[0].count).toBe(55); // Updated from wiki
    });
  });

  describe("Hoplite", () => {
    test("has single recipe requiring Javelin + materials", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Hoplite);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only one recipe as per wiki

      const recipe = recipes![0];
      expect(recipe.required).toHaveLength(3); // PCM + AM4 + Javelin
      expect(recipe.produced[0].stuff).toBe(Vehicles.Hoplite);

      // Check required materials
      const requiredMaterials = recipe.required.map(r => r.stuff);
      expect(requiredMaterials).toContain(Materials.ProcessedConstructionMaterials);
      expect(requiredMaterials).toContain(Materials.AssemblyMaterialsIV);
      expect(requiredMaterials).toContain(Vehicles.Javelin);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Hoplite);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(3); // PCM + AM4 + Javelin
      // Check that Javelin is one of the requirements
      const initialMaterials = result.initial.map(r => r.stuff);
      expect(initialMaterials).toContain(Vehicles.Javelin);
    });
  });

  describe("Peltast", () => {
    test("has single recipe requiring Javelin + materials", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Peltast);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only one recipe as per wiki

      const recipe = recipes![0];
      expect(recipe.required).toHaveLength(4); // PCM + AM2 + AM4 + Javelin
      expect(recipe.produced[0].stuff).toBe(Vehicles.Peltast);

      // Check required materials
      const requiredMaterials = recipe.required.map(r => r.stuff);
      expect(requiredMaterials).toContain(Materials.ProcessedConstructionMaterials);
      expect(requiredMaterials).toContain(Materials.AssemblyMaterialsII);
      expect(requiredMaterials).toContain(Materials.AssemblyMaterialsIV);
      expect(requiredMaterials).toContain(Vehicles.Javelin);
    });

    test("calculates materials correctly for single vehicle", () => {
      const recipeTree = createRecipeTree(Vehicles.Peltast);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(4); // PCM + AM2 + AM4 + Javelin
      // Check that Javelin is one of the requirements
      const initialMaterials = result.initial.map(r => r.stuff);
      expect(initialMaterials).toContain(Vehicles.Javelin);
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
      expect(garageRecipe.required[0].count).toBe(60); // Updated from wiki
      expect(garageRecipe.produced[0].stuff).toBe(Vehicles.NiskaMkI);
    });

    test("Niska Mk. II requires Niska Mk. I + materials", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaMkII);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(4); // PCM + AM2 + AM4 + Niska Mk. I
      // Check that Niska Mk. I is one of the requirements
      const initialMaterials = result.initial.map(r => r.stuff);
      expect(initialMaterials).toContain(Vehicles.NiskaMkI);
    });

    test("Niska Mk. III requires Niska Mk. I + materials", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaMkIII);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(3); // PCM + AM4 + Niska Mk. I
      // Check that Niska Mk. I is one of the requirements
      const initialMaterials = result.initial.map(r => r.stuff);
      expect(initialMaterials).toContain(Vehicles.NiskaMkI);
    });

    test("Niska-Rycker Mk. IX requires Niska Mk. I + materials", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaRyckerMkIX);
      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toHaveLength(4); // PCM + AM1 + AM3 + Niska Mk. I
      // Check that Niska Mk. I is one of the requirements
      const initialMaterials = result.initial.map(r => r.stuff);
      expect(initialMaterials).toContain(Vehicles.NiskaMkI);
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

    test("Niska Mk. I mass production without excess", () => {
      const recipeTree = createRecipeTree(Vehicles.NiskaMkI, 1); // Second recipe (mass production)
      const result = calculateComponents(recipeTree, 9);

      // When requesting exactly 9 vehicles, no excess should be shown
      expect(result.excessResult).toHaveLength(0);
    });
  });
});
