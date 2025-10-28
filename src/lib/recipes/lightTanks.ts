import { Materials, Vehicles, IRecipe } from "../models";
import { createRecipe } from "./base";

// ===== LIGHT TANKS =====

// H-5 "Hatchet" Light Tank recipes
const h5HatchetRecipes: IRecipe[] = [
  // Garage production: 115 x Refined Materials → 1 x H-5 "Hatchet"
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 115 }],
    [{ stuff: Vehicles.H5Hatchet, count: 1 }]
  ),
  // Mass Production Factory: 827 x Refined Materials → 3 crates of 3 x H-5 "Hatchet" (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 827 }],
    [{ stuff: Vehicles.H5Hatchet, count: 9 }]
  ),
  // Mass Production Factory: 1034 x Refined Materials → 4 crates of 3 x H-5 "Hatchet" (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1034 }],
    [{ stuff: Vehicles.H5Hatchet, count: 12 }]
  ),
  // Mass Production Factory: 1206 x Refined Materials → 5 crates of 3 x H-5 "Hatchet" (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1206 }],
    [{ stuff: Vehicles.H5Hatchet, count: 15 }]
  ),
];

// H-8 "Kranesca" Light Tank recipes
const h8KranescaRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x H-5 "Hatchet" + 5 x Processed Construction Materials + 20 x Assembly Materials I + 5 x Assembly Materials IV → 1 x H-8 "Kranesca"
  createRecipe(
    [
      { stuff: Vehicles.H5Hatchet, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 5 },
      { stuff: Materials.AssemblyMaterialsI, count: 20 },
      { stuff: Materials.AssemblyMaterialsIV, count: 5 },
    ],
    [{ stuff: Vehicles.H8Kranesca, count: 1 }]
  ),
];

// H-10 "Pelekys" Light Tank recipes
const h10PelekysRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x H-5 "Hatchet" + 8 x Processed Construction Materials + 20 x Assembly Materials II + 5 x Assembly Materials III → 1 x H-10 "Pelekys"
  createRecipe(
    [
      { stuff: Vehicles.H5Hatchet, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 8 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
    ],
    [{ stuff: Vehicles.H10Pelekys, count: 1 }]
  ),
];

// H-19 "Vulcan" Light Tank recipes
const h19VulcanRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x H-5 "Hatchet" + 8 x Processed Construction Materials + 20 x Assembly Materials II + 5 x Assembly Materials III → 1 x H-19 "Vulcan"
  createRecipe(
    [
      { stuff: Vehicles.H5Hatchet, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 8 },
      { stuff: Materials.AssemblyMaterialsII, count: 20 },
      { stuff: Materials.AssemblyMaterialsIII, count: 5 },
    ],
    [{ stuff: Vehicles.H19Vulcan, count: 1 }]
  ),
];

// Devitt Mk. III Light Tank recipes
const devittMkIIIRecipes: IRecipe[] = [
  // Garage production: 120 x Refined Materials → 1 x Devitt Mk. III
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 120 }],
    [{ stuff: Vehicles.DevittMkIII, count: 1 }]
  ),
  // Mass Production Factory: 864 x Refined Materials → 3 crates of 3 x Devitt Mk. III (9 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 864 }],
    [{ stuff: Vehicles.DevittMkIII, count: 9 }]
  ),
  // Mass Production Factory: 1080 x Refined Materials → 4 crates of 3 x Devitt Mk. III (12 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1080 }],
    [{ stuff: Vehicles.DevittMkIII, count: 12 }]
  ),
  // Mass Production Factory: 1260 x Refined Materials → 5 crates of 3 x Devitt Mk. III (15 total)
  createRecipe(
    [{ stuff: Materials.RefinedMaterials, count: 1260 }],
    [{ stuff: Vehicles.DevittMkIII, count: 15 }]
  ),
];

// Devitt-Caine Mk. IV MMR Light Tank recipes
const devittCaineMkIVMMRRecipes: IRecipe[] = [
  // Small Assembly Station: 1 x Devitt Mk. III + 3 x Processed Construction Materials + 20 x Assembly Materials I + 3 x Assembly Materials IV → 1 x Devitt-Caine Mk. IV MMR
  createRecipe(
    [
      { stuff: Vehicles.DevittMkIII, count: 1 },
      { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
      { stuff: Materials.AssemblyMaterialsI, count: 20 },
      { stuff: Materials.AssemblyMaterialsIV, count: 3 },
    ],
    [{ stuff: Vehicles.DevittCaineMkIVMMR, count: 1 }]
  ),
];

export const lightTankRecipes = new Map<string, IRecipe[]>([
  // Light Tanks
  [Vehicles.H5Hatchet, h5HatchetRecipes],
  [Vehicles.H8Kranesca, h8KranescaRecipes],
  [Vehicles.H10Pelekys, h10PelekysRecipes],
  [Vehicles.H19Vulcan, h19VulcanRecipes],
  [Vehicles.DevittMkIII, devittMkIIIRecipes],
  [Vehicles.DevittCaineMkIVMMR, devittCaineMkIVMMRRecipes],
]);
