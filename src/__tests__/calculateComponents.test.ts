import { Materials, RecipeTree, IRecipe } from '../lib/models';
import { calculateComponents } from '../lib/services/calculateComponents';

// Mock recipe data for testing
const mockRecipe: IRecipe = {
  id: 1,
  required: [
    { stuff: 'Raw Material A', count: 2 },
    { stuff: 'Raw Material B', count: 3 }
  ],
  produced: [
    { stuff: Materials.ConstructionMaterials, count: 1 }
  ]
};

const mockRecipeTree: RecipeTree = {
  stuff: Materials.ConstructionMaterials,
  selectedRecipe: mockRecipe,
  recipes: [mockRecipe],
  required: []
};

describe('calculateComponents', () => {
  test('calculates initial components for simple recipe', () => {
    const result = calculateComponents(mockRecipeTree, 1);
    
    expect(result.initial).toEqual([
      { stuff: 'Raw Material A', count: 2 },
      { stuff: 'Raw Material B', count: 3 }
    ]);
  });

  test('scales components correctly for multiple items', () => {
    const result = calculateComponents(mockRecipeTree, 3);
    
    expect(result.initial).toEqual([
      { stuff: 'Raw Material A', count: 6 },
      { stuff: 'Raw Material B', count: 9 }
    ]);
  });

  test('returns raw components for basic recipe', () => {
    const result = calculateComponents(mockRecipeTree, 1);
    
    // For a recipe with no nested requirements, raw components should be the stuff itself
    expect(result.raw).toEqual([{ stuff: Materials.ConstructionMaterials, count: 1 }]);
    expect(result.excess).toEqual([]);
  });
});
