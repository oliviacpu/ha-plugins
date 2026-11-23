import {
  BaseCardEditor,
  booleanSelector,
  contentSection,
  bigValuesSelector,
  entitySelector,
  interactionsSection,
  type SchemaItem,
} from "./base-editor";
import { languageOf } from "../core/i18n";
import { registerEditor } from "../core/register";
import { climateFeatures, type ClimateTileConfig } from "../cards/climate-tile";

export class HorosClimateTileEditor extends BaseCardEditor {
  protected get entityField(): string {
    return "temperature";
  }

  protected get schema(): SchemaItem[] {
    const lang = languageOf(this.hass);
    return [
      {
        name: "temperature",
        required: true,
        selector: entitySelector("sensor", "temperature"),
      },
      { name: "humidity", selector: entitySelector("sensor", "humidity") },
      {
        name: "illuminance",
        selector: entitySelector("sensor", "illuminance"),
      },
      { name: "pm25", selector: entitySelector("sensor", "pm25") },
      { name: "co2", selector: entitySelector("sensor", "carbon_dioxide") },
      {
        name: "voc",
        selector: entitySelector("sensor", "volatile_organic_compounds"),
      },
      { name: "aqi", selector: entitySelector("sensor", "aqi") },
      { name: "air_rows", selector: booleanSelector },
      contentSection("temperature", lang, [
        {
          name: "big_values",
          selector: bigValuesSelector([
            { value: "temperature", label: lang === "ru" ? "Температура" : "Temperature" },
            { value: "humidity", label: lang === "ru" ? "Влажность" : "Humidity" },
            { value: "illuminance", label: lang === "ru" ? "Освещённость" : "Illuminance" },
            { value: "pm25", label: "PM2.5" },
          ]),
        },
      ]),
      interactionsSection("temperature", "none"),
    ];
  }

  protected override defaultFeatures(): Record<string, unknown>[] {
    const config = this._config as unknown as ClimateTileConfig | undefined;
    return climateFeatures(this.hass, config);
  }

  protected get labels(): Record<string, string> {
    return this.pick({
      ru: {
        name: "Название",
        temperature: "Температура",
        humidity: "Влажность",
        illuminance: "Освещённость",
        pm25: "PM2.5",
        co2: "CO₂",
        voc: "Летучие органические соединения",
        aqi: "Индекс качества воздуха",
        air_rows: "Строки качества воздуха (хорошо, так себе, плохо)",
        big_values: "Крупно справа (не больше двух)",
      },
      en: {
        name: "Name",
        temperature: "Temperature",
        humidity: "Humidity",
        illuminance: "Illuminance",
        pm25: "PM2.5",
        co2: "CO₂",
        voc: "VOCs",
        aqi: "Air quality index",
        air_rows: "Air quality rows (good, fair, poor)",
        big_values: "Large on the right (up to two)",
      },
    });
  }
}

registerEditor("horos-climate-tile-editor", HorosClimateTileEditor);

declare global {
  interface HTMLElementTagNameMap {
    "horos-climate-tile-editor": HorosClimateTileEditor;
  }
}
