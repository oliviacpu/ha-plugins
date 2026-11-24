/* Pure colour helpers of the player card, apart so tests can load them without a DOM. */

/** Relative luminance, 0..1 — decides whether the text over a colour is dark or light. */
export function luminance([r, g, b]: number[]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * The colour of a picture, for the card behind it: the average of its pixels,
 * leaving out the near-black and near-white ones that letterboxing and glare
 * contribute and that would drag every poster towards grey.
 */
export function averageColour(data: ArrayLike<number>): number[] | undefined {
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i + 3 < data.length; i += 4) {
    const [pr, pg, pb, pa] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (pa < 128) continue;
    const max = Math.max(pr, pg, pb), min = Math.min(pr, pg, pb);
    if (max < 24 || min > 232) continue;
    r += pr; g += pg; b += pb; n++;
  }
  if (!n) return undefined;
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
}

