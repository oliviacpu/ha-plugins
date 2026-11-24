import { html, nothing } from "lit";
import { css } from "lit";
import { query, state } from "lit/decorators.js";
import { BaseTileCard, type TileBaseConfig } from "../core/base-tile-card";
import { tileColor } from "../core/state-color";
import {
  cardName,
  composeSegments,
  resolveRole,
  roleSegment,
  unavailableSegment,
} from "../core/format";
import { resolveBigKeys, splitRoles, type KeyedRole } from "../core/big-values";
import { normalizeItem, type EntityItem } from "../core/entity-item";
import { defaultIconAction } from "../core/actions";
import type { LovelaceCardEditor } from "../core/types";
import { registerCard } from "../core/register";
import { t } from "../core/i18n";
import { tileStyles } from "../core/tile-styles";
import { renderLevels, levelStyles } from "../core/levels";
import { airBounds, type AirBounds } from "../core/air-quality";
import { AIR_ROWS, airLevelRows, airRowCount } from "../core/air-rows";
import { renderSchedule, scheduleStyles, type SchedulePeriod } from "../core/schedule-row";
import {
  areaOf,
  byClass,
  byDomain,
  devicePool,
  filled,
  sameArea,
  suggestion,
} from "../core/suggest";

/** The order of roles in the secondary line. */
export const AC_ROLES = ["temperature", "humidity", "power"] as const;

export type AcRole = (typeof AC_ROLES)[number];

export interface AcTileConfig extends TileBaseConfig {
  type: string;
  /** The climate entity: an air conditioner, a heat pump, a radiator valve. */
  climate: string;
  /** What the room actually is, as opposed to what the unit reports. */
  temperature?: string;
  humidity?: string;
  /** What it costs to run: the plug the unit is on. */
  power?: string;
  /** Carbon dioxide, ppm. Only drawn with `air_rows`. */
  co2?: string;
  /** Volatile organic compounds, µg/m³. Only drawn with `air_rows`. */
  voc?: string;
  /** An air quality index, on the US scale. Only drawn with `air_rows`. */
  aqi?: string;
  pm25?: string;
  /**
   * The air of the room the unit keeps, a row per measure — humidity, CO₂,
   * VOC, AQI, PM2.5 — coloured good, fair or poor, as on the room tile. A
   * thermostat with air sensors of its own is then the whole room in one card.
   */
  air_rows?: boolean;
  /** Where fair and poor start, per measure; see core/air-quality.ts. */
  air_bounds?: Partial<AirBounds>;
  /** Anything else worth a word: mode, fan speed, filter. */
  sensors?: (EntityItem | string)[];
  /** @deprecated Removed in the Features panel instead. */
  controls?: boolean;
  /**
   * What to show large on the right. The room temperature by default — unless
   * the target temperature sits in the line, which then has no room for it.
   */
  big_values?: AcRole[];
  /**
   * The schedule the unit follows, a period per entry — day, then night — each
   * with the time it starts (an `input_datetime`, tap for its picker) and a
   * stepper for the temperature it holds (an `input_number` the schedule
   * reads). For a thermostat run by an automation from helpers: the helpers
   * are what to change, not the unit's own target, which the schedule would
   * take for a hold.
   */
  schedule?: SchedulePeriod[];
  /**
   * A tap on the icon opens the unit's modes, and only them, in a small popup
   * — the mode buttons without the whole climate dialog, and without a row of
   * them taking the card's height the rest of the time.
   */
  modes_popup?: boolean;
}

/**
 * The unit's controls, as the card's default features.
 *
 * Modes and a target temperature are stock features — the climate domain has
 * more shapes than a card should try to draw — and they are switched off the
 * way every other feature is: by removing them in the editor's Features panel.
 *
 * The target goes first because the card puts its first feature inline: a
 * stepper fits half a line, six mode buttons do not.
 */
export function acFeatures(
  config: AcTileConfig | undefined
): Record<string, unknown>[] {
  // `controls: false` is how this used to be switched off; a config that still
  // says it keeps working.
  if (!config || config.controls === false) return [];
  return [{ type: "target-temperature" }, { type: "climate-hvac-modes" }];
}

/**
 * An air conditioner, told apart from the room it stands in.
 *
 * A climate entity knows its own target and what its own sensor reads, and
 * those two are not the room: the unit measures the air at its intake. So the
 * room's temperature and humidity are separate roles, filled from the room's
 * own sensors, and the unit's target stays where the stock features show it.
 *
 * Power belongs here for the same reason a plug card has it: the honest answer
 * to "should I leave it running" is a number in watts.
 */
export class HorosAcTile extends BaseTileCard {
  static styles = [
    tileStyles,
    levelStyles,
    scheduleStyles,
    css`
      dialog.modes {
        border: none;
        padding: var(--ha-space-3, 12px);
        width: min(420px, calc(100vw - 32px));
        border-radius: var(--ha-card-border-radius, 12px);
        background: var(--card-background-color, var(--ha-card-background, #fff));
        color: var(--primary-text-color);
        box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0, 0, 0, 0.24));
      }
      dialog.modes::backdrop {
        background: rgba(0, 0, 0, 0.32);
      }
    `,
  ];

  @state() private _config?: AcTileConfig;

  @query("dialog.modes") private _modes?: HTMLDialogElement;

  /** The mode the popup was opened on: a different one means a choice was made. */
  private _modeAtOpen?: string;

  protected override iconTap(): boolean {
    if (!this._config?.modes_popup || !this._modes) return false;
    this._modeAtOpen = this.hass?.states[this._config.climate]?.state;
    this._modes.showModal();
    return true;
  }

