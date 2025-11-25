/**
 * Tests for Logistics Vehicles - Fuel Tankers and Cranes
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { logisticsVehicleRecipes } from "../lib/recipes/logisticsVehicles";

describe("Logistics Vehicles - Fuel Tankers", () => {
  describe("Recipe availability", () => {
    test("all fuel tankers have recipes defined", () => {
      const fuelTankers = [
        Vehicles.DunneFuelrunner2d,
        Vehicles.RR3StolonTanker,
      ];

      fuelTankers.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all fuel tanker recipes have valid requirements", () => {
      const fuelTankers = [
        Vehicles.DunneFuelrunner2d,
        Vehicles.RR3StolonTanker,
      ];

      fuelTankers.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("fuel tankers are in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.DunneFuelrunner2d)).toBe(
        true
      );
      expect(logisticsVehicleRecipes.has(Vehicles.RR3StolonTanker)).toBe(true);
      expect(logisticsVehicleRecipes.size).toBe(5); // 2 fuel tankers + 1 crane + 2 fire engines
    });
  });

  describe("Dunne Fuelrunner 2d (Warden Fuel Tanker)", () => {
    let fuelrunnerRecipes: IRecipe[];
    let fuelrunnerRecipeTree: RecipeTree;

    beforeEach(() => {
      fuelrunnerRecipes = RecipiesByStuff.get(Vehicles.DunneFuelrunner2d)!;
      fuelrunnerRecipeTree = {
        stuff: Vehicles.DunneFuelrunner2d,
        selectedRecipe: fuelrunnerRecipes[0],
        recipes: fuelrunnerRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = fuelrunnerRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.DunneFuelrunner2d, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(fuelrunnerRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = fuelrunnerRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = fuelrunnerRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = fuelrunnerRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = fuelrunnerRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = fuelrunnerRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(fuelrunnerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(fuelrunnerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe('RR-3 "Stolon" Tanker (Colonial Fuel Tanker)', () => {
    let stolonRecipes: IRecipe[];
    let stolonRecipeTree: RecipeTree;

    beforeEach(() => {
      stolonRecipes = RecipiesByStuff.get(Vehicles.RR3StolonTanker)!;
      stolonRecipeTree = {
        stuff: Vehicles.RR3StolonTanker,
        selectedRecipe: stolonRecipes[0],
        recipes: stolonRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = stolonRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.RR3StolonTanker, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(stolonRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = stolonRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = stolonRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = stolonRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = stolonRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = stolonRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(stolonRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(stolonRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all fuel tankers can be calculated without errors", () => {
      const fuelTankers = [
        Vehicles.DunneFuelrunner2d,
        Vehicles.RR3StolonTanker,
      ];

      fuelTankers.forEach((vehicle) => {
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

  describe("Both factions use same production costs", () => {
    test("Warden and Colonial fuel tankers have identical costs", () => {
      const wardenRecipes = RecipiesByStuff.get(Vehicles.DunneFuelrunner2d)!;
      const colonialRecipes = RecipiesByStuff.get(Vehicles.RR3StolonTanker)!;

      expect(wardenRecipes.length).toBe(colonialRecipes.length);

      // Compare each recipe's requirements
      wardenRecipes.forEach((wardenRecipe, index) => {
        const colonialRecipe = colonialRecipes[index];
        expect(wardenRecipe.required).toEqual(colonialRecipe.required);
        expect(wardenRecipe.produced[0].count).toBe(
          colonialRecipe.produced[0].count
        );
      });
    });
  });
});

describe("Logistics Vehicles - Cranes", () => {
  describe("Recipe availability", () => {
    test("crane has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSClass2MobileAutoCrane)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSClass2MobileAutoCrane);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("crane recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSClass2MobileAutoCrane)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("crane is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.BMSClass2MobileAutoCrane)).toBe(true);
    });
  });

  describe("BMS - Class 2 Mobile Auto-Crane", () => {
    let craneRecipes: IRecipe[];
    let craneRecipeTree: RecipeTree;

    beforeEach(() => {
      craneRecipes = RecipiesByStuff.get(Vehicles.BMSClass2MobileAutoCrane)!;
      craneRecipeTree = {
        stuff: Vehicles.BMSClass2MobileAutoCrane,
        selectedRecipe: craneRecipes[0],
        recipes: craneRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = craneRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 125 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.BMSClass2MobileAutoCrane, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(craneRecipes.length).toBe(4);

      // Check basic recipe (125 → 1)
      const basicRecipe = craneRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(125);

      // Check mass production recipes exist
      const massProduction = craneRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = craneRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(899);

      const recipe12 = craneRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1124);

      const recipe15 = craneRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1311);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(craneRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 125 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(craneRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 375 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("crane can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSClass2MobileAutoCrane)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.BMSClass2MobileAutoCrane,
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

describe("Logistics Vehicles - Fire Engines", () => {
  describe("Recipe availability", () => {
    test("all fire engines have recipes defined", () => {
      const fireEngines = [
        Vehicles.DunneDousingEngine3r,
        Vehicles.R12bSalvaFlameTruck,
      ];

      fireEngines.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all fire engine recipes have valid requirements", () => {
      const fireEngines = [
        Vehicles.DunneDousingEngine3r,
        Vehicles.R12bSalvaFlameTruck,
      ];

      fireEngines.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("fire engines are in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.DunneDousingEngine3r)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.R12bSalvaFlameTruck)).toBe(true);
    });
  });

  describe("Dunne Dousing Engine 3r (Warden Fire Engine)", () => {
    let dousingEngineRecipes: IRecipe[];
    let dousingEngineRecipeTree: RecipeTree;

    beforeEach(() => {
      dousingEngineRecipes = RecipiesByStuff.get(Vehicles.DunneDousingEngine3r)!;
      dousingEngineRecipeTree = {
        stuff: Vehicles.DunneDousingEngine3r,
        selectedRecipe: dousingEngineRecipes[0],
        recipes: dousingEngineRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = dousingEngineRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.DunneDousingEngine3r, count: 1 },
      ]);
    });

    test("has exactly one recipe (Small Assembly Station)", () => {
      expect(dousingEngineRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(dousingEngineRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 15 },
        { stuff: Materials.AssemblyMaterialsII, count: 5 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(dousingEngineRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 45 },
        { stuff: Materials.AssemblyMaterialsII, count: 15 },
      ]);
    });
  });

  describe('R-12b "Salva" Flame Truck (Colonial Fire Engine)', () => {
    let salvaRecipes: IRecipe[];
    let salvaRecipeTree: RecipeTree;

    beforeEach(() => {
      salvaRecipes = RecipiesByStuff.get(Vehicles.R12bSalvaFlameTruck)!;
      salvaRecipeTree = {
        stuff: Vehicles.R12bSalvaFlameTruck,
        selectedRecipe: salvaRecipes[0],
        recipes: salvaRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = salvaRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.R12bSalvaFlameTruck, count: 1 },
      ]);
    });

    test("has exactly one recipe (Garage)", () => {
      expect(salvaRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(salvaRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(salvaRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all fire engines can be calculated without errors", () => {
      const fireEngines = [
        Vehicles.DunneDousingEngine3r,
        Vehicles.R12bSalvaFlameTruck,
      ];

      fireEngines.forEach((vehicle) => {
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
