import { useAppSelector } from "./hooks"
import { IRecipe } from "./recipes";


export const selectTreeSelectedRecipe = (treePath: string[]): IRecipe | undefined => {
    return useAppSelector((state) => {
        let currentTree = state.desiredStuff.recipeTree;
        treePath.slice(1).forEach(e => {
            currentTree = currentTree?.required.find(sub => sub.stuff === e);
        });
        return currentTree?.selectedRecipe;
    });
}