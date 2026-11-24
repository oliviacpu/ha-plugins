import {
  COMMON_LABELS_EN,
  COMMON_LABELS_RU,
  BaseCardEditor,
  contentSection,
  interactionsSection,
  entitySelector,
  bigValuesSelector,
  booleanSelector,
  type SchemaItem,
} from "./base-editor";
import { languageOf } from "../core/i18n";
import { registerEditor } from "../core/register";
import { acFeatures, type AcTileConfig } from "../cards/ac-tile";
import { entityIdsOf, mergeEntityList } from "../core/entity-lists";
import type { EntityItem } from "../core/entity-item";

export class HorosAcTileEditor extends BaseCardEditor {
  protected get entityField(): string | undefined {
    return "climate";
  }

  protected get schema(): SchemaItem[] {
    const lang = languageOf(this.hass);
    return [
      { name: "climate", required: true, selector: entitySelector("climate") },
      { name: "temperature", selector: entitySelector("sensor", "temperature") },
      { name: "humidity", selector: entitySelector("sensor", "humidity") },
      { name: "power", selector: entitySelector("sensor", "power") },
      { name: "co2", selector: entitySelector("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: entitySelector("sensor", "volatile_organic_compounds"),
      },
      { name: "aqi", selector: entitySelector("sensor", "aqi") },
      { name: "pm25", selector: entitySelector("sensor", "pm25") },
      { name: "air_rows", selector: booleanSelector },
      { name: "sensors", selector: { entity: { multiple: true } } },
      contentSection("climate", lang, [
        {
          name: "big_values",
          selector: bigValuesSelector([
            { value: "temperature", label: lang === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: lang === "ru" ? "Влажность" : "Humidity" },
            { value: "power", label: lang === "ru" ? "Мощность" : "Power" },
          ]),
        },
      ]),
      interactionsSection("climate", "more-info"),
    ];
  }

  protected override defaultFeatures(): Record<string, unknown>[] {
    const config = this._config as unknown as AcTileConfig | undefined;
    return acFeatures(config);
  }

  protected override defaultFeaturesPosition(): "bottom" | "inline" {
    return "inline";
  }

  protected get labels(): Record<string, string> {
    return this.pick({
      ru: {
        ...COMMON_LABELS_RU,
        name: "Название",
        climate: "Прибор",
        temperature: "Температура в комнате",
        humidity: "Влажность в комнате",
        power: "Мощность",
        co2: "CO₂",
        voc: "Летучие органические соединения",
        aqi: "Индекс качества воздуха",
        pm25: "PM2.5",
        air_rows: "Строки качества воздуха (хорошо, так себе, плохо)",
        sensors: "Что ещё сказать",
        big_values: "Крупно справа (не больше трёх)",
      },
      en: {
        ...COMMON_LABELS_EN,
        name: "Name",
        climate: "Climate entity",
        temperature: "Room temperature",
        humidity: "Room humidity",
        power: "Power",
        co2: "CO₂",
        voc: "VOCs",
        aqi: "Air quality index",
        pm25: "PM2.5",
        air_rows: "Air quality rows (good, fair, poor)",
        sensors: "What else to show",
        big_values: "Large on the right (up to three)",
      },
    });
  }

  protected override get formData(): Record<string, unknown> {
    const config = this._config ?? {};
    return {
      ...config,
      sensors: entityIdsOf(config.sensors as (EntityItem | string)[]),
    };
  }

  protected override fromForm(
    data: Record<string, unknown>
  ): Record<string, unknown> {
    return {
      ...data,
      sensors: mergeEntityList<EntityItem>(
        this._config?.sensors as (EntityItem | string)[] | undefined,
        (data.sensors as string[]) ?? []
      ),
    };
  }
}

registerEditor("horos-ac-tile-editor", HorosAcTileEditor);

declare global {
  interface HTMLElementTagNameMap {
    "horos-ac-tile-editor": HorosAcTileEditor;
  }
}
