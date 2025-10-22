import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Scout Tanks", () => {
  describe("Recipe availability", () => {
    test("King Spire Mk. I has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.KingSpireMkI)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.KingSpireMkI);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(4); // 1 garage + 3 mass production
    });

    test("King Jester - Mk. I-1 has recipe defined", () => {
      expect(RecipiesByStuff.has(Vehicles.KingJesterMkI1)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.KingJesterMkI1);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // upgrade recipe only
    });
  });

  describe("King Spire Mk. I", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.KingSpireMkI)!;
    });

    test("garage recipe requires 70 refined materials", () => {
      const garageRecipe = recipes.find(r => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 70 }
      ]);
      expect(garageRecipe!.produced).toEqual([
        { stuff: Vehicles.KingSpireMkI, count: 1 }
      ]);
    });

    test("mass production recipes exist with correct quantities", () => {
      // 504 → 9
      const recipe9 = recipes.find(r => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe9!.required[0].count).toBe(504);

      // 630 → 12
      const recipe12 = recipes.find(r => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe12!.required[0].count).toBe(630);

      // 735 → 15
      const recipe15 = recipes.find(r => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(recipe15!.required[0].count).toBe(735);
    });

    test("calculates components correctly for single unit", () => {
      const garageRecipe = recipes.find(r => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.KingSpireMkI,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 70 }
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const garageRecipe = recipes.find(r => r.produced[0].count === 1)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.KingSpireMkI,
        selectedRecipe: garageRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 210 }
      ]);
    });
  });

  describe("King Jester - Mk. I-1", () => {
    let recipes: IRecipe[];
    let upgradeRecipe: IRecipe;

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.KingJesterMkI1)!;
      upgradeRecipe = recipes[0];
    });

    test("has correct upgrade recipe requirements", () => {
      expect(upgradeRecipe.required.length).toBe(5);

      const ingredients = upgradeRecipe.required.map(r => r.stuff);
      expect(ingredients).toContain(Materials.SteelConstructionMaterials);
      expect(ingredients).toContain(Materials.AssemblyMaterialsI);
      expect(ingredients).toContain(Materials.AssemblyMaterialsIII);
      expect(ingredients).toContain(Materials.RareAlloys);
      expect(ingredients).toContain(Vehicles.KingSpireMkI);
    });

    test("has correct quantities for each material", () => {
      const steelMaterials = upgradeRecipe.required.find(
        r => r.stuff === Materials.SteelConstructionMaterials
      );
      expect(steelMaterials!.count).toBe(5);

      const assemblyI = upgradeRecipe.required.find(
        r => r.stuff === Materials.AssemblyMaterialsI
      );
      expect(assemblyI!.count).toBe(15);

      const assemblyIII = upgradeRecipe.required.find(
        r => r.stuff === Materials.AssemblyMaterialsIII
      );
      expect(assemblyIII!.count).toBe(3);

      const rareAlloys = upgradeRecipe.required.find(
        r => r.stuff === Materials.RareAlloys
      );
      expect(rareAlloys!.count).toBe(1);

      const baseVehicle = upgradeRecipe.required.find(
        r => r.stuff === Vehicles.KingSpireMkI
      );
      expect(baseVehicle!.count).toBe(1);
    });

    test("produces exactly 1 King Jester", () => {
      expect(upgradeRecipe.produced).toEqual([
        { stuff: Vehicles.KingJesterMkI1, count: 1 }
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.KingJesterMkI1,
        selectedRecipe: upgradeRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      // Should include all direct requirements
      expect(result.initial.length).toBeGreaterThan(0);

      // Check that Steel Construction Materials is included
      const steelMaterials = result.initial.find(
        r => r.stuff === Materials.SteelConstructionMaterials
      );
      expect(steelMaterials).toBeDefined();
      expect(steelMaterials!.count).toBe(5);
    });

    test("requires King Spire Mk. I as base vehicle", () => {
      const baseVehicleRequirement = upgradeRecipe.required.find(
        r => r.stuff === Vehicles.KingSpireMkI
      );
      expect(baseVehicleRequirement).toBeDefined();
      expect(baseVehicleRequirement!.count).toBe(1);
    });
  });

  describe("Recipe integration", () => {
    test("both scout tanks can be calculated without errors", () => {
      const scoutTanks = [Vehicles.KingSpireMkI, Vehicles.KingJesterMkI1];

      scoutTanks.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipeTree: RecipeTree = {
          stuff: vehicle,
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

  describe("Upgrade chain", () => {
    test("King Jester requires King Spire as prerequisite", () => {
      const jesterRecipes = RecipiesByStuff.get(Vehicles.KingJesterMkI1)!;
      const upgradeRecipe = jesterRecipes[0];

      const requiresKingSpire = upgradeRecipe.required.some(
        req => req.stuff === Vehicles.KingSpireMkI
      );

      expect(requiresKingSpire).toBe(true);
    });

    test("King Spire does not require another vehicle", () => {
      const spireRecipes = RecipiesByStuff.get(Vehicles.KingSpireMkI)!;

      spireRecipes.forEach((recipe) => {
        const hasVehicleRequirement = recipe.required.some(req =>
          Object.values(Vehicles).includes(req.stuff as Vehicles)
        );
        expect(hasVehicleRequirement).toBe(false);
      });
    });
  });
});
