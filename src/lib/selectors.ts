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

  // If no existing items, return the normal calculation
  if (existingItems.length === 0) {
    return {
      initial: mapToEntities(initial),
      raw: mapToEntities(raw),
      excess: mapToEntities(excess),
      excessResult: mapToEntities(excessResult),
    };
  }

  // Build recipes map from the recipe trees - we need access to all recipes
  // For now, we'll use a simpler approach: subtract existing items from both initial and raw,
  // but also try to reduce intermediate requirements
  const existingMap = new Map<string, number>();
  for (const item of existingItems) {
    addToMap(existingMap, item.stuffName, item.count);
  }

  // Subtract existing items from initial requirements
  for (const [stuffName, count] of existingMap) {
    subtractFromMap(initial, stuffName, count);
  }

  // For raw materials, we need to be smarter about intermediate materials
  // If we have intermediate materials, reduce the raw material requirements accordingly
  for (const [stuffName, count] of existingMap) {
    // If this existing item appears in our raw requirements, subtract it directly
    if (raw.has(stuffName)) {
      subtractFromMap(raw, stuffName, count);
      continue;
    }

    // This is an intermediate material - we need to figure out what raw materials it saves
    // For now, let's implement a basic case for Construction Materials -> Salvage
    if (stuffName === 'Construction Materials') {
      // 1 Construction Materials = 10 Salvage (basic recipe)
      const salvagedSaved = count * 10;
      subtractFromMap(raw, 'Salvage', salvagedSaved);
    }
    // Add more intermediate material mappings as needed
    else if (stuffName === 'Processed Construction Materials') {
      // 1 Processed Construction Materials = 3 Construction Materials + 20 Components
      // 3 Construction Materials = 30 Salvage
      const salvagedSaved = count * 30;
      const componentsSaved = count * 20;
      subtractFromMap(raw, 'Salvage', salvagedSaved);
      subtractFromMap(raw, 'Components', componentsSaved);
    }
    else if (stuffName === 'Refined Materials') {
      // 1 Refined Materials = 3 Processed Construction Materials + 20 Components
      // 3 Processed Construction Materials = 9 Construction Materials + 60 Components
      // 9 Construction Materials = 90 Salvage
      const salvagedSaved = count * 90;
      const componentsSaved = count * 80; // 20 + 60
      subtractFromMap(raw, 'Salvage', salvagedSaved);
      subtractFromMap(raw, 'Components', componentsSaved);
    }
  }

  return {
    initial: mapToEntities(initial),
    raw: mapToEntities(raw),
    excess: mapToEntities(excess),
    excessResult: mapToEntities(excessResult),
  };
};
