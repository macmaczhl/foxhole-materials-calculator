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

    test('H-8 "Kranesca" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.H8Kranesca)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.H8Kranesca);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 Small Assembly Station recipe
    });

    test('H-10 "Pelekys" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.H10Pelekys)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.H10Pelekys);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 facility recipe
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

  describe('H-8 "Kranesca"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.H8Kranesca)!;
    });

    test("assembly station recipe requires correct materials", () => {
      const assemblyRecipe = recipes[0];
      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe.required).toHaveLength(4);
      expect(assemblyRecipe.required).toContainEqual({
        stuff: Vehicles.H5Hatchet,
        count: 1,
      });
      expect(assemblyRecipe.required).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 5,
      });
      expect(assemblyRecipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 20,
      });
      expect(assemblyRecipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 5,
      });
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.H8Kranesca, count: 1 },
      ]);
    });

    test("produces H-8 Kranesca", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.H8Kranesca);
      });
    });

    test("requires H-5 Hatchet as prerequisite", () => {
      const assemblyRecipe = recipes[0];
      const hasHatchetRequirement = assemblyRecipe.required.some(
        (req) => req.stuff === Vehicles.H5Hatchet
      );
      expect(hasHatchetRequirement).toBe(true);
    });

    test("calculates components correctly for single unit", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H8Kranesca,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.H5Hatchet,
        count: 1,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 5,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 20,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 5,
      });
    });

    test("calculates components correctly for multiple units", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H8Kranesca,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.H5Hatchet,
        count: 3,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 15,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsI,
        count: 60,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 15,
      });
    });
  });

  describe('H-10 "Pelekys"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.H10Pelekys)!;
    });

    test("facility recipe requires correct materials", () => {
      const facilityRecipe = recipes[0];
      expect(facilityRecipe).toBeDefined();
      expect(facilityRecipe.required).toHaveLength(4);

      // Check all required materials
      expect(facilityRecipe.required).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 8,
      });
      expect(facilityRecipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 20,
      });
      expect(facilityRecipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIII,
        count: 5,
      });
      expect(facilityRecipe.required).toContainEqual({
        stuff: Vehicles.H5Hatchet,
        count: 1,
      });

      expect(facilityRecipe.produced).toEqual([
        { stuff: Vehicles.H10Pelekys, count: 1 },
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const facilityRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H10Pelekys,
        selectedRecipe: facilityRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 8 },
        { stuff: Materials.AssemblyMaterialsII, count: 20 },
        { stuff: Materials.AssemblyMaterialsIII, count: 5 },
        { stuff: Vehicles.H5Hatchet, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const facilityRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H10Pelekys,
        selectedRecipe: facilityRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 24 },
        { stuff: Materials.AssemblyMaterialsII, count: 60 },
        { stuff: Materials.AssemblyMaterialsIII, count: 15 },
        { stuff: Vehicles.H5Hatchet, count: 3 },
      ]);
    });

    test("all recipes produce H-10 Pelekys", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.H10Pelekys);
      });
    });

    test("requires H-5 Hatchet as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasH5Hatchet = recipe.required.some(
          (req) => req.stuff === Vehicles.H5Hatchet
        );
        expect(hasH5Hatchet).toBe(true);
      });
    });
  });

  describe("Recipe integration", () => {
    test("H-10 Pelekys can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.H10Pelekys)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.H10Pelekys,
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
