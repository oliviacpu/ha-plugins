import { css, html, nothing, type TemplateResult } from "lit";
import type { HassEntity, HomeAssistant } from "../core/types";
import { areaOf } from "../core/suggest";

/**
 * The modes popup of the AC tile, laid out like Home Assistant's own more-info
 * dialog for a light: a header (close, area, name), the state large with how
 * long it has been so, and one tall control in the middle — here the stock
 * `ha-control-select`, vertical, a segment per mode.
 *
 * Off is at the bottom and the modes climb from it, the way a light's slider
 * runs from off at the bottom to full at the top: what the unit does most sits
 * highest. Modes the unit doesn't offer are left out.
 */
const MODE_ORDER = ["heat_cool", "auto", "cool", "heat", "dry", "fan_only", "off"];

const MODE_ICON: Record<string, string> = {
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power",
};

/** The unit's own modes, top to bottom: the busiest first, off last. */
export function orderedModes(modes: unknown): string[] {
  const list = Array.isArray(modes) ? modes.map(String) : [];
  const known = MODE_ORDER.filter((mode) => list.includes(mode));
  const unknown = list.filter((mode) => !MODE_ORDER.includes(mode));
  // A mode we have no place for goes above off, never below it.
  return [...known.filter((m) => m !== "off"), ...unknown, ...known.filter((m) => m === "off")];
}

export function renderModesDialog(
  hass: HomeAssistant,
  stateObj: HassEntity | undefined,
  name: string,
  onClose: () => void
): TemplateResult {
  if (!stateObj) return html``;
  const modes = orderedModes(stateObj.attributes.hvac_modes);
  const areaId = areaOf(hass, stateObj.entity_id);
  const area = areaId ? hass.areas?.[areaId]?.name : undefined;
  const label = (mode: string) => hass.formatEntityState(stateObj, mode);
  return html`
    <div class="header">
      <ha-icon-button .label=${hass.localize("ui.common.close")} @click=${onClose}>
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <div class="titles">
        ${area ? html`<div class="subtitle">${area}</div>` : nothing}
        <div class="title">${name}</div>
      </div>
    </div>
    <div class="state">
      <div class="value">${hass.formatEntityState(stateObj)}</div>
      <ha-relative-time
        class="since"
        .hass=${hass}
        .datetime=${stateObj.last_changed}
        capitalize
      ></ha-relative-time>
    </div>
    <div class="control">
      <ha-control-select
        vertical
        .label=${name}
        .value=${stateObj.state}
        .options=${modes.map((mode) => ({
          value: mode,
          label: label(mode),
          icon: html`<ha-icon icon=${MODE_ICON[mode] ?? "mdi:thermostat"}></ha-icon>`,
        }))}
        style="--control-select-color: var(--state-climate-${stateObj.state}-color, var(--state-climate-active-color, var(--primary-color)));"
        @value-changed=${(ev: CustomEvent<{ value: string }>) => {
          const mode = ev.detail.value;
          if (!mode || mode === stateObj.state) return;
          void hass
            .callService("climate", "set_hvac_mode", {
              entity_id: stateObj.entity_id,
              hvac_mode: mode,
            })
            .catch(() => undefined);
        }}
      ></ha-control-select>
    </div>
  `;
}

export const modesDialogStyles = css`
  dialog.modes {
    border: none;
    padding: var(--ha-space-4, 16px) var(--ha-space-6, 24px) var(--ha-space-6, 24px);
    width: min(580px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    box-sizing: border-box;
    border-radius: var(--ha-dialog-border-radius, 24px);
    background: var(--ha-dialog-surface-background, var(--card-background-color, #fff));
    color: var(--primary-text-color);
    box-shadow: var(--dialog-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.24));
  }

  dialog.modes::backdrop {
    background: var(--ha-dialog-scrim-color, rgba(0, 0, 0, 0.32));
  }

  /* On a phone the stock dialog fills the screen; so does this one. */
  @media (max-width: 450px) {
    dialog.modes {
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      max-height: 100vh;
      margin: 0;
      border-radius: 0;
    }
  }

  dialog.modes .header {
    display: flex;
    align-items: center;
    gap: var(--ha-space-2, 8px);
    margin-inline-start: calc(-1 * var(--ha-space-3, 12px));
  }

  dialog.modes .titles {
    min-width: 0;
  }

  dialog.modes .subtitle {
    font-size: var(--ha-font-size-s, 14px);
    color: var(--secondary-text-color);
    line-height: 1.2;
  }

  dialog.modes .title {
    font-size: var(--ha-font-size-xl, 20px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  dialog.modes .state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--ha-space-6, 24px) 0 var(--ha-space-4, 16px);
  }

  dialog.modes .value {
    font-size: var(--ha-font-size-4xl, 36px);
    line-height: 1.2;
  }

  dialog.modes .since {
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  dialog.modes .control {
    display: flex;
    justify-content: center;
    padding-bottom: var(--ha-space-4, 16px);
  }

  /* The size of the stock light dialog's slider. */
  dialog.modes ha-control-select {
    height: 45vh;
    max-height: 320px;
    min-height: 200px;
    width: 130px;
    --control-select-border-radius: var(--ha-border-radius-6xl, 36px);
    --control-select-thickness: 130px;
    --mdc-icon-size: 24px;
  }
`;
