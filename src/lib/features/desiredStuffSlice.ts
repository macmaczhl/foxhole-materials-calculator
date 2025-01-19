import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stuffList } from '@/lib/models'
import { RecipiesByStuff } from '../recipes'
import { IRecipe, RecipeEntity, RecipeTree } from '../models'
import { getTargetTriple } from 'next/dist/build/swc/generated-native'

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

const getTimesToProduce = (target: RecipeTree, count: number): number => {
  const recipe = target.selectedRecipe;
  const targetStuff = recipe.produced.find(e => e.stuff === target.stuff);
  if (!targetStuff) {
    return 0;
  }
  return Math.ceil(count / targetStuff.count);
}

const getRequiredMap = (target: RecipeTree, timesToProduce: number): Map<string, number> => {
  const result = new Map<string, number>();
  const recipe = target.selectedRecipe;
  recipe.required.forEach(e => result.set(e.stuff, e.count * timesToProduce));
  return result;
}

const getRequiredMapRecursive = (target: RecipeTree, timesToProduce: number): Map<string, number> => {
  if (target.required.length === 0) {
    const result = new Map<string, number>([[target.stuff, timesToProduce]]);
    return result;
  }

  const currentRecipe = target.selectedRecipe;
  const result = new Map<string, number>();
  const requiredMaps = target.required.map(component => {
    const recipeEntry = currentRecipe.required.find(entry => entry.stuff === component.stuff);
    if (!recipeEntry) {
      return new Map<string, number>()
    }

    return getRequiredMapRecursive(component, getTimesToProduce(component, recipeEntry.count * timesToProduce));
  });

  requiredMaps.forEach(map => {
    map.forEach((v, k) => {
      const oldValue = result.get(k);
      let newValue = v;
      if (oldValue) {
        result.set(k, oldValue + v);
        newValue += oldValue;
      }
      result.set(k, newValue);
    });
  });
  return result;
}

const recalculateReport = (state: DesiredStuffState) => {
  if (state.count < 1 || !state.recipeTree) {
    return;
  }

  const timesToProduce = getTimesToProduce(state.recipeTree, state.count);
  const initialComponentsMap = getRequiredMap(state.recipeTree, timesToProduce);
  state.initialComponents = initialComponentsMap.entries().map(e => ({ stuff: e[0], count: e[1] })).toArray();
  const calculatedComponentsMap = getRequiredMapRecursive(state.recipeTree, timesToProduce);
  state.calculatedComponents = calculatedComponentsMap.entries().map(e => ({ stuff: e[0], count: e[1] })).toArray();
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
