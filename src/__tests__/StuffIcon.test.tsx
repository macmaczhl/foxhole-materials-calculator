import { render, screen, fireEvent } from "@testing-library/react";
import { StuffIcon } from "../app/components/StuffIcon";
import { Liquids, Materials, RawResources } from "../lib/models";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
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

  test("displays tooltip with can information for liquids on hover", () => {
    // Test Petrol (50L capacity)
    const { container } = render(
      <StuffIcon stuffName={Liquids.Petrol} count={75} />
    );
    const iconTile = container.querySelector(".icon-tile");

    // Tooltip should not be visible initially
    expect(container.querySelector(".instant-tooltip")).toBeNull();

    // Hover over the icon
    fireEvent.mouseEnter(iconTile!);

    // Tooltip should now be visible with correct text
    const tooltip = container.querySelector(".instant-tooltip");
    expect(tooltip?.textContent).toBe("Petrol: 75L (2 cans)");

    // Mouse leave should hide tooltip
    fireEvent.mouseLeave(iconTile!);
    expect(container.querySelector(".instant-tooltip")).toBeNull();
  });

  test("displays tooltip with singular can for single can amounts", () => {
    // Test with exactly one can worth
    const { container } = render(
      <StuffIcon stuffName={Liquids.HeavyOil} count={30} />
    );
    const iconTile = container.querySelector(".icon-tile");

    // Hover to show tooltip
    fireEvent.mouseEnter(iconTile!);

    const tooltip = container.querySelector(".instant-tooltip");
    expect(tooltip?.textContent).toBe("Heavy Oil: 30L (1 can)");
  });

  test("displays tooltip with multiple cans for larger amounts", () => {
    // Test Water (50L capacity) with 150L
    const { container } = render(
      <StuffIcon stuffName={Liquids.Water} count={150} />
    );
    const iconTile = container.querySelector(".icon-tile");

    // Hover to show tooltip
    fireEvent.mouseEnter(iconTile!);

    const tooltip = container.querySelector(".instant-tooltip");
    expect(tooltip?.textContent).toBe("Water: 150L (3 cans)");
  });

  test("displays basic tooltip for non-liquid materials", () => {
    const { container } = render(
      <StuffIcon stuffName={Materials.ConstructionMaterials} count={10} />
    );
    const iconTile = container.querySelector(".icon-tile");

    // Hover to show tooltip
    fireEvent.mouseEnter(iconTile!);

    const tooltip = container.querySelector(".instant-tooltip");
    expect(tooltip?.textContent).toBe("Construction Materials");
  });

  test("handles fractional can requirements correctly", () => {
    // Test Enriched Oil (30L capacity) with 45L -> should be 2 cans
    const { container } = render(
      <StuffIcon stuffName={Liquids.EnrichedOil} count={45} />
    );
    const iconTile = container.querySelector(".icon-tile");

    // Hover to show tooltip
    fireEvent.mouseEnter(iconTile!);

    const tooltip = container.querySelector(".instant-tooltip");
    expect(tooltip?.textContent).toBe("Enriched Oil: 45L (2 cans)");
  });
});
