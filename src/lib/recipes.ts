import { IRecipe, Liquids, Materials, RawResources, RecipeEntity } from "./models"

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

function emptyRecipePair(stuff: string): [string, IRecipe[]] {
    return [stuff, [createEmptyRecipe(stuff)]];
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
        { stuff: RawResources.Salvage, count: 25 },
    ], [
        { stuff: Materials.MetalBeam, count: 1 },
        { stuff: Materials.ConstructionMaterials, count: 1 },
    ]),
];

const bardedWireRecipes: IRecipe[] = [
    createRecipe([
        { stuff: RawResources.Salvage, count: 25 },
    ], [
        { stuff: Materials.BarbedWire, count: 5 },
        { stuff: Materials.ConstructionMaterials, count: 1 },
    ]),
];

const sandbagRecipes: IRecipe[] = [
    createRecipe([
        { stuff: RawResources.Salvage, count: 15 },
    ], [
        { stuff: Materials.Sandbag, count: 5 },
        { stuff: Materials.ConstructionMaterials, count: 1 },
    ]),
];

const componentsRecipes: IRecipe[] = [
    createRecipe([
        { stuff: RawResources.DamagedComponents, count: 75 },
    ], [
        { stuff: RawResources.Components, count: 5 },
    ]),
    createEmptyRecipe(RawResources.Components),
];

const cokeRecipes: IRecipe[] = [
    createRecipe([
        { stuff: RawResources.Coal, count: 200 },
    ], [
        { stuff: RawResources.Coke, count: 180 },
    ]),
    createRecipe([
        { stuff: RawResources.Coal, count: 300 },
        { stuff: Liquids.Water, count: 100 },
    ], [
        { stuff: RawResources.Coke, count: 260 },
        { stuff: Liquids.HeavyOil, count: 60 },
    ]),
    createRecipe([
        { stuff: RawResources.Coal, count: 200 },
    ], [
        { stuff: RawResources.Coke, count: 165 },
        { stuff: RawResources.Sulfur, count: 15 },
    ]),
]

export const RecipiesByStuff = new Map<string, IRecipe[]>([
    [Materials.ConstructionMaterials, constructionMaterialsRecipes],
    [Materials.ProcessedConstructionMaterials, processedConstructionMaterialsRecipes],
    [Materials.BarbedWire, bardedWireRecipes],
    [Materials.MetalBeam, metalBeamsRecipes],
    [Materials.Sandbag, sandbagRecipes],
    [RawResources.Components, componentsRecipes],
    [RawResources.Coke, cokeRecipes],

    emptyRecipePair(RawResources.Salvage),
    emptyRecipePair(Liquids.Petrol),
    emptyRecipePair(Liquids.HeavyOil),
    emptyRecipePair(RawResources.DamagedComponents),
    emptyRecipePair(RawResources.Coal),
    emptyRecipePair(Liquids.Water),
    emptyRecipePair(RawResources.Sulfur),
]);
