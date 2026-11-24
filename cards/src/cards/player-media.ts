/*
 * What the stock media card shows for a player, ported from the frontend
 * (src/data/media-player.ts) because none of it is exported: which buttons,
 * which second line, where the progress is. Kept to the stock card's rules so
 * this card and the stock one never disagree about a player. Pure, for tests.
 */
import type { HassEntity } from "../core/types";

/** media_player supported_features, as in HA's MediaPlayerEntityFeature. */
export const Feature = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  VOLUME_STEP: 1024,
  STOP: 4096,
  PLAY: 16384,
  BROWSE_MEDIA: 131072,
  GROUPING: 524288,
} as const;

export const supports = (stateObj: HassEntity, feature: number): boolean =>
  (Number(stateObj.attributes.supported_features ?? 0) & feature) !== 0;

/** HA's stateActive for a media player: everything but off, standby and no reading. */
export const isActive = (stateObj: HassEntity): boolean =>
  !["off", "standby", "unavailable", "unknown"].includes(stateObj.state);

export interface ControlButton {
  icon: string;
  action: string;
}

/**
 * The stock card's buttons (computeMediaControls without the extended ones,
 * then removeSecondaryStopControl).
 */
export function mediaControls(stateObj: HassEntity): ControlButton[] | undefined {
  const state = stateObj.state;
  if (state === "unavailable") return undefined;
  const assumed = stateObj.attributes.assumed_state === true;
  const has = (f: number) => supports(stateObj, f);

  if (!isActive(stateObj) && !assumed) {
    return has(Feature.TURN_ON) ? [{ icon: "mdi:power-standby", action: "turn_on" }] : undefined;
  }

  const buttons: ControlButton[] = [];
  const loaded = state === "playing" || state === "paused" || assumed;
  if (assumed && has(Feature.TURN_ON)) buttons.push({ icon: "mdi:power-on", action: "turn_on" });
  if (has(Feature.TURN_OFF)) {
    buttons.push({ icon: assumed ? "mdi:power-off" : "mdi:power-standby", action: "turn_off" });
  }
  if (loaded && has(Feature.PREVIOUS_TRACK)) {
    buttons.push({ icon: "mdi:skip-previous", action: "media_previous_track" });
  }
  if (!assumed && state === "on" && (has(Feature.PLAY) || has(Feature.PAUSE))) {
    buttons.push({ icon: "mdi:play-pause", action: "media_play" });
  }
  if ((assumed || state === "paused" || state === "idle") && has(Feature.PLAY)) {
    buttons.push({ icon: "mdi:play", action: "media_play" });
  }
  if ((assumed || state === "playing") && has(Feature.PAUSE)) {
    buttons.push({ icon: "mdi:pause", action: "media_pause" });
  }
  if (loaded && has(Feature.STOP)) buttons.push({ icon: "mdi:stop", action: "media_stop" });
  if (loaded && has(Feature.NEXT_TRACK)) {
    buttons.push({ icon: "mdi:skip-next", action: "media_next_track" });
  }
  if (!buttons.length) return undefined;

  // Stop is a secondary control once play or pause is there.
  if (!assumed && buttons.some((b) => b.action === "media_play" || b.action === "media_pause")) {
    return buttons.filter((b) => b.action !== "media_stop");
  }
  return buttons;
}

/** The stock card's second line: artist, playlist, series, channel or app. */
export function mediaDescription(stateObj: HassEntity): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const a = stateObj.attributes as Record<string, any>;
  switch (a.media_content_type) {
    case "music":
    case "image":
      return a.media_artist ?? "";
    case "playlist":
      return a.media_playlist || a.media_artist || "";
    case "tvshow": {
      let text = a.media_series_title ?? "";
      if (a.media_season) {
        text += ` S${a.media_season}`;
        if (a.media_episode) text += `E${a.media_episode}`;
      }
      return text;
    }
    case "channel":
      return a.media_channel ?? "";
    default:
      return a.app_name || "";
  }
}

/** A title that is a signed URL, cut to the file name, as the stock card does. */
export function cleanupMediaTitle(title?: string): string | undefined {
  if (!title) return undefined;
  const index = title.indexOf("?authSig=");
  let clean = index > 0 ? title.slice(0, index) : title;
  if (clean.startsWith("http")) clean = decodeURIComponent(clean.split("/").pop()!);
  return clean;
}

/** Seconds into the media now: the reported position plus the time since, when playing. */
export function currentProgress(stateObj: HassEntity, now = Date.now()): number {
  const position = Number(stateObj.attributes.media_position ?? 0);
  if (stateObj.state !== "playing") return position;
  const since = (now - new Date(String(stateObj.attributes.media_position_updated_at)).getTime()) / 1000;
  const progress = position + since;
  return progress < 0 ? 0 : progress;
}

export const hasProgress = (stateObj: HassEntity): boolean =>
  (stateObj.state === "playing" || stateObj.state === "paused") &&
  "media_duration" in stateObj.attributes &&
  "media_position" in stateObj.attributes;
