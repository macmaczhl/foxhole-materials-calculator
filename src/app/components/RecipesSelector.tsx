import { selectTreeRecipe } from "@/lib/features/desiredStuffSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IRecipe } from "@/lib/models";
import { useTreeSelectedRecipe } from "@/lib/selectors";
import { RadioGroup, Field, Radio, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { RecipeDisplay } from "./RecipeDisplay";

interface RecipesSelectorProps {
  stuff: string;
  recipes: IRecipe[];
  treePath: string[];
}

const marginleftClasses = ["ml-6", "ml-10", "ml-16", "ml-20", "ml-24", "ml-28"];

export function RecipesSelector({
  stuff,
  recipes,
  treePath,
}: RecipesSelectorProps) {
  const selectedRecipe = useTreeSelectedRecipe(treePath);
  const dispatch = useAppDispatch();

  const selectRecipe = (recipe: IRecipe) => {
    dispatch(selectTreeRecipe({ recipe, treePath }));
  };

  const marginleftClass = marginleftClasses[treePath.length - 1];

  return (
    <div className={`p-2 mb-2 bg-neutral-400 ${marginleftClass}`}>
      <span>{stuff}</span>
      <RadioGroup
        value={selectedRecipe}
        onChange={(e) => selectRecipe(e)}
        aria-label="Recipe"
      >
        {recipes.map((recipe) => (
          <Field key={recipe.id} className="flex items-center gap-2 mb-1">
            <Radio
              value={recipe}
              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100"
            >
              <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
            </Radio>
            <Label className="data-[disabled]:opacity-50 flex flex-row space-x-1 items-center">
              <RecipeDisplay recipe={recipe} />
            </Label>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
}
