import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React from "react";

interface SelectorTreeProps {
  rowId: string;
  recipesTree: RecipeTree;
  treePath: string[];
  isLast?: boolean;
  isFirst?: boolean;
  hasSiblings?: boolean;
}

export function SelectorTree({
  rowId,
  recipesTree,
  treePath,
  isLast = false,
  isFirst = false,
  hasSiblings = false,
}: SelectorTreeProps) {
  const hasRequired = recipesTree.required.length > 0;

  return (
    <div className="relative">
      <RecipesSelector
        rowId={rowId}
        stuff={recipesTree.stuff}
        recipes={recipesTree.recipes}
        treePath={treePath}
        isLast={isLast && !hasRequired}
        isFirst={isFirst}
        hasSiblings={hasSiblings}
      />

      {/* Render required items with proper tree structure */}
      {hasRequired && (
        <div className="relative">
          {recipesTree.required.map((e, index) => {
            const isLastChild = index === recipesTree.required.length - 1;
            const hasChildSiblings = recipesTree.required.length > 1;

            return (
              <SelectorTree
                key={e.stuff}
                rowId={rowId}
                recipesTree={e}
                treePath={[...treePath, e.stuff]}
                isLast={isLastChild}
                isFirst={index === 0}
                hasSiblings={hasChildSiblings}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
