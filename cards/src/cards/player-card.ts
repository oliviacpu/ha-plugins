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
  /** Shown when there is no artwork; the player's own icon by default. */
  icon?: string;
}

/** media_player supported_features bits, as in HA's MediaPlayerEntityFeature. */
const PAUSE = 1;
const VOLUME_SET = 4;
const VOLUME_MUTE = 8;
const SEEK = 2;
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

  /** Progress moves with the clock between state updates, as on the stock card. */
  private _tick?: ReturnType<typeof setInterval>;

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
    // As tall as what is in it, like the stock media card: a fixed minimum
    // made the slot shorter than the card, and its bottom corners spilled out.
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // ha-slider and ha-icon-button are registered by the stock cards' bundle;
    // wait for it before drawing the bars.
    void ensureTileInternals().then((ok) => (this._ready = ok));
    this._tick = setInterval(() => {
      const s = this._config ? this.hass?.states[this._config.entity] : undefined;
      if (s?.state === "playing" && s.attributes.media_duration) this.requestUpdate();
    }, 1000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._tick) clearInterval(this._tick);
    this._tick = undefined;
  }

  /** Seconds into the media now: the reported position plus the time since. */
  private _position(attrs: Record<string, unknown>, playing: boolean): number | undefined {
    const position = Number(attrs.media_position);
    if (!Number.isFinite(position)) return undefined;
    if (!playing || !attrs.media_position_updated_at) return position;
    const since = (Date.now() - new Date(String(attrs.media_position_updated_at)).getTime()) / 1000;
    return position + Math.max(0, since);
  }

  private _service(service: string, data: Record<string, unknown>): void {
    if (!this.hass || !this._config) return;
    void this.hass
      .callService("media_player", service, { entity_id: this._config.entity, ...data })
      .catch(() => undefined);
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
      this._config.icon ??
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
            ? html`<div class="volume">
                ${features & VOLUME_MUTE
                  ? html`<ha-icon-button
                      .label=${"Mute"}
                      @click=${() =>
                        this._service("volume_mute", { is_volume_muted: !attrs.is_volume_muted })}
                    >
                      <ha-icon
                        icon=${attrs.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}
                      ></ha-icon>
                    </ha-icon-button>`
                  : html`<ha-icon class="vol-icon" icon="mdi:volume-high"></ha-icon>`}
                <ha-slider
                  min="0"
                  max="100"
                  step="1"
                  .value=${Math.round(Number(attrs.volume_level ?? 0) * 100)}
                  @change=${(ev: Event) =>
                    this._service("volume_set", {
                      volume_level: Number((ev.target as HTMLInputElement).value) / 100,
                    })}
                ></ha-slider>
              </div>`
            : nothing}
        </div>
        ${this._ready && !off && Number(attrs.media_duration) > 0
          ? html`<ha-slider
              class="progress"
              min="0"
              .max=${Number(attrs.media_duration)}
              step="1"
              .value=${this._position(attrs, playing) ?? 0}
              .disabled=${!(features & SEEK)}
              @change=${(ev: Event) =>
                this._service("media_seek", {
                  seek_position: Number((ev.target as HTMLInputElement).value),
                })}
            ></ha-slider>`
          : nothing}
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      position: relative;
      overflow: hidden;
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

    /* Thin bars, styled as the stock media card styles its progress bar. */
    ha-slider {
      --track-size: 8px;
      --ha-slider-track-color: #c8c8c880;
      --ha-slider-indicator-color: var(--player-fg);
      width: 100%;
    }

    ha-slider::part(thumb) {
      display: none;
    }

    .volume {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1, 4px);
      max-width: 55%;
      margin-inline-start: calc(-1 * var(--ha-space-2, 8px));
      --mdc-icon-size: 20px;
    }

    /* Where the mute button would be, so every volume bar starts in one place. */
    .vol-icon {
      flex: none;
      display: flex;
      justify-content: center;
      /* The width HA gives an ha-icon-button. */
      width: 48px;
    }

    ha-slider.progress {
      position: relative;
      display: block;
      padding: 0 var(--ha-space-4, 16px) var(--ha-space-2, 8px);
      box-sizing: border-box;
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
