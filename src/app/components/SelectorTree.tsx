import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React from "react";

interface SelectorTreeProps {
    rowId: string;
    recipesTree: RecipeTree;
    treePath: string[];
    isLast?: boolean;
}

export function SelectorTree({ rowId, recipesTree, treePath, isLast = false }: SelectorTreeProps) {
  return <>
    <RecipesSelector
      rowId={rowId}
      stuff={recipesTree.stuff}
      recipes={recipesTree.recipes}
      treePath={treePath}
      isLast={isLast}
    />
    {recipesTree.required.map((e, index) => (
      <SelectorTree
        key={e.stuff}
        rowId={rowId}
        recipesTree={e}
        treePath={[...treePath, e.stuff]}
        isLast={index === recipesTree.required.length - 1}
      />
    ))}
  </>;
}
