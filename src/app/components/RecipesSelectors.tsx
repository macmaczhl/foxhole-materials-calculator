import { useAppSelector } from "@/lib/hooks";
import { shallowEqual } from "react-redux";
import { SelectorTree } from "./SelectorTree";

export function RecipesSelectors() {
  const recipesTree = useAppSelector((state) => state.desiredStuff.recipeTree, shallowEqual);

  return recipesTree && <div className="flex flex-col my-6 mr-6">
    <SelectorTree recipesTree={recipesTree} treePath={[recipesTree.stuff]} />
  </div>;
}
