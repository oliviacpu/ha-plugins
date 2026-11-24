import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { Vibrant } from "node-vibrant/browser";
import type { HassEntity, HomeAssistant, LovelaceCardEditor } from "../core/types";
import { registerCard } from "../core/register";
import { ensureTileInternals } from "../core/ha-internals";
import { hex, pickColours } from "./player-colour";
import {
  cleanupMediaTitle,
  currentProgress,
  Feature,
  hasProgress,
  isActive,
  mediaControls,
  mediaDescription,
  supports,
} from "./player-media";

export interface PlayerCardConfig {
  type: string;
  /** The media player: a TV, a room's player, a speaker. */
  entity: string;
  name?: string;
}

interface Slider extends HTMLElement {
  value: number;
}

/**
 * HA's own media control card, line for line, with the one thing it leaves
 * out: a volume bar. The stock card is not extensible — no features, no slot —
 * and its markup cannot be reached from outside without reaching into its
 * shadow root, so this is a port of its render and styles (frontend:
 * src/panels/lovelace/cards/hui-media-control-card.ts) rather than a wrapper.
 * Keep it a port: any difference from the stock card other than the volume
 * is a defect. The browse and join buttons are left to the more-info dialog,
 * which the dots open.
 */
export class HorosPlayerCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PlayerCardConfig;

  @state() private _foregroundColor?: string;

  @state() private _backgroundColor?: string;

  @state() private _narrow = false;

  @state() private _veryNarrow = false;

  @state() private _cardHeight = 0;

  @state() private _marqueeActive = false;

  @state() private _marquee = false;

  @query("ha-slider.progress") private _progressBar?: Slider;

  private _image?: string;

  private _resizeObserver?: ResizeObserver;

  /** Moves the progress bar between state updates, as the stock card's controller does. */
  private _interval?: ReturnType<typeof setInterval>;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("../editors/player-card-editor");
    return document.createElement("horos-player-card-editor") as LovelaceCardEditor;
  }

  public static getStubConfig(hass: HomeAssistant): Partial<PlayerCardConfig> {
    const entity = Object.keys(hass.states).find((id) => id.startsWith("media_player."));
    return { entity: entity ?? "" };
  }

  public setConfig(config: PlayerCardConfig): void {
    if (!config.entity || config.entity.split(".")[0] !== "media_player") {
      throw new Error("Specify an entity from within the media_player domain");
    }
    this._config = config;
    void this.updateComplete.then(() => this._measureCard());
  }

  public getCardSize(): number {
    return 3;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    void ensureTileInternals().then(() => this.requestUpdate());
    if (this._config) void loadMarquee(this._config.entity).then((ok) => (this._marquee = ok));
    void this.updateComplete.then(() => this._attachObserver());
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._stopInterval();
  }

  private get _stateObj(): HassEntity | undefined {
    return this._config ? this.hass?.states[this._config.entity] : undefined;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this._stateObj;
    if (!stateObj) {
      return html`<hui-warning>${this._config.entity}</hui-warning>`;
    }
    const image = this._imageOf(stateObj);

    const imageStyle = {
      "background-image": image ? `url(${this.hass.hassUrl(image)})` : "none",
      width: `${this._cardHeight}px`,
      "background-color": this._backgroundColor || "",
    };
    const gradientStyle = {
      "background-image": `linear-gradient(to right, ${this._backgroundColor}, ${
        this._backgroundColor + "00"
      })`,
      width: `${this._cardHeight}px`,
    };

    const entityState = stateObj.state;
    const isOffState =
      !isActive(stateObj) && entityState !== "unavailable" && entityState !== "unknown";
    const isUnavailable =
      entityState === "unavailable" || (isOffState && !supports(stateObj, Feature.TURN_ON));
    const hasNoImage = !image;
    const controls = mediaControls(stateObj);
    const showControls =
      !isUnavailable &&
      controls &&
      (!this._veryNarrow || isOffState || entityState === "idle" || entityState === "on");
    const showVolume =
      showControls && !isOffState && supports(stateObj, Feature.VOLUME_SET);
    const showProgress = !this._narrow && hasProgress(stateObj);

    const mediaDescriptionText = mediaDescription(stateObj);
    const mediaTitleClean = cleanupMediaTitle(stateObj.attributes.media_title as string);
    const name = this._config.name ?? stateObj.attributes.friendly_name ?? stateObj.entity_id;
    const muted = stateObj.attributes.is_volume_muted === true;

    return html`
      <ha-card>
        <div
          class="background ${classMap({
            "no-image": hasNoImage,
            off: isOffState || isUnavailable,
            unavailable: isUnavailable,
          })}"
        >
          <div
            class="color-block"
            style=${styleMap({ "background-color": this._backgroundColor || "" })}
          ></div>
          <div
            class="no-img"
            style=${styleMap({ "background-color": this._backgroundColor || "" })}
          ></div>
          <div class="image" style=${styleMap(imageStyle)}></div>
          ${hasNoImage
            ? ""
            : html`<div class="color-gradient" style=${styleMap(gradientStyle)}></div>`}
        </div>
        <div
          class="player ${classMap({
            "no-image": hasNoImage,
            narrow: this._narrow && !this._veryNarrow,
            off: isOffState || isUnavailable,
            "no-progress": this._veryNarrow || !showProgress,
            "no-controls": !showControls,
          })}"
          style=${styleMap({ color: this._foregroundColor || "" })}
        >
          <div class="top-info">
            <div class="icon-name">
              <ha-state-icon
                class="icon"
                .hass=${this.hass}
                .stateObj=${stateObj}
              ></ha-state-icon>
              <div>${name}</div>
            </div>
            <div>
              <ha-icon-button
                .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
                class="more-info"
                @click=${this._handleMoreInfo}
              >
                <ha-icon icon="mdi:dots-vertical"></ha-icon>
              </ha-icon-button>
            </div>
          </div>
          ${!isUnavailable && (mediaDescriptionText || mediaTitleClean || showControls)
            ? html`
                <div>
                  <div class="title-controls">
                    ${!mediaDescriptionText && !mediaTitleClean
                      ? ""
                      : html`
                          <div class="media-info">
                            ${this._marquee
                              ? html`<hui-marquee
                                  .text=${mediaTitleClean || mediaDescriptionText}
                                  .active=${this._marqueeActive}
                                  @mouseover=${this._marqueeMouseOver}
                                  @mouseleave=${this._marqueeMouseLeave}
                                ></hui-marquee>`
                              : html`<div class="title">
                                  ${mediaTitleClean || mediaDescriptionText}
                                </div>`}
                            ${!mediaTitleClean ? "" : mediaDescriptionText}
                          </div>
                        `}
                    ${!showControls
                      ? ""
                      : html`
                          <div class="controls">
                            <div class="start">
                              ${controls!.map(
                                (control) => html`
                                  <ha-icon-button
                                    .label=${this.hass!.localize(
                                      `ui.card.media_player.${control.action}`
                                    )}
                                    action=${control.action}
                                    @click=${this._handleClick}
                                  >
                                    <ha-icon .icon=${control.icon}></ha-icon>
                                  </ha-icon-button>
                                `
                              )}
                            </div>
                            ${showVolume
                              ? html`<div class="volume">
                                  ${supports(stateObj, Feature.VOLUME_MUTE)
                                    ? html`<ha-icon-button
                                        class="mute"
                                        .label=${this.hass.localize(
                                          "ui.card.media_player.media_volume_mute"
                                        )}
                                        @click=${this._handleMute}
                                      >
                                        <ha-icon
                                          .icon=${muted ? "mdi:volume-off" : "mdi:volume-high"}
                                        ></ha-icon>
                                      </ha-icon-button>`
                                    : html`<ha-icon
                                        class="mute"
                                        icon="mdi:volume-high"
                                      ></ha-icon>`}
                                  <ha-slider
                                    class="volume-bar"
                                    min="0"
                                    max="100"
                                    step="1"
                                    labeled
                                    .value=${Math.round(
                                      Number(stateObj.attributes.volume_level ?? 0) * 100
                                    )}
                                    style=${styleMap({
                                      "--ha-slider-indicator-color":
                                        this._foregroundColor || "var(--accent-color)",
                                    })}
                                    @change=${this._handleVolume}
                                  ></ha-slider>
                                </div>`
                              : nothing}
                          </div>
                        `}
                  </div>
                  ${!showProgress
                    ? ""
                    : html`
                        <ha-slider
                          class="progress"
                          min="0"
                          max=${Number(stateObj.attributes.media_duration) || 0}
                          step="1"
                          style=${styleMap({
                            "--ha-slider-indicator-color":
                              this._foregroundColor || "var(--accent-color)",
                            cursor: supports(stateObj, Feature.SEEK) ? "pointer" : "initial",
                          })}
                          @change=${this._handleSeek}
                        ></ha-slider>
                      `}
                </div>
              `
            : ""}
        </div>
      </ha-card>
    `;
  }

  protected firstUpdated(): void {
    void this._attachObserver();
    this._measureCard();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    const stateObj = this._stateObj;
    const image = stateObj ? this._imageOf(stateObj) : undefined;
    if (image !== this._image) {
      this._image = image;
      if (image) {
        void this._setColors(image);
      } else {
        this._foregroundColor = undefined;
        this._backgroundColor = undefined;
      }
    }
    this._writeProgress();
    this._syncInterval();
  }

  private _imageOf(stateObj: HassEntity): string | undefined {
    return (stateObj.attributes.entity_picture_local ||
      stateObj.attributes.entity_picture) as string | undefined;
  }

  private async _setColors(image: string): Promise<void> {
    try {
      const vibrant = new Vibrant(this.hass!.hassUrl(image), { colorCount: 16 });
      await vibrant.getPalette();
      const picked = pickColours(vibrant.result?.colors ?? []);
      if (this._image !== image) return;
      this._backgroundColor = picked ? hex(picked.background) : undefined;
      this._foregroundColor = picked ? hex(picked.foreground) : undefined;
    } catch {
      this._foregroundColor = undefined;
      this._backgroundColor = undefined;
    }
  }

  /** The stock controller owns the bar's value: written here, never bound, so a drag is not undone. */
  private _writeProgress(): void {
    const slider = this._progressBar;
    const stateObj = this._stateObj;
    if (!slider || !stateObj) return;
    const states = (slider as unknown as { customStates?: { has(s: string): boolean } })
      .customStates;
    if (states?.has("dragging")) return;
    slider.value = currentProgress(stateObj);
  }

  private _syncInterval(): void {
    const stateObj = this._stateObj;
    const running =
      stateObj?.state === "playing" &&
      stateObj.attributes.media_duration &&
      stateObj.attributes.media_position !== undefined;
    if (running && !this._interval) {
      this._interval = setInterval(() => this._writeProgress(), 1000);
    } else if (!running) {
      this._stopInterval();
    }
  }

  private _stopInterval(): void {
    if (this._interval) clearInterval(this._interval);
    this._interval = undefined;
  }

  private _measureCard(): void {
    const card = this.shadowRoot?.querySelector("ha-card") as HTMLElement | null;
    if (!card) return;
    this._narrow = card.offsetWidth < 350;
    this._veryNarrow = card.offsetWidth < 300;
    this._cardHeight = card.offsetHeight;
  }

  private async _attachObserver(): Promise<void> {
    if (!this._resizeObserver) {
      let timer: ReturnType<typeof setTimeout> | undefined;
      this._resizeObserver = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => this._measureCard(), 250);
      });
    }
    const card = this.shadowRoot?.querySelector("ha-card");
    if (card) this._resizeObserver.observe(card);
  }

  private _call(service: string, data: Record<string, unknown> = {}): void {
    if (!this.hass || !this._config) return;
    void this.hass
      .callService("media_player", service, { entity_id: this._config.entity, ...data })
      .catch(() => undefined);
  }

  private _handleMoreInfo(): void {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config?.entity },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleClick(ev: MouseEvent): void {
    this._call((ev.currentTarget as HTMLElement).getAttribute("action")!);
  }

  private _handleMute(): void {
    this._call("volume_mute", {
      is_volume_muted: this._stateObj?.attributes.is_volume_muted !== true,
    });
  }

  private _handleVolume(ev: Event): void {
    this._call("volume_set", { volume_level: Number((ev.target as Slider).value) / 100 });
  }

  private _handleSeek(): void {
    const stateObj = this._stateObj;
    if (!stateObj || !supports(stateObj, Feature.SEEK)) return;
    this._call("media_seek", { seek_position: this._progressBar?.value ?? 0 });
  }

  private _marqueeMouseOver(): void {
    if (!this._marqueeActive) this._marqueeActive = true;
  }

  private _marqueeMouseLeave(): void {
    if (this._marqueeActive) this._marqueeActive = false;
  }

  static styles = css`
    ha-card {
      overflow: hidden;
      height: 100%;
    }

    .background {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: filter 0.8s;
    }

    .color-block {
      background-color: var(--primary-color);
      transition: background-color 0.8s;
      width: 100%;
    }

    .color-gradient {
      position: absolute;
      background-image: linear-gradient(to right, var(--primary-color), transparent);
      height: 100%;
      right: 0;
      opacity: 1;
      transition:
        width 0.8s,
        opacity 0.8s linear 0.8s;
    }

    .image {
      background-color: var(--primary-color);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      right: 0;
      height: 100%;
      opacity: 1;
      transition:
        width 0.8s,
        background-image 0.8s,
        background-color 0.8s,
        background-size 0.8s,
        opacity 0.8s linear 0.8s;
    }

    .no-image .image {
      opacity: 0;
    }

    .no-img {
      background-color: var(--primary-color);
      background-size: initial;
      background-repeat: no-repeat;
      background-position: center center;
      padding-bottom: 0;
      position: absolute;
      right: 0;
      height: 100%;
      background-image: url("/static/images/card_media_player_bg.png");
      width: 50%;
      transition:
        opacity 0.8s,
        background-color 0.8s;
    }

    .off .image,
    .off .color-gradient {
      opacity: 0;
      transition:
        opacity 0s,
        width 0.8s;
      width: 0;
    }

    .unavailable .no-img,
    .background:not(.off):not(.no-image) .no-img {
      opacity: 0;
    }

    .player {
      position: relative;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--text-primary-color);
      transition-property: color, padding;
      transition-duration: 0.4s;
    }

    .controls {
      padding: 8px 8px 8px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: padding, color;
      transition-duration: 0.4s;
      margin-left: -12px;
      margin-inline-start: -12px;
      margin-inline-end: initial;
      padding-inline-start: 0;
      padding-inline-end: 8px;
      direction: ltr;
    }

    .controls > div {
      display: flex;
      align-items: center;
    }

    .controls > .start {
      flex-grow: 1;
    }

    .controls ha-icon-button {
      --ha-icon-button-size: 44px;
      --mdc-icon-size: 30px;
    }

    ha-icon-button[action="media_play"],
    ha-icon-button[action="media_play_pause"],
    ha-icon-button[action="media_pause"],
    ha-icon-button[action="media_stop"] {
      --ha-icon-button-size: 56px;
      --mdc-icon-size: 40px;
    }

    .top-info {
      display: flex;
      justify-content: space-between;
    }

    .icon-name {
      display: flex;
      height: fit-content;
      align-items: center;
    }

    .icon-name ha-state-icon {
      padding-right: 8px;
      padding-inline-start: initial;
      padding-inline-end: 8px;
      direction: var(--direction);
    }

    .more-info {
      position: absolute;
      top: 4px;
      right: 4px;
      inset-inline-start: initial;
      inset-inline-end: 4px;
      direction: var(--direction);
    }

    .media-info {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    hui-marquee,
    .title {
      font-size: 1.2em;
      margin: 0px 0 4px;
    }

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title-controls {
      padding-top: 16px;
    }

    ha-slider {
      --track-size: 8px;
      width: 100%;
      --ha-slider-track-color: rgba(200, 200, 200, 0.5);
    }

    ha-slider::part(thumb) {
      display: none;
    }

    /*
     * The one addition: the volume, at the end of the button row where the
     * stock card keeps its secondary buttons, drawn as its progress bar is.
     * On a card too narrow for both it wraps under the buttons.
     */
    .controls {
      flex-wrap: wrap;
    }

    .controls > .volume {
      flex: 1 1 140px;
      max-width: 50%;
      min-width: 140px;
      --mdc-icon-size: 24px;
    }

    .narrow .controls > .volume {
      max-width: none;
    }

    .volume .mute {
      flex: none;
      --ha-icon-button-size: 44px;
      --mdc-icon-size: 24px;
    }

    ha-icon.mute {
      display: flex;
      justify-content: center;
      width: 44px;
    }

    .volume-bar {
      flex: 1;
      min-width: 0;
    }

    .no-image .controls {
      padding: 0;
    }

    .off.background {
      filter: grayscale(1);
    }

    .narrow .controls,
    .no-progress .controls {
      padding-bottom: 0;
    }

    .narrow ha-icon-button {
      --ha-icon-button-size: 40px;
      --mdc-icon-size: 28px;
    }

    .narrow ha-icon-button[action="media_play"],
    .narrow ha-icon-button[action="media_play_pause"],
    .narrow ha-icon-button[action="media_pause"],
    .narrow ha-icon-button[action="media_stop"] {
      --ha-icon-button-size: 50px;
      --mdc-icon-size: 36px;
    }

    .no-progress.player:not(.no-controls) {
      padding-bottom: 0px;
    }
  `;
}

let marquee: Promise<boolean> | undefined;

/**
 * hui-marquee — the title that scrolls on hover — arrives with the stock media
 * card's own bundle; asking HA for one such card loads it. Without it the
 * title is cut with an ellipsis instead.
 */
function loadMarquee(entity: string): Promise<boolean> {
  if (customElements.get("hui-marquee")) return Promise.resolve(true);
  marquee ??= (async () => {
    const loader = (
      window as unknown as {
        loadCardHelpers?: () => Promise<{
          createCardElement?: (config: Record<string, unknown>) => HTMLElement;
        }>;
      }
    ).loadCardHelpers;
    try {
      const helpers = await loader?.();
      helpers?.createCardElement?.({ type: "media-control", entity });
    } catch {
      // Only the import matters.
    }
    return Promise.race([
      customElements.whenDefined("hui-marquee").then(() => true),
      new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000)),
    ]);
  })();
  return marquee;
}

registerCard("horos-player-card", HorosPlayerCard, {
  type: "horos-player-card",
  name: { ru: "Плеер", en: "Player" },
  description: {
    ru: "Стандартная карточка медиа с полосой громкости",
    en: "The stock media card with a volume bar",
  },
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    "horos-player-card": HorosPlayerCard;
  }
}
