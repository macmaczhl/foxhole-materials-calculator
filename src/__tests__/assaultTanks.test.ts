import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Assault Tanks", () => {
  describe("Recipe availability", () => {
    test('85K-b "Falchion" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.Falchion)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.Falchion);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });
  });

  describe('85K-b "Falchion"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.Falchion)!;
    });

    test("garage recipe requires 135 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 135 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.Falchion, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 971 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(971);

      // 1214 → 20
      const recipe20 = recipes.find((r) => r.produced[0].count === 20);
      expect(recipe20).toBeDefined();
      expect(recipe20!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe20!.required[0].count).toBe(1214);

      // 1416 → 25
      const recipe25 = recipes.find((r) => r.produced[0].count === 25);
      expect(recipe25).toBeDefined();
      expect(recipe25!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe25!.required[0].count).toBe(1416);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Falchion,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 135 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Falchion,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 405 },
      ]);
    });

    test("all recipes produce 85K-b Falchion", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.Falchion);
      });
    });

    test("all recipes require only refined materials", () => {
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBe(1);
        expect(recipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      });
    });

    test("does not require another vehicle as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasVehicleRequirement = recipe.required.some((req) =>
          Object.values(Vehicles).includes(req.stuff as Vehicles)
        );
        expect(hasVehicleRequirement).toBe(false);
      });
    });

    test("mass production produces 5 per crate instead of typical 3", () => {
      // The Falchion is unique in that MPF produces 5 per crate instead of 3
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      const recipe20 = recipes.find((r) => r.produced[0].count === 20);
      const recipe25 = recipes.find((r) => r.produced[0].count === 25);

      // 3 crates = 15 tanks (5 per crate)
      expect(recipe15).toBeDefined();
      expect(recipe15!.produced[0].count).toBe(15);

      // 4 crates = 20 tanks (5 per crate)
      expect(recipe20).toBeDefined();
      expect(recipe20!.produced[0].count).toBe(20);

      // 5 crates = 25 tanks (5 per crate)
      expect(recipe25).toBeDefined();
      expect(recipe25!.produced[0].count).toBe(25);
    });
  });

  describe('85K-a "Spatha"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.Spatha)!;
    });

    test("has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.Spatha)).toBe(true);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only Small Assembly Station recipe
    });

    test("Small Assembly Station recipe requires Falchion chassis and materials", () => {
      const recipe = recipes[0];
      expect(recipe).toBeDefined();

      // Check required materials
      expect(recipe.required).toHaveLength(4);
      expect(recipe.required).toContainEqual({
        stuff: Vehicles.Falchion,
        count: 1,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 8,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 10,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 8,
      });

      // Check produced output
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.Spatha, count: 1 },
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const recipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Spatha,
        selectedRecipe: recipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.Falchion,
        count: 1,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 8,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 10,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 8,
      });
    });

    test("calculates components correctly for multiple units", () => {
      const recipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Spatha,
        selectedRecipe: recipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.Falchion,
        count: 3,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 24,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 30,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 24,
      });
    });

    test("all recipes produce 85K-a Spatha", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.Spatha);
      });
    });

    test("requires Falchion chassis as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasFalchionRequirement = recipe.required.some(
          (req) => req.stuff === Vehicles.Falchion
        );
        expect(hasFalchionRequirement).toBe(true);
      });
    });

    test("Spatha requires upgrade materials beyond base Falchion", () => {
      const recipe = recipes[0];

      // Verify it requires high-tier assembly materials
      const hasAssemblyMaterialsI = recipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsI
      );
      const hasAssemblyMaterialsIV = recipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsIV
      );

      expect(hasAssemblyMaterialsI).toBe(true);
      expect(hasAssemblyMaterialsIV).toBe(true);
    });
  });

  describe("Recipe integration", () => {
    test("85K-b Falchion can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falchion)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Falchion,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("85K-a Spatha can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Spatha)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Spatha,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("mass production is more efficient than garage production", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falchion)!;
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe15 = recipes.find((r) => r.produced[0].count === 15)!;

      // Calculate cost per unit
      const garageCostPerUnit =
        garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit =
        massRecipe15.required[0].count / massRecipe15.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });

    test("verifies unique 5-per-crate MPF bonus", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falchion)!;
      const massRecipes = recipes.filter((r) => r.produced[0].count > 1);

      // Verify all mass production recipes produce multiples of 5
      massRecipes.forEach((recipe) => {
        expect(recipe.produced[0].count % 5).toBe(0);
      });
    });
  });
});
