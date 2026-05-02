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
        Vehicles.BMSLonghook,
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
        Vehicles.BMSWhiteWhale,
        Vehicles.DasKrokodilByVAC,
        Vehicles.Titan,
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
        Vehicles.BMSLonghook,
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
        Vehicles.BMSWhiteWhale,
        Vehicles.DasKrokodilByVAC,
        Vehicles.Titan,
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
      expect(navalVehicleRecipes.has(Vehicles.BMSLonghook)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.BMSAquatipper)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.BMSIronship)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.InterceptorPA12)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.MacConmaraShorerunner)).toBe(
        true
      );
      expect(navalVehicleRecipes.has(Vehicles.RonanGunship74b1)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.TypeCCharon)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.BMSLonghook)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.BMSWhiteWhale)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.DasKrokodilByVAC)).toBe(true);
      expect(navalVehicleRecipes.has(Vehicles.Titan)).toBe(true);
      expect(navalVehicleRecipes.size).toBe(13); // 10 vehicles + 3 naval materials
    });
  });

  describe("BMS - Longhook (Base Ship)", () => {
    let bmsLonghookRecipes: IRecipe[];
    let bmsLonghookRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsLonghookRecipes = RecipiesByStuff.get(Vehicles.BMSLonghook)!;
      bmsLonghookRecipeTree = {
        stuff: Vehicles.BMSLonghook,
        selectedRecipe: bmsLonghookRecipes[0],
        recipes: bmsLonghookRecipes,
        required: [],
      };
    });

    test("has correct dry dock recipe requirements", () => {
      const recipe = bmsLonghookRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.NavalHullSegments, count: 8 },
        { stuff: Materials.NavalShellPlating, count: 15 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSLonghook, count: 1 },
      ]);
    });

    test("has only dry dock recipe (no mass production)", () => {
      expect(bmsLonghookRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsLonghookRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.NavalHullSegments, count: 8 },
        { stuff: Materials.NavalShellPlating, count: 15 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsLonghookRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.NavalHullSegments, count: 16 },
        { stuff: Materials.NavalShellPlating, count: 30 },
      ]);
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
        Vehicles.BMSLonghook,
        Vehicles.BMSAquatipper,
        Vehicles.BMSIronship,
        Vehicles.InterceptorPA12,
        Vehicles.MacConmaraShorerunner,
        Vehicles.RonanGunship74b1,
        Vehicles.TypeCCharon,
        Vehicles.BMSWhiteWhale,
        Vehicles.DasKrokodilByVAC,
        Vehicles.Titan,
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
        { stuff: Materials.RefinedMaterials, count: 140 },
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
        { stuff: Materials.RefinedMaterials, count: 1008 },
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(typeCCharonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 140 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(typeCCharonRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 280 },
      ]);
    });

    test("has all mass production batch recipes", () => {
      expect(typeCCharonRecipes.length).toBe(4);
      // Check 9-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 9 &&
            r.required[0].count === 1008 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
      // Check 12-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 12 &&
            r.required[0].count === 1260 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
      // Check 15-vehicle batch
      expect(
        typeCCharonRecipes.some(
          (r) =>
            r.produced[0].count === 15 &&
            r.required[0].count === 1470 &&
            r.required[0].stuff === Materials.RefinedMaterials
        )
      ).toBe(true);
    });
  });

  describe("BMS - White Whale (Landing Ship)", () => {
    let bmsWhiteWhaleRecipes: IRecipe[];
    let bmsWhiteWhaleRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsWhiteWhaleRecipes = RecipiesByStuff.get(Vehicles.BMSWhiteWhale)!;
      bmsWhiteWhaleRecipeTree = {
        stuff: Vehicles.BMSWhiteWhale,
        selectedRecipe: bmsWhiteWhaleRecipes[0],
        recipes: bmsWhiteWhaleRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const recipe = bmsWhiteWhaleRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 100 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSWhiteWhale, count: 1 },
      ]);
    });

    test("has only shipyard recipe (no mass production)", () => {
      expect(bmsWhiteWhaleRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsWhiteWhaleRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsWhiteWhaleRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 300 },
      ]);
    });
  });

  describe("Das Krokodil by VAC (Light Freighter)", () => {
    let dasKrokodilRecipes: IRecipe[];
    let dasKrokodilRecipeTree: RecipeTree;

    beforeEach(() => {
      dasKrokodilRecipes = RecipiesByStuff.get(Vehicles.DasKrokodilByVAC)!;
      dasKrokodilRecipeTree = {
        stuff: Vehicles.DasKrokodilByVAC,
        selectedRecipe: dasKrokodilRecipes[0],
        recipes: dasKrokodilRecipes,
        required: [],
      };
    });

    test("has correct shipyard recipe requirements", () => {
      const recipe = dasKrokodilRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.DasKrokodilByVAC, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(dasKrokodilRecipes.length).toBe(4);
      // Check for 9-vehicle batch
      const batch9 = dasKrokodilRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(batch9).toBeDefined();
      expect(batch9!.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 720 },
      ]);
    });

    test("has all mass production batch recipes", () => {
      // Check 12-vehicle batch
      expect(
        dasKrokodilRecipes.some(
          (r) =>
            r.produced[0].count === 12 &&
            r.required[0].count === 900 &&
            r.required[0].stuff === Materials.BasicMaterials
        )
      ).toBe(true);
      // Check 15-vehicle batch
      expect(
        dasKrokodilRecipes.some(
          (r) =>
            r.produced[0].count === 15 &&
            r.required[0].count === 1050 &&
            r.required[0].stuff === Materials.BasicMaterials
        )
      ).toBe(true);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(dasKrokodilRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(dasKrokodilRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("Titan (Battleship)", () => {
    let titanRecipes: IRecipe[];
    let titanRecipeTree: RecipeTree;

    beforeEach(() => {
      titanRecipes = RecipiesByStuff.get(Vehicles.Titan)!;
      titanRecipeTree = {
        stuff: Vehicles.Titan,
        selectedRecipe: titanRecipes[0],
        recipes: titanRecipes,
        required: [],
      };
    });

    test("has correct dry dock recipe requirements", () => {
      const recipe = titanRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.NavalHullSegments, count: 20 },
        { stuff: Materials.NavalShellPlating, count: 20 },
        { stuff: Materials.NavalTurbineComponents, count: 4 },
      ]);
      expect(recipe.produced).toEqual([{ stuff: Vehicles.Titan, count: 1 }]);
    });

    test("has only dry dock recipe (no mass production)", () => {
      expect(titanRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(titanRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.NavalHullSegments, count: 20 },
        { stuff: Materials.NavalShellPlating, count: 20 },
        { stuff: Materials.NavalTurbineComponents, count: 4 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(titanRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.NavalHullSegments, count: 40 },
        { stuff: Materials.NavalShellPlating, count: 40 },
        { stuff: Materials.NavalTurbineComponents, count: 8 },
      ]);
    });
  });
});
