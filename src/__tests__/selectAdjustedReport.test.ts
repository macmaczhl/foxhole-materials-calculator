import { selectAdjustedReport } from "../lib/selectors";
import { selectRows } from "../lib/features/desiredSlice";
import { selectExistingItems } from "../lib/features/existingSlice";
import { Materials, Vehicles } from "../lib/models";
import type { RootState } from "../lib/store";

// Mock the calculateComponents function
jest.mock("../lib/services/calculateComponents", () => ({
  calculateComponents: jest.fn(),
}));

import { calculateComponents } from "../lib/services/calculateComponents";

const mockCalculateComponents = calculateComponents as jest.MockedFunction<
  typeof calculateComponents
>;

describe("selectAdjustedReport", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockState = (rows: any[], existingItems: any[] = []): RootState =>
    ({
      desired: {
        rows,
      },
      existing: {
        items: existingItems,
      },
    }) as any;

  test("returns empty arrays when no rows are present", () => {
    const state = createMockState([]);
    const result = selectAdjustedReport(state);

    expect(result).toEqual({
      initial: [],
      raw: [],
      excess: [],
      excessResult: [],
    });
  });

  test("returns empty arrays when rows have no recipeTree", () => {
    const state = createMockState([
      { id: "1", count: 5, recipeTree: null },
      { id: "2", count: 3, recipeTree: undefined },
    ]);
    const result = selectAdjustedReport(state);

    expect(result).toEqual({
      initial: [],
      raw: [],
      excess: [],
      excessResult: [],
    });
  });

  test("returns empty arrays when row count is less than 1", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    const state = createMockState([
      { id: "1", count: 0, recipeTree: mockRecipeTree },
      { id: "2", count: -1, recipeTree: mockRecipeTree },
    ]);
    const result = selectAdjustedReport(state);

    expect(result).toEqual({
      initial: [],
      raw: [],
      excess: [],
      excessResult: [],
    });
  });

  test("calculates components correctly for single row without existing items", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [{ stuff: "Components", count: 5 }],
      excessResult: [{ stuff: Materials.ConstructionMaterials, count: 2 }],
    });

    const state = createMockState([
      { id: "1", count: 3, recipeTree: mockRecipeTree },
    ]);
    const result = selectAdjustedReport(state);

    expect(mockCalculateComponents).toHaveBeenCalledWith(mockRecipeTree, 3);
    expect(result).toEqual({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [{ stuff: "Components", count: 5 }],
      excessResult: [{ stuff: Materials.ConstructionMaterials, count: 2 }],
    });
  });

  test("aggregates components from multiple rows", () => {
    const mockRecipeTree1 = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    const mockRecipeTree2 = {
      stuff: Materials.ProcessedConstructionMaterials,
      selectedRecipe: { id: 2, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents
      .mockReturnValueOnce({
        initial: [{ stuff: "Salvage", count: 10 }],
        raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
        excess: [{ stuff: "Components", count: 5 }],
        excessResult: [],
      })
      .mockReturnValueOnce({
        initial: [{ stuff: "Salvage", count: 20 }],
        raw: [{ stuff: Materials.ProcessedConstructionMaterials, count: 2 }],
        excess: [{ stuff: "Components", count: 10 }],
        excessResult: [],
      });

    const state = createMockState([
      { id: "1", count: 2, recipeTree: mockRecipeTree1 },
      { id: "2", count: 3, recipeTree: mockRecipeTree2 },
    ]);
    const result = selectAdjustedReport(state);

    expect(mockCalculateComponents).toHaveBeenCalledTimes(2);
    expect(result).toEqual({
      initial: [
        { stuff: "Salvage", count: 30 }, // 10 + 20
      ],
      raw: [
        { stuff: Materials.ConstructionMaterials, count: 1 },
        { stuff: Materials.ProcessedConstructionMaterials, count: 2 },
      ],
      excess: [
        { stuff: "Components", count: 15 }, // 5 + 10
      ],
      excessResult: [],
    });
  });

  test("subtracts existing items from initial requirements", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 50 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 5 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 5, recipeTree: mockRecipeTree }],
      [{ stuffName: "Salvage", count: 20 }]
    );
    const result = selectAdjustedReport(state);

    expect(result.initial).toEqual([{ stuff: "Salvage", count: 30 }]);
    expect(result.raw).toEqual([
      { stuff: Materials.ConstructionMaterials, count: 5 },
    ]);
  });

  test("subtracts existing raw materials directly", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 10 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 10, recipeTree: mockRecipeTree }],
      [{ stuffName: Materials.ConstructionMaterials, count: 3 }]
    );
    const result = selectAdjustedReport(state);

    expect(result.raw).toEqual([
      { stuff: Materials.ConstructionMaterials, count: 7 },
    ]);
  });

  test("handles Construction Materials intermediate material conversion", () => {
    const mockRecipeTree = {
      stuff: Vehicles.Xiphos,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [],
      raw: [{ stuff: "Salvage", count: 100 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 1, recipeTree: mockRecipeTree }],
      [{ stuffName: "Construction Materials", count: 5 }]
    );
    const result = selectAdjustedReport(state);

    // 5 Construction Materials should save 50 Salvage (5 * 10)
    expect(result.raw).toEqual([{ stuff: "Salvage", count: 50 }]);
  });

  test("handles Processed Construction Materials intermediate material conversion", () => {
    const mockRecipeTree = {
      stuff: Vehicles.Acheron,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [],
      raw: [
        { stuff: "Salvage", count: 200 },
        { stuff: "Components", count: 100 },
      ],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 1, recipeTree: mockRecipeTree }],
      [{ stuffName: "Processed Construction Materials", count: 2 }]
    );
    const result = selectAdjustedReport(state);

    // 2 Processed Construction Materials should save:
    // - 60 Salvage (2 * 30)
    // - 40 Components (2 * 20)
    expect(result.raw).toEqual([
      { stuff: "Salvage", count: 140 }, // 200 - 60
      { stuff: "Components", count: 60 }, // 100 - 40
    ]);
  });

  test("handles Refined Materials intermediate material conversion", () => {
    const mockRecipeTree = {
      stuff: Vehicles.Alekto,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [],
      raw: [
        { stuff: "Salvage", count: 500 },
        { stuff: "Components", count: 300 },
      ],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 1, recipeTree: mockRecipeTree }],
      [{ stuffName: "Refined Materials", count: 3 }]
    );
    const result = selectAdjustedReport(state);

    // 3 Refined Materials should save:
    // - 270 Salvage (3 * 90)
    // - 240 Components (3 * 80)
    expect(result.raw).toEqual([
      { stuff: "Salvage", count: 230 }, // 500 - 270
      { stuff: "Components", count: 60 }, // 300 - 240
    ]);
  });

  test("returns same reference when inputs haven't changed (memoization)", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState([
      { id: "1", count: 1, recipeTree: mockRecipeTree },
    ]);

    const result1 = selectAdjustedReport(state);
    const result2 = selectAdjustedReport(state);

    expect(result1).toBe(result2);
    expect(mockCalculateComponents).toHaveBeenCalledTimes(1);
  });

  test("returns different reference when inputs change", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [],
      excessResult: [],
    });

    const state1 = createMockState([
      { id: "1", count: 1, recipeTree: mockRecipeTree },
    ]);

    const state2 = createMockState([
      { id: "1", count: 2, recipeTree: mockRecipeTree },
    ]);

    const result1 = selectAdjustedReport(state1);
    const result2 = selectAdjustedReport(state2);

    expect(result1).not.toBe(result2);
    expect(mockCalculateComponents).toHaveBeenCalledTimes(2);
  });

  test("handles zero count existing items correctly", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 1, recipeTree: mockRecipeTree }],
      [{ stuffName: "Salvage", count: 0 }]
    );
    const result = selectAdjustedReport(state);

    expect(result.initial).toEqual([{ stuff: "Salvage", count: 10 }]);
    expect(result.raw).toEqual([
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]);
  });

  test("handles existing items that exceed requirements", () => {
    const mockRecipeTree = {
      stuff: Materials.ConstructionMaterials,
      selectedRecipe: { id: 1, required: [], produced: [] },
      recipes: [],
      required: [],
    };

    mockCalculateComponents.mockReturnValue({
      initial: [{ stuff: "Salvage", count: 10 }],
      raw: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
      excess: [],
      excessResult: [],
    });

    const state = createMockState(
      [{ id: "1", count: 1, recipeTree: mockRecipeTree }],
      [{ stuffName: "Salvage", count: 20 }]
    );
    const result = selectAdjustedReport(state);

    // Should not go negative, should be empty array when count becomes 0
    expect(result.initial).toEqual([]);
    expect(result.raw).toEqual([
      { stuff: Materials.ConstructionMaterials, count: 1 },
    ]);
  });
});
