import { IRecipe, Liquids, Materials, RawResources, RecipeEntity } from "./models"

class Recipe implements IRecipe {
    id: number
    required: RecipeEntity[]
    produced: RecipeEntity[]

    constructor(id: number, required: RecipeEntity[], produced: RecipeEntity[]) {
        this.id = id;
        this.required = required;
        this.produced = produced;
    }

    getRequiredMap(producedTargetStuff: string, count: number): Map<string, number> {
        const result = new Map<string, number>();
        const targetStuff = this.produced.find(e => e.stuff === producedTargetStuff);
        if (!targetStuff) {
            return result;
        }
        const timesToProduce = Math.ceil(count / targetStuff.count);
        this.required.forEach(e => {
            result.set(e.stuff, e.count);
        });
        return result;
    }
}

let recipeId = 1;
function createRecipe(required: RecipeEntity[], produced: RecipeEntity[]): IRecipe {
    return {
        id: recipeId++,
        required,
        produced,
    }
}

function createEmptyRecipe(stuff: string): IRecipe {
    return {
        id: recipeId++,
        required: [],
        produced: [{ stuff, count: 1 }],
    }
}

const constructionMaterialsRecipes: IRecipe[] = [
    createRecipe([
        { stuff: RawResources.Salvage, count: 10 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 1 },
    ]),
    createRecipe([
        { stuff: RawResources.Salvage, count: 25 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 1 },
        { stuff: Materials.BarbedWire, count: 5 },
    ]),
    createRecipe([
        { stuff: Liquids.Petrol, count: 25 },
        { stuff: RawResources.Salvage, count: 10 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 3 },
    ]),
];

export const RecipiesByStuff = new Map<string, IRecipe[]>([
    [Materials.ConstructionMaterials, constructionMaterialsRecipes],
    [RawResources.Salvage, [createEmptyRecipe(RawResources.Salvage)]],
    [Liquids.Petrol, [createEmptyRecipe(Liquids.Petrol)]]
]);