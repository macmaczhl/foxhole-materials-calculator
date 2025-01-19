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
    MetalBeam = 'Metal Beam Wire',
    Sandbag = 'Sandbag',
}

export enum Liquids {
    Petrol = 'Petrol',
    HeavyOil = 'Heavy Oil',
}

export enum RawResources {
    Salvage = 'Salvage',
    Components = 'Components',
    Coke = 'Coke',
}

export const availableMaterials: Stuff[] = [
    { name: Materials.ConstructionMaterials },
    { name: Materials.ProcessedConstructionMaterials },
];

export const stuffList: Stuff[] = availableMaterials;
