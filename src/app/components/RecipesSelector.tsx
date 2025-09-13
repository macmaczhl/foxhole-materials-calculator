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

  // Tree structure constants matching user's example
  const baseIndent = 20; // Base indentation for first level
  const levelSpacing = 24; // Spacing between tree levels
  const connectorWidth = 16; // Width of horizontal connector lines

  // Calculate indentation for this specific level
  const thisLevelIndent = baseIndent + treeDepth * levelSpacing;
  const contentPadding = isNested ? thisLevelIndent + connectorWidth + 8 : 0;

  return (
    <div className="relative panel-compact mb-1">
      {/* Tree connector lines for hierarchical structure */}
      {isNested && (
        <>
          {/* Vertical lines for all parent levels */}
          {Array.from({ length: treeDepth }, (_, level) => {
            const lineLeft = baseIndent + level * levelSpacing;
            // For the current level, show partial line if it's the last item
            const height = level === treeDepth - 1 && isLast ? "50%" : "100%";

            return (
              <div
                key={`vertical-${level}`}
                className="absolute tree-vertical"
                style={{
                  left: `${lineLeft}px`,
                  top: "0px",
                  width: "2px",
                  height: height,
                  backgroundColor: "var(--border-600)",
                  opacity: "0.7",
                  borderRadius: "1px",
                }}
              />
            );
          })}

          {/* Horizontal T-connector for current item */}
          <div
            className="absolute tree-horizontal"
            style={{
              left: `${baseIndent + (treeDepth - 1) * levelSpacing}px`,
              top: "50%",
              width: `${connectorWidth}px`,
              height: "2px",
              backgroundColor: "var(--border-600)",
              opacity: "0.8",
              transform: "translateY(-1px)",
              borderRadius: "1px",
            }}
          />
        </>
      )}

      {/* Content with proper indentation */}
      <div
        className="relative z-10"
        style={{
          paddingLeft: contentPadding > 0 ? `${contentPadding}px` : undefined,
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
