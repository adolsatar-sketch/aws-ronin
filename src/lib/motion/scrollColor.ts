/**
 * The five explicit stops the background walks through as the page
 * scrolls 0% -> 100%: deep black, black with a faint burgundy cast,
 * charcoal with a dark red glow at the midpoint, very dark burgundy,
 * then gradually back to black. Framer Motion's useTransform natively
 * interpolates between color strings, so these feed directly into a
 * useScroll()/useTransform() pair — see AmbientBackground.tsx — for a
 * genuinely continuous mix between stops, not a per-section snap.
 */
export const SCROLL_COLOR_STOPS = ["#0a0a0c", "#241015", "#4a181a", "#2f0b12", "#0a0a0c"] as const;
export const SCROLL_COLOR_OFFSETS = [0, 0.25, 0.5, 0.75, 1] as const;
