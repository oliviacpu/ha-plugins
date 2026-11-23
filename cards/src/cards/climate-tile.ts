import { nothing } from "lit";
import { state } from "lit/decorators.js";
import { BaseTileCard, type TileBaseConfig } from "../core/base-tile-card";
import { tileColor } from "../core/state-color";
import {
  cardName,
  composeSegments,
  formatRole,
  numericState,
  resolveRole,
  roleSegment,
  unavailableSegment,
} from "../core/format";
import { tileStyles } from "../core/tile-styles";
import { renderLevels, levelStyles, type LevelRow } from "../core/levels";
import {
  AIR_COLOR,
  airBounds,
  airScaleMax,
  airStatus,
  worstAirStatus,
  type AirBounds,
  type AirMeasure,
} from "../core/air-quality";
import { t } from "../core/i18n";
import type { HomeAssistant } from "../core/types";
import { resolveBigKeys, splitRoles, type KeyedRole } from "../core/big-values";
import { defaultIconAction } from "../core/actions";
import type { LovelaceCardEditor } from "../core/types";
import { registerCard } from "../core/register";
import { byClass, devicePool, filled, suggestion } from "../core/suggest";
import { computeDomain } from "../core/state-color";

/** The order of roles in the secondary line is fixed and not configurable. */
export const CLIMATE_ROLES = [
  "temperature",
  "humidity",
  "illuminance",
  "pm25",
] as const;

export type ClimateRole = (typeof CLIMATE_ROLES)[number];

/** The measures that get a row with `air_rows`, in this order. */
export const AIR_ROWS: AirMeasure[] = ["humidity", "co2", "voc", "aqi", "pm25"];

export interface ClimateTileConfig extends TileBaseConfig {
  type: string;
  temperature: string;
  humidity?: string;
  illuminance?: string;
  pm25?: string;
  /** Carbon dioxide, ppm. Only drawn with `air_rows`. */
  co2?: string;
  /** Volatile organic compounds, µg/m³. Only drawn with `air_rows`. */
  voc?: string;
  /** An air quality index, on the US scale. Only drawn with `air_rows`. */
  aqi?: string;
  /**
   * A row per air measure — humidity, CO₂, VOC, AQI, PM2.5 — with its bar
   * coloured good, fair or poor, and the icon in the colour of the worst one.
   * Off, the card is the plain room tile it always was.
   */
  air_rows?: boolean;
  /** Where fair and poor start, per measure; see core/air-quality.ts. */
  air_bounds?: Partial<AirBounds>;
  /** What to show large on the right. One temperature by default. */
  big_values?: ClimateRole[];
}

/**
 * With air rows, the temperature's own day as the stock trend graph under
 * them: the rows say how the air is now, the graph how the room got there.
 * Removable in the Features panel like any other feature.
 */
export function climateFeatures(
  _hass: HomeAssistant | undefined,
  config: ClimateTileConfig | undefined
): Record<string, unknown>[] {
  return config?.air_rows ? [{ type: "trend-graph", hours_to_show: 24 }] : [];
}

/**
 * Room climate. Large on the right — the temperature, optionally one more value
 * after a slash. The rest goes to the secondary line in CLIMATE_ROLES order.
 */
export class HorosClimateTile extends BaseTileCard {
  static styles = [tileStyles, levelStyles];

  @state() private _config?: ClimateTileConfig;

  protected override contentRows(): number {
    const config = this._config;
    const rows = config?.air_rows
      ? AIR_ROWS.filter((measure) => config[measure]).length
      : 0;
    return this.levelRows(rows) + this.fixedRows();
  }

  protected override fixedRows(): number {
    return this.featureRows(climateFeatures(this.hass, this._config));
  }

