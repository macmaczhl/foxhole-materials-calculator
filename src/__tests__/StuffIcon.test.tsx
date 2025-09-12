import { render, screen } from "@testing-library/react";
import { StuffIcon } from "../app/components/StuffIcon";
import { Liquids, Materials, RawResources } from "../lib/models";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

describe("StuffIcon", () => {
  test("displays count with L suffix for liquid materials", () => {
    render(<StuffIcon stuffName={Liquids.Petrol} count={50} />);

    // Should show 50L for liquid
    expect(screen.getByText("50L")).toBeTruthy();
  });

  test("displays count with L suffix for all liquid types", () => {
    const liquids = [
      { name: Liquids.Petrol, count: 50 },
      { name: Liquids.Oil, count: 100 },
      { name: Liquids.Water, count: 25 },
      { name: Liquids.HeavyOil, count: 75 },
      { name: Liquids.EnrichedOil, count: 30 },
    ];

    liquids.forEach(({ name, count }) => {
      const { unmount } = render(<StuffIcon stuffName={name} count={count} />);
      expect(screen.getByText(`${count}L`)).toBeTruthy();
      unmount();
    });
  });

  test("displays count without suffix for non-liquid materials", () => {
    render(
      <StuffIcon stuffName={Materials.ConstructionMaterials} count={10} />
    );

    // Should show just the number for non-liquids
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.queryByText("10L")).toBeFalsy();
  });

  test("displays count without suffix for raw resources", () => {
    render(<StuffIcon stuffName={RawResources.Salvage} count={100} />);

    // Should show just the number for raw resources
    expect(screen.getByText("100")).toBeTruthy();
    expect(screen.queryByText("100L")).toBeFalsy();
  });

  test("displays correct format for materials without icons", () => {
    const customMaterial = "Custom Material";
    render(<StuffIcon stuffName={customMaterial} count={5} />);

    // For materials without icons, should show in fallback format
    expect(screen.getByText("Custom Material(5)")).toBeTruthy();
  });

  test("displays correct format for liquids without icons", () => {
    // Test with a liquid that might not have an icon mapped
    render(<StuffIcon stuffName="Custom Liquid" count={15} />);

    // Should show without L suffix since it's not in the Liquids enum
    expect(screen.getByText("Custom Liquid(15)")).toBeTruthy();
  });
});
