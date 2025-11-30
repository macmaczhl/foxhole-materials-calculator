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

  describe("UV-24 Icarus", () => {
    const icarusRecipes = RecipiesByStuff.get(Vehicles.UV24Icarus);

    it("should have recipes defined", () => {
      expect(icarusRecipes).toBeDefined();
      expect(icarusRecipes).toHaveLength(1);
    });

    it("should have Small Assembly Station recipe (3 Construction Materials + 10 Assembly Materials II + 1 UV-05a Argonaut → 1 vehicle)", () => {
      const assemblyRecipe = icarusRecipes?.find(
        (r) =>
          r.required.length === 3 &&
          r.required.some(
            (req) =>
              req.stuff === Materials.ConstructionMaterials && req.count === 3
          ) &&
          r.required.some(
            (req) =>
              req.stuff === Materials.AssemblyMaterialsII && req.count === 10
          ) &&
          r.required.some(
            (req) => req.stuff === Vehicles.UV05aArgonaut && req.count === 1
          )
      );

      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe?.required).toHaveLength(3);

      const constructionMaterialsReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Materials.ConstructionMaterials
      );
      expect(constructionMaterialsReq?.count).toBe(3);

      const assemblyMaterialsReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Materials.AssemblyMaterialsII
      );
      expect(assemblyMaterialsReq?.count).toBe(10);

      const argonautReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Vehicles.UV05aArgonaut
      );
      expect(argonautReq?.count).toBe(1);

      expect(assemblyRecipe?.produced).toHaveLength(1);
      expect(assemblyRecipe?.produced[0].stuff).toBe(Vehicles.UV24Icarus);
      expect(assemblyRecipe?.produced[0].count).toBe(1);
    });
  });

  describe("UV-5c Odyssey", () => {
    const odysseyRecipes = RecipiesByStuff.get(Vehicles.UV5cOdyssey);

    it("should have recipes defined", () => {
      expect(odysseyRecipes).toBeDefined();
      expect(odysseyRecipes).toHaveLength(1);
    });

    it("should have Small Assembly Station recipe (3 Construction Materials + 1 UV-05a Argonaut → 1 vehicle)", () => {
      const assemblyRecipe = odysseyRecipes?.find(
        (r) =>
          r.required.length === 2 &&
          r.required.some(
            (req) =>
              req.stuff === Materials.ConstructionMaterials && req.count === 3
          ) &&
          r.required.some(
            (req) => req.stuff === Vehicles.UV05aArgonaut && req.count === 1
          )
      );

      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe?.required).toHaveLength(2);

      const constructionMaterialsReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Materials.ConstructionMaterials
      );
      expect(constructionMaterialsReq?.count).toBe(3);

      const argonautReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Vehicles.UV05aArgonaut
      );
      expect(argonautReq?.count).toBe(1);

      expect(assemblyRecipe?.produced).toHaveLength(1);
      expect(assemblyRecipe?.produced[0].stuff).toBe(Vehicles.UV5cOdyssey);
      expect(assemblyRecipe?.produced[0].count).toBe(1);
    });
  });

  describe("Drummond 100a", () => {
    const drummond100aRecipes = RecipiesByStuff.get(Vehicles.Drummond100a);

    it("should have recipes defined", () => {
      expect(drummond100aRecipes).toBeDefined();
      expect(drummond100aRecipes).toHaveLength(4);
    });

    it("should have garage recipe (10 Refined Materials → 1 vehicle)", () => {
      const garageRecipe = drummond100aRecipes?.find(
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
      expect(garageRecipe?.produced[0].stuff).toBe(Vehicles.Drummond100a);
      expect(garageRecipe?.produced[0].count).toBe(1);
    });

    it("should have mass production recipe (72 Refined Materials → 9 vehicles)", () => {
      const mpfRecipe = drummond100aRecipes?.find(
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
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.Drummond100a);
      expect(mpfRecipe?.produced[0].count).toBe(9);
    });

    it("should have mass production recipe (90 Refined Materials → 12 vehicles)", () => {
      const mpfRecipe = drummond100aRecipes?.find(
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
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.Drummond100a);
      expect(mpfRecipe?.produced[0].count).toBe(12);
    });

    it("should have mass production recipe (105 Refined Materials → 15 vehicles)", () => {
      const mpfRecipe = drummond100aRecipes?.find(
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
      expect(mpfRecipe?.produced[0].stuff).toBe(Vehicles.Drummond100a);
      expect(mpfRecipe?.produced[0].count).toBe(15);
    });
  });

  describe("Drummond Loscann 55c", () => {
    const drummondLoscann55cRecipes = RecipiesByStuff.get(
      Vehicles.DrummondLoscann55c
    );

    it("should have recipes defined", () => {
      expect(drummondLoscann55cRecipes).toBeDefined();
      expect(drummondLoscann55cRecipes).toHaveLength(1);
    });

    it("should have Small Assembly Station recipe (3 Construction Materials + 5 Assembly Materials II + 1 Drummond 100a → 1 vehicle)", () => {
      const assemblyRecipe = drummondLoscann55cRecipes?.find(
        (r) =>
          r.required.length === 3 &&
          r.required.some(
            (req) =>
              req.stuff === Materials.ConstructionMaterials && req.count === 3
          ) &&
          r.required.some(
            (req) =>
              req.stuff === Materials.AssemblyMaterialsII && req.count === 5
          ) &&
          r.required.some(
            (req) => req.stuff === Vehicles.Drummond100a && req.count === 1
          )
      );

      expect(assemblyRecipe).toBeDefined();
      expect(assemblyRecipe?.required).toHaveLength(3);

      const constructionMaterialsReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Materials.ConstructionMaterials
      );
      expect(constructionMaterialsReq?.count).toBe(3);

      const assemblyMaterialsReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Materials.AssemblyMaterialsII
      );
      expect(assemblyMaterialsReq?.count).toBe(5);

      const drummond100aReq = assemblyRecipe?.required.find(
        (r) => r.stuff === Vehicles.Drummond100a
      );
      expect(drummond100aReq?.count).toBe(1);

      expect(assemblyRecipe?.produced).toHaveLength(1);
      expect(assemblyRecipe?.produced[0].stuff).toBe(
        Vehicles.DrummondLoscann55c
      );
      expect(assemblyRecipe?.produced[0].count).toBe(1);
    });
  });
});
