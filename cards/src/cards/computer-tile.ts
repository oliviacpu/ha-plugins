import { nothing } from "lit";
import { state } from "lit/decorators.js";
import { BaseTileCard, type TileBaseConfig } from "../core/base-tile-card";
import { tileStyles } from "../core/tile-styles";
import { renderLevels, levelStyles, type LevelRow } from "../core/levels";
import { tileColor } from "../core/state-color";
import {
  composeSegments,
  numericState,
  resolveRole,
  roleSegment,
  unavailableSegment,
  type ResolvedRole,
} from "../core/format";
import { levelColor, loadColor, stripDeviceName } from "../core/labels";
import { pickExtreme } from "../core/reduce";
import { resolveBigKeys, splitRoles, type KeyedRole } from "../core/big-values";
import { normalizeItem, type EntityItem } from "../core/entity-item";
import type { LovelaceCardEditor } from "../core/types";
import { registerCard } from "../core/register";
import { t } from "../core/i18n";

/** The order of roles in the secondary line. */
export const COMPUTER_ROLES = [
  "temperature",
  "cpu",
  "memory",
  "gpu",
  "disk",
] as const;

export type ComputerRole = (typeof COMPUTER_ROLES)[number];

export interface ComputerTileConfig extends TileBaseConfig {
  type: string;
  /** Whether the computer is alive: lwt, device_tracker, anything with a state. */
  status?: string;
  cpu?: string;
  memory?: string;
  gpu?: string;
  /** Every temperature sensor. The hottest one is shown. */
  temperatures?: string[];
  /** Disk partitions as per cent used. The fullest one is shown, or each one with `disk_rows`. */
  disks?: string[];
  /**
   * One bar per disk, in the order listed, instead of only the fullest. Each is
   * named after its entity, without the computer's name ("rgb Disk (C:)" shows
   * as "Disk (C:)").
   */
  disk_rows?: boolean;
  /**
   * Colour the icon by how hard the computer is working: green below
   * `load_medium` (30 %), amber below `load_high` (75 %), red above, grey when
   * the status says it's off or not reporting. The load is the busier of CPU and
   * GPU. Without this the icon takes the status entity's own colour.
   */
  color_by_load?: boolean;
  load_medium?: number;
  load_high?: number;
  /**
   * Disk partitions as per cent **free** — what the HA companion app for macOS
   * reports, for one. The one with the least free space is shown. A separate role
   * rather than the same one: confusing "used" with "free" means silently showing
   * 32% where it is really 68%.
   */
  disks_free?: string[];
  /** What else to say on the second line: who is at the computer, what is playing. */
  sensors?: (EntityItem | string)[];
  /** Binary sensors worth mentioning only once they have fired. */
  alerts?: (EntityItem | string)[];
  /** What to show large on the right. Temperature by default. */
  big_values?: ComputerRole[];
}

/**
 * A computer.
 *
 * The value is not in showing twelve temperature sensors and three disk
 * partitions, but in reducing them to one number each: how hot and how full. The
 * extreme sensor becomes an ordinary role, so a tap on the value opens exactly
 * the one that is extreme right now.
 *
 * Load is drawn as bars — the same device as ink and consumables, but with the
 * colours inverted: for load a high level is the bad one.
 */
export class HorosComputerTile extends BaseTileCard {
  static styles = [tileStyles, levelStyles];

  @state() private _config?: ComputerTileConfig;

  /** Level rows under the tile: roughly two per grid row. */
  protected override contentRows(): number {
    const disks = this._config?.disk_rows ? (this._config.disks?.length ?? 0) : 1;
    return this.levelRows(3 + Math.max(disks, 1)) + this.fixedRows();
  }

  private _bigKeys: string[] = ["temperature"];

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editors/computer-tile-editor");
    return document.createElement(
      "horos-computer-tile-editor"
    ) as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<ComputerTileConfig> {
    return { cpu: "" };
  }

  public setConfig(config: ComputerTileConfig): void {
    if (
      !config.cpu &&
      !config.memory &&
      !config.temperatures?.length &&
      !config.disks?.length &&
      !config.disks_free?.length
    ) {
      throw new Error(
        "At least one entity is required: cpu, memory, temperatures or disks"
      );
    }
    this._bigKeys = resolveBigKeys(
      config.big_values,
      "temperature",
      COMPUTER_ROLES
    );
    this.base = config;
    this._config = config;
  }

  /** The card's roles: the lists are already reduced to their extreme sensor. */
  private _roles(): KeyedRole[] {
    const config = this._config!;
    return [
      {
        key: "temperature",
        role: pickExtreme(this.hass, config.temperatures, "max"),
      },
      { key: "cpu", role: resolveRole(this.hass, config.cpu) },
      { key: "memory", role: resolveRole(this.hass, config.memory) },
      { key: "gpu", role: resolveRole(this.hass, config.gpu) },
      { key: "disk", role: pickExtreme(this.hass, config.disks, "max") },
    ];
  }

  /** The partition with the least free space left. */
  private _freeDisk(): ResolvedRole | undefined {
    return pickExtreme(this.hass, this._config?.disks_free, "min");
  }

