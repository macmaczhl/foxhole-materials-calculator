import { Vehicles, Materials, RecipeTree, IRecipe } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";

describe("O-75b Ares Calculation", () => {
  // O-75b Ares recipe from superTanks.ts
  const aresRecipe: IRecipe = {
    id: 1,
    required: [
      { stuff: Materials.SteelConstructionMaterials, count: 275 },
      { stuff: Materials.AssemblyMaterialsIII, count: 105 },
      { stuff: Materials.AssemblyMaterialsIV, count: 95 },
      { stuff: Materials.AssemblyMaterialsV, count: 105 },
      { stuff: Materials.RareAlloys, count: 3 },
    ],
    produced: [{ stuff: Vehicles.O75bAres, count: 1 }],
  };

  const aresRecipeTree: RecipeTree = {
    stuff: Vehicles.O75bAres,
    selectedRecipe: aresRecipe,
    recipes: [aresRecipe],
    required: [],
  };

  test("calculates components for 1 O-75b Ares", () => {
    const result = calculateComponents(aresRecipeTree, 1);

    // Should have the exact recipe components in 'initial'
    expect(result.initial).toContainEqual({
      stuff: Materials.SteelConstructionMaterials,
      count: 275,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsIII,
      count: 105,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsIV,
      count: 95,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsV,
      count: 105,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.RareAlloys,
      count: 3,
    });
  });

  test("calculates components for 2 O-75b Ares", () => {
    const result = calculateComponents(aresRecipeTree, 2);

    // Should have doubled components in 'initial'
    expect(result.initial).toContainEqual({
      stuff: Materials.SteelConstructionMaterials,
      count: 550,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsIII,
      count: 210,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsIV,
      count: 190,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.AssemblyMaterialsV,
      count: 210,
    });
    expect(result.initial).toContainEqual({
      stuff: Materials.RareAlloys,
      count: 6,
    });
  });
});
