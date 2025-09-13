import { selectTreeRecipe } from "@/lib/features/desiredSlice";
import { useAppDispatch } from "@/lib/hooks";
import { IRecipe } from "@/lib/models";
import { useTreeSelectedRecipe } from "@/lib/selectors";
import { RadioGroup, Field, Radio, Label } from "@headlessui/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { StuffIcon } from "./StuffIcon";

interface RecipesSelectorProps {
  rowId: string;
  stuff: string;
  recipes: IRecipe[];
  treePath: string[];
  isLast?: boolean;
}

export function RecipesSelector({
  rowId,
  stuff,
  recipes,
  treePath,
  isLast = false,
}: RecipesSelectorProps) {
  const selectedRecipe = useTreeSelectedRecipe(rowId, treePath);
  const dispatch = useAppDispatch();

  const selectRecipe = (recipe: IRecipe) => {
    dispatch(selectTreeRecipe({ rowId, recipe, treePath }));
  };

  const isNested = treePath.length > 1;
  const treeDepth = treePath.length - 1;

  // Enhanced positioning for clearer tree visualization
  const connectorSpacing = 24; // Increased spacing between tree levels
  const connectorLeftPosition = treeDepth > 0 ? 8 + (treeDepth - 1) * connectorSpacing : 0;

  // Calculate content padding to avoid overlap with connectors
  const contentLeftPadding = isNested ? connectorLeftPosition + 20 : 0; // 20px = connector width + horizontal line + margin

  return (
    <div className={`relative panel-compact mb-1`}>
      {/* Tree connector lines */}
      {isNested && (
        <>
          {/* Vertical line for this level */}
          <div
            className="absolute tree-line-vertical"
            style={{
              left: `${connectorLeftPosition}px`,
              top: "0px",
              width: "3px",
              height: isLast ? "50%" : "100%",
              backgroundColor: "var(--border-600)",
              opacity: "0.8",
              borderRadius: "1px",
            }}
          ></div>
          {/* Horizontal connector from parent to current item */}
          <div
            className="absolute tree-line-horizontal"
            style={{
              left: `${connectorLeftPosition}px`,
              top: "50%",
              width: "16px",
              height: "3px",
              backgroundColor: "var(--border-600)",
              opacity: "0.9",
              transform: "translateY(-1.5px)",
              borderRadius: "1px",
            }}
          ></div>
        </>
      )}
      <div
        className="relative z-10"
        style={{
          paddingLeft:
            contentLeftPadding > 0 ? `${contentLeftPadding}px` : undefined,
        }}
      >
        <span className="font-medium text-sm tracking-wide text-muted-300">
          {stuff}
        </span>
        <RadioGroup
          value={selectedRecipe}
          onChange={(e) => selectRecipe(e)}
          aria-label={`Recipe for ${stuff}`}
          className="mt-1"
        >
          {recipes.map((recipe) => (
            <Field key={recipe.id} className="flex items-center gap-2 mb-0.5">
              <Radio
                value={recipe}
                className="group flex size-5 items-center justify-center rounded-full border border-border-600 bg-panel-300 data-[checked]:bg-accent-500 data-[disabled]:bg-gray-800"
              >
                <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
              </Radio>
              <Label className="data-[disabled]:opacity-50 flex flex-row space-x-1 items-center">
                <div className="flex flex-row space-x-1">
                  {recipe.required.map((e) => (
                    <StuffIcon
                      key={e.stuff}
                      stuffName={e.stuff}
                      count={e.count}
                    />
                  ))}
                </div>
                <ArrowRightIcon className="size-6 mx-1 text-muted-400" />
                <div className="flex flex-row space-x-1">
                  {recipe.produced.map((e) => (
                    <StuffIcon
                      key={e.stuff}
                      stuffName={e.stuff}
                      count={e.count}
                    />
                  ))}
                </div>
              </Label>
            </Field>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
