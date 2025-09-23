import { IRecipe, RecipeEntity } from "../models";

let recipeId = 1;

export function createRecipe(
  required: RecipeEntity[],
  produced: RecipeEntity[]
): IRecipe {
  return {
    id: recipeId++,
    required,
    produced,
  };
}

export function createEmptyRecipe(stuff: string): IRecipe {
  return {
    id: recipeId++,
    required: [],
    produced: [{ stuff, count: 1 }],
  };
}

export function emptyRecipePair(stuff: string): [string, IRecipe[]] {
  return [stuff, [createEmptyRecipe(stuff)]];
}
