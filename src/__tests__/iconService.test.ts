import { IconService } from "../lib/services/iconService";
import { Materials, Liquids, RawResources, Vehicles } from "@/lib/models";

describe("IconService", () => {
  describe("getIconName", () => {
    it("should return correct icon name with .png extension for existing materials", () => {
      expect(IconService.getIconName(Materials.ConstructionMaterials)).toBe(
        "ConstructionMaterialsIcon.png"
      );
      expect(IconService.getIconName(Materials.RefinedMaterials)).toBe(
        "RefinedMaterialsIcon.png"
      );
      expect(IconService.getIconName(Materials.AssemblyMaterialsI)).toBe(
        "AssemblyMaterials1Icon.png"
      );
    });

    it("should return correct icon name with .png extension for liquids", () => {
      expect(IconService.getIconName(Liquids.Petrol)).toBe(
        "RefinedFuelIcon.png"
      );
      expect(IconService.getIconName(Liquids.Water)).toBe("WaterIcon.png");
      expect(IconService.getIconName(Liquids.Oil)).toBe("OilIcon.png");
    });

    it("should return correct icon name with .png extension for raw resources", () => {
      expect(IconService.getIconName(RawResources.Salvage)).toBe(
        "SalvageIcon.png"
      );
      expect(IconService.getIconName(RawResources.Components)).toBe(
        "ComponentsIcon.png"
      );
      expect(IconService.getIconName(RawResources.Coal)).toBe("CoalIcon.png");
    });

    it("should return correct icon name with .png extension for vehicles", () => {
      expect(IconService.getIconName(Vehicles.Xiphos)).toBe(
        "ArmoredCarVehicleIcon.png"
      );
      expect(IconService.getIconName(Vehicles.Actaeon)).toBe(
        "TanketteCVehicleIcon.png"
      );
    });

    it("should return null for non-existent items", () => {
      expect(IconService.getIconName("NonExistentItem")).toBeNull();
      expect(IconService.getIconName("")).toBeNull();
    });
  });

  describe("getIconUrl", () => {
    it("should generate correct wiki URL with default pixels", () => {
      const url = IconService.getIconUrl(Materials.ConstructionMaterials);
      expect(url).toBe(
        "http://foxhole.wiki.gg/images/thumb/ConstructionMaterialsIcon.png/24px-ConstructionMaterialsIcon.png"
      );
    });

    it("should generate correct wiki URL with custom pixels", () => {
      const url = IconService.getIconUrl(Materials.ConstructionMaterials, 60);
      expect(url).toBe(
        "http://foxhole.wiki.gg/images/thumb/ConstructionMaterialsIcon.png/60px-ConstructionMaterialsIcon.png"
      );
    });

    it("should generate correct wiki URL for liquids", () => {
      const url = IconService.getIconUrl(Liquids.Petrol, 16);
      expect(url).toBe(
        "http://foxhole.wiki.gg/images/thumb/RefinedFuelIcon.png/16px-RefinedFuelIcon.png"
      );
    });

    it("should generate correct wiki URL for raw resources", () => {
      const url = IconService.getIconUrl(RawResources.Salvage, 32);
      expect(url).toBe(
        "http://foxhole.wiki.gg/images/thumb/SalvageIcon.png/32px-SalvageIcon.png"
      );
    });

    it("should generate correct wiki URL for vehicles", () => {
      const url = IconService.getIconUrl(Vehicles.Xiphos, 48);
      expect(url).toBe(
        "http://foxhole.wiki.gg/images/thumb/ArmoredCarVehicleIcon.png/48px-ArmoredCarVehicleIcon.png"
      );
    });

    it("should return null for non-existent items", () => {
      expect(IconService.getIconUrl("NonExistentItem")).toBeNull();
      expect(IconService.getIconUrl("NonExistentItem", 24)).toBeNull();
    });
  });

  describe("hasIcon", () => {
    it("should return true for existing materials", () => {
      expect(IconService.hasIcon(Materials.ConstructionMaterials)).toBe(true);
      expect(IconService.hasIcon(Materials.RefinedMaterials)).toBe(true);
    });

    it("should return true for existing liquids", () => {
      expect(IconService.hasIcon(Liquids.Petrol)).toBe(true);
      expect(IconService.hasIcon(Liquids.Water)).toBe(true);
    });

    it("should return true for existing raw resources", () => {
      expect(IconService.hasIcon(RawResources.Salvage)).toBe(true);
      expect(IconService.hasIcon(RawResources.Components)).toBe(true);
    });

    it("should return true for existing vehicles", () => {
      expect(IconService.hasIcon(Vehicles.Xiphos)).toBe(true);
      expect(IconService.hasIcon(Vehicles.Actaeon)).toBe(true);
    });

    it("should return false for non-existent items", () => {
      expect(IconService.hasIcon("NonExistentItem")).toBe(false);
      expect(IconService.hasIcon("")).toBe(false);
    });
  });
});
