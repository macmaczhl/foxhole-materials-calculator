/**
 * Tests for Naval Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { navalVehicleRecipes } from "../lib/recipes/navalVehicles";

describe("Naval Vehicles", () => {
  describe("Recipe availability", () => {
    test("all naval vehicles have recipes defined", () => {
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
      ];

      navalVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all naval vehicle recipes have valid requirements", () => {
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
      ];

      navalVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("naval vehicles are in the naval vehicle recipes map", () => {
      expect(navalVehicleRecipes.has(Vehicles.BMSAquatipper)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.BMSIronship)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.InterceptorPA12)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.MacConmaraShorerunner)).toBe(
        true
      );
      expect(navalVehicleRecipes.has(Vehicles.RonanGunship74b1)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.TypeCCharon)).toBe(true);
      expect(navalVehicleRecipes.size).toBe(8); // 6 vehicles + 2 naval materials
    });
  });

  describe("BMS - Aquatipper (Barge)", () => {
    let bmsAquatipperRecipes: IRecipe[];
    let bmsAquatipperRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsAquatipperRecipes = RecipiesByStuff.get(Vehicles.BMSAquatipper)!;
      bmsAquatipperRecipeTree = {
        stuff: Vehicles.BMSAquatipper,
        selectedRecipe: bmsAquatipperRecipes[0],
        recipes: bmsAquatipperRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const recipe = bmsAquatipperRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSAquatipper, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(bmsAquatipperRecipes.length).toBeGreaterThan(1);
      // Check for 9-vehicle batch
      const massProductionRecipe = bmsAquatipperRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(massProductionRecipe).toBeDefined();
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsAquatipperRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsAquatipperRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all naval vehicles can be calculated without errors", () => {
      const navalVehicles = [
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
      ];

      navalVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipeTree: RecipeTree = {
          stuff: vehicle,
          selectedRecipe: recipes[0],
          recipes: recipes,
          required: [],
        };

        // Should not throw any errors
        expect(() => calculateComponents(recipeTree, 1)).not.toThrow();
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      });
    });
  });

  describe("BMS - Ironship (Freighter)", () => {
    let bmsIronshipRecipes: IRecipe[];
    let bmsIronshipRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsIronshipRecipes = RecipiesByStuff.get(Vehicles.BMSIronship)!;
      bmsIronshipRecipeTree = {
        stuff: Vehicles.BMSIronship,
        selectedRecipe: bmsIronshipRecipes[0],
        recipes: bmsIronshipRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const recipe = bmsIronshipRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 500 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSIronship, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(bmsIronshipRecipes.length).toBeGreaterThan(1);
      // Check for 9-vehicle batch
      const massProductionRecipe = bmsIronshipRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(massProductionRecipe).toBeDefined();
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsIronshipRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 500 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsIronshipRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 1000 },
      ]);
    });
  });

  describe("Interceptor PA-12 (Landing Ship)", () => {
    let interceptorPA12Recipes: IRecipe[];
    let interceptorPA12RecipeTree: RecipeTree;

    beforeEach(() => {
      interceptorPA12Recipes = RecipiesByStuff.get(Vehicles.InterceptorPA12)!;
      interceptorPA12RecipeTree = {
        stuff: Vehicles.InterceptorPA12,
        selectedRecipe: interceptorPA12Recipes[0],
        recipes: interceptorPA12Recipes,
        required: [],
      };
    });

    test("has correct BMS - Longhook recipe requirements", () => {
      const recipe = interceptorPA12Recipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.InterceptorPA12, count: 1 },
      ]);
    });

    test("has only base ship recipe (no mass production)", () => {
      expect(interceptorPA12Recipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(interceptorPA12RecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(interceptorPA12RecipeTree, 5);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 50 },
      ]);
    });
  });

  describe("MacConmara Shorerunner (Landing Ship)", () => {
    let macConmaraShorerunnerRecipes: IRecipe[];
    let macConmaraShorerunnerRecipeTree: RecipeTree;

    beforeEach(() => {
      macConmaraShorerunnerRecipes = RecipiesByStuff.get(
        Vehicles.MacConmaraShorerunner
      )!;
      macConmaraShorerunnerRecipeTree = {
        stuff: Vehicles.MacConmaraShorerunner,
        selectedRecipe: macConmaraShorerunnerRecipes[0],
        recipes: macConmaraShorerunnerRecipes,
        required: [],
      };
    });

    test("has correct base ship recipe requirements", () => {
      const recipe = macConmaraShorerunnerRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.MacConmaraShorerunner, count: 1 },
      ]);
    });

    test("has single recipe (no mass production)", () => {
      expect(macConmaraShorerunnerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(macConmaraShorerunnerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 10 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(macConmaraShorerunnerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 30 },
      ]);
    });
  });

  describe('Type C - "Charon" (Gunboat)', () => {
    let typeCCharonRecipes: IRecipe[];
    let typeCCharonRecipeTree: RecipeTree;

    beforeEach(() => {
      typeCCharonRecipes = RecipiesByStuff.get(Vehicles.TypeCCharon)!;
      typeCCharonRecipeTree = {
        stuff: Vehicles.TypeCCharon,
        selectedRecipe: typeCCharonRecipes[0],
        recipes: typeCCharonRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const recipe = typeCCharonRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 125 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.TypeCCharon, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(typeCCharonRecipes.length).toBeGreaterThan(1);
      // Check for 9-vehicle batch
      const massProductionRecipe = typeCCharonRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(massProductionRecipe).toBeDefined();
      expect(massProductionRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 899 },
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(typeCCharonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 125 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(typeCCharonRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 250 },
      ]);
    });

    test("has all mass production batch recipes", () => {
      expect(typeCCharonRecipes.length).toBe(4);
      // Check 9-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 9 &&
            r.required[0].count === 899 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
      // Check 12-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 12 &&
            r.required[0].count === 1124 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
      // Check 15-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 15 &&
            r.required[0].count === 1311 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
    });
  });
});
