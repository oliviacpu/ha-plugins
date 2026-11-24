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
