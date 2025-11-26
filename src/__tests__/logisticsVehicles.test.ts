/**
 * Tests for Logistics Vehicles - Trucks, Fuel Tankers, and Cranes
 */
import { Materials, RecipeTree, IRecipe, Vehicles } from "../lib/models";
import { calculateComponents } from "../lib/services/calculateComponents";
import { RecipiesByStuff } from "../lib/recipes";
import { logisticsVehicleRecipes } from "../lib/recipes/logisticsVehicles";

describe("Logistics Vehicles - Trucks", () => {
  describe("Recipe availability", () => {
    test("all trucks have recipes defined", () => {
      const trucks = [Vehicles.R1Hauler, Vehicles.DunneTransport];

      trucks.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all truck recipes have valid requirements", () => {
      const trucks = [Vehicles.R1Hauler, Vehicles.DunneTransport];

      trucks.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("trucks are in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.R1Hauler)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.DunneTransport)).toBe(true);
    });
  });

  describe("R-1 Hauler (Colonial Truck)", () => {
    let r1HaulerRecipes: IRecipe[];
    let r1HaulerRecipeTree: RecipeTree;

    beforeEach(() => {
      r1HaulerRecipes = RecipiesByStuff.get(Vehicles.R1Hauler)!;
      r1HaulerRecipeTree = {
        stuff: Vehicles.R1Hauler,
        selectedRecipe: r1HaulerRecipes[0],
        recipes: r1HaulerRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = r1HaulerRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(r1HaulerRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = r1HaulerRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = r1HaulerRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = r1HaulerRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = r1HaulerRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = r1HaulerRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(r1HaulerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(r1HaulerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("Dunne Transport (Warden Truck)", () => {
    let dunneTransportRecipes: IRecipe[];
    let dunneTransportRecipeTree: RecipeTree;

    beforeEach(() => {
      dunneTransportRecipes = RecipiesByStuff.get(Vehicles.DunneTransport)!;
      dunneTransportRecipeTree = {
        stuff: Vehicles.DunneTransport,
        selectedRecipe: dunneTransportRecipes[0],
        recipes: dunneTransportRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = dunneTransportRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.DunneTransport, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(dunneTransportRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = dunneTransportRecipes.find(
        (r) => r.produced[0].count === 1
      );
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = dunneTransportRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = dunneTransportRecipes.find(
        (r) => r.produced[0].count === 9
      );
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = dunneTransportRecipes.find(
        (r) => r.produced[0].count === 12
      );
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = dunneTransportRecipes.find(
        (r) => r.produced[0].count === 15
      );
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(dunneTransportRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(dunneTransportRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("Both factions use same production costs for trucks", () => {
    test("Warden and Colonial trucks have identical costs", () => {
      const wardenRecipes = RecipiesByStuff.get(Vehicles.DunneTransport)!;
      const colonialRecipes = RecipiesByStuff.get(Vehicles.R1Hauler)!;

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

  describe("Recipe calculation integration for trucks", () => {
    test("all trucks can be calculated without errors", () => {
      const trucks = [Vehicles.R1Hauler, Vehicles.DunneTransport];

      trucks.forEach((vehicle) => {
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
      expect(logisticsVehicleRecipes.size).toBe(5); // 2 trucks + 2 fuel tankers + 1 crane
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
