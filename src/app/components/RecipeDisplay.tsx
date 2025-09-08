import { IRecipe } from "@/lib/models";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { StuffIcon } from "./StuffIcon";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

interface RecipeDisplayProps {
  recipe: IRecipe;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className="flex flex-row space-x-1">
        {recipe.required.length === 0 ? (
          <div className="flex items-center gap-1">
            <Cog6ToothIcon
              className="w-8 h-8 text-gray-400"
              aria-label="Gathering"
            />
            <span className="text-sm text-white-500">Gathering</span>
          </div>
        ) : (
          recipe.required.map((e) => (
            <StuffIcon key={e.stuff} stuffName={e.stuff} count={e.count} />
          ))
        )}
      </div>
      <ArrowRightIcon className="size-8" />
      <div className="flex flex-row space-x-1">
        {recipe.produced.map((e) => (
          <StuffIcon key={e.stuff} stuffName={e.stuff} count={e.count} />
        ))}
      </div>
    </div>
  );
}
