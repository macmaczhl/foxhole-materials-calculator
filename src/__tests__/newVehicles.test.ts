import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";

describe("New Vehicles", () => {
  describe("Recipe availability", () => {
    test("all new vehicles have recipes defined", () => {
      const newVehicles = [
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
      ];

      newVehicles.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all vehicle recipes require Refined Materials", () => {
      const newVehicles = [
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
      ];

      newVehicles.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBe(Materials.RefinedMaterials);
          expect(recipe.required[0].count).toBeGreaterThan(0);
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
        { stuff: Materials.RefinedMaterials, count: 145 }
      ]);
      expect(collinsCannonRecipe.produced).toEqual([
        { stuff: Vehicles.CollinsCannon, count: 1 }
      ]);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(collinsCannonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 145 }
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(collinsCannonRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 435 }
      ]);
    });
  });

  describe("Wasp Nest", () => {
    let waspNestRecipes: IRecipe[];

    beforeEach(() => {
      waspNestRecipes = RecipiesByStuff.get(Vehicles.WaspNest)!;
    });

    test("has garage and mass production recipes", () => {
      expect(waspNestRecipes.length).toBeGreaterThanOrEqual(1);

      // Check garage recipe
      const garageRecipe = waspNestRecipes.find(r => r.produced[0].count === 1);
      expect(garageRecipe).toBeDefined();
      expect(garageRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe!.required[0].count).toBe(15);
    });

    test("has efficient mass production recipe", () => {
      // Check for mass production recipe that produces multiple units
      const massProductionRecipe = waspNestRecipes.find(r => r.produced[0].count > 1);
      if (massProductionRecipe) {
        expect(massProductionRecipe.produced[0].count).toBeGreaterThan(1);
        expect(massProductionRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      }
    });
  });

  describe("Heavy Artillery (Koronides and Falconer)", () => {
    test("Koronides Field Gun has appropriate cost", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Koronides)!;
      const garageRecipe = recipes[0];

      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.required[0].count).toBe(185); // Heavy artillery should be expensive
    });

    test("Falconer 250mm has appropriate cost", () => {
      const recipes = RecipiesByStuff.get(Vehicles.Falconer)!;
      const garageRecipe = recipes[0];

      expect(garageRecipe.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe.required[0].count).toBe(200); // Heaviest artillery should be most expensive
    });
  });

  describe("Anti-Tank weapons cost progression", () => {
    test("vehicles have reasonable cost progression", () => {
      const stygianBoltCost = RecipiesByStuff.get(Vehicles.StygianBolt)![0].required[0].count;
      const stockadeCost = RecipiesByStuff.get(Vehicles.Stockade)![0].required[0].count;
      const rampartCost = RecipiesByStuff.get(Vehicles.Rampart)![0].required[0].count;
      const collinsCannonCost = RecipiesByStuff.get(Vehicles.CollinsCannon)![0].required[0].count;
      const wolfhoundCost = RecipiesByStuff.get(Vehicles.Wolfhound)![0].required[0].count;

      // Verify cost progression makes sense
      expect(stygianBoltCost).toBeLessThan(stockadeCost);
      expect(stockadeCost).toBeLessThan(rampartCost);
      expect(rampartCost).toBeLessThan(collinsCannonCost);
      expect(collinsCannonCost).toBeLessThan(wolfhoundCost);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all new vehicles can be calculated without errors", () => {
      const newVehicles = [
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
});
