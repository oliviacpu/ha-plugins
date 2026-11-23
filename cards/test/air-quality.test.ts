import { describe, expect, it } from "vitest";
import {
  airBounds,
  airScaleMax,
  airStatus,
  DEFAULT_AIR_BOUNDS,
  worstAirStatus,
} from "../src/core/air-quality";

const bounds = DEFAULT_AIR_BOUNDS;

describe("air quality bands", () => {
  it("humidity is bad at both ends", () => {
    expect(airStatus("humidity", 45, bounds)).toBe("good");
    expect(airStatus("humidity", 27, bounds)).toBe("fair");
    expect(airStatus("humidity", 65, bounds)).toBe("fair");
    expect(airStatus("humidity", 20, bounds)).toBe("poor");
    expect(airStatus("humidity", 75, bounds)).toBe("poor");
  });

  it("the bounds count as the better side", () => {
    expect(airStatus("humidity", 30, bounds)).toBe("good");
    expect(airStatus("humidity", 60, bounds)).toBe("good");
    expect(airStatus("co2", 999, bounds)).toBe("good");
    expect(airStatus("co2", 1000, bounds)).toBe("fair");
    expect(airStatus("co2", 1400, bounds)).toBe("poor");
  });

  it("rising measures only get worse", () => {
    expect(airStatus("voc", 500, bounds)).toBe("good");
    expect(airStatus("voc", 2000, bounds)).toBe("fair");
    expect(airStatus("voc", 4275, bounds)).toBe("poor");
    expect(airStatus("aqi", 50, bounds)).toBe("good");
    expect(airStatus("aqi", 144, bounds)).toBe("poor");
    expect(airStatus("pm25", 20, bounds)).toBe("fair");
  });

  it("no reading is unknown, not good", () => {
    expect(airStatus("co2", undefined, bounds)).toBe("unknown");
    expect(airStatus("co2", Number.NaN, bounds)).toBe("unknown");
  });

  it("the worst reading decides; unknown ones say nothing", () => {
    expect(worstAirStatus(["good", "poor", "fair"])).toBe("poor");
    expect(worstAirStatus(["good", "unknown"])).toBe("good");
    expect(worstAirStatus(["unknown"])).toBe("unknown");
    expect(worstAirStatus([])).toBe("unknown");
  });

  it("overrides replace one measure and keep the rest", () => {
    const merged = airBounds({ co2: [800, 1200] });
    expect(merged.co2).toEqual([800, 1200]);
    expect(merged.voc).toEqual(DEFAULT_AIR_BOUNDS.voc);
    expect(airStatus("co2", 900, merged)).toBe("fair");
  });

  it("a reading at the poor line is not yet a full bar", () => {
    expect(airScaleMax("humidity", bounds)).toBe(100);
    expect(1400 / airScaleMax("co2", bounds)).toBeCloseTo(2 / 3);
  });
});
