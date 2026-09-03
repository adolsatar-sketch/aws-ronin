/**
 * Continuous scroll-linked background color. A fixed set of dark stops
 * (all within the Ronin palette — never a light color, never full
 * saturation) that the caller interpolates between per-frame based on
 * scroll progress, so the background drifts as one continuous gradient
 * instead of snapping between per-section colors.
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToCss({ r, g, b }: RGB): string {
  return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return { r: a.r + (b.r - a.r) * t, g: a.g + (b.g - a.g) * t, b: a.b + (b.b - a.b) * t };
}

/** Stops walk black -> burgundy -> charcoal-with-red -> ember-black -> back to black, all dark. */
const STOPS: RGB[] = [
  hexToRgb("#08090b"), // near-black (base)
  hexToRgb("#1c0c10"), // burgundy-black
  hexToRgb("#241417"), // charcoal with a red cast
  hexToRgb("#20090b"), // deeper red-black (ember touch)
  hexToRgb("#0a0708"), // settles back toward black
];

/**
 * @param progress 0..1 scroll progress.
 * @returns a CSS rgb() string for the current interpolated stop.
 */
export function scrollBackgroundColor(progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  const segments = STOPS.length - 1;
  const scaled = p * segments;
  const index = Math.min(segments - 1, Math.floor(scaled));
  const t = scaled - index;
  return rgbToCss(lerpRgb(STOPS[index], STOPS[index + 1], t));
}