  /** One row per configured air measure, coloured by its band. */
  private _airRows(bounds: AirBounds): LevelRow[] {
    const config = this._config!;
    return AIR_ROWS.filter((measure) => config[measure]).flatMap((measure) => {
      const role = resolveRole(this.hass, config[measure]);
      if (!role) return [];
      const value = numericState(role);
      const status = airStatus(measure, value, bounds);
      return [
        {
          entityId: role.entityId,
          name: t(this.hass, `level.${measure}`),
          text: formatRole(this.hass, role) ?? t(this.hass, "value.unknown"),
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

  private _bigKeys: string[] = ["temperature"];

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editors/climate-tile-editor");
    return document.createElement(
      "horos-climate-tile-editor"
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<ClimateTileConfig> {
    return { temperature: "", humidity: "" };
  }

  public setConfig(config: ClimateTileConfig): void {
    if (!config.temperature) {
      throw new Error("A temperature entity is required (temperature)");
    }
    this._bigKeys = resolveBigKeys(
      config.big_values,
      "temperature",
      CLIMATE_ROLES
    );
    this.base = config;
    this._config = config;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const config = this._config;

    const roles: KeyedRole[] = CLIMATE_ROLES.map((key) => ({
      key,
      role: resolveRole(this.hass, config[key]),
    }));

    const warning = this.missingRolesWarning([
      ...roles.map((item) => item.role),
      ...(["co2", "voc", "aqi"] as const).map((key) =>
        resolveRole(this.hass, config[key])
      ),
    ]);
    if (warning) return this.renderWarning(warning);

    const { big, rest } = splitRoles(roles, this._bigKeys);
    const main = roles[0].role;

    const bounds = airBounds(config.air_bounds);
    const airRows = config.air_rows ? this._airRows(bounds) : [];
    // A measure with a row of its own is not repeated on the line.
    const line = config.air_rows
      ? rest.filter((item) => !(AIR_ROWS as string[]).includes(item.key))
      : rest;
    const worst = worstAirStatus(
      AIR_ROWS.filter((measure) => config[measure]).map((measure) =>
        airStatus(measure, numericState(resolveRole(this.hass, config[measure])), bounds)
      )
    );

    return this.renderTile({
      icon: config.air_rows ? "mdi:home-thermometer" : "mdi:thermometer",
      color: config.air_rows ? AIR_COLOR[worst] : tileColor(main?.stateObj),
      primary: cardName(config.name, main),
      imageUrl: this.entityImage(main?.stateObj),
      defaultIconAction: defaultIconAction(main?.entityId),
      secondary: composeSegments([
        unavailableSegment(this.hass, main),
        ...line.map((item) => roleSegment(this.hass, item.role)),
      ]),
      mainEntityId: main?.entityId,
      values: this.bigValues(big),
      ownFeatures: climateFeatures(this.hass, config),
      customFeatures: airRows.length
        ? renderLevels(airRows, (entityId) => this.fireMoreInfo(entityId))
        : undefined,
    });
  }
}

registerCard("horos-climate-tile", HorosClimateTile, {
  type: "horos-climate-tile",
  name: { ru: "Климат комнаты", en: "Room climate" },
  description: {
    ru: "Температура, влажность, освещённость и PM2.5 одной комнаты в одной плитке",
    en: "Temperature, humidity, illuminance and PM2.5 of one room in a single tile",
  },
  preview: true,
  suggest: (hass, entityId) => {
    if (computeDomain(entityId) !== "sensor") return null;
    const pool = devicePool(hass, entityId);
    const roles = {
      temperature: byClass(hass, pool, "sensor", "temperature"),
      humidity: byClass(hass, pool, "sensor", "humidity"),
      illuminance: byClass(hass, pool, "sensor", "illuminance"),
      pm25: byClass(hass, pool, "sensor", "pm25"),
    };
    // One temperature is what the stock tile is for; this card starts at the
    // second role.
    if (!roles.temperature || filled(roles) < 2) return null;
    return suggestion("custom:horos-climate-tile", roles);
  },
});

declare global {
  interface HTMLElementTagNameMap {
    "horos-climate-tile": HorosClimateTile;
  }
}
