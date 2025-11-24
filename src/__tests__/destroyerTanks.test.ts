import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Destroyer Tanks", () => {
  describe("Recipe availability", () => {
    test("Noble Widow MK. XIV has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.NobleWidowMkXIV)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.NobleWidowMkXIV);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

    test("Noble Firebrand Mk. XVII has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.NobleFirebrandMkXVII)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.NobleFirebrandMkXVII);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 assembly station recipe
    });
  });

  describe("Noble Widow MK. XIV", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.NobleWidowMkXIV)!;
    });

    test("garage recipe requires 160 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 160 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.NobleWidowMkXIV, count: 1 },
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 1152 → 9
      const recipe9 = recipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(1152);

      // 1440 → 12
      const recipe12 = recipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(1440);

      // 1680 → 15
      const recipe15 = recipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(1680);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleWidowMkXIV,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 160 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleWidowMkXIV,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 480 },
      ]);
    });

    test("all recipes produce Noble Widow MK. XIV", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.NobleWidowMkXIV);
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
      // The Noble Widow MK. XIV produces 3 per crate in MPF
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

    test("Noble Widow MK. XIV can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleWidowMkXIV,
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

  describe("Recipe integration", () => {
    test("Noble Widow MK. XIV can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.NobleWidowMkXIV)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleWidowMkXIV,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("mass production is more efficient than garage production", () => {
      const recipes = RecipiesByStuff.get(Vehicles.NobleWidowMkXIV)!;
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

    test("verifies unique 3-per-crate MPF bonus", () => {
      const recipes = RecipiesByStuff.get(Vehicles.NobleWidowMkXIV)!;
      const massRecipes = recipes.filter((r) => r.produced[0].count > 1);

      // Verify all mass production recipes produce multiples of 3
      massRecipes.forEach((recipe) => {
        expect(recipe.produced[0].count % 3).toBe(0);
      });
    });
  });

  describe("Noble Firebrand Mk. XVII", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.NobleFirebrandMkXVII)!;
    });

    test("assembly station recipe requires correct materials", () => {
      const recipe = recipes[0];
      expect(recipe).toBeDefined();
      expect(recipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 10 },
        { stuff: Materials.AssemblyMaterialsII, count: 10 },
        { stuff: Materials.AssemblyMaterialsIII, count: 15 },
        { stuff: Vehicles.NobleWidowMkXIV, count: 1 },
      ]);
      expect(recipe.produced).toEqual([
        { stuff: Vehicles.NobleFirebrandMkXVII, count: 1 },
      ]);
    });

    test("requires Noble Widow MK. XIV as prerequisite", () => {
      const recipe = recipes[0];
      const hasPrerequisite = recipe.required.some(
        (req) => req.stuff === Vehicles.NobleWidowMkXIV
      );
      expect(hasPrerequisite).toBe(true);
    });

    test("requires 10 Processed Construction Materials", () => {
      const recipe = recipes[0];
      const pcmReq = recipe.required.find(
        (req) => req.stuff === Materials.ProcessedConstructionMaterials
      );
      expect(pcmReq).toBeDefined();
      expect(pcmReq!.count).toBe(10);
    });

    test("requires 10 Assembly Materials II", () => {
      const recipe = recipes[0];
      const amIIReq = recipe.required.find(
        (req) => req.stuff === Materials.AssemblyMaterialsII
      );
      expect(amIIReq).toBeDefined();
      expect(amIIReq!.count).toBe(10);
    });

    test("requires 15 Assembly Materials III", () => {
      const recipe = recipes[0];
      const amIIIReq = recipe.required.find(
        (req) => req.stuff === Materials.AssemblyMaterialsIII
      );
      expect(amIIIReq).toBeDefined();
      expect(amIIIReq!.count).toBe(15);
    });

    test("produces Noble Firebrand Mk. XVII", () => {
      const recipe = recipes[0];
      expect(recipe.produced.length).toBe(1);
      expect(recipe.produced[0].stuff).toBe(Vehicles.NobleFirebrandMkXVII);
      expect(recipe.produced[0].count).toBe(1);
    });

    test("can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleFirebrandMkXVII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("calculates components correctly for single unit", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleFirebrandMkXVII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      // Should include all required materials
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 10,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 10,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIII,
        count: 15,
      });
      expect(result.initial).toContainEqual({
        stuff: Vehicles.NobleWidowMkXIV,
        count: 1,
      });
    });

    test("calculates components correctly for multiple units", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.NobleFirebrandMkXVII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      // Should scale materials by 3
      expect(result.initial).toContainEqual({
        stuff: Materials.ProcessedConstructionMaterials,
        count: 30,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsII,
        count: 30,
      });
      expect(result.initial).toContainEqual({
        stuff: Materials.AssemblyMaterialsIII,
        count: 45,
      });
      expect(result.initial).toContainEqual({
        stuff: Vehicles.NobleWidowMkXIV,
        count: 3,
      });
    });
  });
});
