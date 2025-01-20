import { useAppSelector } from "./hooks"
import { IRecipe } from "./models";


export const useTreeSelectedRecipe = (treePath: string[]): IRecipe | undefined => {
    return useAppSelector((state) => {
        let currentTree = state.desiredStuff.recipeTree;
        treePath.slice(1).forEach(e => {
            currentTree = currentTree?.required.find(sub => sub.stuff === e);
        });
        return currentTree?.selectedRecipe;
    });
}
