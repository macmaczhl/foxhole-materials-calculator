import { useAppSelector } from "./hooks"
import { Recipe } from "./recipes";


export const selectTreeSelectedRecipe = (treePath: string[]): Recipe | undefined => {
    return useAppSelector((state) => {
        let currentTree = state.desiredStuff.recipeTree;
        treePath.slice(1).forEach(e => {
            currentTree = currentTree?.required.find(sub => sub.stuff === e);
        });
        return currentTree?.selectedRecipe;
    });
}