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
    createRecipe([
        { stuff: RawResources.Salvage, count: 25 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 1 },
        { stuff: Materials.MetalBeam, count: 1 },
    ]),
    createRecipe([
        { stuff: RawResources.Salvage, count: 25 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 1 },
        { stuff: Materials.Sandbag, count: 1 },
    ]),
    createRecipe([
        { stuff: RawResources.Salvage, count: 15 },
        { stuff: RawResources.Coke, count: 15 },
    ], [
        { stuff: Materials.ConstructionMaterials, count: 3 },
    ]),
];

const processedConstructionMaterialsRecipes: IRecipe[] = [
    createRecipe([
        { stuff: Materials.ConstructionMaterials, count: 3 },
        { stuff: RawResources.Components, count: 20 },
    ], [
        { stuff: Materials.ProcessedConstructionMaterials, count: 1 },
    ]),
    createRecipe([
        { stuff: Materials.ConstructionMaterials, count: 3 },
        { stuff: RawResources.Components, count: 55 },
        { stuff: Liquids.HeavyOil, count: 55 },
    ], [
        { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
    ]),
    createRecipe([
        { stuff: Materials.ConstructionMaterials, count: 15 },
        { stuff: Materials.MetalBeam, count: 1 },
        { stuff: Liquids.HeavyOil, count: 15 },
    ], [
        { stuff: Materials.ProcessedConstructionMaterials, count: 1 },
    ]),
];

const metalBeamsRecipes: IRecipe[] = [
    createRecipe([
        { stuff: Materials.ConstructionMaterials, count: 3 },
        { stuff: RawResources.Components, count: 20 },
    ], [
        { stuff: Materials.MetalBeam, count: 1 },
    ]),
];

export const RecipiesByStuff = new Map<string, IRecipe[]>([
    [Materials.ConstructionMaterials, constructionMaterialsRecipes],
    [Materials.ProcessedConstructionMaterials, processedConstructionMaterialsRecipes],
    [Materials.MetalBeam, metalBeamsRecipes],

    [RawResources.Salvage, [createEmptyRecipe(RawResources.Salvage)]],
    [RawResources.Components, [createEmptyRecipe(RawResources.Components)]],
    [RawResources.Coke, [createEmptyRecipe(RawResources.Coke)]],
    [Liquids.Petrol, [createEmptyRecipe(Liquids.Petrol)]],
    [Liquids.HeavyOil, [createEmptyRecipe(Liquids.HeavyOil)]],
]);
