import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Cruiser Tanks", () => {
  describe("Recipe availability", () => {
    test("Gallagher Brigand Mk. I has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.GallagherBrigandMkI)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.GallagherBrigandMkI);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

    test("Gallagher Thornfall Mk. VI has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.GallagherThornfallMkVI)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.GallagherThornfallMkVI);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // 1 small assembly station recipe
    });
  });

  describe("Gallagher Brigand Mk. I", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.GallagherBrigandMkI)!;
    });

    test("garage recipe requires 150 refined materials", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 150 },
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 1 },
      ]);
    });

    test("mass production factory recipe (3 crates) requires 1080 refined materials for 9 tanks", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 9);
      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1080 },
      ]);
      expect(mpfRecipe!.produced).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 9 },
      ]);
    });

    test("mass production factory recipe (4 crates) requires 1350 refined materials for 12 tanks", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 12);
      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1350 },
      ]);
      expect(mpfRecipe!.produced).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 12 },
      ]);
    });

    test("mass production factory recipe (5 crates) requires 1575 refined materials for 15 tanks", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 15);
      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1575 },
      ]);
      expect(mpfRecipe!.produced).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 15 },
      ]);
    });

    test("calculateComponents correctly computes resources for 1 Gallagher Brigand Mk. I (garage)", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherBrigandMkI,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 150 },
      ]);
    });

    test("calculateComponents correctly computes resources for 9 Gallagher Brigand Mk. I (3 crates MPF)", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 9)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherBrigandMkI,
        selectedRecipe: mpfRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 9);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1080 },
      ]);
    });

    test("calculateComponents correctly computes resources for 12 Gallagher Brigand Mk. I (4 crates MPF)", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 12)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherBrigandMkI,
        selectedRecipe: mpfRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 12);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1350 },
      ]);
    });

    test("calculateComponents correctly computes resources for 15 Gallagher Brigand Mk. I (5 crates MPF)", () => {
      const mpfRecipe = recipes.find((r) => r.produced[0].count === 15)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherBrigandMkI,
        selectedRecipe: mpfRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 15);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 1575 },
      ]);
    });

    test("calculateComponents falls back to garage recipe for non-optimal quantities", () => {
      const garageRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherBrigandMkI,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 5);

      // Should use garage recipe: 5 x 150 = 750 refined materials
      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 750 },
      ]);
    });
  });

  describe("Gallagher Thornfall Mk. VI", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.GallagherThornfallMkVI)!;
    });

    test("small assembly station recipe requires 1 Brigand + materials", () => {
      const assemblyRecipe = recipes.find((r) => r.produced[0].count === 1);
      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe!.required).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 1 },
        { stuff: Materials.ProcessedConstructionMaterials, count: 60 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsIII, count: 15 },
        { stuff: Materials.AssemblyMaterialsIV, count: 15 },
      ]);
      expect(assemblyRecipe!.produced).toEqual([
        { stuff: Vehicles.GallagherThornfallMkVI, count: 1 },
      ]);
    });

    test("calculateComponents correctly computes resources for 1 Gallagher Thornfall Mk. VI", () => {
      const assemblyRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherThornfallMkVI,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 1 },
        { stuff: Materials.ProcessedConstructionMaterials, count: 60 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsIII, count: 15 },
        { stuff: Materials.AssemblyMaterialsIV, count: 15 },
      ]);
    });

    test("calculateComponents correctly computes resources for multiple Gallagher Thornfall Mk. VI", () => {
      const assemblyRecipe = recipes.find((r) => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.GallagherThornfallMkVI,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Vehicles.GallagherBrigandMkI, count: 3 },
        { stuff: Materials.ProcessedConstructionMaterials, count: 180 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsIII, count: 45 },
        { stuff: Materials.AssemblyMaterialsIV, count: 45 },
      ]);
    });
  });
});
