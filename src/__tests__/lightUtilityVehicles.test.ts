import { Vehicles, Materials } from "../lib/models";
import { RecipiesByStuff } from "../lib/recipes";

describe("Light Utility Vehicle Recipes", () => {
  describe("UV-05a Argonaut", () => {
    const argonautRecipes = RecipiesByStuff.get(Vehicles.UV05aArgonaut);

    it("should have recipes defined", () => {
      expect(argonautRecipes).toBeDefined();
      expect(argonautRecipes).toHaveLength(4);
    });

    it("should have garage recipe (10 Refined Materials → 1 vehicle)", () => {
      const garageRecipe = argonautRecipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 10 &&
          r.produced[0].count === 1
      );

      expect(garageRecipe).toBeDefined();
      expect(garageRecipe?.required).toHaveLength(1);
      expect(garageRecipe?.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(garageRecipe?.required[0].count).toBe(10);
      expect(garageRecipe?.produced).toHaveLength(1);
      expect(garageRecipe?.produced[0].stuff).toBe(Vehicles.UV05aArgonaut);
      expect(garageRecipe?.produced[0].count).toBe(1);
    });

    it("should have mass production recipe (72 Refined Materials → 9 vehicles)", () => {
      const mpfRecipe = argonautRecipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 72
      );

      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe?.required).toHaveLength(1);
      expect(mpfRecipe?.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(mpfRecipe?.required[0].count).toBe(72);
      expect(mpfRecipe?.produced).toHaveLength(1);
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.UV05aArgonaut);
      expect(mpfRecipe?.produced[0].count).toBe(9);
    });

    it("should have mass production recipe (90 Refined Materials → 12 vehicles)", () => {
      const mpfRecipe = argonautRecipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 90
      );

      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe?.required).toHaveLength(1);
      expect(mpfRecipe?.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(mpfRecipe?.required[0].count).toBe(90);
      expect(mpfRecipe?.produced).toHaveLength(1);
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.UV05aArgonaut);
      expect(mpfRecipe?.produced[0].count).toBe(12);
    });

    it("should have mass production recipe (105 Refined Materials → 15 vehicles)", () => {
      const mpfRecipe = argonautRecipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.RefinedMaterials &&
          r.required[0].count === 105
      );

      expect(mpfRecipe).toBeDefined();
      expect(mpfRecipe?.required).toHaveLength(1);
      expect(mpfRecipe?.required[0].stuff).toBe(Materials.RefinedMaterials);
      expect(mpfRecipe?.required[0].count).toBe(105);
      expect(mpfRecipe?.produced).toHaveLength(1);
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.UV05aArgonaut);
      expect(mpfRecipe?.produced[0].count).toBe(15);
    });
  });
});
