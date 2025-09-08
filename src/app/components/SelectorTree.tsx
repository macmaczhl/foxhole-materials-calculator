import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React from "react";

interface SelectorTreeProps {
    recipesTree: RecipeTree;
    treePath: string[];
}

export function SelectorTree({ recipesTree, treePath }: SelectorTreeProps) {
  return <>
    <RecipesSelector stuff={recipesTree.stuff} recipes={recipesTree.recipes} treePath={treePath} />
    {recipesTree.required.map(e => (
      <SelectorTree key={e.stuff} recipesTree={e} treePath={[...treePath, e.stuff]} />
    ))}
  </>;
}
