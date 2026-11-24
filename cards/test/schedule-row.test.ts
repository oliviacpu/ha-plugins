import { describe, expect, it } from "vitest";
import { formatClock, stepValue } from "../src/core/schedule-row";
import type { HomeAssistant } from "../src/core/types";

const hass = (states: Record<string, string>): HomeAssistant =>
  ({
    states: Object.fromEntries(
      Object.entries(states).map(([entity_id, state]) => [
        entity_id,
        { entity_id, state, attributes: {} },
      ])
    ),
    locale: { language: "en-US" },
  }) as unknown as HomeAssistant;

describe("schedule stepper", () => {
  it("moves a step and stays on the step grid", () => {
    expect(stepValue(74, 1, 1, 60, 80)).toBe(75);
    expect(stepValue(74, -1, 0.5, 60, 80)).toBe(73.5);
    expect(stepValue(74.3, 1, 0.5, 60, 80)).toBe(75);
  });

  it("does not leave the helper's own range", () => {
    expect(stepValue(80, 1, 1, 60, 80)).toBe(80);
    expect(stepValue(60, -1, 1, 60, 80)).toBe(60);
    expect(stepValue(70, 1, 1, undefined, undefined)).toBe(71);
  });
});

describe("schedule clock", () => {
  it("reads an input_datetime time in the user's locale", () => {
    expect(formatClock(hass({ "input_datetime.wake": "06:00:00" }), "input_datetime.wake")).toBe(
      "6:00 AM"
    );
    expect(formatClock(hass({ "input_datetime.bed": "22:00:00" }), "input_datetime.bed")).toBe(
      "10:00 PM"
    );
  });

  it("has nothing to say without a time", () => {
    expect(formatClock(hass({}), undefined)).toBeUndefined();
    expect(formatClock(hass({ "input_datetime.x": "unknown" }), "input_datetime.x")).toBeUndefined();
  });
});

import { orderedModes } from "../src/cards/ac-modes-dialog";

describe("modes popup order", () => {
  it("puts off at the bottom and climbs from it", () => {
    expect(orderedModes(["off", "heat", "cool", "heat_cool"])).toEqual([
      "heat_cool",
      "cool",
      "heat",
      "off",
    ]);
  });
  it("keeps a mode it doesn't know above off", () => {
    expect(orderedModes(["off", "eco", "heat"])).toEqual(["heat", "eco", "off"]);
    expect(orderedModes(undefined)).toEqual([]);
  });
});

import { averageColour, luminance } from "../src/cards/player-colour";

describe("player card colour", () => {
  it("averages the picture without its black bars and glare", () => {
    const px = [10, 10, 10, 255, 250, 250, 250, 255, 200, 40, 40, 255, 100, 20, 20, 255];
    expect(averageColour(px)).toEqual([150, 30, 30]);
    expect(averageColour([0, 0, 0, 255])).toBeUndefined();
  });
  it("tells light from dark", () => {
    expect(luminance([255, 255, 255])).toBeCloseTo(1);
    expect(luminance([20, 20, 60])).toBeLessThan(0.4);
  });
});
