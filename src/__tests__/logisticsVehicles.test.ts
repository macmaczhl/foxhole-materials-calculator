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
      const trucks = [Vehicles.R1Hauler, Vehicles.R5AtlasHauler, Vehicles.DunneTransport, Vehicles.DunneLeatherback2a, Vehicles.DunneLoadlugger3c, Vehicles.R5bSisyphusHauler, Vehicles.R9SpeartipEscort];

      trucks.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all truck recipes have valid requirements", () => {
      const trucks = [Vehicles.R1Hauler, Vehicles.R5AtlasHauler, Vehicles.DunneTransport, Vehicles.DunneLeatherback2a, Vehicles.DunneLoadlugger3c, Vehicles.R5bSisyphusHauler, Vehicles.R9SpeartipEscort];

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
      expect(logisticsVehicleRecipes.has(Vehicles.R5AtlasHauler)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.DunneTransport)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.DunneLeatherback2a)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.DunneLoadlugger3c)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.R5bSisyphusHauler)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.R9SpeartipEscort)).toBe(true);
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

  describe('R-5 "Atlas" Hauler (Colonial Truck)', () => {
    let r5AtlasHaulerRecipes: IRecipe[];
    let r5AtlasHaulerRecipeTree: RecipeTree;

    beforeEach(() => {
      r5AtlasHaulerRecipes = RecipiesByStuff.get(Vehicles.R5AtlasHauler)!;
      r5AtlasHaulerRecipeTree = {
        stuff: Vehicles.R5AtlasHauler,
        selectedRecipe: r5AtlasHaulerRecipes[0],
        recipes: r5AtlasHaulerRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = r5AtlasHaulerRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 120 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.R5AtlasHauler, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(r5AtlasHaulerRecipes.length).toBe(4);

      // Check basic recipe (120 → 1)
      const basicRecipe = r5AtlasHaulerRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(120);

      // Check mass production recipes exist
      const massProduction = r5AtlasHaulerRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = r5AtlasHaulerRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(864);

      const recipe12 = r5AtlasHaulerRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1080);

      const recipe15 = r5AtlasHaulerRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1260);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(r5AtlasHaulerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 120 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(r5AtlasHaulerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 360 },
      ]);
    });
  });

  describe("Dunne Loadlugger 3c (Warden resource hauler truck)", () => {
    let loadluggerRecipes: IRecipe[];
    let loadluggerRecipeTree: RecipeTree;

    beforeEach(() => {
      loadluggerRecipes = RecipiesByStuff.get(Vehicles.DunneLoadlugger3c)!;
      loadluggerRecipeTree = {
        stuff: Vehicles.DunneLoadlugger3c,
        selectedRecipe: loadluggerRecipes[0],
        recipes: loadluggerRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = loadluggerRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 120 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.DunneLoadlugger3c, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(loadluggerRecipes.length).toBe(4);

      // Check basic recipe (120 → 1)
      const basicRecipe = loadluggerRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(120);

      // Check mass production recipes exist
      const massProduction = loadluggerRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = loadluggerRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(864);

      const recipe12 = loadluggerRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1080);

      const recipe15 = loadluggerRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1260);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(loadluggerRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 120 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(loadluggerRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 360 },
      ]);
    });

    test("is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.DunneLoadlugger3c)).toBe(true);
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

  describe("Dunne Leatherback 2a (Warden reinforced truck variant)", () => {
    let leatherbackRecipes: IRecipe[];
    let leatherbackRecipeTree: RecipeTree;

    beforeEach(() => {
      leatherbackRecipes = RecipiesByStuff.get(Vehicles.DunneLeatherback2a)!;
      leatherbackRecipeTree = {
        stuff: Vehicles.DunneLeatherback2a,
        selectedRecipe: leatherbackRecipes[0],
        recipes: leatherbackRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = leatherbackRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.DunneTransport, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.DunneLeatherback2a, count: 1 },
      ]);
    });

    test("has exactly one recipe (Small Assembly Station)", () => {
      expect(leatherbackRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(leatherbackRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.DunneTransport, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(leatherbackRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 30 },
        { stuff: Vehicles.DunneTransport, count: 3 },
      ]);
    });

    test("is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.DunneLeatherback2a)).toBe(true);
    });
  });

  describe('R-5b "Sisyphus" Hauler (Colonial Truck variant)', () => {
    let sisyphusRecipes: IRecipe[];
    let sisyphusRecipeTree: RecipeTree;

    beforeEach(() => {
      sisyphusRecipes = RecipiesByStuff.get(Vehicles.R5bSisyphusHauler)!;
      sisyphusRecipeTree = {
        stuff: Vehicles.R5bSisyphusHauler,
        selectedRecipe: sisyphusRecipes[0],
        recipes: sisyphusRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = sisyphusRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.R5bSisyphusHauler, count: 1 },
      ]);
    });

    test("has exactly one recipe (Small Assembly Station)", () => {
      expect(sisyphusRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(sisyphusRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(sisyphusRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 30 },
        { stuff: Vehicles.R1Hauler, count: 3 },
      ]);
    });

    test("is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.R5bSisyphusHauler)).toBe(true);
    });
  });

  describe('R-9 "Speartip" Escort (Colonial armed Truck)', () => {
    let speartipRecipes: IRecipe[];
    let speartipRecipeTree: RecipeTree;

    beforeEach(() => {
      speartipRecipes = RecipiesByStuff.get(Vehicles.R9SpeartipEscort)!;
      speartipRecipeTree = {
        stuff: Vehicles.R9SpeartipEscort,
        selectedRecipe: speartipRecipes[0],
        recipes: speartipRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = speartipRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.R9SpeartipEscort, count: 1 },
      ]);
    });

    test("has exactly one recipe (Small Assembly Station)", () => {
      expect(speartipRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(speartipRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 10 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(speartipRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ConstructionMaterials, count: 30 },
        { stuff: Vehicles.R1Hauler, count: 3 },
      ]);
    });

    test("is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.R9SpeartipEscort)).toBe(true);
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
      const trucks = [Vehicles.R1Hauler, Vehicles.R5AtlasHauler, Vehicles.DunneTransport, Vehicles.DunneLeatherback2a, Vehicles.DunneLoadlugger3c, Vehicles.R5bSisyphusHauler, Vehicles.R9SpeartipEscort];

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
      expect(logisticsVehicleRecipes.size).toBe(20); // 7 trucks + 2 fuel tankers + 2 heavy-duty trucks + 1 crane + 1 flatbed truck + 2 fire engines + 1 ambulance + 2 transport buses + 1 harvester + 1 rocket artillery truck
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

  describe("Both factions use same production costs", () => {
    test("Warden and Colonial heavy-duty trucks have identical costs", () => {
      const wardenRecipes = RecipiesByStuff.get(Vehicles.CnuteCliffwrest)!;
      const colonialRecipes = RecipiesByStuff.get(
        Vehicles.AUA150TaurineRigger
      )!;

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

describe("Logistics Vehicles - Flatbed Trucks", () => {
  describe("Recipe availability", () => {
    test("flatbed truck has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSPackmuleFlatbed)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSPackmuleFlatbed);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("flatbed truck recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSPackmuleFlatbed)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("flatbed truck is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.BMSPackmuleFlatbed)).toBe(true);
    });
  });

  describe("BMS - Packmule Flatbed", () => {
    let flatbedRecipes: IRecipe[];
    let flatbedRecipeTree: RecipeTree;

    beforeEach(() => {
      flatbedRecipes = RecipiesByStuff.get(Vehicles.BMSPackmuleFlatbed)!;
      flatbedRecipeTree = {
        stuff: Vehicles.BMSPackmuleFlatbed,
        selectedRecipe: flatbedRecipes[0],
        recipes: flatbedRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = flatbedRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.RefinedMaterials, count: 30 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.BMSPackmuleFlatbed, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(flatbedRecipes.length).toBe(4);

      // Check basic recipe (30 → 1)
      const basicRecipe = flatbedRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(basicRecipe!.required[0].count).toBe(30);

      // Check mass production recipes exist
      const massProduction = flatbedRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = flatbedRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(216);

      const recipe12 = flatbedRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(270);

      const recipe15 = flatbedRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(315);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(flatbedRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 30 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(flatbedRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.RefinedMaterials, count: 90 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("flatbed truck can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSPackmuleFlatbed)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.BMSPackmuleFlatbed,
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

describe("Logistics Vehicles - Ambulances", () => {
  describe("Recipe availability", () => {
    test("ambulance has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.R12SalusAmbulance)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.R12SalusAmbulance);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("ambulance recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.R12SalusAmbulance)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("ambulance is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.R12SalusAmbulance)).toBe(true);
    });
  });

  describe('R-12 "Salus" Ambulance', () => {
    let ambulanceRecipes: IRecipe[];
    let ambulanceRecipeTree: RecipeTree;

    beforeEach(() => {
      ambulanceRecipes = RecipiesByStuff.get(Vehicles.R12SalusAmbulance)!;
      ambulanceRecipeTree = {
        stuff: Vehicles.R12SalusAmbulance,
        selectedRecipe: ambulanceRecipes[0],
        recipes: ambulanceRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = ambulanceRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.R12SalusAmbulance, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(ambulanceRecipes.length).toBe(4);

      // Check basic recipe (150 → 1)
      const basicRecipe = ambulanceRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(150);

      // Check mass production recipes exist
      const massProduction = ambulanceRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = ambulanceRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(1080);

      const recipe12 = ambulanceRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(1350);

      const recipe15 = ambulanceRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1575);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(ambulanceRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 150 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(ambulanceRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 450 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("ambulance can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.R12SalusAmbulance)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.R12SalusAmbulance,
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

describe("Logistics Vehicles - Transport Buses", () => {
  describe("Recipe availability", () => {
    test("all transport buses have recipes defined", () => {
      const transportBuses = [
        Vehicles.DunneCaravaner2f,
        Vehicles.R15Chariot,
      ];

      transportBuses.forEach((vehicle) => {
        expect(RecipiesByStuff.has(vehicle)).toBe(true);
        const recipes = RecipiesByStuff.get(vehicle);
        expect(recipes).toBeDefined();
        expect(recipes!.length).toBeGreaterThan(0);
      });
    });

    test("all transport bus recipes have valid requirements", () => {
      const transportBuses = [
        Vehicles.DunneCaravaner2f,
        Vehicles.R15Chariot,
      ];

      transportBuses.forEach((vehicle) => {
        const recipes = RecipiesByStuff.get(vehicle)!;
        recipes.forEach((recipe) => {
          expect(recipe.required.length).toBeGreaterThan(0);
          expect(recipe.required[0].count).toBeGreaterThan(0);
          expect(recipe.required[0].stuff).toBeDefined();
        });
      });
    });

    test("transport buses are in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.DunneCaravaner2f)).toBe(true);
      expect(logisticsVehicleRecipes.has(Vehicles.R15Chariot)).toBe(true);
    });
  });

  describe("Dunne Caravaner 2f (Warden Transport Bus)", () => {
    let busRecipes: IRecipe[];
    let busRecipeTree: RecipeTree;

    beforeEach(() => {
      busRecipes = RecipiesByStuff.get(Vehicles.DunneCaravaner2f)!;
      busRecipeTree = {
        stuff: Vehicles.DunneCaravaner2f,
        selectedRecipe: busRecipes[0],
        recipes: busRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = busRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.DunneCaravaner2f, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(busRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = busRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = busRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = busRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = busRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = busRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(busRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(busRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe('R-15 - "Chariot" (Colonial Transport Bus)', () => {
    let chariotRecipes: IRecipe[];
    let chariotRecipeTree: RecipeTree;

    beforeEach(() => {
      chariotRecipes = RecipiesByStuff.get(Vehicles.R15Chariot)!;
      chariotRecipeTree = {
        stuff: Vehicles.R15Chariot,
        selectedRecipe: chariotRecipes[0],
        recipes: chariotRecipes,
        required: [],
      };
    });

    test("has correct garage recipe requirements", () => {
      const garageRecipe = chariotRecipes[0];
      expect(garageRecipe.required).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
      expect(garageRecipe.produced).toEqual([
        { stuff: Vehicles.R15Chariot, count: 1 },
      ]);
    });

    test("has mass production recipes", () => {
      expect(chariotRecipes.length).toBe(4);

      // Check basic recipe (100 → 1)
      const basicRecipe = chariotRecipes.find((r) => r.produced[0].count === 1);
      expect(basicRecipe).toBeDefined();
      expect(basicRecipe!.required[0].stuff).toBe(Materials.BasicMaterials);
      expect(basicRecipe!.required[0].count).toBe(100);

      // Check mass production recipes exist
      const massProduction = chariotRecipes.filter(
        (r) => r.produced[0].count > 1
      );
      expect(massProduction.length).toBe(3);

      // Verify mass production recipe quantities
      const recipe9 = chariotRecipes.find((r) => r.produced[0].count === 9);
      expect(recipe9).toBeDefined();
      expect(recipe9!.required[0].count).toBe(720);

      const recipe12 = chariotRecipes.find((r) => r.produced[0].count === 12);
      expect(recipe12).toBeDefined();
      expect(recipe12!.required[0].count).toBe(900);

      const recipe15 = chariotRecipes.find((r) => r.produced[0].count === 15);
      expect(recipe15).toBeDefined();
      expect(recipe15!.required[0].count).toBe(1050);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(chariotRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 100 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(chariotRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.BasicMaterials, count: 300 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("all transport buses can be calculated without errors", () => {
      const transportBuses = [
        Vehicles.DunneCaravaner2f,
        Vehicles.R15Chariot,
      ];

      transportBuses.forEach((vehicle) => {
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
    test("Warden and Colonial transport buses have identical costs", () => {
      const wardenRecipes = RecipiesByStuff.get(Vehicles.DunneCaravaner2f)!;
      const colonialRecipes = RecipiesByStuff.get(Vehicles.R15Chariot)!;

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

describe("Logistics Vehicles - Harvesters", () => {
  describe("Recipe availability", () => {
    test("harvester has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.BMSScrapHauler)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.BMSScrapHauler);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("harvester recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSScrapHauler)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("harvester is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.BMSScrapHauler)).toBe(true);
    });
  });

  describe("BMS - Scrap Hauler (Harvester)", () => {
    let harvesterRecipes: IRecipe[];
    let harvesterRecipeTree: RecipeTree;

    beforeEach(() => {
      harvesterRecipes = RecipiesByStuff.get(Vehicles.BMSScrapHauler)!;
      harvesterRecipeTree = {
        stuff: Vehicles.BMSScrapHauler,
        selectedRecipe: harvesterRecipes[0],
        recipes: harvesterRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = harvesterRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 90 },
        { stuff: Materials.AssemblyMaterialsIV, count: 25 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.BMSScrapHauler, count: 1 },
      ]);
    });

    test("has single recipe (facility production only)", () => {
      expect(harvesterRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(harvesterRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 90 },
        { stuff: Materials.AssemblyMaterialsIV, count: 25 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(harvesterRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 270 },
        { stuff: Materials.AssemblyMaterialsIV, count: 75 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("harvester can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSScrapHauler)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.BMSScrapHauler,
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

describe("Logistics Vehicles - Rocket Artillery Trucks", () => {
  describe("Recipe availability", () => {
    test("R-17 Retiarius Skirmisher has recipes defined", () => {
      expect(RecipiesByStuff.has(Vehicles.R17RetiariusSkirmisher)).toBe(true);
      const recipes = RecipiesByStuff.get(Vehicles.R17RetiariusSkirmisher);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);
    });

    test("R-17 Retiarius Skirmisher recipes have valid requirements", () => {
      const recipes = RecipiesByStuff.get(Vehicles.R17RetiariusSkirmisher)!;
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.required[0].count).toBeGreaterThan(0);
        expect(recipe.required[0].stuff).toBeDefined();
      });
    });

    test("R-17 Retiarius Skirmisher is in the logistics vehicle recipes", () => {
      expect(logisticsVehicleRecipes.has(Vehicles.R17RetiariusSkirmisher)).toBe(true);
    });
  });

  describe('R-17 "Retiarius" Skirmisher (Colonial Rocket Artillery Truck)', () => {
    let retiariusRecipes: IRecipe[];
    let retiariusRecipeTree: RecipeTree;

    beforeEach(() => {
      retiariusRecipes = RecipiesByStuff.get(Vehicles.R17RetiariusSkirmisher)!;
      retiariusRecipeTree = {
        stuff: Vehicles.R17RetiariusSkirmisher,
        selectedRecipe: retiariusRecipes[0],
        recipes: retiariusRecipes,
        required: [],
      };
    });

    test("has correct assembly station recipe requirements", () => {
      const assemblyRecipe = retiariusRecipes[0];
      expect(assemblyRecipe.required).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsIII, count: 8 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
      expect(assemblyRecipe.produced).toEqual([
        { stuff: Vehicles.R17RetiariusSkirmisher, count: 1 },
      ]);
    });

    test("has single recipe (Small Assembly Station Battery Line)", () => {
      expect(retiariusRecipes.length).toBe(1);
    });

    test("calculates components correctly for single unit", () => {
      const result = calculateComponents(retiariusRecipeTree, 1);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 70 },
        { stuff: Materials.AssemblyMaterialsI, count: 10 },
        { stuff: Materials.AssemblyMaterialsIII, count: 8 },
        { stuff: Vehicles.R1Hauler, count: 1 },
      ]);
    });

    test("calculates components correctly for multiple units", () => {
      const result = calculateComponents(retiariusRecipeTree, 3);

      expect(result.initial).toEqual([
        { stuff: Materials.ProcessedConstructionMaterials, count: 210 },
        { stuff: Materials.AssemblyMaterialsI, count: 30 },
        { stuff: Materials.AssemblyMaterialsIII, count: 24 },
        { stuff: Vehicles.R1Hauler, count: 3 },
      ]);
    });
  });

  describe("Recipe calculation integration", () => {
    test("R-17 Retiarius Skirmisher can be calculated without errors", () => {
      const recipes = RecipiesByStuff.get(Vehicles.R17RetiariusSkirmisher)!;
      const recipeTree: RecipeTree = {
        stuff: Vehicles.R17RetiariusSkirmisher,
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
