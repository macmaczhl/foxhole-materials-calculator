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
    expect(RecipiesByStuff.has(Vehicles.OBrienWildJack)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienKnave)).toBe(true);
    expect(RecipiesByStuff.has(Vehicles.OBrienSquire)).toBe(true);
  });

  test("T12 Actaeon Tankette recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.ActaeonTankette);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    // Check basic recipe structure - now uses Refined Materials
    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(35);
  });

  test("T5 Percutio recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.Percutio);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(10);
    expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
    expect(basicRecipe!.required[1].count).toBe(10);
    expect(basicRecipe!.required[2].stuff).toBe(Vehicles.Xiphos);
    expect(basicRecipe!.required[2].count).toBe(1);
  });

  test("T8 Gemini recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.Gemini);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(10);
    expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
    expect(basicRecipe!.required[1].count).toBe(10);
    expect(basicRecipe!.required[2].stuff).toBe(Vehicles.Xiphos);
    expect(basicRecipe!.required[2].count).toBe(1);
  });

  test("O'Brien v.113 Gravekeeper recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienGravekeeper);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(5);
    expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
    expect(basicRecipe!.required[1].count).toBe(5);
    expect(basicRecipe!.required[2].stuff).toBe(Vehicles.OBrienV110);
    expect(basicRecipe!.required[2].count).toBe(1);
  });

  test("O'Brien v.121 Highlander recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienHighlander);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(15);
    expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
    expect(basicRecipe!.required[1].count).toBe(15);
    expect(basicRecipe!.required[2].stuff).toBe(Vehicles.OBrienKnave);
    expect(basicRecipe!.required[2].count).toBe(1);
  });

  test("O'Brien v.101 Freeman recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienFreeman);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(15);
    expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
    expect(basicRecipe!.required[1].count).toBe(15);
    expect(basicRecipe!.required[2].stuff).toBe(Vehicles.OBrienKnave);
    expect(basicRecipe!.required[2].count).toBe(1);
  });

  test("O'Brien v.110 recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienV110);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(25);
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
      { stuff: Materials.ConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Vehicles.Xiphos, count: 1 },
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
      { stuff: Materials.ConstructionMaterials, count: 15 },
      { stuff: Materials.AssemblyMaterialsI, count: 15 },
      { stuff: Vehicles.OBrienKnave, count: 1 },
    ]);
  });

  // Add tests for the three new vehicles
  test("O'Brien V.130 Wild Jack recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienWildJack);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(10);
  });

  test("O'Brien V.190 Knave recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienKnave);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
    expect(basicRecipe!.required[0].count).toBe(40);
  });

  test("O'Brien V.200 Squire recipes are valid", () => {
    const recipes = RecipiesByStuff.get(Vehicles.OBrienSquire);
    expect(recipes).toBeDefined();
    expect(recipes!.length).toBeGreaterThan(0);

    const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
    expect(basicRecipe).toBeDefined();
    expect(basicRecipe!.required[0].stuff).toBe(Materials.ProcessedConstructionMaterials);
    expect(basicRecipe!.required[0].count).toBe(35);
    expect(basicRecipe!.required[3].stuff).toBe(Vehicles.OBrienKnave);
    expect(basicRecipe!.required[3].count).toBe(1);
  });

  // Test mass production recipes exist for vehicles that have them
  test("mass production recipes exist for applicable vehicles", () => {
    // Vehicles with mass production recipes
    const vehiclesWithMassProduction = [
      Vehicles.Xiphos,
      Vehicles.ActaeonTankette,
      Vehicles.OBrienV110,
      Vehicles.OBrienKnave,
    ];

    vehiclesWithMassProduction.forEach(vehicle => {
      const recipes = RecipiesByStuff.get(vehicle)!;
      const massProductionRecipes = recipes.filter(r => r.produced[0].count > 1);
      expect(massProductionRecipes.length).toBeGreaterThan(0);
    });

    // Test single-recipe vehicles have only one recipe (upgrade vehicles)
    const singleRecipeVehicles = [
      Vehicles.Percutio,
      Vehicles.Gemini,
      Vehicles.OBrienGravekeeper,
      Vehicles.OBrienHighlander,
      Vehicles.OBrienFreeman,
      Vehicles.OBrienWildJack,
      Vehicles.OBrienSquire,
    ];

    singleRecipeVehicles.forEach(vehicle => {
      const recipes = RecipiesByStuff.get(vehicle)!;
      expect(recipes.length).toBe(1);
      expect(recipes[0].produced[0].count).toBe(1);
    });
  });
});
