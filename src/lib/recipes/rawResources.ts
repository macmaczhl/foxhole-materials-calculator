import { RawResources, IRecipe } from "../models";
import { createRecipe, createEmptyRecipe, emptyRecipePair } from "./base";

const componentsRecipes: IRecipe[] = [
  createEmptyRecipe(RawResources.Components),
  createRecipe(
    [{ stuff: RawResources.DamagedComponents, count: 75 }],
    [{ stuff: RawResources.Components, count: 5 }]
  ),
];

const cokeRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Coal, count: 200 }],
    [{ stuff: RawResources.Coke, count: 180 }]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: "Water", count: 100 },
    ],
    [
      { stuff: RawResources.Coke, count: 260 },
      { stuff: "Heavy Oil", count: 60 },
    ]
  ),
  createRecipe(
    [{ stuff: RawResources.Coal, count: 200 }],
    [
      { stuff: RawResources.Coke, count: 165 },
      { stuff: RawResources.Sulfur, count: 15 },
    ]
  ),
];

export const rawResourceRecipes = new Map<string, IRecipe[]>([
  [RawResources.Components, componentsRecipes],
  [RawResources.Coke, cokeRecipes],

  // Empty recipes for basic raw resources
  emptyRecipePair(RawResources.Salvage),
  emptyRecipePair(RawResources.DamagedComponents),
  emptyRecipePair(RawResources.Coal),
  emptyRecipePair(RawResources.Sulfur),
  emptyRecipePair(RawResources.RareMetal),
  emptyRecipePair(RawResources.HeavyExplosivePowder),
  emptyRecipePair(RawResources.BasicMaterials),
]);
