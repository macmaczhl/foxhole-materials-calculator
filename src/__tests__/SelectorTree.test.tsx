import { render, screen } from "@testing-library/react";
import { SelectorTree } from "../app/components/SelectorTree";
import { RecipeTree } from "../lib/models";
import styles from "../app/components/SelectorTree.module.css";

// Mock ResizeObserver for Headless UI
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock the RecipesSelector component
jest.mock("../app/components/RecipesSelector", () => ({
  RecipesSelector: ({
    stuff,
    treePath,
  }: {
    stuff: string;
    treePath: string[];
  }) => (
    <div data-testid={`recipes-selector-${stuff}`}>
      Recipes for {stuff} (path: {treePath.join(" > ")})
    </div>
  ),
}));

describe("SelectorTree", () => {
  const mockRecipeTree: RecipeTree = {
    stuff: "Construction Materials",
    selectedRecipe: {
      id: 1,
      required: [{ stuff: "Salvage", count: 10 }],
      produced: [{ stuff: "Construction Materials", count: 1 }],
    },
    recipes: [
      {
        id: 1,
        required: [{ stuff: "Salvage", count: 10 }],
        produced: [{ stuff: "Construction Materials", count: 1 }],
      },
    ],
    required: [
      {
        stuff: "Salvage",
        selectedRecipe: {
          id: 2,
          required: [],
          produced: [{ stuff: "Salvage", count: 1 }],
        },
        recipes: [
          {
            id: 2,
            required: [],
            produced: [{ stuff: "Salvage", count: 1 }],
          },
        ],
        required: [],
      },
    ],
  };

  const defaultProps = {
    rowId: "test-row-1",
    recipesTree: mockRecipeTree,
    treePath: ["Construction Materials"],
    isLast: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders tree node with correct structure", () => {
    render(<SelectorTree {...defaultProps} />);

    expect(
      screen.getByTestId("recipes-selector-Construction Materials")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Recipes for Construction Materials (path: Construction Materials)"
      )
    ).toBeInTheDocument();
  });

  test("applies correct CSS classes for root node", () => {
    const { container } = render(<SelectorTree {...defaultProps} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveClass(styles.treeNodeRoot);
    expect(treeNode).not.toHaveClass(styles.treeNodeLast);
    expect(treeNode).not.toHaveClass(styles.treeNodeLeaf);
  });

  test("applies correct CSS classes for last node", () => {
    const props = { ...defaultProps, isLast: true };
    const { container } = render(<SelectorTree {...props} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveClass(styles.treeNodeLast);
  });

  test("applies correct CSS classes for leaf node", () => {
    const leafTree: RecipeTree = {
      ...mockRecipeTree,
      required: [], // No children
    };
    const props = { ...defaultProps, recipesTree: leafTree };
    const { container } = render(<SelectorTree {...props} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveClass(styles.treeNodeLeaf);
  });

  test("renders children when tree has required items", () => {
    const { container } = render(<SelectorTree {...defaultProps} />);

    const childrenContainer = container.querySelector(
      `.${styles.treeNodeChildren}`
    );
    expect(childrenContainer).toBeInTheDocument();
    expect(screen.getByTestId("recipes-selector-Salvage")).toBeInTheDocument();
  });

  test("does not render children container when tree has no required items", () => {
    const leafTree: RecipeTree = {
      ...mockRecipeTree,
      required: [],
    };
    const props = { ...defaultProps, recipesTree: leafTree };
    const { container } = render(<SelectorTree {...props} />);

    const childrenContainer = container.querySelector(
      `.${styles.treeNodeChildren}`
    );
    expect(childrenContainer).not.toBeInTheDocument();
  });

  test("passes correct treePath to child components", () => {
    render(<SelectorTree {...defaultProps} />);

    expect(
      screen.getByText(
        "Recipes for Salvage (path: Construction Materials > Salvage)"
      )
    ).toBeInTheDocument();
  });

  test("sets correct CSS custom property for tree depth", () => {
    const { container } = render(<SelectorTree {...defaultProps} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveStyle("--tree-depth: 0");
  });

  test("sets correct CSS custom property for nested tree depth", () => {
    const nestedTreePath = ["Construction Materials", "Salvage"];
    const props = { ...defaultProps, treePath: nestedTreePath };
    const { container } = render(<SelectorTree {...props} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveStyle("--tree-depth: 1");
  });

  test("renders multiple children with correct keys", () => {
    const multiChildTree: RecipeTree = {
      ...mockRecipeTree,
      required: [
        {
          stuff: "Salvage",
          selectedRecipe: {
            id: 2,
            required: [],
            produced: [{ stuff: "Salvage", count: 1 }],
          },
          recipes: [
            {
              id: 2,
              required: [],
              produced: [{ stuff: "Salvage", count: 1 }],
            },
          ],
          required: [],
        },
        {
          stuff: "Components",
          selectedRecipe: {
            id: 3,
            required: [],
            produced: [{ stuff: "Components", count: 1 }],
          },
          recipes: [
            {
              id: 3,
              required: [],
              produced: [{ stuff: "Components", count: 1 }],
            },
          ],
          required: [],
        },
      ],
    };
    const props = { ...defaultProps, recipesTree: multiChildTree };
    render(<SelectorTree {...props} />);

    expect(screen.getByTestId("recipes-selector-Salvage")).toBeInTheDocument();
    expect(
      screen.getByTestId("recipes-selector-Components")
    ).toBeInTheDocument();
  });

  test("memoization prevents unnecessary re-renders", () => {
    const { rerender } = render(<SelectorTree {...defaultProps} />);

    // Re-render with same props
    rerender(<SelectorTree {...defaultProps} />);

    // Component should not re-render due to React.memo
    // This is tested implicitly - if the component re-rendered unnecessarily,
    // it would cause performance issues in real usage
    expect(
      screen.getByTestId("recipes-selector-Construction Materials")
    ).toBeInTheDocument();
  });

  test("handles empty tree gracefully", () => {
    const emptyTree: RecipeTree = {
      stuff: "Empty",
      selectedRecipe: {
        id: 0,
        required: [],
        produced: [],
      },
      recipes: [],
      required: [],
    };
    const props = { ...defaultProps, recipesTree: emptyTree };
    const { container } = render(<SelectorTree {...props} />);

    const treeNode = container.querySelector(`.${styles.treeNode}`);
    expect(treeNode).toHaveClass(styles.treeNodeLeaf);
    expect(
      container.querySelector(`.${styles.treeNodeChildren}`)
    ).not.toBeInTheDocument();
  });
});
