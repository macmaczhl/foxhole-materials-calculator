import { Vehicles } from "../lib/models";
import { ICONS_MAP } from "../lib/constants";

describe("Vehicle Icons Coverage", () => {
  it("should have an icon for each vehicle in the Vehicles enum with consistent naming", () => {
    // Get all vehicle values from the enum
    const vehicleValues = Object.values(Vehicles);

    // Check that each vehicle has an icon in ICONS_MAP with proper naming
    vehicleValues.forEach((vehicleName) => {
      // Verify icon exists
      if (!ICONS_MAP.has(vehicleName)) {
        throw new Error(
          `Vehicle "${vehicleName}" is missing an icon in ICONS_MAP`
        );
      }

      // Verify icon name is defined and not empty
      const iconName = ICONS_MAP.get(vehicleName);
      if (!iconName) {
        throw new Error(`Icon name is undefined for vehicle "${vehicleName}"`);
      }
      if (typeof iconName !== "string") {
        throw new Error(
          `Icon name for vehicle "${vehicleName}" is not a string`
        );
      }
      if (iconName.length === 0) {
        throw new Error(`Icon name for vehicle "${vehicleName}" is empty`);
      }

      // Verify icon name follows consistent naming convention
      // Icon names should not contain spaces or special characters that would break URLs
      if (!/^[a-zA-Z0-9]+$/.test(iconName)) {
        throw new Error(
          `Icon name "${iconName}" for vehicle "${vehicleName}" contains invalid characters (should only contain alphanumeric characters)`
        );
      }
    });
  });
});
