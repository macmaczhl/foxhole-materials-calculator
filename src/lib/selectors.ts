import { useAppSelector } from "./hooks"
import type { RootState } from './store'
import { selectRows } from './features/desiredSlice'
import { selectExistingItems } from './features/existingSlice'
import { calculateComponents } from './services/calculateComponents'
import { IRecipe, RecipeEntity } from "./models";

export const useTreeSelectedRecipe = (rowId: string, treePath: string[]): IRecipe | undefined => {
  return useAppSelector((state) => {
    const row = state.desired.rows.find(r => r.id === rowId);
    let currentTree = row?.recipeTree;
    treePath.slice(1).forEach(e => {
      currentTree = currentTree?.required.find(sub => sub.stuff === e);
    });
    return currentTree?.selectedRecipe;
  });
}

const addToMap = (map: Map<string, number>, key: string, value: number) => {
  const old = map.get(key) ?? 0;
  map.set(key, old + value);
};

const subtractFromMap = (map: Map<string, number>, key: string, value: number) => {
  const old = map.get(key) ?? 0;
  const newValue = Math.max(0, old - value);
  if (newValue > 0) {
    map.set(key, newValue);
  } else {
    map.delete(key);
  }
};

const mapToEntities = (map: Map<string, number>): RecipeEntity[] =>
  Array.from(map.entries()).map(([stuff, count]) => ({ stuff, count }));

export const selectAdjustedReport = (state: RootState) => {
  const rows = selectRows(state);
  const existingItems = selectExistingItems(state);

  const initial = new Map<string, number>();
  const raw = new Map<string, number>();
  const excess = new Map<string, number>();
  const excessResult = new Map<string, number>();

  // Calculate required materials from desired items
  for (const row of rows) {
    if (!row.recipeTree || row.count < 1) continue;
    const comp = calculateComponents(row.recipeTree, row.count);
    for (const e of comp.initial) addToMap(initial, e.stuff, e.count);
    for (const e of comp.raw) addToMap(raw, e.stuff, e.count);
    for (const e of comp.excess) addToMap(excess, e.stuff, e.count);
    for (const e of comp.excessResult) addToMap(excessResult, e.stuff, e.count);
  }

  // Subtract existing items from required materials
  for (const existingItem of existingItems) {
    subtractFromMap(initial, existingItem.stuffName, existingItem.count);
    subtractFromMap(raw, existingItem.stuffName, existingItem.count);
  }

  return {
    initial: mapToEntities(initial),
    raw: mapToEntities(raw),
    excess: mapToEntities(excess),
    excessResult: mapToEntities(excessResult),
  };
};
