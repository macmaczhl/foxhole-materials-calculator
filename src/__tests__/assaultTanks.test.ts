import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Assault Tanks", () => {
  describe("Recipe availability", () => {
    test('85K-b "Falchion" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.Falchion85Kb)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.Falchion85Kb);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });
  });

  describe('85K-b "Falchion"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.Falchion85Kb)!;
    });

    test("garage recipe requires 135 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 135 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.Falchion85Kb, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 971 → 15 (3 crates of 5)
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(971);

      // 1214 → 20 (4 crates of 5)
      const recipe20 = recipes.find((r) => r.produced[0].count === 20);
      expect(recipe20).toBeDefined();
      expect(recipe20!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe20!.required[0].count).toBe(1214);

      // 1416 → 25 (5 crates of 5)
      const recipe25 = recipes.find((r) => r.produced[0].count === 25);
      expect(recipe25).toBeDefined();
      expect(recipe25!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe25!.required[0].count).toBe(1416);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Falchion85Kb,
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
        stuff: Vehicles.Falchion85Kb,
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
        expect(recipe.produced[0].stuff).toBe(Vehicles.Falchion85Kb);
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
  });

  describe("Recipe integration", () => {
    test("85K-b Falchion can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falchion85Kb)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Falchion85Kb,
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
      const recipes = RecipiesByStuff.get(Vehicles.Falchion85Kb)!;
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe15 = recipes.find((r) => r.produced[0].count === 15)!;

      // Calculate cost per unit
      const garageCostPerUnit = garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit = massRecipe15.required[0].count / massRecipe15.produced[0].count;

      // Mass production should be cheaper per unit
      expect(massCostPerUnit).toBeLessThan(garageCostPerUnit);
    });
  });
});
