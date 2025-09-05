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
    SteelConstructionMaterials = 'Steel Construction Materials',
    ConcreteMaterials = 'Concrete Materials',
    Pipe = 'Pipe',
    RareAlloys = 'Rare Alloys',
    ThermalShielding = 'Thermal Shielding',
    UnstableSubstances = 'Unstable Substances',
    FlameAmmo = 'Flame Ammo',
    AssemblyMaterialsI = 'Assembly Materials I',
    AssemblyMaterialsII = 'Assembly Materials II',
    AssemblyMaterialsIII = 'Assembly Materials III',
    AssemblyMaterialsIV = 'Assembly Materials IV',
    AssemblyMaterialsV = 'Assembly Materials V',
}

export enum Liquids {
    Petrol = 'Petrol',
    HeavyOil = 'Heavy Oil',
    Water = 'Water',
    EnrichedOil = 'Enriched Oil',
    Oil = 'Oil',
}

export enum RawResources {
    Salvage = 'Salvage',
    Components = 'Components',
    Coke = 'Coke',
    DamagedComponents = 'Damaged Components',
    Coal = 'Coal',
    Sulfur = 'Sulfur',
    RareMetal = 'Rare Metal',
    HeavyExplosivePowder = 'Heavy Explosive Powder',
}

export const availableMaterials: Stuff[] = [
    { name: RawResources.Components },
    { name: RawResources.Coke },
    { name: Materials.ConstructionMaterials },
    { name: Materials.ProcessedConstructionMaterials },
    { name: Materials.BarbedWire },
    { name: Materials.MetalBeam },
    { name: Materials.Sandbag },
    { name: Materials.AssemblyMaterialsI },
    { name: Materials.AssemblyMaterialsII },
    { name: Materials.AssemblyMaterialsIII },
    { name: Materials.AssemblyMaterialsIV },
    { name: Materials.AssemblyMaterialsV },
    { name: Materials.SteelConstructionMaterials },
    { name: Materials.ConcreteMaterials },
    { name: Materials.Pipe },
    { name: Materials.RareAlloys },
    { name: Materials.ThermalShielding },
    { name: Materials.UnstableSubstances },
    { name: Materials.FlameAmmo },
    { name: Liquids.Petrol },
    { name: Liquids.HeavyOil },
    { name: Liquids.Water },
    { name: Liquids.EnrichedOil },
    { name: Liquids.Oil },
];

export const stuffList: Stuff[] = availableMaterials;
