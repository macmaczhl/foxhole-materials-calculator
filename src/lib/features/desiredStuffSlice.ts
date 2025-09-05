import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { stuffList } from '@/lib/models'
import { RecipiesByStuff } from '../recipes'
import { IRecipe, RecipeEntity, RecipeTree } from '../models'
import { calculateComponents } from '../services/calculateComponents'

export interface DesiredRow {
  id: string
  count: number
  stuffName: string
  recipeTree?: RecipeTree
}

interface DesiredState {
  rows: DesiredRow[]
  initialComponents: RecipeEntity[]
  rawComponents: RecipeEntity[]
  excessComponents: RecipeEntity[]
}

const findRecipes = (stuffName: string): IRecipe[] => {
  const stuffRecipes = RecipiesByStuff.get(stuffName);
  if (stuffRecipes === undefined) return [];
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
    recipes,
    selectedRecipe,
    required: requiredComponents,
  };
}

const initialState: DesiredState = {
  rows: [
    { id: nanoid(), count: 0, stuffName: '' }
  ],
  initialComponents: [],
  rawComponents: [],
  excessComponents: [],
};

const addToMap = (map: Map<string, number>, key: string, value: number) => {
  const old = map.get(key) ?? 0;
  map.set(key, old + value);
};

const mapToEntities = (map: Map<string, number>): RecipeEntity[] =>
  Array.from(map.entries()).map(([stuff, count]) => ({ stuff, count }));

const recalcAll = (state: DesiredState) => {
  const initial = new Map<string, number>();
  const raw = new Map<string, number>();
  const excess = new Map<string, number>();

  for (const row of state.rows) {
    if (!row.recipeTree || row.count < 1) continue;
    const comp = calculateComponents(row.recipeTree, row.count);
    for (const e of comp.initial) addToMap(initial, e.stuff, e.count);
    for (const e of comp.raw) addToMap(raw, e.stuff, e.count);
    for (const e of comp.excess) addToMap(excess, e.stuff, e.count);
  }

  state.initialComponents = mapToEntities(initial);
  state.rawComponents = mapToEntities(raw);
  state.excessComponents = mapToEntities(excess);
}

interface ChangeCountPayload { rowId: string; value: string }
interface ChangeStuffPayload { rowId: string; value: string }
interface SelectRecipePayload { rowId: string; treePath: string[]; recipe: IRecipe }

export const desiredSlice = createSlice({
  name: 'desired',
  initialState,
  reducers: {
    addRow: (state) => {
      state.rows.push({ id: nanoid(), count: 0, stuffName: '' });
      recalcAll(state);
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      if (state.rows.length <= 1) return;
      state.rows = state.rows.filter(r => r.id !== action.payload);
      recalcAll(state);
    },
    changeCount: (state, action: PayloadAction<ChangeCountPayload>) => {
      const row = state.rows.find(r => r.id === action.payload.rowId);
      if (!row) return;
      const n = +action.payload.value;
      row.count = Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
      recalcAll(state);
    },
    changeStuff: (state, action: PayloadAction<ChangeStuffPayload>) => {
      const row = state.rows.find(r => r.id === action.payload.rowId);
      if (!row) return;
      row.stuffName = action.payload.value;
      const found = stuffList.find(s => s.name === action.payload.value);
      if (found) {
        row.recipeTree = createRecipeTree(found.name);
      } else {
        row.recipeTree = undefined;
      }
      recalcAll(state);
    },
    selectTreeRecipe: (state, action: PayloadAction<SelectRecipePayload>) => {
      const row = state.rows.find(r => r.id === action.payload.rowId);
      if (!row || !row.recipeTree) return;

      let currentTree: RecipeTree | undefined = row.recipeTree;
      action.payload.treePath.slice(1).forEach(e => {
        currentTree = currentTree?.required.find(sub => sub.stuff === e);
      });
      if (!currentTree) return;

      currentTree.selectedRecipe = action.payload.recipe;
      updateRequiredComponents(currentTree);
      recalcAll(state);
    },
  }
})

export const {
  addRow,
  deleteRow,
  changeCount,
  changeStuff,
  selectTreeRecipe
} = desiredSlice.actions;

export const selectRows = (state: RootState) => state.desired.rows;
export const selectReport = (state: RootState) => ({
  initial: state.desired.initialComponents,
  raw: state.desired.rawComponents,
  excess: state.desired.excessComponents,
});

export default desiredSlice.reducer;