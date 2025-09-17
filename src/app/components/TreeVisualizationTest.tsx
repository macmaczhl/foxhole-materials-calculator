"use client";

import { SelectorTree } from "./SelectorTree";
import { RecipeTree, Materials, RawResources, Liquids } from "@/lib/models";

// Create a complex test recipe tree for Assembly Materials V
const testRecipeTree: RecipeTree = {
  stuff: Materials.AssemblyMaterialsV,
  selectedRecipe: {
    id: 1,
    required: [
      { stuff: Materials.SteelConstructionMaterials, count: 3 },
      { stuff: RawResources.Coke, count: 245 },
      { stuff: Materials.AssemblyMaterialsI, count: 10 },
      { stuff: Materials.AssemblyMaterialsII, count: 10 },
    ],
    produced: [{ stuff: Materials.AssemblyMaterialsV, count: 1 }],
  },
  recipes: [
    {
      id: 1,
      required: [
        { stuff: Materials.SteelConstructionMaterials, count: 3 },
        { stuff: RawResources.Coke, count: 245 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 10 },
      ],
      produced: [{ stuff: Materials.AssemblyMaterialsV, count: 1 }],
    },
  ],
  required: [
    // Steel Construction Materials
    {
      stuff: Materials.SteelConstructionMaterials,
      selectedRecipe: {
        id: 2,
        required: [
          { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
          { stuff: RawResources.Coke, count: 200 },
          { stuff: RawResources.Sulfur, count: 65 },
          { stuff: Liquids.HeavyOil, count: 35 },
        ],
        produced: [{ stuff: Materials.SteelConstructionMaterials, count: 1 }],
      },
      recipes: [
        {
          id: 2,
          required: [
            { stuff: Materials.ProcessedConstructionMaterials, count: 3 },
            { stuff: RawResources.Coke, count: 200 },
            { stuff: RawResources.Sulfur, count: 65 },
            { stuff: Liquids.HeavyOil, count: 35 },
          ],
          produced: [{ stuff: Materials.SteelConstructionMaterials, count: 1 }],
        },
      ],
      required: [
        // Processed Construction Materials
        {
          stuff: Materials.ProcessedConstructionMaterials,
          selectedRecipe: {
            id: 3,
            required: [
              { stuff: Materials.ConstructionMaterials, count: 3 },
              { stuff: RawResources.Components, count: 20 },
            ],
            produced: [{ stuff: Materials.ProcessedConstructionMaterials, count: 1 }],
          },
          recipes: [
            {
              id: 3,
              required: [
                { stuff: Materials.ConstructionMaterials, count: 3 },
                { stuff: RawResources.Components, count: 20 },
              ],
              produced: [{ stuff: Materials.ProcessedConstructionMaterials, count: 1 }],
            },
          ],
          required: [
            // Construction Materials
            {
              stuff: Materials.ConstructionMaterials,
              selectedRecipe: {
                id: 4,
                required: [{ stuff: RawResources.Salvage, count: 10 }],
                produced: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
              },
              recipes: [
                {
                  id: 4,
                  required: [{ stuff: RawResources.Salvage, count: 10 }],
                  produced: [{ stuff: Materials.ConstructionMaterials, count: 1 }],
                },
              ],
              required: [],
            },
            // Components
            {
              stuff: RawResources.Components,
              selectedRecipe: {
                id: 5,
                required: [],
                produced: [{ stuff: RawResources.Components, count: 1 }],
              },
              recipes: [
                {
                  id: 5,
                  required: [],
                  produced: [{ stuff: RawResources.Components, count: 1 }],
                },
              ],
              required: [],
            },
          ],
        },
        // Coke
        {
          stuff: RawResources.Coke,
          selectedRecipe: {
            id: 6,
            required: [{ stuff: RawResources.Coal, count: 200 }],
            produced: [{ stuff: RawResources.Coke, count: 180 }],
          },
          recipes: [
            {
              id: 6,
              required: [{ stuff: RawResources.Coal, count: 200 }],
              produced: [{ stuff: RawResources.Coke, count: 180 }],
            },
          ],
          required: [],
        },
        // Sulfur
        {
          stuff: RawResources.Sulfur,
          selectedRecipe: {
            id: 7,
            required: [],
            produced: [{ stuff: RawResources.Sulfur, count: 1 }],
          },
          recipes: [
            {
              id: 7,
              required: [],
              produced: [{ stuff: RawResources.Sulfur, count: 1 }],
            },
          ],
          required: [],
        },
        // Heavy Oil
        {
          stuff: Liquids.HeavyOil,
          selectedRecipe: {
            id: 8,
            required: [
              { stuff: RawResources.Coal, count: 300 },
              { stuff: Liquids.Water, count: 100 },
            ],
            produced: [
              { stuff: RawResources.Coke, count: 260 },
              { stuff: Liquids.HeavyOil, count: 60 },
            ],
          },
          recipes: [
            {
              id: 8,
              required: [
                { stuff: RawResources.Coal, count: 300 },
                { stuff: Liquids.Water, count: 100 },
              ],
              produced: [
                { stuff: RawResources.Coke, count: 260 },
                { stuff: Liquids.HeavyOil, count: 60 },
              ],
            },
          ],
          required: [],
        },
      ],
    },
    // Assembly Materials I
    {
      stuff: Materials.AssemblyMaterialsI,
      selectedRecipe: {
        id: 9,
        required: [
          { stuff: RawResources.Salvage, count: 15 },
          { stuff: RawResources.Coke, count: 75 },
        ],
        produced: [{ stuff: Materials.AssemblyMaterialsI, count: 1 }],
      },
      recipes: [
        {
          id: 9,
          required: [
            { stuff: RawResources.Salvage, count: 15 },
            { stuff: RawResources.Coke, count: 75 },
          ],
          produced: [{ stuff: Materials.AssemblyMaterialsI, count: 1 }],
        },
      ],
      required: [],
    },
    // Assembly Materials II
    {
      stuff: Materials.AssemblyMaterialsII,
      selectedRecipe: {
        id: 10,
        required: [
          { stuff: RawResources.Salvage, count: 15 },
          { stuff: Liquids.Petrol, count: 50 },
        ],
        produced: [{ stuff: Materials.AssemblyMaterialsII, count: 1 }],
      },
      recipes: [
        {
          id: 10,
          required: [
            { stuff: RawResources.Salvage, count: 15 },
            { stuff: Liquids.Petrol, count: 50 },
          ],
          produced: [{ stuff: Materials.AssemblyMaterialsII, count: 1 }],
        },
      ],
      required: [],
    },
  ],
};

export function TreeVisualizationTest() {
  return (
    <div className="panel">
      <div className="mb-4 text-lg font-semibold text-muted-200">
        Tree Visualization Test - Assembly Materials V
      </div>
      <div className="text-sm text-muted-400 mb-4">
        This shows a complex recipe tree with multiple levels of dependencies to test the tree connector rendering.
      </div>
      <div className="flex flex-col">
        <SelectorTree
          rowId="test-row"
          recipesTree={testRecipeTree}
          treePath={[testRecipeTree.stuff]}
        />
      </div>
    </div>
  );
}
