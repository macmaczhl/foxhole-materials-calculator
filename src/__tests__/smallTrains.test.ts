/**
 * Tests for Small Train Vehicles
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { smallTrainRecipes } from "../lib/recipes/trains/smallTrains";

describe("Small Train Vehicles", () => {
  describe("Recipe availability", () => {
    test("BMS Linerunner has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSLinerunner)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSLinerunner);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Linerunner is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSLinerunner)).toBe(true);
    });

    test("BMS Linerunner recipe has valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSLinerunner)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("BMS Mineseeker has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSMineseeker)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSMineseeker);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Mineseeker is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSMineseeker)).toBe(true);
    });

    test("BMS Railtruck has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSRailtruck)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSRailtruck);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Railtruck is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSRailtruck)).toBe(true);
    });

    test("small train recipes map has correct size", () => {
      expect(smallTrainRecipes.size).toBe(5);
    });
  });

  describe("BMS Linerunner (Small Flatbed Car)", () => {
    let bmsLinerunnerRecipes: IRecipe[];
    let bmsLinerunnerRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsLinerunnerRecipes = RecipiesByStuff.get(Vehicles.BMSLinerunner)!;
      bmsLinerunnerRecipeTree = {
        stuff: Vehicles.BMSLinerunner,
        selectedRecipe: bmsLinerunnerRecipes[0],
        recipes: bmsLinerunnerRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsLinerunnerRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSLinerunner, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsLinerunnerRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsLinerunnerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsLinerunnerRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsII, count: 10 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsLinerunnerRecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsLinerunnerRecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });

  describe("BMS Mineseeker (Small Train Locomotive)", () => {
    let bmsMineseeker: IRecipe[];
    let bmsMineseeker_RecipeTree: RecipeTree;

    beforeEach(() => {
      bmsMineseeker = RecipiesByStuff.get(Vehicles.BMSMineseeker)!;
      bmsMineseeker_RecipeTree = {
        stuff: Vehicles.BMSMineseeker,
        selectedRecipe: bmsMineseeker[0],
        recipes: bmsMineseeker,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsMineseeker[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 125 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 20 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSMineseeker, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsMineseeker.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsMineseeker_RecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 125 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 20 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsMineseeker_RecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 375 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsII, count: 60 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsMineseeker_RecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsMineseeker_RecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });

  describe("BMS Railtruck (Small Container Car)", () => {
    let bmsRailtruckRecipes: IRecipe[];
    let bmsRailtruckRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsRailtruckRecipes = RecipiesByStuff.get(Vehicles.BMSRailtruck)!;
      bmsRailtruckRecipeTree = {
        stuff: Vehicles.BMSRailtruck,
        selectedRecipe: bmsRailtruckRecipes[0],
        recipes: bmsRailtruckRecipes,
        required: [],
      };
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsRailtruckRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSRailtruck, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsRailtruckRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsRailtruckRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsRailtruckRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsII, count: 10 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsRailtruckRecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsRailtruckRecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });

  describe("BMS Tinderbox (Small Liquid Container Car)", () => {
    let bmsTinderboxRecipes: IRecipe[];
    let bmsTinderboxRecipeTree: RecipeTree;

    beforeEach(() => {
      bmsTinderboxRecipes = RecipiesByStuff.get(Vehicles.BMSTinderbox)!;
      bmsTinderboxRecipeTree = {
        stuff: Vehicles.BMSTinderbox,
        selectedRecipe: bmsTinderboxRecipes[0],
        recipes: bmsTinderboxRecipes,
        required: [],
      };
    });

    test("BMS Tinderbox has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSTinderbox)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSTinderbox);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Tinderbox is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSTinderbox)).toBe(true);
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsTinderboxRecipes[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 5 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSTinderbox, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsTinderboxRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsTinderboxRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 5 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsTinderboxRecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 30 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsTinderboxRecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsTinderboxRecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });

  describe("BMS Stowheel (Small Box Car)", () => {
    let bmsStowheel: IRecipe[];
    let bmsStowheel_RecipeTree: RecipeTree;

    beforeEach(() => {
      bmsStowheel = RecipiesByStuff.get(Vehicles.BMSStowheel)!;
      bmsStowheel_RecipeTree = {
        stuff: Vehicles.BMSStowheel,
        selectedRecipe: bmsStowheel[0],
        recipes: bmsStowheel,
        required: [],
      };
    });

    test("BMS Stowheel has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSStowheel)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSStowheel);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("BMS Stowheel is in the small train recipes map", () => {
      expect(smallTrainRecipes.has(Vehicles.BMSStowheel)).toBe(true);
    });

    test("has correct Small Assembly Station recipe requirements", () => {
      const recipe = bmsStowheel[0];
      expect(recipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 5 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.BMSStowheel, count: 1 },
      ]);
    });

    test("has only one recipe (no mass production)", () => {
      expect(bmsStowheel.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(bmsStowheel_RecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 35 },
        { stuff: Materials.AssemblyMaterialsI, count: 5 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(bmsStowheel_RecipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 30 },
      ]);
    });

    test("can be calculated without errors", () => {
      expect(() =>
        calculateComponents(bmsStowheel_RecipeTree, 1)
      ).not.toThrow();
      const result = calculateComponents(bmsStowheel_RecipeTree, 1);
      expect(result.initial.length).toBeGreaterThan(0);
    });
  });
});
