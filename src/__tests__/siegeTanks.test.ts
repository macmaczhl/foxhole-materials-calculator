import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Siege Tanks", () => {
  describe("Recipe availability", () => {
    test('HC-7 "Ballista" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.HC7Ballista)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.HC7Ballista);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 small assembly station upgrade
    });
  });

  describe('HC-7 "Ballista"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.HC7Ballista)!;
    });

    test("has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.HC7Ballista)).toBe(true);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only Small Assembly Station recipe
    });

    test("Small Assembly Station recipe requires HC-2 Scorpion chassis and materials", () => {
      const recipe = recipes[0];
      expect(recipe).toBeDefined();

      // Check required materials
      expect(recipe.required).toHaveLength(3);
      expect(recipe.required).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 15,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 15,
      });
      expect(recipe.required).toContainEqual({
        stuff: Vehicles.HC2Scorpion,
        count: 1,
      });

      // Check produced output
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.HC7Ballista, count: 1 },
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const recipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC7Ballista,
        selectedRecipe: recipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.HC2Scorpion,
        count: 1,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 15,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 15,
      });
    });

    test("calculates components correctly for multiple units", () => {
      const recipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC7Ballista,
        selectedRecipe: recipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toContainEqual({
        stuff: Vehicles.HC2Scorpion,
        count: 3,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 45,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 45,
      });
    });

    test('all recipes produce HC-7 "Ballista"', () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.HC7Ballista);
      });
    });

    test("requires HC-2 Scorpion chassis as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasScorpionRequirement = recipe.required.some(
          (req) => req.stuff === Vehicles.HC2Scorpion
        );
        expect(hasScorpionRequirement).toBe(true);
      });
    });

    test("Ballista requires upgrade materials beyond base Scorpion", () => {
      const recipe = recipes[0];

      // Verify it requires assembly materials
      const hasAssemblyMaterialsII = recipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsII
      );
      const hasProcessedConstruction = recipe.required.some(
        (req) => req.stuff === Materials.ProcessedConstructionMaterials
      );

      expect(hasAssemblyMaterialsII).toBe(true);
      expect(hasProcessedConstruction).toBe(true);
    });

    test("HC-7 Ballista can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC7Ballista,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("is a siege tank specialized for destroying fortifications", () => {
      const recipe = recipes[0];

      // This is an upgrade/variant vehicle, so it should:
      // 1. Require the base vehicle (HC-2 Scorpion)
      const requiresScorpion = recipe.required.some(
        (req) => req.stuff === Vehicles.HC2Scorpion
      );
      expect(requiresScorpion).toBe(true);

      // 2. Require processed construction materials for modifications
      const requiresPCM = recipe.required.some(
        (req) => req.stuff === Materials.ProcessedConstructionMaterials
      );
      expect(requiresPCM).toBe(true);

      // 3. Require assembly materials for the specialized equipment
      const requiresAssemblyMats = recipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsII
      );
      expect(requiresAssemblyMats).toBe(true);
    });
  });

  describe("Recipe integration", () => {
    test("HC-7 Ballista can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.HC7Ballista)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC7Ballista,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });
  });
});
