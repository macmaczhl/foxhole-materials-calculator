import { selectTreeRecipe } from "@/lib/features/desiredStuffSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Recipe } from "@/lib/recipes";
import { selectTreeSelectedRecipe } from "@/lib/selectors";
import { RadioGroup, Field, Radio, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

interface RecipesSelectorProps {
    stuff: string
    recipes: Recipe[];
    treePath: string[];
}

const marginleftClasses = ['ml-6', 'ml-10', 'ml-15', 'ml-20'];

export function RecipesSelector({ stuff, recipes, treePath }: RecipesSelectorProps) {
    const selectedRecipe = selectTreeSelectedRecipe(treePath);
    const dispatch = useAppDispatch();

    const selectRecipe = (recipe: Recipe) => {
        dispatch(selectTreeRecipe({ recipe, treePath }));
    }

    const marginleftClass = marginleftClasses[treePath.length - 1];

    return <div className={`p-2 mb-2 bg-neutral-400 ${marginleftClass}`}>
        <span>{stuff}</span>
        <RadioGroup value={selectedRecipe} onChange={e => selectRecipe(e)} aria-label="Recipe">
            {recipes.map((recipe) => (
                <Field key={recipe.id} className="flex items-center gap-2">
                    <Radio
                        value={recipe}
                        className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400 data-[disabled]:bg-gray-100"
                    >
                        <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                    </Radio>
                    <Label className="data-[disabled]:opacity-50">
                        <div className="inline-block mr-5">
                            {recipe.required.map(e => (
                                <span key={e.stuff}>
                                    {`${e.stuff}(${e.count})`}
                                </span>
                            ))}
                        </div>
                        <ArrowRightIcon className="size-5 inline-block" />
                        <div className="inline-block mr-5">
                            {recipe.produced.map(e => (
                                <span key={e.stuff}>
                                    {`${e.stuff}(${e.count})`}
                                </span>
                            ))}
                        </div>
                    </Label>
                </Field>
            ))}
        </RadioGroup>
    </div>;
}