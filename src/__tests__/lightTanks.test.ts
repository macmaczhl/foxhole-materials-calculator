import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Light Tanks", () => {
  describe("Recipe availability", () => {
    test('H-5 "Hatchet" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.H5Hatchet)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.H5Hatchet);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

    test('H-19 "Vulcan" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.H19Vulcan)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.H19Vulcan);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });
  });

  describe('H-5 "Hatchet"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.H5Hatchet)!;
    });

    test("garage recipe requires 115 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 115 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.H5Hatchet, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 827 → 9
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(827);

      // 1034 → 12
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(1034);

      // 1206 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(1206);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H5Hatchet,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 115 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H5Hatchet,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 345 },
      ]);
    });

    test("all recipes produce H-5 Hatchet", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.H5Hatchet);
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
    test("H-5 Hatchet can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.H5Hatchet)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H5Hatchet,
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
      const recipes = RecipiesByStuff.get(Vehicles.H5Hatchet)!;
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe9 = recipes.find((r) => r.produced[0].count === 9)!;

      // Calculate cost per unit
      const garageCostPerUnit = garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit = massRecipe9.required[0].count / massRecipe9.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });
  });

  describe('H-19 "Vulcan"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.H19Vulcan)!;
    });

    test("garage recipe requires 125 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 125 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.H19Vulcan, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 900 → 9
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(900);

      // 1125 → 12
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(1125);

      // 1313 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(1313);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H19Vulcan,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 125 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H19Vulcan,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 375 },
      ]);
    });

    test("all recipes produce H-19 Vulcan", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.H19Vulcan);
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

    test("mass production is more efficient than garage production", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe9 = recipes.find((r) => r.produced[0].count === 9)!;

      // Calculate cost per unit
      const garageCostPerUnit = garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit = massRecipe9.required[0].count / massRecipe9.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });

    test("can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H19Vulcan,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });
  });
});
