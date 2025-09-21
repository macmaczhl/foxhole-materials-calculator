import {
  Liquids,
  calculateCanCount,
  LIQUID_CAN_CAPACITIES,
} from "../lib/models";

describe("Liquid Can Calculations", () => {
  describe("LIQUID_CAN_CAPACITIES", () => {
    test("has correct capacities for all liquids", () => {
      expect(LIQUID_CAN_CAPACITIES[Liquids.Petrol]).toBe(50);
      expect(LIQUID_CAN_CAPACITIES[Liquids.HeavyOil]).toBe(30);
      expect(LIQUID_CAN_CAPACITIES[Liquids.Water]).toBe(50);
      expect(LIQUID_CAN_CAPACITIES[Liquids.EnrichedOil]).toBe(30);
      expect(LIQUID_CAN_CAPACITIES[Liquids.Oil]).toBe(50);
    });
  });

  describe("calculateCanCount", () => {
    test("calculates correct can count for Petrol (50L capacity)", () => {
      expect(calculateCanCount(Liquids.Petrol, 50)).toBe(1);
      expect(calculateCanCount(Liquids.Petrol, 51)).toBe(2);
      expect(calculateCanCount(Liquids.Petrol, 100)).toBe(2);
      expect(calculateCanCount(Liquids.Petrol, 150)).toBe(3);
      expect(calculateCanCount(Liquids.Petrol, 25)).toBe(1);
    });

    test("calculates correct can count for Heavy Oil (30L capacity)", () => {
      expect(calculateCanCount(Liquids.HeavyOil, 30)).toBe(1);
      expect(calculateCanCount(Liquids.HeavyOil, 31)).toBe(2);
      expect(calculateCanCount(Liquids.HeavyOil, 60)).toBe(2);
      expect(calculateCanCount(Liquids.HeavyOil, 90)).toBe(3);
      expect(calculateCanCount(Liquids.HeavyOil, 15)).toBe(1);
    });

    test("calculates correct can count for Water (50L capacity)", () => {
      expect(calculateCanCount(Liquids.Water, 50)).toBe(1);
      expect(calculateCanCount(Liquids.Water, 51)).toBe(2);
      expect(calculateCanCount(Liquids.Water, 100)).toBe(2);
      expect(calculateCanCount(Liquids.Water, 25)).toBe(1);
    });

    test("calculates correct can count for Enriched Oil (30L capacity)", () => {
      expect(calculateCanCount(Liquids.EnrichedOil, 30)).toBe(1);
      expect(calculateCanCount(Liquids.EnrichedOil, 31)).toBe(2);
      expect(calculateCanCount(Liquids.EnrichedOil, 60)).toBe(2);
      expect(calculateCanCount(Liquids.EnrichedOil, 15)).toBe(1);
    });

    test("calculates correct can count for Oil (50L capacity)", () => {
      expect(calculateCanCount(Liquids.Oil, 50)).toBe(1);
      expect(calculateCanCount(Liquids.Oil, 51)).toBe(2);
      expect(calculateCanCount(Liquids.Oil, 100)).toBe(2);
      expect(calculateCanCount(Liquids.Oil, 25)).toBe(1);
    });

    test("returns 0 for non-liquid materials", () => {
      expect(calculateCanCount("Salvage", 100)).toBe(0);
      expect(calculateCanCount("Construction Materials", 50)).toBe(0);
      expect(calculateCanCount("Unknown Material", 30)).toBe(0);
    });

    test("handles edge case of 0 liters", () => {
      expect(calculateCanCount(Liquids.Petrol, 0)).toBe(0);
      expect(calculateCanCount(Liquids.HeavyOil, 0)).toBe(0);
    });
  });
});
