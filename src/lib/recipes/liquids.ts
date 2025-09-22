import { Liquids, RawResources, IRecipe } from "../models";
import { createRecipe, createEmptyRecipe } from "./base";

const petrolRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: Liquids.Oil, count: 50 }],
    [{ stuff: Liquids.Petrol, count: 50 }]
  ),
  createRecipe(
    [
      { stuff: Liquids.Oil, count: 40 },
      { stuff: Liquids.Water, count: 10 },
    ],
    [{ stuff: Liquids.Petrol, count: 50 }]
  ),
];

const heavyOilRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: RawResources.Coke, count: 260 },
      { stuff: Liquids.HeavyOil, count: 60 },
    ]
  ),
  createRecipe(
    [{ stuff: Liquids.Oil, count: 50 }],
    [{ stuff: Liquids.HeavyOil, count: 30 }]
  ),
];

const enrichedOilRecipes: IRecipe[] = [
  createRecipe(
    [{ stuff: RawResources.Coal, count: 100 }],
    [{ stuff: Liquids.EnrichedOil, count: 1 }]
  ),
  createRecipe(
    [
      { stuff: Liquids.HeavyOil, count: 30 },
      { stuff: RawResources.Sulfur, count: 60 },
    ],
    [{ stuff: Liquids.EnrichedOil, count: 30 }]
  ),
];

const oilRecipes: IRecipe[] = [
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 100 },
    ],
    [
      { stuff: "Concrete Materials", count: 1 },
      { stuff: RawResources.Sulfur, count: 15 },
      { stuff: Liquids.Oil, count: 100 },
    ]
  ),
  createRecipe(
    [
      { stuff: RawResources.Coal, count: 300 },
      { stuff: Liquids.Water, count: 50 },
    ],
    [
      { stuff: "Concrete Materials", count: 1 },
      { stuff: RawResources.Sulfur, count: 10 },
      { stuff: Liquids.Oil, count: 50 },
    ]
  ),
  createRecipe(
    [{ stuff: Liquids.Water, count: 25 }],
    [{ stuff: Liquids.Oil, count: 100 }]
  ),
];

const waterRecipes: IRecipe[] = [createEmptyRecipe(Liquids.Water)];

export const liquidRecipes = new Map<string, IRecipe[]>([
  [Liquids.Petrol, petrolRecipes],
  [Liquids.HeavyOil, heavyOilRecipes],
  [Liquids.Water, waterRecipes],
  [Liquids.EnrichedOil, enrichedOilRecipes],
  [Liquids.Oil, oilRecipes],
]);
