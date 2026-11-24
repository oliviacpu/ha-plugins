import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../core/types";
import { registerCard } from "../core/register";
import { ensureTileInternals } from "../core/ha-internals";
import { averageColour, luminance } from "./player-colour";

export interface PlayerCardConfig {
  type: string;
  /** The media player: a TV, a room's player, a speaker. */
  entity: string;
  name?: string;
}

/** media_player supported_features bits, as in HA's MediaPlayerEntityFeature. */
const PAUSE = 1;
const VOLUME_SET = 4;
const PREVIOUS = 16;
const NEXT = 32;
const TURN_ON = 128;
const TURN_OFF = 256;
const PLAY = 16384;

const OFF_STATES = new Set(["off", "unavailable", "unknown", "standby"]);

/**
 * The stock media-control card — artwork bleeding into a colour taken from it,
 * the title, the playback buttons — with the one thing it leaves out: volume,
 * as the stock slider feature, in the same card. A TV and its soundbar are one
 * thing in the room, and their volume belongs on the card that shows the show.
 */
export class HorosPlayerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PlayerCardConfig;

  @state() private _colour?: number[];

  @state() private _ready = false;

  private _picture?: string;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editors/player-card-editor");
    return document.createElement("horos-player-card-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(hass: HomeAssistant): Partial<PlayerCardConfig> {
    const entity = Object.keys(hass.states).find((id) => id.startsWith("media_player."));
    return { entity: entity ?? "" };
  }

  public setConfig(config: PlayerCardConfig): void {
    if (!config.entity) throw new Error("A media player is required (entity)");
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  public getGridOptions() {
    return { columns: 12, rows: "auto", min_columns: 6, min_rows: 3 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // hui-card-features and the stock slider feature are registered by the
    // tile's bundle; wait for it before drawing the volume row.
    void ensureTileInternals().then((ok) => (this._ready = ok));
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const stateObj = this._config ? this.hass?.states[this._config.entity] : undefined;
    const picture = stateObj?.attributes.entity_picture as string | undefined;
    if (picture !== this._picture) {
      this._picture = picture;
      this._colour = undefined;
      if (picture) this._readColour(picture);
    }
  }

  private _readColour(picture: string): void {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (this._picture !== picture) return;
      const canvas = document.createElement("canvas");
      canvas.width = 24;
      canvas.height = 24;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      try {
        ctx.drawImage(img, 0, 0, 24, 24);
        this._colour = averageColour(ctx.getImageData(0, 0, 24, 24).data);
      } catch {
        this._colour = undefined; // a tainted canvas: no colour, the theme's stays
      }
    };
    img.src = this.hass?.hassUrl(picture) ?? picture;
  }

  private _call(service: string): void {
    if (!this.hass || !this._config) return;
    void this.hass
      .callService("media_player", service, { entity_id: this._config.entity })
      .catch(() => undefined);
  }

  private _moreInfo(): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config?.entity },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this.hass.states[this._config.entity];
    if (!stateObj) {
      return html`<ha-card><div class="warning">${this._config.entity}</div></ha-card>`;
    }
    const attrs = stateObj.attributes;
    const features = Number(attrs.supported_features ?? 0);
    const off = OFF_STATES.has(stateObj.state);
    const playing = stateObj.state === "playing";
    const picture = off ? undefined : (attrs.entity_picture as string | undefined);
    const name = this._config.name ?? (attrs.friendly_name as string) ?? this._config.entity;
    const title = off
      ? this.hass.formatEntityState(stateObj)
      : ((attrs.media_title as string) ?? this.hass.formatEntityState(stateObj));
    // The first attribute that says something: integrations put the word
    // "unknown" in an attribute they have nothing for.
    const said = (value: unknown) =>
      typeof value === "string" && value && !["unknown", "unavailable", "none"].includes(value.toLowerCase())
        ? value
        : undefined;
    const subtitle = off
      ? ""
      : (said(attrs.media_artist) ??
        said(attrs.media_series_title) ??
        said(attrs.app_name) ??
        said(attrs.source) ??
        "");
    const kindIcon =
      (attrs.icon as string) ??
      (attrs.device_class === "speaker"
        ? "mdi:speaker"
        : attrs.device_class === "receiver"
          ? "mdi:audio-video"
          : "mdi:television");

    // The colour behind the text: the artwork's when there is one; else the
    // theme's, as the stock card does; else the card's own background when off.
    const colour = this._colour;
    const bg = colour
      ? `rgb(${colour.join(",")})`
      : off
        ? "var(--card-background-color, var(--ha-card-background))"
        : "var(--primary-color)";
    const dark = colour ? luminance(colour) < 0.4 : !off;
    const fg = off && !colour ? "var(--primary-text-color)" : dark ? "#fff" : "#000";

    const button = (icon: string, label: string, service: string, show: boolean) =>
      show
        ? html`<ha-icon-button .label=${label} @click=${() => this._call(service)}>
            <ha-icon icon=${icon}></ha-icon>
          </ha-icon-button>`
        : nothing;

    return html`
      <ha-card style="--player-bg: ${bg}; --player-fg: ${fg};" class=${off ? "off" : ""}>
        ${picture
          ? html`<div
              class="art"
              style="background-image: url('${this.hass.hassUrl(picture)}')"
            ></div>`
          : html`<div class="art placeholder">
              <ha-icon icon=${kindIcon}></ha-icon>
            </div>`}
        <div class="content">
          <div class="top">
            <ha-icon class="state-icon" icon=${(attrs.icon as string) ?? "mdi:cast"}></ha-icon>
            <span class="name">${name}</span>
            <ha-icon-button class="more" .label=${name} @click=${this._moreInfo}>
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          <div class="title">${title}</div>
          ${subtitle ? html`<div class="subtitle">${subtitle}</div>` : nothing}
          <div class="controls">
            ${button(
              "mdi:power",
              "Power",
              off ? "turn_on" : "turn_off",
              Boolean(features & (off ? TURN_ON : TURN_OFF))
            )}
            ${off
              ? nothing
              : html`${button("mdi:skip-previous", "Previous", "media_previous_track", Boolean(features & PREVIOUS))}
                ${button(
                  playing ? "mdi:pause" : "mdi:play",
                  playing ? "Pause" : "Play",
                  "media_play_pause",
                  Boolean(features & (PAUSE | PLAY))
                )}
                ${button("mdi:skip-next", "Next", "media_next_track", Boolean(features & NEXT))}`}
          </div>
          ${this._ready && !off && features & VOLUME_SET
            ? html`<hui-card-features
                class="volume"
                .hass=${this.hass}
                .context=${{ entity_id: this._config.entity }}
                .features=${[{ type: "media-player-volume-slider", show_mute_button: true }]}
              ></hui-card-features>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      position: relative;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
      background: var(--player-bg);
      color: var(--player-fg);
      transition: background-color 0.6s ease;
    }

    ha-card.off {
      color: var(--primary-text-color);
    }

    /* The artwork fills the right half and fades into the card's colour, as on
       the stock media card. */
    .art {
      position: absolute;
      inset: 0 0 0 auto;
      width: 55%;
      background-size: cover;
      background-position: center;
    }

    .art::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, var(--player-bg) 0%, transparent 60%);
    }

    .art.placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.25;
      --mdc-icon-size: 72px;
    }

    .art.placeholder::before {
      display: none;
    }

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--ha-space-1, 4px);
      padding: var(--ha-space-3, 12px) var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    }

    .top {
      display: flex;
      align-items: center;
      gap: var(--ha-space-2, 8px);
      font-size: var(--ha-font-size-m, 14px);
      --mdc-icon-size: 20px;
    }

    .top .name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 0.85;
    }

    .top .more {
      margin-inline-end: calc(-1 * var(--ha-space-2, 8px));
    }

    .title {
      margin-top: var(--ha-space-2, 8px);
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .subtitle {
      font-size: var(--ha-font-size-s, 13px);
      opacity: 0.8;
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1, 4px);
      margin: var(--ha-space-2, 8px) 0 0 calc(-1 * var(--ha-space-2, 8px));
      --mdc-icon-size: 28px;
      --mdc-icon-button-size: 44px;
    }

    ha-icon-button {
      color: inherit;
    }

    /* The stock slider in the text's colour, its track a faint wash of it, so
       it reads on any artwork colour the way the buttons do. */
    .volume {
      margin-top: var(--ha-space-2, 8px);
      max-width: 62%;
      --feature-height: 36px;
      --feature-color: var(--player-fg);
      --control-slider-color: var(--player-fg);
      --control-slider-background: var(--player-fg);
      --control-slider-background-opacity: 0.25;
      --control-button-icon-color: var(--player-fg);
      --control-button-background-color: var(--player-fg);
      --control-button-background-opacity: 0.2;
    }

    .warning {
      padding: var(--ha-space-4, 16px);
    }
  `;
}

registerCard("horos-player-card", HorosPlayerCard, {
  type: "horos-player-card",
  name: { ru: "Плеер", en: "Player" },
  description: {
    ru: "Как стандартная карточка медиа — обложка, цвет, кнопки — и громкость в ней же",
    en: "Like the stock media card — artwork, colour, buttons — with the volume in the same card",
  },
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    "horos-player-card": HorosPlayerCard;
  }
}
