import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";

// Mock recipe data for testing
const mockRecipe: IRecipe = {
  id: 1,
  required: [
    { stuff: "Raw Material A", count: 2 },
    { stuff: "Raw Material B", count: 3 },
  ],
  produced: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
};

const mockRecipeTree: RecipeTree = {
  stuff: Materials.ConstructionMaterials,
  selectedRecipe: mockRecipe,
  recipes: [mockRecipe],
  required: [],
};

// Mock Xiphos crate recipe for testing excess result
const xiphosCrateRecipe: IRecipe = {
  id: 2,
  required: [{ stuff: Materials.RefinedMaterials, count: 179 }],
  produced: [{ stuff: Vehicles.Xiphos, count: 9 }],
};

const xiphosRecipeTree: RecipeTree = {
  stuff: Vehicles.Xiphos,
  selectedRecipe: xiphosCrateRecipe,
  recipes: [xiphosCrateRecipe],
  required: [],
};

// Mock Alekto recipe for testing with new complex ingredients
const alektoComplexRecipe: IRecipe = {
  id: 3,
  required: [
    { stuff: Materials.SteelConstructionMaterials, count: 10 },
    { stuff: Materials.AssemblyMaterialsII, count: 20 },
    { stuff: Materials.AssemblyMaterialsIII, count: 15 },
    { stuff: Materials.RareAlloys, count: 1 },
    { stuff: Vehicles.Tisiphone, count: 1 },
  ],
  produced: [{ stuff: Vehicles.Alekto, count: 1 }],
};

const alektoRecipeTree: RecipeTree = {
  stuff: Vehicles.Alekto,
  selectedRecipe: alektoComplexRecipe,
  recipes: [alektoComplexRecipe],
  required: [],
};

// Mock Acheron crate recipe for testing Landing APC
const acheronCrateRecipe: IRecipe = {
  id: 4,
  required: [{ stuff: Materials.RefinedMaterials, count: 144 }],
  produced: [{ stuff: Vehicles.Acheron, count: 9 }],
};

const acheronRecipeTree: RecipeTree = {
  stuff: Vehicles.Acheron,
  selectedRecipe: acheronCrateRecipe,
  recipes: [acheronCrateRecipe],
  required: [],
};

