import { IRecipe } from "./models";
import { rawResourceRecipes } from "./recipes/rawResources";
import { constructionMaterialRecipes } from "./recipes/constructionMaterials";
import { liquidRecipes } from "./recipes/liquids";
import { assemblyMaterialRecipes } from "./recipes/assemblyMaterials";
import { vehicleRecipes } from "./recipes/vehicles";

// Combine all recipe categories into a single map
export const RecipiesByStuff = new Map<string, IRecipe[]>([
  ...rawResourceRecipes,
  ...constructionMaterialRecipes,
  ...liquidRecipes,
  ...assemblyMaterialRecipes,
  ...vehicleRecipes,
]);
