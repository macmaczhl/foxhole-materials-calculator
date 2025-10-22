import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("New Vehicles", () => {
  describe("Recipe availability", () => {
    test("all new vehicles have recipes defined", () => {
      const newVehicles = [
        // Field guns and artillery (from main)
        Vehicles.WaspNest,
        Vehicles.Koronides,
        Vehicles.Wolfhound,
        Vehicles.CollinsCannon,
        Vehicles.BatteringRam,
        Vehicles.Falconer,
        Vehicles.Tisiphone,
        Vehicles.Rampart,
        Vehicles.Smelter,
        Vehicles.Stockade,
        Vehicles.StygianBolt,
        // Armored cars (from PR)
        Vehicles.Percutio,
        Vehicles.Gemini,
        Vehicles.OBrienGravekeeper,
        Vehicles.OBrienHighlander,
        Vehicles.OBrienFreeman,
        Vehicles.OBrienV110,
        Vehicles.OBrienWildJack,
        Vehicles.OBrienKnave,
        Vehicles.OBrienSquire,
        // Scout Tank
        Vehicles.KingSpireMkI,
      ];

      newVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all vehicle recipes have valid requirements", () => {
      const newVehicles = [
        // Field guns and artillery (from main)
        Vehicles.WaspNest,
        Vehicles.Koronides,
        Vehicles.Wolfhound,
        Vehicles.CollinsCannon,
        Vehicles.BatteringRam,
        Vehicles.Falconer,
        Vehicles.Tisiphone,
        Vehicles.Rampart,
        Vehicles.Smelter,
        Vehicles.Stockade,
        Vehicles.StygianBolt,
        // Armored cars (from PR)
        Vehicles.Percutio,
        Vehicles.Gemini,
        Vehicles.OBrienGravekeeper,
        Vehicles.OBrienHighlander,
        Vehicles.OBrienFreeman,
        Vehicles.OBrienV110,
        Vehicles.OBrienWildJack,
        Vehicles.OBrienKnave,
        Vehicles.OBrienSquire,
        // Scout Tank
        Vehicles.KingSpireMkI,
      ];

      newVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          // Each recipe should have valid material requirements
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });
  });

  describe("Collins Cannon 68mm", () => {
    let collinsCannonRecipe: IRecipe;
    let collinsCannonRecipeTree: RecipeTree;

    beforeEach(() => {
      const recipes = RecipiesByStuff.get(Vehicles.CollinsCannon)!;
      collinsCannonRecipe = recipes[0];
      collinsCannonRecipeTree = {
        stuff: Vehicles.CollinsCannon,
        selectedRecipe: collinsCannonRecipe,
        recipes: recipes,
        required: [],
      };
    });

    test("has correct recipe requirements", () => {
      expect(collinsCannonRecipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 20 }
      ]);
      expect(collinsCannonRecipe.produced).toEqual([
        { stuff: Vehicles.CollinsCannon, count: 1 }
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(collinsCannonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 20 }
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(collinsCannonRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 60 }
      ]);
    });
  });

  describe("Wasp Nest", () => {
    let waspNestRecipes: IRecipe[];

    beforeEach(() => {
      waspNestRecipes = RecipiesByStuff.get(Vehicles.WaspNest)!;
    });

    test("has complex material requirements", () => {
      expect(waspNestRecipes.length).toBeGreaterThanOrEqual(1);

      // Check the recipe with multiple material types
      const recipe = waspNestRecipes[0];
      expect(recipe).toBeDefined();
      expect(recipe.required.length).toBe(3); // Should have 3 different materials
      expect(recipe.required[0].stuff).toBe(Materials.ProcessedConstructionMaterials);
      expect(recipe.required[0].count).toBe(20);
    });
  });

  describe("Heavy Artillery (Koronides and Falconer)", () => {
    test("Koronides Field Gun has appropriate cost", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Koronides)!;
      const garageRecipe = recipes[0];

      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.required[0].count).toBe(50); // Updated cost from wiki
    });

    test("Falconer 250mm has appropriate cost", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falconer)!;
      const garageRecipe = recipes[0];

      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.required[0].count).toBe(35); // Updated cost from wiki
    });
  });

  describe("Recipe complexity validation", () => {
    test("vehicles with simple recipes use refined materials", () => {
      const simpleVehicles = [
        Vehicles.Koronides,
        Vehicles.Wolfhound,
        Vehicles.CollinsCannon,
        Vehicles.BatteringRam,
        Vehicles.Falconer,
        Vehicles.Tisiphone,
      ];

      simpleVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const garageRecipe = recipes[0];
        expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
        expect(garageRecipe.required[0].count).toBeGreaterThan(0);
      });
    });

    test("vehicles with complex recipes use multiple materials", () => {
      const complexVehicles = [
        Vehicles.WaspNest,
        Vehicles.Rampart,
        Vehicles.Smelter,
        Vehicles.Stockade,
        Vehicles.StygianBolt,
      ];

      complexVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipe = recipes[0];
        expect(recipe.required.length).toBeGreaterThan(1); // Should use multiple materials
      });
    });
  });

  describe("Recipe calculation integration", () => {
    test("all new vehicles can be calculated without errors", () => {
      const newVehicles = [
        // Field guns and artillery (from main)
        Vehicles.WaspNest,
        Vehicles.Koronides,
        Vehicles.Wolfhound,
        Vehicles.CollinsCannon,
        Vehicles.BatteringRam,
        Vehicles.Falconer,
        Vehicles.Tisiphone,
        Vehicles.Rampart,
        Vehicles.Smelter,
        Vehicles.Stockade,
        Vehicles.StygianBolt,
        // Armored cars (from PR)
        Vehicles.Percutio,
        Vehicles.Gemini,
        Vehicles.OBrienGravekeeper,
        Vehicles.OBrienHighlander,
        Vehicles.OBrienFreeman,
        Vehicles.OBrienV110,
        Vehicles.OBrienWildJack,
        Vehicles.OBrienKnave,
        Vehicles.OBrienSquire,
        // Scout Tank
        Vehicles.KingSpireMkI,
      ];

      newVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        const recipeTree: RecipeTree = {
          stuff: vehicle,
          selectedRecipe: recipes[0],
          recipes: recipes,
          required: [],
        };

        // Should not throw an error
        expect(() => {
          const result = calculateComponents(recipeTree, 1);
          expect(result.initial.length).toBeGreaterThan(0);
        }).not.toThrow();
      });
    });
  });

  describe("Armored Car Upgrade System", () => {
    test("upgrade vehicles require base vehicles as ingredients", () => {
      // T5 Percutio requires T3 Xiphos
      const percutioRecipes = RecipiesByStuff.get(Vehicles.Percutio)!;
      expect(percutioRecipes.length).toBe(1);
      const percutioIngredients = percutioRecipes[0].required.map(r => r.stuff);
      expect(percutioIngredients).toContain(Vehicles.Xiphos);

      // T8 Gemini requires T3 Xiphos
      const geminiRecipes = RecipiesByStuff.get(Vehicles.Gemini)!;
      expect(geminiRecipes.length).toBe(1);
      const geminiIngredients = geminiRecipes[0].required.map(r => r.stuff);
      expect(geminiIngredients).toContain(Vehicles.Xiphos);

      // O'Brien v.113 Gravekeeper requires O'Brien V.110
      const gravekeeperRecipes = RecipiesByStuff.get(Vehicles.OBrienGravekeeper)!;
      expect(gravekeeperRecipes.length).toBe(1);
      const gravekeeperIngredients = gravekeeperRecipes[0].required.map(r => r.stuff);
      expect(gravekeeperIngredients).toContain(Vehicles.OBrienV110);
    });

    test("O'Brien V.130 Wild Jack uses Processed Construction Materials", () => {
      const recipes = RecipiesByStuff.get(Vehicles.OBrienWildJack);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBe(1);

      const basicRecipe = recipes!.find(r => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.ProcessedConstructionMaterials);
      expect(basicRecipe!.required[0].count).toBe(10);
      expect(basicRecipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsI);
      expect(basicRecipe!.required[1].count).toBe(10);
    });

    test("O'Brien V.190 Knave has mass production recipes", () => {
      const recipes = RecipiesByStuff.get(Vehicles.OBrienKnave)!;
      expect(recipes.length).toBe(4);

      // Check basic recipe (40 → 1)
      const basicRecipe = recipes.find(r => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(basicRecipe!.required[0].count).toBe(40);

      // Check mass production recipes exist
      const massProduction = recipes.filter(r => r.produced[0].count > 1);
      expect(massProduction.length).toBe(3);
    });

    test("O'Brien V.200 Squire has complex upgrade recipe", () => {
      const recipes = RecipiesByStuff.get(Vehicles.OBrienSquire)!;
      expect(recipes.length).toBe(1);

      const recipe = recipes[0];
      const ingredients = recipe.required.map(r => r.stuff);

      // Should require multiple material types and O'Brien V.190 Knave
      expect(ingredients).toContain(Materials.ProcessedConstructionMaterials);
      expect(ingredients).toContain(Materials.AssemblyMaterialsI);
      expect(ingredients).toContain(Materials.AssemblyMaterialsIII);
      expect(ingredients).toContain(Vehicles.OBrienKnave);

      // Check quantities
      const processedMaterials = recipe.required.find(r => r.stuff === Materials.ProcessedConstructionMaterials);
      expect(processedMaterials!.count).toBe(35);
    });
  });

  describe("King Spire Mk. I Scout Tank", () => {
    let kingSpireRecipes: IRecipe[];
    let kingSpireRecipeTree: RecipeTree;

    beforeEach(() => {
      kingSpireRecipes = RecipiesByStuff.get(Vehicles.KingSpireMkI)!;
      kingSpireRecipeTree = {
        stuff: Vehicles.KingSpireMkI,
        selectedRecipe: kingSpireRecipes[0],
        recipes: kingSpireRecipes,
        required: [],
      };
    });

    test("has correct recipe requirements", () => {
      const garageRecipe = kingSpireRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 70 }
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.KingSpireMkI, count: 1 }
      ]);
    });

    test("has mass production recipes", () => {
      expect(kingSpireRecipes.length).toBe(4);

      // Check basic recipe (70 → 1)
      const basicRecipe = kingSpireRecipes.find(r => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(basicRecipe!.required[0].count).toBe(70);

      // Check mass production recipes exist
      const massProduction = kingSpireRecipes.filter(r => r.produced[0].count > 1);
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = kingSpireRecipes.find(r => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(504);

      const recipe12 = kingSpireRecipes.find(r => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(630);

      const recipe15 = kingSpireRecipes.find(r => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(735);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(kingSpireRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 70 }
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(kingSpireRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 210 }
      ]);
    });
  });
});
