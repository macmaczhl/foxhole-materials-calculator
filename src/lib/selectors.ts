import { useAppSelector } from "./hooks"
import { IRecipe } from "./models";

export const useTreeSelectedRecipe = (rowId: string, treePath: string[]): IRecipe | undefined => {
    return useAppSelector((state) => {
        const row = state.desired.rows.find(r => r.id === rowId);
        let currentTree = row?.recipeTree;
        treePath.slice(1).forEach(e => {
            currentTree = currentTree?.required.find(sub => sub.stuff === e);
        });
        return currentTree?.selectedRecipe;
    });
}