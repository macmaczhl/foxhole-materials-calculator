import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React from "react";

interface SelectorTreeProps {
    rowId: string;
    recipesTree: RecipeTree;
    treePath: string[];
}

export function SelectorTree({ rowId, recipesTree, treePath }: SelectorTreeProps) {
    return <>
        <RecipesSelector rowId={rowId} stuff={recipesTree.stuff} recipes={recipesTree.recipes} treePath={treePath} />
        {recipesTree.required.map(e => (
            <SelectorTree key={e.stuff} rowId={rowId} recipesTree={e} treePath={[...treePath, e.stuff]} />
        ))}
    </>;
}