"use client";

import { useAppSelector } from "@/lib/hooks";
import { shallowEqual } from "react-redux";
import { SelectorTree } from "./SelectorTree";

export function RecipesSelectors() {
  const rows = useAppSelector((state) => state.desired.rows, shallowEqual);

  return (
    <div className="flex flex-col my-6 mr-6 space-y-4">
      {rows.map((row) => (
        <div key={row.id} className="panel">
          <div className="mb-2 text-sm font-semibold text-muted-200">
            {row.stuffName
              ? `Recipes: ${row.stuffName}`
              : "Select an item to see recipes"}
          </div>
          {row.recipeTree && (
            <div className="flex flex-col">
              <SelectorTree
                rowId={row.id}
                recipesTree={row.recipeTree}
                treePath={[row.recipeTree.stuff]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
