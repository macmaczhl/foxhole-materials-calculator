import { RecipeEntity, RecipeTree } from "../models";

const getTimesToProduce = (target: RecipeTree, count: number): number => {
  const recipe = target.selectedRecipe;
  const targetStuff = recipe.produced.find(e => e.stuff === target.stuff);
  if (!targetStuff) {
    return 0;
  }
  return Math.ceil(count / targetStuff.count);
}

function addToMap(map: Map<string, number>, key: string, value: number) {
  const oldValue = map.get(key);
  const newValue = oldValue === undefined ? value : oldValue + value;
  map.set(key, newValue);
}

function mergeMaps(one: Map<string, number>, two: Map<string, number>): Map<string, number> {
  const result = new Map<string, number>(one.entries());
  for (const [k, v] of two) {
    addToMap(result, k, v);
  }
  return result;
}

function mapToEntities(map: Map<string, number>): RecipeEntity[] {
  return Array.from(map.entries()).map(e => ({ stuff: e[0], count: e[1] }));
}

function calculateRawAndExcessComponents(recipeTree: RecipeTree, timesToProduce: number): { raw: Map<string, number>, excess: Map<string, number> } {
  if (recipeTree.required.length === 0) {
    return {
      raw: new Map<string, number>([[recipeTree.stuff, timesToProduce]]),
      excess: new Map<string, number>(),
    };
  }

  const recipe = recipeTree.selectedRecipe;

  let raw = new Map<string, number>();
  let excess = new Map<string, number>();
  for (const requiredRecipeEntity of recipe.required) {
    for (const requiredTree of recipeTree.required) {
      if (requiredTree.stuff === requiredRecipeEntity.stuff) {
        const requiredTimesToProduce = getTimesToProduce(requiredTree, timesToProduce * requiredRecipeEntity.count);
        const calculatedRequired = calculateRawAndExcessComponents(requiredTree, requiredTimesToProduce);
        raw = mergeMaps(raw, calculatedRequired.raw);
        excess = mergeMaps(excess, calculatedRequired.excess);
      }
    }
  }
  for (const producedEntity of recipe.produced) {
    if (producedEntity.stuff !== recipeTree.stuff) {
      addToMap(excess, producedEntity.stuff, producedEntity.count * timesToProduce);
    }
  }

  return { raw, excess };
}

function calculateInitialComponents(recipeTree: RecipeTree, timesToProduce: number): RecipeEntity[] {
  const recipe = recipeTree.selectedRecipe;
  return recipe.required.map(e => ({ stuff: e.stuff, count: e.count * timesToProduce }));
}

export function calculateComponents(recipeTree: RecipeTree, stuffCount: number): { initial: RecipeEntity[], raw: RecipeEntity[], excess: RecipeEntity[], excessResult: RecipeEntity[] } {
  const timesToProduce = getTimesToProduce(recipeTree, stuffCount);

  const initial = calculateInitialComponents(recipeTree, timesToProduce);
  const components = calculateRawAndExcessComponents(recipeTree, timesToProduce);
  const raw = mapToEntities(components.raw);
  const excess = mapToEntities(components.excess);

  // Calculate excess result (when we produce more of the target item than requested)
  const recipe = recipeTree.selectedRecipe;
  const targetStuff = recipe.produced.find(e => e.stuff === recipeTree.stuff);
  const actualProduced = targetStuff ? targetStuff.count * timesToProduce : 0;
  const excessResultCount = actualProduced - stuffCount;
  const excessResult = excessResultCount > 0 ? [{ stuff: recipeTree.stuff, count: excessResultCount }] : [];

  return { initial, raw, excess, excessResult };
}
