import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Siege Tanks", () => {
  describe("Recipe availability", () => {
    test('HC-2 "Scorpion" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.HC2Scorpion)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.HC2Scorpion);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

    test('HC-7 "Ballista" has recipes defined', () => {
      expect(RecipiesByStuff.has(Vehicles.HC7Ballista)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.HC7Ballista);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 small assembly station upgrade
    });
  });

  describe('HC-2 "Scorpion"', () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.HC2Scorpion)!;
    });

    test("garage recipe requires 100 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 100 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.HC2Scorpion, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 720 → 9
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(720);

      // 900 → 12
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(900);

      // 1050 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC2Scorpion,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC2Scorpion,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 300 },
      ]);
    });

    test('all recipes produce HC-2 "Scorpion"', () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.HC2Scorpion);
      });
    });

    test("all recipes require only refined materials", () => {
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBe(1);
        expect(recipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      });
    });

    test("does not require another vehicle as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasVehicleRequirement = recipe.required.some((req) =>
          Object.values(Vehicles).includes(req.stuff as Vehicles)
        );
        expect(hasVehicleRequirement).toBe(false);
      });
    });

    test("mass production produces 3 per crate", () => {
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);

      // 3 crates = 9 tanks (3 per crate)
      expect(recipe9).toBeDefined();
      expect(recipe9!.produced[0].count).toBe(9);

      // 4 crates = 12 tanks (3 per crate)
      expect(recipe12).toBeDefined();
      expect(recipe12!.produced[0].count).toBe(12);

      // 5 crates = 15 tanks (3 per crate)
      expect(recipe15).toBeDefined();
      expect(recipe15!.produced[0].count).toBe(15);
    });

    test("mass production is more efficient than garage production", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe9 = recipes.find((r) => r.produced[0].count === 9)!;

      // Calculate cost per unit
      const garageCostPerUnit =
        garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit =
        massRecipe9.required[0].count / massRecipe9.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });

    test("verifies 3-per-crate MPF production", () => {
      const massRecipes = recipes.filter((r) => r.produced[0].count > 1);

      // Verify all mass production recipes produce multiples of 3
      massRecipes.forEach((recipe) => {
        expect(recipe.produced[0].count % 3).toBe(0);
      });
    });

    test("HC-2 Scorpion can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC2Scorpion,
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
    test("HC-2 Scorpion can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.HC2Scorpion)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.HC2Scorpion,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

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

    test("mass production is more efficient than garage production for Scorpion", () => {
      const recipes = RecipiesByStuff.get(Vehicles.HC2Scorpion)!;
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const massRecipe9 = recipes.find((r) => r.produced[0].count === 9)!;

      // Calculate cost per unit
      const garageCostPerUnit =
        garageRecipe.required[0].count / garageRecipe.produced[0].count;
      const massCostPerUnit =
        massRecipe9.required[0].count / massRecipe9.produced[0].count;

      // Mass production should be cheaper or equal per unit
      expect(massCostPerUnit).toBeLessThanOrEqual(garageCostPerUnit);
    });

    test("verifies 3-per-crate MPF production for Scorpion", () => {
      const recipes = RecipiesByStuff.get(Vehicles.HC2Scorpion)!;
      const massRecipes = recipes.filter((r) => r.produced[0].count > 1);

      // Verify all mass production recipes produce multiples of 3
      massRecipes.forEach((recipe) => {
        expect(recipe.produced[0].count % 3).toBe(0);
      });
    });
  });
});
