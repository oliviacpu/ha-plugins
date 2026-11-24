import { css, html, nothing, type TemplateResult } from "lit";
import type { HomeAssistant } from "./types";

/**
 * One period of a heating schedule: when it starts and what it holds.
 *
 * `temperature` is an `input_number` (or `number`) the schedule reads; the
 * card only writes it. `time` is the `input_datetime` the period starts at and
 * is shown, not edited: a tap opens its own dialog, which has a time picker.
 */
export interface SchedulePeriod {
  temperature: string;
  time?: string;
  icon?: string;
}

const UNAVAILABLE = new Set(["unavailable", "unknown", ""]);

function numberOf(hass: HomeAssistant, entityId: string, attribute?: string): number | undefined {
  const stateObj = hass.states[entityId];
  if (!stateObj) return undefined;
  const raw = attribute ? stateObj.attributes[attribute] : stateObj.state;
  if (raw === undefined || raw === null || UNAVAILABLE.has(String(raw))) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

/** "06:00:00" → "6:00 AM" in the user's locale; undefined for no time. */
export function formatClock(hass: HomeAssistant, entityId: string | undefined): string | undefined {
  if (!entityId) return undefined;
  const raw = hass.states[entityId]?.state;
  if (!raw || UNAVAILABLE.has(raw) || !/^\d{1,2}:\d{2}/.test(raw)) return undefined;
  const [hours, minutes] = raw.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  return date.toLocaleTimeString(hass.locale?.language ?? undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** The next value a step away, kept inside the helper's own min and max. */
export function stepValue(
  value: number,
  direction: 1 | -1,
  step: number,
  min: number | undefined,
  max: number | undefined
): number {
  const next = Math.round((value + direction * step) / step) * step;
  const rounded = Number(next.toFixed(4));
  if (min !== undefined && rounded < min) return min;
  if (max !== undefined && rounded > max) return max;
  return rounded;
}

function setValue(hass: HomeAssistant, entityId: string, direction: 1 | -1): void {
  const value = numberOf(hass, entityId);
  if (value === undefined) return;
  const next = stepValue(
    value,
    direction,
    numberOf(hass, entityId, "step") ?? 1,
    numberOf(hass, entityId, "min"),
    numberOf(hass, entityId, "max")
  );
  if (next === value) return;
  void hass
    .callService(entityId.split(".")[0], "set_value", { entity_id: entityId, value: next })
    .catch(() => undefined);
}

/**
 * The periods side by side, each its start time and a stepper for its
 * temperature. A schedule is read as a row — day, then night — and two
 * steppers stacked one under the other read as two unrelated settings.
 */
export function renderSchedule(
  hass: HomeAssistant,
  periods: SchedulePeriod[],
  moreInfo: (entityId: string) => void
): TemplateResult | typeof nothing {
  if (!periods.length) return nothing;
  return html`<div class="schedule">
    ${periods.map((period) => {
      const value = numberOf(hass, period.temperature);
      const unit = hass.states[period.temperature]?.attributes.unit_of_measurement ?? "";
      const clock = formatClock(hass, period.time);
      const stop = (ev: Event) => ev.stopPropagation();
      return html`<div class="period">
        <button
          class="when"
          title=${hass.states[period.time ?? period.temperature]?.attributes.friendly_name ?? ""}
          @click=${(ev: Event) => {
            stop(ev);
            moreInfo(period.time ?? period.temperature);
          }}
        >
          ${period.icon ? html`<ha-icon icon=${period.icon}></ha-icon>` : nothing}
          ${clock ? html`<span>${clock}</span>` : nothing}
        </button>
        <div class="stepper">
          <button
            aria-label="−"
            @click=${(ev: Event) => {
              stop(ev);
              setValue(hass, period.temperature, -1);
            }}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="value">${value === undefined ? "—" : `${value}${unit}`}</span>
          <button
            aria-label="+"
            @click=${(ev: Event) => {
              stop(ev);
              setValue(hass, period.temperature, 1);
            }}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
    })}
  </div>`;
}

export const scheduleStyles = css`
  .schedule {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: var(--ha-space-2, 8px);
    /* A control row: as tall as a stock feature, never squeezed. */
    height: var(--feature-height, 42px);
    flex: none;
  }

  .schedule .period {
    display: flex;
    align-items: center;
    gap: var(--ha-space-1, 4px);
    min-width: 0;
    border-radius: var(--ha-border-radius-lg, 12px);
    background: var(--ha-color-fill-neutral-quiet-resting, rgba(0, 0, 0, 0.06));
    padding: 0 var(--ha-space-1, 4px);
  }

  .schedule button {
    display: flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: none;
    padding: 0 6px;
    height: calc(var(--feature-height, 42px) - 8px);
    font: inherit;
    color: var(--primary-text-color);
    cursor: pointer;
    border-radius: var(--ha-border-radius-md, 10px);
    --mdc-icon-size: 18px;
  }

  .schedule button:hover {
    background: var(--ha-color-fill-neutral-quiet-hover, rgba(0, 0, 0, 0.06));
  }

  .schedule .when {
    flex: 1 1 auto;
    min-width: 0;
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
  }

  .schedule .when ha-icon {
    color: var(--primary-text-color);
  }

  .schedule .stepper {
    display: flex;
    align-items: center;
    flex: none;
  }

  .schedule .value {
    min-width: 3.2em;
    text-align: center;
    font-size: var(--ha-font-size-m, 14px);
    font-weight: var(--ha-font-weight-medium, 500);
    font-variant-numeric: tabular-nums;
  }

  .ac-stack {
    display: flex;
    flex-direction: column;
    gap: var(--ha-space-2, 8px);
    height: 100%;
    min-height: 0;
  }

  .ac-stack > .levels {
    flex: 1 1 auto;
  }
`;
