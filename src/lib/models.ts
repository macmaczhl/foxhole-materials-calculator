export interface Stuff {
    name: string
}

export enum Materials {
    ConstructionMaterials = 'Construction Materials',
    ProcessedConstructionMaterials = 'Processed Construction Materials',
}

export enum Liquids {
    Petrol = 'Petrol',
}

export enum RawResources {
    Salvage = 'Salvage',
    Components = 'Components',
}

export const materials: Stuff[] = [{ name: Materials.ConstructionMaterials }];

export const stuffList: Stuff[] = materials;