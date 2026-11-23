/**
 * Comfort bands for room air: how good or bad a reading is. A DOM-free module
 * so the thresholds can be tested without a browser.
 *
 * Every measure has two bounds that split it into good, fair and poor. Humidity
 * is bad at both ends, so its bounds are a comfortable band and a tolerable one
 * around it; everything else only gets worse as it rises.
 */

export type AirMeasure = "humidity" | "co2" | "voc" | "aqi" | "pm25";

export type AirStatus = "good" | "fair" | "poor" | "unknown";

/** Two numbers: where fair starts and where poor starts. */
export type RisingBounds = [fair: number, poor: number];

/** Humidity: the good band, then the fair band around it. */
export interface HumidityBounds {
  good: [low: number, high: number];
  fair: [low: number, high: number];
}

export interface AirBounds {
  humidity: HumidityBounds;
  co2: RisingBounds;
  voc: RisingBounds;
  aqi: RisingBounds;
  pm25: RisingBounds;
}

/**
 * Defaults, each from a published scale rather than a number of our own:
 * - humidity: 30–60 % comfortable (ASHRAE 55), 25–70 % tolerable;
 * - CO₂: 1000 ppm is where a room reads as stuffy, 1400 ppm poor
 *   (the common "ventilate now" line on consumer monitors);
 * - VOC: the German UBA's TVOC levels — up to 1000 µg/m³ no concern,
 *   1000–3000 some, above that major;
 * - AQI: the US index — 0–50 good, 51–100 moderate;
 * - PM2.5: the WHO 24 h guideline, 15 µg/m³, and 35 (US "unhealthy for some").
 */
export const DEFAULT_AIR_BOUNDS: AirBounds = {
  humidity: { good: [30, 60], fair: [25, 70] },
  co2: [1000, 1400],
  voc: [1000, 3000],
  aqi: [51, 101],
  pm25: [15, 35],
};

/**
 * What a full bar stands for. A bar is read against the poor line, so the
 * scale is the poor bound with room above it: a reading at the poor line
 * fills two thirds, and a poor room is still a bar that is not yet full.
 */
export function airScaleMax(measure: AirMeasure, bounds: AirBounds): number {
  if (measure === "humidity") return 100;
  return bounds[measure][1] * 1.5;
}

/** Merge user overrides into the defaults, one measure at a time. */
export function airBounds(overrides?: Partial<AirBounds>): AirBounds {
  return { ...DEFAULT_AIR_BOUNDS, ...(overrides ?? {}) };
}

/** The bounds themselves count as the better side: 1000 ppm is not stuffy yet. */
export function airStatus(
  measure: AirMeasure,
  value: number | undefined,
  bounds: AirBounds
): AirStatus {
  if (value === undefined || !Number.isFinite(value)) return "unknown";
  if (measure === "humidity") {
    const { good, fair } = bounds.humidity;
    if (value >= good[0] && value <= good[1]) return "good";
    if (value >= fair[0] && value <= fair[1]) return "fair";
    return "poor";
  }
  const [fairFrom, poorFrom] = bounds[measure];
  if (value >= poorFrom) return "poor";
  if (value >= fairFrom) return "fair";
  return "good";
}

/** The worst of several readings; unknown ones say nothing either way. */
export function worstAirStatus(statuses: AirStatus[]): AirStatus {
  if (statuses.includes("poor")) return "poor";
  if (statuses.includes("fair")) return "fair";
  if (statuses.includes("good")) return "good";
  return "unknown";
}

/** Colours from the theme's semantic tokens, as for soil moisture. */
export const AIR_COLOR: Record<AirStatus, string> = {
  good: "var(--success-color, #4caf50)",
  fair: "var(--warning-color, #ffa600)",
  poor: "var(--error-color, #db4437)",
  unknown: "var(--state-unavailable-color)",
};
