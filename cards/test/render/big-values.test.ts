import { describe, expect, it } from "vitest";
import { BaseTileCard, NO_READING, type TileBaseConfig } from "../../src/core/base-tile-card";
import type { KeyedRole } from "../../src/core/big-values";

/**
 * A large value that is configured but has no reading keeps its place as a
 * dash: two computer tiles side by side must not differ in shape because one
 * of them has a broken temperature sensor.
 */
class BigCard extends BaseTileCard {
  public setConfig(config: TileBaseConfig): void {
    this.base = config;
  }
  public big(roles: KeyedRole[]) {
    return this.bigValues(roles);
  }
  protected render() {
    return null;
  }
}
customElements.define("test-big-card", BigCard);

const unavailable = {
  entityId: "sensor.ap_temp",
  stateObj: { entity_id: "sensor.ap_temp", state: "unknown", attributes: {} },
  missing: false,
  unavailable: true,
} as unknown as KeyedRole["role"];

describe("large values without a reading", () => {
  const card = document.createElement("test-big-card") as BigCard;
  card.setConfig({});
  card.hass = { states: {} } as never;

  it("a configured value with no reading is a dash with its icon", () => {
    expect(card.big([{ key: "temperature", role: unavailable }])).toEqual([
      { value: NO_READING, entityId: "sensor.ap_temp", icon: "mdi:thermometer" },
    ]);
  });

  it("a value that was never configured takes no slot", () => {
    expect(card.big([{ key: "temperature", role: undefined }])).toEqual([]);
  });
});
