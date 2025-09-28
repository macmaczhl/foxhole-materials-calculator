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
      expect(getItemGroup(Vehicles.DuncansCoin20mm)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.GA6Cestus)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Tisiphone)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Alekto)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Acheron)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.Doru)).toBe(ItemGroup.Vehicle);
      expect(getItemGroup(Vehicles.MulloyLPC)).toBe(ItemGroup.Vehicle);
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
      expect(vehicleGroup!.items).toHaveLength(33); // 1 (Xiphos) + 9 (armored cars) + 2 (Field AT Rifles) + 2 (Field Machine Guns) + 11 (new vehicles) + 7 (tankettes) + 1 (Alekto) = 33 total

      // Check that all vehicles are included
      const vehicleNames = vehicleGroup!.items.map((item) => item.name);
      // Original vehicle
      expect(vehicleNames).toContain(Vehicles.Xiphos);
      // Armored cars (from PR)
      expect(vehicleNames).toContain(Vehicles.Percutio);
      expect(vehicleNames).toContain(Vehicles.Gemini);
      expect(vehicleNames).toContain(Vehicles.OBrienGravekeeper);
      expect(vehicleNames).toContain(Vehicles.OBrienHighlander);
      expect(vehicleNames).toContain(Vehicles.OBrienFreeman);
      expect(vehicleNames).toContain(Vehicles.OBrienV110);
      expect(vehicleNames).toContain(Vehicles.OBrienWildJack);
      expect(vehicleNames).toContain(Vehicles.OBrienKnave);
      expect(vehicleNames).toContain(Vehicles.OBrienSquire);
      // Field AT Rifles and Machine Guns (from main)
      expect(vehicleNames).toContain(Vehicles.DuncansCoin20mm);
      expect(vehicleNames).toContain(Vehicles.GA6Cestus);
      expect(vehicleNames).toContain(Vehicles.Swallowtail);
      expect(vehicleNames).toContain(Vehicles.Sagittarii);
      // Field guns and artillery (from main)
      expect(vehicleNames).toContain(Vehicles.WaspNest);
      expect(vehicleNames).toContain(Vehicles.Koronides);
      expect(vehicleNames).toContain(Vehicles.Wolfhound);
      expect(vehicleNames).toContain(Vehicles.CollinsCannon);
      expect(vehicleNames).toContain(Vehicles.BatteringRam);
      expect(vehicleNames).toContain(Vehicles.Falconer);
      expect(vehicleNames).toContain(Vehicles.Tisiphone);
      expect(vehicleNames).toContain(Vehicles.Alekto);
      expect(vehicleNames).toContain(Vehicles.Rampart);
      expect(vehicleNames).toContain(Vehicles.Smelter);
      expect(vehicleNames).toContain(Vehicles.Stockade);
      expect(vehicleNames).toContain(Vehicles.StygianBolt);
      // APCs and tankettes (from main)
      expect(vehicleNames).toContain(Vehicles.Acheron);
      expect(vehicleNames).toContain(Vehicles.Doru);
      expect(vehicleNames).toContain(Vehicles.MulloyLPC);
      expect(vehicleNames).toContain(Vehicles.Actaeon);
      expect(vehicleNames).toContain(Vehicles.Vesta);
      expect(vehicleNames).toContain(Vehicles.Ixion);
      expect(vehicleNames).toContain(Vehicles.Deioneus);
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

      // Should equal the number of items in availableMaterials
      // (26 base materials + 33 vehicles = 59 total)
      expect(totalItems).toBe(59);
    });
  });
});