  protected override updated(changed: Map<string, unknown>): void {
    super.updated?.(changed);
    // A mode picked is the whole point of the popup; it closes on its own.
    const mode = this._config ? this.hass?.states[this._config.climate]?.state : undefined;
    if (this._modes?.open && this._modeAtOpen !== undefined && mode !== this._modeAtOpen) {
      this._modes.close();
    }
  }

  private _bigKeys: string[] = ["temperature"];

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editors/ac-tile-editor");
    return document.createElement("horos-ac-tile-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<AcTileConfig> {
    return { climate: "" };
  }

  public setConfig(config: AcTileConfig): void {
    if (!config.climate) {
      throw new Error("A climate entity is required (climate)");
    }
    // Inline unless the config says otherwise: the target then shares the line
    // and the card is one row shorter than it would be with every control below.
    // A vertical card has no line to share, as on the stock tile.
    const position =
      config.features_position ?? (config.vertical ? "bottom" : "inline");
    this._bigKeys = resolveBigKeys(
      config.big_values,
      // A large value and an inline control both want the right of the line;
      // the control wins, and the room temperature becomes a word among others.
      position === "inline" ? [] : "temperature",
      AC_ROLES
    );
    this.base = { ...config, features_position: position };
    this._config = config;
  }

  /** The schedule row is a control: one layout row, never squeezed. */
  private _scheduleRows(): number {
    return this._config?.schedule?.length ? 1 : 0;
  }

  protected override fixedRows(): number {
    return this.featureRows(acFeatures(this._config)) + this._scheduleRows();
  }

  protected override contentRows(): number {
    const config = this._config;
    const rows = config?.air_rows ? airRowCount(config) : 0;
    return this.levelRows(rows) + this.fixedRows();
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const config = this._config;

    const climate = resolveRole(this.hass, config.climate);
    const roles: KeyedRole[] = AC_ROLES.map((key) => ({
      key,
      role: resolveRole(this.hass, config[key]),
    }));
    const extras = (config.sensors ?? [])
      .map((raw) => normalizeItem(raw))
      .map((sensor) => resolveRole(this.hass, sensor.entity));

    const warning = this.missingRolesWarning([
      climate,
      ...roles.map((item) => item.role),
      ...(["co2", "voc", "aqi", "pm25"] as const).map((key) =>
        resolveRole(this.hass, config[key])
      ),
      ...extras,
    ]);
    if (warning) return this.renderWarning(warning);

    const { big, rest } = splitRoles(roles, this._bigKeys);
    const airRows = config.air_rows
      ? airLevelRows(this.hass, config, airBounds(config.air_bounds))
      : [];
    // A measure with a row of its own is not repeated on the line.
    const line = config.air_rows
      ? rest.filter((item) => !(AIR_ROWS as string[]).includes(item.key))
      : rest;

    const tile = this.renderTile({
      icon: "mdi:air-conditioner",
      color: tileColor(climate?.stateObj),
      primary: cardName(config.name, climate) ?? t(this.hass, "ac.title"),
      mainEntityId: climate?.entityId,
      defaultIconAction: defaultIconAction(climate?.entityId),
      secondary: composeSegments([
        unavailableSegment(this.hass, climate),
        this.mainStateSegment(climate),
        ...line.map((item) => roleSegment(this.hass, item.role)),
        ...extras.map((extra) => roleSegment(this.hass, extra)),
      ]),
      values: this.bigValues(big),
      ownFeatures: acFeatures(config),
      customFeatures:
        airRows.length || config.schedule?.length
          ? html`<div class="ac-stack">
              ${airRows.length
                ? renderLevels(airRows, (entityId) => this.fireMoreInfo(entityId))
                : nothing}
              ${renderSchedule(this.hass, config.schedule ?? [], (entityId) =>
                this.fireMoreInfo(entityId)
              )}
            </div>`
          : undefined,
    });
    if (!config.modes_popup) return tile;
    return html`${tile}
      <dialog
        class="modes"
        @click=${(ev: MouseEvent) => {
          // A click on the backdrop lands on the dialog itself; one inside
          // lands on what it contains.
          if (ev.target === ev.currentTarget) this._modes?.close();
        }}
      >
        <hui-card-features
          .hass=${this.hass}
          .context=${{ entity_id: config.climate }}
          .color=${this.base.color}
          .features=${[{ type: "climate-hvac-modes" }]}
          .position=${"bottom"}
        ></hui-card-features>
      </dialog>`;
  }
}

registerCard("horos-ac-tile", HorosAcTile, {
  type: "horos-ac-tile",
  name: { ru: "Кондиционер", en: "Air conditioner" },
  description: {
    ru: "Климатический прибор, воздух в комнате и цена работы",
    en: "A climate unit, the air in the room, and what running it costs",
  },
  preview: true,
  suggest: (hass, entityId) => {
    const pool = devicePool(hass, entityId);
    const climate = byDomain(pool, "climate");
    if (!climate) return null;
    // The unit measures its own intake; the room is measured by the room's
    // sensors, and the area is what says which ones those are.
    const room = areaOf(hass, climate)
      ? sameArea(hass, climate, "sensor")
      : [];
    const roles = {
      climate,
      temperature: byClass(hass, room, "sensor", "temperature"),
      humidity: byClass(hass, room, "sensor", "humidity"),
      power: byClass(hass, pool, "sensor", "power"),
    };
    if (filled(roles) < 2) return null;
    return suggestion("custom:horos-ac-tile", roles);
  },
});

declare global {
  interface HTMLElementTagNameMap {
    "horos-ac-tile": HorosAcTile;
  }
}
