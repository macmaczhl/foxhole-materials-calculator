import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stuffList } from '@/lib/models'
import { RecipiesByStuff } from '../recipes'
import { IRecipe, RecipeEntity, RecipeTree } from '../models'
import { calculateComponents } from '../services/calculateComponents'

interface DesiredStuffState {
  count: number,
  stuffName: string,
  recipeTree?: RecipeTree,
  initialComponents: RecipeEntity[],
  rawComponents: RecipeEntity[],
  excessComponents: RecipeEntity[],
}

// Define the initial state using that type
const initialState: DesiredStuffState = {
  count: 0,
  stuffName: '',
  initialComponents: [],
  rawComponents: [],
  excessComponents: [],
}

const findRecipes = (stuffName: string): IRecipe[] => {
  const stuffRecipes = RecipiesByStuff.get(stuffName);
  if (stuffRecipes === undefined) {
    return [];
  }
  return stuffRecipes;
}

const requiredByRecipe = (recipe: IRecipe): RecipeTree[] => {
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

const recalculateReport = (state: DesiredStuffState) => {
  if (state.count < 1 || !state.recipeTree) {
    return;
  }

  const components = calculateComponents(state.recipeTree, state.count);
  state.initialComponents = components.initial;
  state.rawComponents = components.raw;
  state.excessComponents = components.excess;
}

interface SelectRecipePayload {
  treePath: string[]
  recipe: IRecipe
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
      recalculateReport(state);
    },
    changeStuff: (state, action: PayloadAction<string>) => {
      state.stuffName = action.payload;
      for (const stuff of stuffList) {
        if (stuff.name === action.payload) {
          state.recipeTree = createRecipeTree(stuff.name);
          recalculateReport(state);
          return;
        }
      }
      state.recipeTree = undefined;
      recalculateReport(state);
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
      recalculateReport(state);
    },
  },
})

export const { changeCount, changeStuff, selectTreeRecipe } = desiredStuffSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.desiredStuff.count;

export default desiredStuffSlice.reducer
