import { Vehicles, Materials } from "../lib/models";
import { RecipiesByStuff } from "../lib/recipes";

describe("Construction Vehicle Recipes", () => {
  describe("BMS - Universal Assembly Rig", () => {
    it("should have recipes defined", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig);
      expect(recipes).toBeDefined();
      expect(recipes).toHaveLength(4); // Home Base/Garage + 3 MPF variants
    });

    it("should have Home Base/Garage production recipe: 100 Basic Materials → 1 Construction Vehicle", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig);
      const homeBaseRecipe = recipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.BasicMaterials &&
          r.required[0].count === 100 &&
          r.produced.length === 1 &&
          r.produced[0].stuff === Vehicles.BMSUniversalAssemblyRig &&
          r.produced[0].count === 1
      );
      expect(homeBaseRecipe).toBeDefined();
    });

    it("should have MPF 3-crate recipe: 720 Basic Materials → 9 Construction Vehicles", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig);
      const mpfRecipe = recipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.BasicMaterials &&
          r.required[0].count === 720 &&
          r.produced.length === 1 &&
          r.produced[0].stuff === Vehicles.BMSUniversalAssemblyRig &&
          r.produced[0].count === 9
      );
      expect(mpfRecipe).toBeDefined();
    });

    it("should have MPF 4-crate recipe: 900 Basic Materials → 12 Construction Vehicles", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig);
      const mpfRecipe = recipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.BasicMaterials &&
          r.required[0].count === 900 &&
          r.produced.length === 1 &&
          r.produced[0].stuff === Vehicles.BMSUniversalAssemblyRig &&
          r.produced[0].count === 12
      );
      expect(mpfRecipe).toBeDefined();
    });

    it("should have MPF 5-crate recipe: 1050 Basic Materials → 15 Construction Vehicles", () => {
      const recipes = RecipiesByStuff.get(Vehicles.BMSUniversalAssemblyRig);
      const mpfRecipe = recipes?.find(
        (r) =>
          r.required.length === 1 &&
          r.required[0].stuff === Materials.BasicMaterials &&
          r.required[0].count === 1050 &&
          r.produced.length === 1 &&
          r.produced[0].stuff === Vehicles.BMSUniversalAssemblyRig &&
          r.produced[0].count === 15
      );
      expect(mpfRecipe).toBeDefined();
    });
  });
});
