import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Assault Tanks", () => {
  describe("Recipe availability", () => {
    test('90T-v "Nemesis" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.Nemesis)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.Nemesis);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

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

  describe('90T-v "Nemesis"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.Nemesis)!;
    });

    test("garage recipe requires 150 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 150 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.Nemesis, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 1080 → 9
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(1080);

      // 1350 → 12
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(1350);

      // 1575 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(1575);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Nemesis,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Nemesis,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 450 },
      ]);
    });

    test("all recipes produce 90T-v Nemesis", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.Nemesis);
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

    test("mass production produces 3 per crate (standard)", () => {
      // The Nemesis uses standard 3-per-crate MPF production
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);

      // 3 crates = 9 tanks (3 per crate)
      expect(recipe9).toBeDefined();
      expect(recipe9!.produced[0].count).toBe(9);

      // 4 crates = 12 tanks (3 per crate)
      expect(recipe12).toBeDefined();
      expect(recipe12!.produced[0].count).toBe(12);

      // 5 crates = 15 tanks (3 per crate)
      expect(recipe15).toBeDefined();
      expect(recipe15!.produced[0].count).toBe(15);
    });

    test("can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.Nemesis,
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
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe9 = recipes.find((r) => r.produced[0].count === 9)!;

      // Calculate cost per unit
      const garageCostPerUnit =
        garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit =
        massRecipe9.required[0].count / massRecipe9.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });

    test("verifies standard 3-per-crate MPF production", () => {
      const massRecipes = recipes.filter((r) => r.produced[0].count > 1);

      // Verify all mass production recipes produce multiples of 3
      massRecipes.forEach((recipe) => {
        expect(recipe.produced[0].count % 3).toBe(0);
      });
    });
  });
});
