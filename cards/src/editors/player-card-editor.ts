import {
  COMMON_LABELS_EN,
  COMMON_LABELS_RU,
  FormCardEditor,
  textSelector,
  type SchemaItem,
} from "./base-editor";
import { registerEditor } from "../core/register";

export class HorosPlayerCardEditor extends FormCardEditor {
  protected get schema(): SchemaItem[] {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { filter: { domain: "media_player" } } },
      },
      { name: "name", selector: textSelector },
    ];
  }

  protected get labels(): Record<string, string> {
    return this.pick({
      ru: { ...COMMON_LABELS_RU, entity: "Проигрыватель", name: "Название" },
      en: { ...COMMON_LABELS_EN, entity: "Media player", name: "Name" },
    });
  }
}

registerEditor("horos-player-card-editor", HorosPlayerCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    "horos-player-card-editor": HorosPlayerCardEditor;
  }
}
