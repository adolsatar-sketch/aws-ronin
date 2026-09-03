/**
 * Tiny shared flag so the page-transition overlay never stacks on top of
 * the first-visit intro overlay. Both are full-screen covers; if a route
 * change happens in the ~2s window before the intro finishes, the intro
 * is already covering the screen and will reveal the new page underneath
 * on its own — starting a second overlay on top of it would just be two
 * animated covers fighting for the same frame budget, exactly the kind
 * of overlap that reads as a glitch on slower devices.
 */
let introActive = false;

export function setIntroActive(value: boolean) {
  introActive = value;
}

export function isIntroActive() {
  return introActive;
}