  /**
   * With disk_rows: a bar for every listed disk, named after its entity. A full
   * disk shows in the bar's colour; a red glyph after the name is kept for the
   * drive itself reporting trouble, from the entity's `problem` attribute (with
   * `health` saying what), so a failing disk shows even when it's nearly empty.
   */
  private _diskRows(): (LevelRow | undefined)[] {
    const config = this._config!;
    return (config.disks ?? []).map((entity) => {
      const role = resolveRole(this.hass, entity);
      const attrs = role?.stateObj?.attributes ?? {};
      const name =
        stripDeviceName(attrs.friendly_name, config.name) ?? t(this.hass, "level.disk");
      const row = this._levelRow(name, role);
      if (!row) return undefined;
      const problem = attrs.problem === true || attrs.problem === "true";
      return {
        ...row,
        alarm: false,
        flag: problem ? "mdi:alert-circle" : undefined,
        flagTitle: problem ? String(attrs.health ?? "") || undefined : undefined,
      };
    });
  }

  /** The icon's colour from the load, for color_by_load. */
  private _loadTint(status: ResolvedRole | undefined, roles: KeyedRole[]): string {
    const config = this._config!;
    const offline = ["off", "not reporting", "unavailable", "unknown", "not_home"];
    const state = status?.stateObj?.state?.toLowerCase();
    if (status && (status.unavailable || status.missing || (state && offline.includes(state)))) {
      return "var(--state-unavailable-color)";
    }
    const loads = [roles[1].role, roles[3].role]
      .map((role) => numericState(role))
      .filter((v): v is number => v !== undefined);
    if (!loads.length) return "var(--state-unavailable-color)";
    const load = Math.max(...loads);
    if (load >= (config.load_high ?? 75)) return "var(--error-color, #db4437)";
    if (load >= (config.load_medium ?? 30)) return "var(--warning-color, #ffa600)";
    return "var(--success-color, #4caf50)";
  }

  private _levelRow(
    name: string,
    role: ResolvedRole | undefined
  ): LevelRow | undefined {
    if (!role) return undefined;
    const level = numericState(role);
    return {
      entityId: role.entityId,
      name,
      text:
        level === undefined
          ? t(this.hass, "value.unknown")
          : `${Math.round(level)}%`,
      ink: loadColor(level),
      level: level ?? 0,
      alarm: level !== undefined && level >= 90,
      alarmIcon: "mdi:alert-circle",
    };
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const config = this._config;

    const roles = this._roles();
    const status = resolveRole(this.hass, config.status);
    const extras = (config.sensors ?? [])
      .map((raw) => normalizeItem(raw))
      .map((sensor) => resolveRole(this.hass, sensor.entity));

    const warning = this.missingRolesWarning([
      status,
      ...roles.map((item) => item.role),
      ...extras,
    ]);
    if (warning) return this.renderWarning(warning);

    // Reboots and updates are mentioned only when they actually matter.
    const alerts = (config.alerts ?? [])
      .map((raw) => normalizeItem(raw))
      .map((alert) => ({ alert, role: resolveRole(this.hass, alert.entity) }))
      .filter(({ role }) => role?.stateObj?.state === "on")
      .map(({ alert, role }) => ({
        text:
          alert.name ??
          stripDeviceName(
            role?.stateObj?.attributes.friendly_name,
            config.name
          ) ??
          alert.entity,
        entityId: alert.entity,
      }));

    const { big } = splitRoles(roles, this._bigKeys);

    const freeDisk = this._freeDisk();
    const freeLevel = numericState(freeDisk);

    const levels = [
      this._levelRow(t(this.hass, "level.cpu"), roles[1].role),
      this._levelRow(t(this.hass, "level.memory"), roles[2].role),
      this._levelRow(t(this.hass, "level.gpu"), roles[3].role),
      ...(config.disk_rows
        ? this._diskRows()
        : [this._levelRow(t(this.hass, "level.disk"), roles[4].role)]),
      // Free space is a resource that runs out, so both the colour and the alarm
      // here behave like a battery's, not like load's.
      freeDisk
        ? {
            entityId: freeDisk.entityId,
            name: t(this.hass, "level.diskFree"),
            text:
              freeLevel === undefined
                ? t(this.hass, "value.unknown")
                : `${Math.round(freeLevel)}%`,
            ink: levelColor(freeLevel),
            level: freeLevel ?? 0,
            alarm: freeLevel !== undefined && freeLevel < 10,
            alarmIcon: "mdi:harddisk",
          }
        : undefined,
    ].filter((row): row is LevelRow => !!row);

    return this.renderTile({
      icon: "mdi:desktop-tower-monitor",
      color: config.color_by_load
        ? this._loadTint(status, roles)
        : status
          ? tileColor(status.stateObj)
          : "var(--state-icon-color)",
      primary: config.name ?? t(this.hass, "computer.title"),
      mainEntityId:
        status?.entityId ?? roles[0].role?.entityId ?? freeDisk?.entityId,
      secondary: composeSegments([
        unavailableSegment(this.hass, status),
        ...alerts,
        ...extras.map((extra) => roleSegment(this.hass, extra)),
      // Load and disks are already shown as bars with their own labels.
        ...(this._bigKeys.includes("temperature")
          ? []
          : [roleSegment(this.hass, roles[0].role)]),
      ]),
      values: this.bigValues(big),
      customFeatures: levels.length
        ? renderLevels(levels, (entityId) => this.fireMoreInfo(entityId))
        : undefined,
    });
  }
}

registerCard("horos-computer-tile", HorosComputerTile, {
  type: "horos-computer-tile",
  name: { ru: "Компьютер", en: "Computer" },
  description: {
    ru: "Самая горячая точка, загрузка и диски в одной плитке",
    en: "Hottest spot, load and disks in a single tile",
  },
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    "horos-computer-tile": HorosComputerTile;
  }
}
