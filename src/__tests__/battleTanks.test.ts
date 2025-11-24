import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("Battle Tanks", () => {
  describe("Recipe availability", () => {
    test("Flood Juggernaut Mk. VII has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.FloodJuggernautMkVII)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.FloodJuggernautMkVII);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only Large Assembly Station recipe
    });

    test("Cullen Predator Mk. III has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.CullenPredatorMkIII)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.CullenPredatorMkIII);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1); // Only Large Assembly Station recipe
    });
  });

  describe("Flood Juggernaut Mk. VII", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.FloodJuggernautMkVII)!;
    });

    test("Large Assembly Station recipe requires correct materials", () => {
      const assemblyRecipe = recipes[0];
      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 40 },
        { stuff: Materials.AssemblyMaterialsIII, count: 65 },
        { stuff: Materials.AssemblyMaterialsIV, count: 30 },
        { stuff: Materials.AssemblyMaterialsV, count: 45 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.FloodJuggernautMkVII, count: 1 },
      ]);
    });

    test("does not require another vehicle as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasVehicleRequirement = recipe.required.some((req) =>
          Object.values(Vehicles).includes(req.stuff as Vehicles)
        );
        expect(hasVehicleRequirement).toBe(false);
      });
    });

    test("calculates components correctly for single unit", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.FloodJuggernautMkVII,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 40 },
        { stuff: Materials.AssemblyMaterialsIII, count: 65 },
        { stuff: Materials.AssemblyMaterialsIV, count: 30 },
        { stuff: Materials.AssemblyMaterialsV, count: 45 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.FloodJuggernautMkVII,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 120 },
        { stuff: Materials.AssemblyMaterialsIII, count: 195 },
        { stuff: Materials.AssemblyMaterialsIV, count: 90 },
        { stuff: Materials.AssemblyMaterialsV, count: 135 },
      ]);
    });

    test("all recipes produce Flood Juggernaut Mk. VII", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.FloodJuggernautMkVII);
      });
    });

    test("requires high-tier assembly materials", () => {
      const assemblyRecipe = recipes[0];
      const hasSteelConstruction = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.SteelConstructionMaterials
      );
      const hasAssemblyMaterialsIII = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsIII
      );
      const hasAssemblyMaterialsIV = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsIV
      );
      const hasAssemblyMaterialsV = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsV
      );

      expect(hasSteelConstruction).toBe(true);
      expect(hasAssemblyMaterialsIII).toBe(true);
      expect(hasAssemblyMaterialsIV).toBe(true);
      expect(hasAssemblyMaterialsV).toBe(true);
    });

    test("is a heavy battle tank requiring only advanced materials", () => {
      const assemblyRecipe = recipes[0];

      // Battle tanks should require only high-tier materials, no basic refined materials
      const hasRefinedMaterials = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.RefinedMaterials
      );
      expect(hasRefinedMaterials).toBe(false);

      // Should require steel construction materials (advanced armor)
      const hasSteel = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.SteelConstructionMaterials
      );
      expect(hasSteel).toBe(true);

      // Should require highest tier assembly materials
      const hasAssemblyV = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsV
      );
      expect(hasAssemblyV).toBe(true);
    });

    test("Flood Juggernaut Mk. VII can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.FloodJuggernautMkVII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("requires significant steel construction materials for heavy armor", () => {
      const assemblyRecipe = recipes[0];
      const steelRequirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.SteelConstructionMaterials
      );

      expect(steelRequirement).toBeDefined();
      expect(steelRequirement!.count).toBe(40);
    });

    test("requires most Assembly Materials III among all tiers", () => {
      const assemblyRecipe = recipes[0];
      const am3Requirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.AssemblyMaterialsIII
      );
      const am4Requirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.AssemblyMaterialsIV
      );
      const am5Requirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.AssemblyMaterialsV
      );

      expect(am3Requirement).toBeDefined();
      expect(am4Requirement).toBeDefined();
      expect(am5Requirement).toBeDefined();

      // Assembly Materials III should be the highest count (65)
      expect(am3Requirement!.count).toBe(65);
      expect(am3Requirement!.count).toBeGreaterThan(am4Requirement!.count);
      expect(am3Requirement!.count).toBeGreaterThan(am5Requirement!.count);
    });
  });

  describe("Recipe integration", () => {
    test("Flood Juggernaut Mk. VII is correctly integrated into recipe system", () => {
      const recipes = RecipiesByStuff.get(Vehicles.FloodJuggernautMkVII)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.FloodJuggernautMkVII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
        expect(result.initial.length).toBe(4); // Should have exactly 4 material types
      }).not.toThrow();
    });

    test("Large Assembly Station is the only production method", () => {
      const recipes = RecipiesByStuff.get(Vehicles.FloodJuggernautMkVII)!;

      // Battle tanks can only be produced at Large Assembly Station
      // No garage or mass production factory recipes
      expect(recipes.length).toBe(1);
      expect(recipes[0].produced[0].count).toBe(1);
    });
  });

  describe("Cullen Predator Mk. III", () => {
    let recipes: IRecipe[];

    beforeEach(() => {
      recipes = RecipiesByStuff.get(Vehicles.CullenPredatorMkIII)!;
    });

    test("Large Assembly Station recipe requires correct materials", () => {
      const assemblyRecipe = recipes[0];
      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 275 },
        { stuff: Materials.AssemblyMaterialsIII, count: 105 },
        { stuff: Materials.AssemblyMaterialsIV, count: 95 },
        { stuff: Materials.AssemblyMaterialsV, count: 105 },
        { stuff: Materials.RareAlloys, count: 3 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.CullenPredatorMkIII, count: 1 },
      ]);
    });

    test("does not require another vehicle as prerequisite", () => {
      recipes.forEach((recipe) => {
        const hasVehicleRequirement = recipe.required.some((req) =>
          Object.values(Vehicles).includes(req.stuff as Vehicles)
        );
        expect(hasVehicleRequirement).toBe(false);
      });
    });

    test("calculates components correctly for single unit", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.CullenPredatorMkIII,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 275 },
        { stuff: Materials.AssemblyMaterialsIII, count: 105 },
        { stuff: Materials.AssemblyMaterialsIV, count: 95 },
        { stuff: Materials.AssemblyMaterialsV, count: 105 },
        { stuff: Materials.RareAlloys, count: 3 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const assemblyRecipe = recipes[0];
      const recipeTree: RecipeTree = {
        stuff: Vehicles.CullenPredatorMkIII,
        selectedRecipe: assemblyRecipe,
        recipes: recipes,
        required: [],
      };

      const result = calculateComponents(recipeTree, 2);

      expect(result.initial).toEqual([
        { stuff: Materials.SteelConstructionMaterials, count: 550 },
        { stuff: Materials.AssemblyMaterialsIII, count: 210 },
        { stuff: Materials.AssemblyMaterialsIV, count: 190 },
        { stuff: Materials.AssemblyMaterialsV, count: 210 },
        { stuff: Materials.RareAlloys, count: 6 },
      ]);
    });

    test("all recipes produce Cullen Predator Mk. III", () => {
      recipes.forEach((recipe) => {
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.CullenPredatorMkIII);
      });
    });

    test("requires high-tier assembly materials and rare alloys", () => {
      const assemblyRecipe = recipes[0];
      const hasSteelConstruction = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.SteelConstructionMaterials
      );
      const hasAssemblyMaterialsIII = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsIII
      );
      const hasAssemblyMaterialsIV = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsIV
      );
      const hasAssemblyMaterialsV = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.AssemblyMaterialsV
      );
      const hasRareAlloys = assemblyRecipe.required.some(
        (req) => req.stuff === Materials.RareAlloys
      );

      expect(hasSteelConstruction).toBe(true);
      expect(hasAssemblyMaterialsIII).toBe(true);
      expect(hasAssemblyMaterialsIV).toBe(true);
      expect(hasAssemblyMaterialsV).toBe(true);
      expect(hasRareAlloys).toBe(true);
    });

    test("is a super tank requiring rare alloys", () => {
      const assemblyRecipe = recipes[0];

      // Super tanks should require rare alloys (unlike regular battle tanks)
      const rareAlloysRequirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.RareAlloys
      );
      expect(rareAlloysRequirement).toBeDefined();
      expect(rareAlloysRequirement!.count).toBe(3);
    });

    test("Cullen Predator Mk. III can be calculated without errors", () => {
      const recipeTree: RecipeTree = {
        stuff: Vehicles.CullenPredatorMkIII,
        selectedRecipe: recipes[0],
        recipes: recipes,
        required: [],
      };

      expect(() => {
        const result = calculateComponents(recipeTree, 1);
        expect(result.initial.length).toBeGreaterThan(0);
      }).not.toThrow();
    });

    test("requires very high steel construction materials for super heavy armor", () => {
      const assemblyRecipe = recipes[0];
      const steelRequirement = assemblyRecipe.required.find(
        (req) => req.stuff === Materials.SteelConstructionMaterials
      );

      expect(steelRequirement).toBeDefined();
      expect(steelRequirement!.count).toBe(275);
    });

    test("has 5 different material requirements", () => {
      const assemblyRecipe = recipes[0];
      expect(assemblyRecipe.required.length).toBe(5);
    });

    test("Large Assembly Station is the only production method", () => {
      // Super tanks can only be produced at Large Assembly Station
      // No garage or mass production factory recipes
      expect(recipes.length).toBe(1);
      expect(recipes[0].produced[0].count).toBe(1);
    });
  });
});
