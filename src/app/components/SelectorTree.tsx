import { RecipeTree } from "@/lib/models";
import { RecipesSelector } from "./RecipesSelector";
import React, { useMemo } from "react";
import styles from "./SelectorTree.module.css";

interface SelectorTreeProps {
  rowId: string;
  recipesTree: RecipeTree;
  treePath: string[];
  isLast?: boolean;
}

export const SelectorTree = React.memo<SelectorTreeProps>(
  function SelectorTree({ rowId, recipesTree, treePath, isLast = false }) {
    // Memoize expensive computations
    const { depth, hasChildren, wrapperClassNames } = useMemo(() => {
      const depth = treePath.length - 1;
      const isRoot = depth === 0;
      const hasChildren = recipesTree.required.length > 0;
      const wrapperClassNames = [
        styles.treeNode,
        !hasChildren ? styles.treeNodeLeaf : "",
        isRoot ? styles.treeNodeRoot : "",
        isLast ? styles.treeNodeLast : "",
      ]
        .filter(Boolean)
        .join(" ");

      return { depth, hasChildren, wrapperClassNames };
    }, [treePath.length, recipesTree.required.length, isLast]);

    // Memoize child components to prevent unnecessary re-renders
    const childComponents = useMemo(() => {
      if (!hasChildren) return null;

      return recipesTree.required.map((e, index) => {
        const newTreePath = [...treePath, e.stuff];
        return (
          <SelectorTree
            key={`${e.stuff}-${index}`}
            rowId={rowId}
            recipesTree={e}
            treePath={newTreePath}
            isLast={index === recipesTree.required.length - 1}
          />
        );
      });
    }, [hasChildren, recipesTree.required, treePath, rowId]);

    return (
      <div
        className={wrapperClassNames}
        style={{ "--tree-depth": depth } as React.CSSProperties}
      >
        <div className={styles.treeNodeContent}>
          <RecipesSelector
            rowId={rowId}
            stuff={recipesTree.stuff}
            recipes={recipesTree.recipes}
            treePath={treePath}
          />
        </div>
        {hasChildren && (
          <div className={styles.treeNodeChildren}>{childComponents}</div>
        )}
      </div>
    );
  }
);
