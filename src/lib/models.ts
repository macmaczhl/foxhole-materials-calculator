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
    Water = 'Water',
}

export enum RawResources {
    Salvage = 'Salvage',
    Components = 'Components',
    Coke = 'Coke',
    DamagedComponents = 'Damaged Components',
    Coal = 'Coal',
    Sulfur = 'Sulfur',
}

export const availableMaterials: Stuff[] = [
    { name: RawResources.Components },
    { name: RawResources.Coke },
    { name: Materials.ConstructionMaterials },
    { name: Materials.ProcessedConstructionMaterials },
    { name: Materials.BarbedWire },
    { name: Materials.MetalBeam },
    { name: Materials.Sandbag },
];

export const stuffList: Stuff[] = availableMaterials;
