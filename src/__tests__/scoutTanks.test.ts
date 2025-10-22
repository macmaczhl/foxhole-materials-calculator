import { Materials, Vehicles, IRecipe } from "../lib/models";
import { RecipiesByStuff } from "../lib/recipes";

describe("King Gallant Mk. II Scout Tank", () => {
  describe("King Gallant Mk. II", () => {
    let kingGallantRecipes: IRecipe[];

    beforeAll(() => {
      kingGallantRecipes = RecipiesByStuff.get(Vehicles.KingGallantMkII) || [];
    });

    test("has recipes defined", () => {
      expect(kingGallantRecipes).toBeDefined();
      expect(kingGallantRecipes.length).toBeGreaterThan(0);
    });

    test("recipe requires processed construction materials, assembly materials III, and King Spire Mk. I", () => {
      const recipe = kingGallantRecipes.find((r) => r.produced[0].count === 1);

      expect(recipe).toBeDefined();
      expect(recipe!.produced[0].stuff).toBe(Vehicles.KingGallantMkII);
      expect(recipe!.required.length).toBe(3);
      expect(recipe!.required[0].stuff).toBe(
        Materials.ProcessedConstructionMaterials
      );
      expect(recipe!.required[0].count).toBe(5);
      expect(recipe!.required[1].stuff).toBe(Materials.AssemblyMaterialsIII);
      expect(recipe!.required[1].count).toBe(5);
      expect(recipe!.required[2].stuff).toBe(Vehicles.KingSpireMkI);
      expect(recipe!.required[2].count).toBe(1);
    });

    test("is in RecipiesByStuff map", () => {
      expect(RecipiesByStuff.has(Vehicles.KingGallantMkII)).toBe(true);
    });

    test("recipe has correct structure", () => {
      const recipes = RecipiesByStuff.get(Vehicles.KingGallantMkII) || [];
      recipes.forEach((recipe) => {
        expect(recipe.required.length).toBeGreaterThan(0);
        expect(recipe.produced.length).toBe(1);
        expect(recipe.produced[0].stuff).toBe(Vehicles.KingGallantMkII);
      });
    });
  });
});
