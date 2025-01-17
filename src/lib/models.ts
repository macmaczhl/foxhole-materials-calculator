export interface Stuff {
    name: string
}

export interface RecipeEntity {
    stuff: string
    count: number
}

export interface IRecipe {
    id: number
    required: RecipeEntity[]
    produced: RecipeEntity[]
}

export interface RecipeTree {
    stuff: string
    selectedRecipe: IRecipe
    recipes: IRecipe[]
    required: RecipeTree[]
}

export enum Materials {
    ConstructionMaterials = 'Construction Materials',
    ProcessedConstructionMaterials = 'Processed Construction Materials',
    BarbedWire = 'Barbed Wire',
}

export enum Liquids {
    Petrol = 'Petrol',
}

export enum RawResources {
    Salvage = 'Salvage',
    Components = 'Components',
}

export const materials: Stuff[] = [
    { name: Materials.ConstructionMaterials },
];

export const stuffList: Stuff[] = materials;

