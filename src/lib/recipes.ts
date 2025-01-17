import { Liquids, Materials, RawResources } from "./models"

interface RecipeEntity {
    stuff: string
    count: number
}

export interface Recipe {
    id: number
    required: RecipeEntity[]
    produced: RecipeEntity[]
}

export interface RecipeTree {
    stuff: string
    selectedRecipe: Recipe
    recipes: Recipe[]
    required: RecipeTree[]
}

let recipeId = 1;
function createRecipe(required: RecipeEntity[], produced: RecipeEntity[]): Recipe {
    return {
        id: recipeId++,
        required,
        produced,
    }
}

function createEmptyRecipe(stuff: string): Recipe {
    return {
        id: recipeId++,
        required: [],
        produced: [{ stuff, count: 1 }],
    };
}

const constructionMaterialsRecipes: Recipe[] = [
    createRecipe([
        { stuff: RawResources.Salvage, count: 10 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 1 }
    ]),
    createRecipe([
        { stuff: Liquids.Petrol, count: 25 },
        { stuff: RawResources.Salvage, count: 10 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 3 }
    ]),
];

export const RecipiesByStuff = new Map<string, Recipe[]>([
    [Materials.ConstructionMaterials, constructionMaterialsRecipes],
    [RawResources.Salvage, [createEmptyRecipe(RawResources.Salvage)]],
    [Liquids.Petrol, [createEmptyRecipe(Liquids.Petrol)]]
]);