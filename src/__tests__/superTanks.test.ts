/**
 * Tests for Super Tank recipes
 */
import { Materials, Vehicles } from "../lib/models";
import { superTankRecipes } from "../lib/recipes/superTanks";

describe("Super Tank Recipes", () => {
  describe("Cullen Predator Mk. III", () => {
    test("has correct recipe requirements", () => {
      const recipes = superTankRecipes.get(Vehicles.CullenPredatorMkIII);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const recipe = recipes![0];
      expect(recipe.required).toHaveLength(5);
      expect(recipe.produced).toHaveLength(1);

      // Check inputs
      expect(recipe.required).toContainEqual({
        stuff: Materials.SteelConstructionMaterials,
        count: 275,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIII,
        count: 105,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 95,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsV,
        count: 105,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.RareAlloys,
        count: 3,
      });

      // Check output
      expect(recipe.produced[0]).toEqual({
        stuff: Vehicles.CullenPredatorMkIII,
        count: 1,
      });
    });
  });

  describe('O-75b "Ares"', () => {
    test("has correct recipe requirements", () => {
      const recipes = superTankRecipes.get(Vehicles.O75bAres);
      expect(recipes).toBeDefined();
      expect(recipes!.length).toBeGreaterThan(0);

      const recipe = recipes![0];
      expect(recipe.required).toHaveLength(5);
      expect(recipe.produced).toHaveLength(1);

      // Check inputs
      expect(recipe.required).toContainEqual({
        stuff: Materials.SteelConstructionMaterials,
        count: 275,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIII,
        count: 105,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsIV,
        count: 95,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.AssemblyMaterialsV,
        count: 105,
      });
      expect(recipe.required).toContainEqual({
        stuff: Materials.RareAlloys,
        count: 3,
      });

      // Check output
      expect(recipe.produced[0]).toEqual({
        stuff: Vehicles.O75bAres,
        count: 1,
      });
    });
  });

  describe("Recipe Map", () => {
    test("contains all super tanks", () => {
      expect(superTankRecipes.size).toBe(2);
      expect(superTankRecipes.has(Vehicles.CullenPredatorMkIII)).toBe(true);
      expect(superTankRecipes.has(Vehicles.O75bAres)).toBe(true);
    });

    test("all recipes have valid structure", () => {
      for (const [vehicleName, recipes] of superTankRecipes.entries()) {
        expect(recipes).toBeDefined();
        expect(recipes.length).toBeGreaterThan(0);

        recipes.forEach((recipe) => {
          expect(recipe).toHaveProperty("id");
          expect(recipe).toHaveProperty("required");
          expect(recipe).toHaveProperty("produced");
          expect(Array.isArray(recipe.required)).toBe(true);
          expect(Array.isArray(recipe.produced)).toBe(true);
          expect(recipe.produced[0].stuff).toBe(vehicleName);
        });
      }
    });
  });
});