// Mock Doru recipe for testing Landing APC (single production recipe)
const doruGarageRecipe: IRecipe = {
  id: 5,
  required: [
    { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
    { stuff: Materials.AssemblyMaterialsIII, count: 3 },
  ],
  produced: [{ stuff: Vehicles.Doru, count: 1 }],
};

const doruRecipeTree: RecipeTree = {
  stuff: Vehicles.Doru,
  selectedRecipe: doruGarageRecipe,
  recipes: [doruGarageRecipe],
  required: [],
};

// Mock Mulloy LPC crate recipe for testing Landing APC
const mulloyLPCCrateRecipe: IRecipe = {
  id: 6,
  required: [{ stuff: Materials.RefinedMaterials, count: 144 }],
  produced: [{ stuff: Vehicles.MulloyLPC, count: 9 }],
};

const mulloyLPCRecipeTree: RecipeTree = {
  stuff: Vehicles.MulloyLPC,
  selectedRecipe: mulloyLPCCrateRecipe,
  recipes: [mulloyLPCCrateRecipe],
  required: [],
};

describe("calculateComponents", () => {
  test("calculates initial components for simple recipe", () => {
    const result = calculateComponents(mockRecipeTree, 1);

    expect(result.initial).toEqual([
      { stuff: "Raw Material A", count: 2 },
      { stuff: "Raw Material B", count: 3 },
    ]);
  });

  test("scales components correctly for multiple items", () => {
    const result = calculateComponents(mockRecipeTree, 3);

    expect(result.initial).toEqual([
      { stuff: "Raw Material A", count: 6 },
      { stuff: "Raw Material B", count: 9 },
    ]);
  });

  test("returns raw components for basic recipe", () => {
    const result = calculateComponents(mockRecipeTree, 1);

    // For a recipe with no nested requirements, raw components should be the stuff itself
    expect(result.raw).toEqual([
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]);
    expect(result.excess).toEqual([]);
    expect(result.excessResult).toEqual([]);
  });

  test("calculates excess result when crate recipe produces more than requested", () => {
    const result = calculateComponents(xiphosRecipeTree, 1);

    // When requesting 1 Xiphos but crate recipe produces 9, should show 8 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.Xiphos, count: 8 }]);
  });

  test("no excess result when requesting exact amount produced by recipe", () => {
    const result = calculateComponents(xiphosRecipeTree, 9);

    // When requesting exactly 9 Xiphos, no excess should be shown
    expect(result.excessResult).toEqual([]);
  });

  test("calculates excess result for multiple crates", () => {
    const result = calculateComponents(xiphosRecipeTree, 10);

    // When requesting 10 Xiphos, need 2 crates (18 total), so 8 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.Xiphos, count: 8 }]);
  });

  test("calculates components for Alekto with complex recipe", () => {
    const result = calculateComponents(alektoRecipeTree, 1);

    // Alekto has complex recipe with no excess (single production)
    expect(result.excessResult).toEqual([]);
    expect(result.initial).toEqual([
      { stuff: Materials.SteelConstructionMaterials, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 15 },
      { stuff: Materials.RareAlloys, count: 1 },
      { stuff: Vehicles.Tisiphone, count: 1 },
    ]);
  });

  test("calculates components for multiple Alekto", () => {
    const result = calculateComponents(alektoRecipeTree, 2);

    // When requesting 2 Alekto, should scale all ingredients by 2
    expect(result.excessResult).toEqual([]);
    expect(result.initial).toEqual([
      { stuff: Materials.SteelConstructionMaterials, count: 20 },
      { stuff: Materials.AssemblyMaterialsII, count: 40 },
      { stuff: Materials.AssemblyMaterialsIII, count: 30 },
      { stuff: Materials.RareAlloys, count: 2 },
      { stuff: Vehicles.Tisiphone, count: 2 },
    ]);
  });

  test("calculates components for AB-8 Acheron Landing APC", () => {
    const result = calculateComponents(acheronRecipeTree, 1);

    // When requesting 1 Acheron but crate recipe produces 9, should show 8 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.Acheron, count: 8 }]);
    expect(result.initial).toEqual([{ stuff: Materials.RefinedMaterials, count: 144 }]);
  });

  test("calculates components for AB-11 Doru Landing APC", () => {
    const result = calculateComponents(doruRecipeTree, 1);

    // Doru has no excess (single production recipe)
    expect(result.excessResult).toEqual([]);
    expect(result.initial).toEqual([
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsIII, count: 3 },
    ]);
  });

  test("calculates components for Mulloy LPC Landing APC", () => {
    const result = calculateComponents(mulloyLPCRecipeTree, 3);

    // When requesting 3 Mulloy LPC but crate recipe produces 9, should show 6 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.MulloyLPC, count: 6 }]);
    expect(result.initial).toEqual([{ stuff: Materials.RefinedMaterials, count: 144 }]);
  });

  test("no excess for Landing APCs when requesting exact crate amount", () => {
    // Test Acheron exact amount (9 vehicles)
    const acheronResult = calculateComponents(acheronRecipeTree, 9);
    expect(acheronResult.excessResult).toEqual([]);

    // Test Doru exact amount (1 vehicle - single recipe)
    const doruResult = calculateComponents(doruRecipeTree, 1);
    expect(doruResult.excessResult).toEqual([]);

    // Test Mulloy LPC exact amount (9 vehicles)
    const mulloyResult = calculateComponents(mulloyLPCRecipeTree, 9);
    expect(mulloyResult.excessResult).toEqual([]);
  });
});
