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

// Mock Alekto crate recipe for testing
const alektoCrateRecipe: IRecipe = {
  id: 3,
  required: [{ stuff: Materials.RefinedMaterials, count: 252 }],
  produced: [{ stuff: Vehicles.Alekto, count: 6 }],
};

const alektoRecipeTree: RecipeTree = {
  stuff: Vehicles.Alekto,
  selectedRecipe: alektoCrateRecipe,
  recipes: [alektoCrateRecipe],
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

  test("calculates excess result for Alekto when requesting single unit", () => {
    const result = calculateComponents(alektoRecipeTree, 1);

    // When requesting 1 Alekto but crate recipe produces 6, should show 5 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.Alekto, count: 5 }]);
  });

  test("no excess result for Alekto when requesting exact crate amount", () => {
    const result = calculateComponents(alektoRecipeTree, 6);

    // When requesting exactly 6 Alekto, no excess should be shown
    expect(result.excessResult).toEqual([]);
  });

  test("calculates excess result for Alekto with multiple crates", () => {
    const result = calculateComponents(alektoRecipeTree, 7);

    // When requesting 7 Alekto, need 2 crates (12 total), so 5 excess
    expect(result.excessResult).toEqual([{ stuff: Vehicles.Alekto, count: 5 }]);
  });
});
