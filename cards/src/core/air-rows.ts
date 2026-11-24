/**
 * Air measures as level rows: one row per configured measure, its bar and ink
 * in the colour of its band. Shared by every card that carries the air of a
 * room — the room tile and the thermostat — so the two read alike.
 */
import type { HomeAssistant } from "./types";
import { formatRole, numericState, resolveRole } from "./format";
import type { LevelRow } from "./levels";
import { t } from "./i18n";
import {
  AIR_COLOR,
  airScaleMax,
  airStatus,
  worstAirStatus,
  type AirBounds,
  type AirMeasure,
  type AirStatus,
} from "./air-quality";

/** The measures that get a row, in this order. */
export const AIR_ROWS: AirMeasure[] = ["humidity", "co2", "voc", "aqi", "pm25"];

/** Which entity reads which measure; a measure left out gets no row. */
export type AirEntities = Partial<Record<AirMeasure, string>>;

/** How many rows the card will draw, for its row arithmetic. */
export function airRowCount(entities: AirEntities): number {
  return AIR_ROWS.filter((measure) => entities[measure]).length;
}

export function airLevelRows(
  hass: HomeAssistant,
  entities: AirEntities,
  bounds: AirBounds
): LevelRow[] {
  return AIR_ROWS.filter((measure) => entities[measure]).flatMap((measure) => {
    const role = resolveRole(hass, entities[measure]);
    if (!role) return [];
    const value = numericState(role);
    const status = airStatus(measure, value, bounds);
    return [
      {
        entityId: role.entityId,
        name: t(hass, `level.${measure}`),
        text: formatRole(hass, role) ?? t(hass, "value.unknown"),
        ink: AIR_COLOR[status],
        level:
          value === undefined
            ? 0
            : (Math.max(0, value) / airScaleMax(measure, bounds)) * 100,
        alarm: status === "poor",
        alarmIcon: "mdi:alert-circle",
      },
    ];
  });
}

/** The worst band among the configured measures. */
export function worstAir(
  hass: HomeAssistant,
  entities: AirEntities,
  bounds: AirBounds
): AirStatus {
  return worstAirStatus(
    AIR_ROWS.filter((measure) => entities[measure]).map((measure) =>
      airStatus(measure, numericState(resolveRole(hass, entities[measure])), bounds)
    )
  );
}
