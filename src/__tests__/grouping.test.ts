import {
  getItemGroup,
  createGroupedStuffList,
  ItemGroup,
  Vehicles,
  RawResources,
  Materials,
  Liquids,
} from "@/lib/models";

describe("Item Grouping", () => {
  describe("getItemGroup", () => {
    test("categorizes vehicles correctly", () => {
      expect(getItemGroup(Vehicles.Xiphos)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Javelin)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Hoplite)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Peltast)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.NiskaMkI)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.NiskaMkII)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.NiskaMkIII)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.NiskaRyckerMkIX)).toBe(ItemGroup.Vehicle);
    });

    test("categorizes raw resources correctly", () => {
      expect(getItemGroup(RawResources.Components)).toBe(
        ItemGroup.RawResources
      );
      expect(getItemGroup(RawResources.Coke)).toBe(ItemGroup.RawResources);
    });

    test("categorizes processed materials as components", () => {
      expect(getItemGroup(Materials.ConstructionMaterials)).toBe(
        ItemGroup.Components
      );
      expect(getItemGroup(Materials.RefinedMaterials)).toBe(
        ItemGroup.Components
      );
      expect(getItemGroup(Materials.AssemblyMaterialsI)).toBe(
        ItemGroup.Components
      );
      expect(getItemGroup(Liquids.Petrol)).toBe(ItemGroup.Components);
    });
  });

  describe("createGroupedStuffList", () => {
    test("creates groups in correct order", () => {
      const grouped = createGroupedStuffList();

      expect(grouped).toHaveLength(3);
      expect(grouped[0].group).toBe(ItemGroup.Vehicle);
      expect(grouped[1].group).toBe(ItemGroup.Components);
      expect(grouped[2].group).toBe(ItemGroup.RawResources);
    });

    test("vehicle group contains only vehicles", () => {
      const grouped = createGroupedStuffList();
      const vehicleGroup = grouped.find((g) => g.group === ItemGroup.Vehicle);

      expect(vehicleGroup).toBeDefined();
      expect(vehicleGroup!.items).toHaveLength(8); // Now includes all half-trucks

      // Check that all items are vehicles
      const vehicleNames = Object.values(Vehicles);
      vehicleGroup!.items.forEach((item) => {
        expect(vehicleNames).toContain(item.name as Vehicles);
      });
    });

    test("raw resources group contains only raw materials", () => {
      const grouped = createGroupedStuffList();
      const rawGroup = grouped.find((g) => g.group === ItemGroup.RawResources);

      expect(rawGroup).toBeDefined();
      expect(rawGroup!.items.length).toBe(2); // Components and Coke

      // Check that all items in raw group are actually the expected raw resources
      const rawMaterials = [RawResources.Components, RawResources.Coke];

      rawGroup!.items.forEach((item) => {
        expect(rawMaterials).toContain(item.name);
      });
    });

    test("components group contains processed materials", () => {
      const grouped = createGroupedStuffList();
      const componentsGroup = grouped.find(
        (g) => g.group === ItemGroup.Components
      );

      expect(componentsGroup).toBeDefined();
      expect(componentsGroup!.items.length).toBeGreaterThan(0);

      // Should contain various processed materials
      const componentNames = componentsGroup!.items.map((item) => item.name);
      expect(componentNames).toContain(Materials.ConstructionMaterials);
      expect(componentNames).toContain(Liquids.Petrol);
    });

    test("all available materials are included in groups", () => {
      const grouped = createGroupedStuffList();
      const totalItems = grouped.reduce(
        (sum, group) => sum + group.items.length,
        0
      );

      // Should equal the number of items in availableMaterials (now 34 items: 26 original + 7 new half-trucks)
      expect(totalItems).toBe(34);
    });
  });
});
