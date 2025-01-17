import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stuffList } from '@/lib/models'
import { Recipe, RecipeTree, RecipiesByStuff } from '../recipes'

interface DesiredStuffState {
  count: number,
  recipeTree?: RecipeTree,
}

// Define the initial state using that type
const initialState: DesiredStuffState = {
  count: 0,
}

const findRecipes = (stuffName: string): Recipe[] => {
  const stuffRecipes = RecipiesByStuff.get(stuffName);
  if (stuffRecipes === undefined) {
    return [];
  }
  return stuffRecipes;
}

const requiredByRecipe = (recipe: Recipe): RecipeTree[] => {
  return recipe.required.map(e => createRecipeTree(e.stuff));
}

const updateRequiredComponents = (tree: RecipeTree) => {
  tree.required = requiredByRecipe(tree.selectedRecipe);
}

const createRecipeTree = (targetStuff: string): RecipeTree => {
  const recipes = findRecipes(targetStuff);
  const selectedRecipe = recipes[0];
  const requiredComponents = requiredByRecipe(selectedRecipe);
  return {
    stuff: targetStuff,
    recipes: recipes,
    selectedRecipe,
    required: requiredComponents,
  };
}

interface SelectRecipePayload {
  treePath: string[]
  recipe: Recipe
}

export const desiredStuffSlice = createSlice({
  name: 'desiredStuff',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeCount: (state, action: PayloadAction<string>) => {
      const countNumber = +action.payload;
      state.count = countNumber > 0 ? countNumber : 0;
    },
    changeStuff: (state, action: PayloadAction<string>) => {
      stuffList.forEach(e => {
        if (e.name === action.payload) {
          state.recipeTree = createRecipeTree(e.name);
        }
      });
    },
    selectTreeRecipe: (state, action: PayloadAction<SelectRecipePayload>) => {
      let currentTree = state.recipeTree;
      if (!currentTree) {
        return;
      }
      action.payload.treePath.slice(1).forEach(e => {
        currentTree = currentTree?.required.find(sub => sub.stuff === e);
      });
      currentTree.selectedRecipe = action.payload.recipe;
      updateRequiredComponents(currentTree);
    },
  },
})

export const { changeCount, changeStuff, selectTreeRecipe } = desiredStuffSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.desiredStuff.count

export default desiredStuffSlice.reducer