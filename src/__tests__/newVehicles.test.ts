import { Materials, RecipeTree, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("New Armored Car Vehicles", () => {
  // Test each new vehicle has recipes
  test("all new vehicles have recipes defined", () => {
    expect(RecipiesByStuff.has(Vehicles.ActaeonTankette)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.Percutio)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.Gemini)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienGravekeeper)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienHighlander)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienFreeman)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienV110)).toBe(true);
  });

  test("T12 Actaeon Tankette recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.ActaeonTankette);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    // Check basic recipe structure
    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(150);
  });

  test("T5 Percutio recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.Percutio);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(120);
  });

  test("T8 Gemini recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.Gemini);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(135);
  });

  test("O'Brien v.113 Gravekeeper recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienGravekeeper);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(135);
  });

  test("O'Brien v.121 Highlander recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienHighlander);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(120);
  });

  test("O'Brien v.101 Freeman recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienFreeman);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(180);
  });

  test("O'Brien v.110 recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienV110);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(105);
  });

  // Test calculations work for new vehicles
  test("calculation works for T5 Percutio", () => {
    const recipes = RecipiesByStuff.get(Vehicles.Percutio)!;
    const basicRecipe = recipes.find(r => r.produced[0].count === 1)!;

    const recipeTree: RecipeTree = {
      stuff: Vehicles.Percutio,
      selectedRecipe: basicRecipe,
      recipes: recipes,
      required: [],
    };

    const result = calculateComponents(recipeTree, 1);
    expect(result.initial).toEqual([
      { stuff: Materials.RefinedMaterials, count: 120 },
    ]);
  });

  test("calculation works for O'Brien v.101 Freeman", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienFreeman)!;
    const basicRecipe = recipes.find(r => r.produced[0].count === 1)!;

    const recipeTree: RecipeTree = {
      stuff: Vehicles.OBrienFreeman,
      selectedRecipe: basicRecipe,
      recipes: recipes,
      required: [],
    };

    const result = calculateComponents(recipeTree, 1);
    expect(result.initial).toEqual([
      { stuff: Materials.RefinedMaterials, count: 180 },
    ]);
  });

  // Test mass production recipes exist and work
  test("mass production recipes exist for all vehicles", () => {
    const vehicles = [
      Vehicles.ActaeonTankette,
      Vehicles.Percutio,
      Vehicles.Gemini,
      Vehicles.OBrienGravekeeper,
      Vehicles.OBrienHighlander,
      Vehicles.OBrienFreeman,
      Vehicles.OBrienV110,
    ];

    vehicles.forEach(vehicle => {
      const recipes = RecipiesByStuff.get(vehicle)!;
      const massProductionRecipe = recipes.find(r => r.produced[0].count === 3);
      expect(massProductionRecipe).toBeDefined();
      expect(massProductionRecipe!.produced[0].stuff).toBe(vehicle);
      expect(massProductionRecipe!.produced[0].count).toBe(3);
    });
  });
});
