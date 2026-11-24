import { describe, expect, it } from "vitest";
import { contrastRatio, hex, pickColours } from "../src/cards/player-colour";
import {
  cleanupMediaTitle,
  currentProgress,
  Feature,
  mediaControls,
  mediaDescription,
} from "../src/cards/player-media";

const player = (state: string, features: number, attributes: Record<string, unknown> = {}) => ({
  entity_id: "media_player.x",
  state,
  attributes: { supported_features: features, ...attributes },
});

const ALL =
  Feature.PAUSE | Feature.PLAY | Feature.PREVIOUS_TRACK | Feature.NEXT_TRACK |
  Feature.TURN_ON | Feature.TURN_OFF | Feature.STOP;

describe("player card colours, as the stock card picks them", () => {
  it("takes the commonest colour for the background and a readable one for the text", () => {
    const picked = pickColours([
      { rgb: [240, 240, 230], population: 5 },
      { rgb: [40, 30, 90], population: 50 },
      { rgb: [60, 50, 100], population: 20 },
    ]);
    expect(picked).toEqual({ background: [40, 30, 90], foreground: [240, 240, 230] });
  });
  it("falls back to white on a dark picture with nothing readable in it", () => {
    const picked = pickColours([
      { rgb: [40, 30, 90], population: 50 },
      { rgb: [60, 50, 100], population: 20 },
    ]);
    expect(picked?.foreground).toEqual([255, 255, 255]);
    expect(pickColours([])).toBeUndefined();
  });
  it("measures contrast and writes hex", () => {
    expect(contrastRatio([255, 255, 255], [0, 0, 0])).toBeCloseTo(21);
    expect(hex([40, 30, 255])).toBe("#281eff");
  });
});

describe("player card buttons, as the stock card shows them", () => {
  it("offers only power when off", () => {
    expect(mediaControls(player("off", ALL))).toEqual([
      { icon: "mdi:power-standby", action: "turn_on" },
    ]);
    expect(mediaControls(player("off", 0))).toBeUndefined();
    expect(mediaControls(player("unavailable", ALL))).toBeUndefined();
  });
  it("drops stop once pause is there", () => {
    expect(mediaControls(player("playing", ALL))?.map((b) => b.action)).toEqual([
      "turn_off",
      "media_previous_track",
      "media_pause",
      "media_next_track",
    ]);
  });
  it("offers play when idle, without track skipping", () => {
    expect(mediaControls(player("idle", ALL))?.map((b) => b.action)).toEqual([
      "turn_off",
      "media_play",
    ]);
  });
});

describe("player card text", () => {
  it("says the artist for music and the series for a show", () => {
    expect(mediaDescription(player("playing", 0, { media_content_type: "music", media_artist: "A" }))).toBe("A");
    expect(
      mediaDescription(
        player("playing", 0, { media_content_type: "tvshow", media_series_title: "S", media_season: 2, media_episode: 5 })
      )
    ).toBe("S S2E5");
    expect(mediaDescription(player("on", 0, { app_name: "Art Mode" }))).toBe("Art Mode");
  });
  it("cuts a signed URL title to the file name", () => {
    expect(cleanupMediaTitle("http://x/a%20b.mp3?authSig=1")).toBe("a b.mp3");
  });
  it("moves the position on while playing", () => {
    const at = "2026-11-24T12:00:00Z";
    const now = new Date(at).getTime() + 10_000;
    expect(currentProgress(player("playing", 0, { media_position: 5, media_position_updated_at: at }), now)).toBe(15);
    expect(currentProgress(player("paused", 0, { media_position: 5, media_position_updated_at: at }), now)).toBe(5);
  });
});
