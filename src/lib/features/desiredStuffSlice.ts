import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stuffList } from '@/lib/models'
import { RecipiesByStuff } from '../recipes'
import { IRecipe, RecipeEntity, RecipeTree } from '../models'

interface DesiredStuffState {
  count: number,
  recipeTree?: RecipeTree,
  initialComponents: RecipeEntity[],
  calculatedComponents: RecipeEntity[],
}

// Define the initial state using that type
const initialState: DesiredStuffState = {
  count: 0,
  initialComponents: [],
  calculatedComponents: [],
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

const getRequiredMap = (target: RecipeTree, count: number): Map<string, number> => {
  const result = new Map<string, number>();
  const recipe = target.selectedRecipe;
  const targetStuff = recipe.produced.find(e => e.stuff === target.stuff);
  if (!targetStuff) {
    return result;
  }
  const timesToProduce = Math.ceil(count / targetStuff.count);
  recipe.required.forEach(e => result.set(e.stuff, e.count * timesToProduce));
  return result;
}

const recalculateReport = (state: DesiredStuffState) => {
  if (state.count < 1 || !state.recipeTree) {
    return;
  }

  const initialMap = getRequiredMap(state.recipeTree, state.count);
  state.initialComponents = initialMap.entries().map(e => ({ stuff: e[0], count: e[1] })).toArray();
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
      stuffList.forEach(e => {
        if (e.name === action.payload) {
          state.recipeTree = createRecipeTree(e.name);
          recalculateReport(state);
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
      recalculateReport(state);
    },
  },
})

export const { changeCount, changeStuff, selectTreeRecipe } = desiredStuffSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.desiredStuff.count;

export default desiredStuffSlice.reducer