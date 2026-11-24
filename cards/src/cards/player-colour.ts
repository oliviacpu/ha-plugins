/*
 * The colours of the player card, picked the way the stock media card picks
 * them (frontend: src/common/image/extract_color.ts), so the two read alike.
 * Pure: the swatches come from node-vibrant in the card, the choice is here,
 * where the tests can load it without a DOM.
 */

export interface ColourSwatch {
  rgb: number[];
  population: number;
}

/** The ratio the stock card wants between text and its background. */
const CONTRAST_RATIO = 4.5;

/** The summed RGB difference under which two swatches count as one colour. */
const COLOR_SIMILARITY_THRESHOLD = 150;

/** Relative luminance, 0..1. */
export function luminance([r, g, b]: number[]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(a: number[], b: number[]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * The background is the picture's most common colour; the text is the next
 * common one that stands out from it enough to read, or a near shade of one
 * that does; failing both, white or black by brightness.
 */
export function pickColours(
  swatches: ColourSwatch[]
): { background: number[]; foreground: number[] } | undefined {
  if (!swatches.length) return undefined;
  const colors = [...swatches].sort((a, b) => b.population - a.population);
  const background = colors[0].rgb;
  const readable = (rgb: number[]) => contrastRatio(background, rgb) > CONTRAST_RATIO;

  for (let i = 1; i < colors.length; i++) {
    if (readable(colors[i].rgb)) return { background, foreground: colors[i].rgb };
    for (let j = i + 1; j < colors.length; j++) {
      const diff = colors[i].rgb.reduce((sum, c, k) => sum + Math.abs(c - colors[j].rgb[k]), 0);
      if (diff <= COLOR_SIMILARITY_THRESHOLD && readable(colors[j].rgb)) {
        return { background, foreground: colors[j].rgb };
      }
    }
  }
  const [r, g, b] = background;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return { background, foreground: yiq < 200 ? [255, 255, 255] : [0, 0, 0] };
}

export const hex = (rgb: number[]): string =>
  `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
