import type { ComponentType } from "react";
import { ToriiGate } from "./motifs/ToriiGate";
import { PagodaTower } from "./motifs/PagodaTower";
import { RedSunDisc } from "./motifs/RedSunDisc";
import { EnsoCircle } from "./motifs/EnsoCircle";
import { KatanaDetail } from "./motifs/KatanaDetail";
import { WaveCrest } from "./motifs/WaveCrest";
import { GeometricPattern } from "./motifs/GeometricPattern";
import { KanjiMark } from "./motifs/KanjiMark";

export type MotifAnimation = "drift" | "drift-reverse" | "breathe";

export interface MotifPlacement {
  id: string;
  Motif: ComponentType<{ className?: string }>;
  /** Tailwind position/size classes — everything except color and animation. */
  className: string;
  /** Tailwind text-color class — motifs are pure currentColor strokes/fills. */
  colorClass: string;
  /** Base opacity fed to the CSS animation via --motif-opacity. */
  opacity: number;
  animation: MotifAnimation;
  /** Parallax multiplier applied to --scroll-shift; 0 = no scroll movement. */
  scrollFactor: number;
  /** Kept even on Android — trimmed to this smaller set there, never emptied. */
  androidSafe: boolean;
  animationDelay?: string;
}

/**
 * Single source of truth for every decorative motif on the site: what it
 * is, where it sits, how it moves. Adding a new one later is just another
 * entry here (plus, if it's a new shape, one small SVG component next to
 * the others in `motifs/`) — CinematicMotifLayer itself never changes.
 */
export const motifPlacements: MotifPlacement[] = [
  {
    id: "torii-bottom-center",
    Motif: ToriiGate,
    className: "absolute bottom-[2%] left-1/2 h-[20vmax] w-[24vmax] md:h-[17vmax] md:w-[20vmax] -translate-x-1/2",
    colorClass: "text-ronin-red",
    opacity: 0.16,
    animation: "breathe",
    scrollFactor: 0.16,
    androidSafe: true,
  },
  {
    id: "pagoda-top-left",
    Motif: PagodaTower,
    className: "absolute top-[4%] left-[3%] h-[24vmax] w-[20vmax] md:h-[20vmax] md:w-[17vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.14,
    animation: "drift",
    scrollFactor: 0.12,
    androidSafe: false,
  },
  {
    id: "sun-top-right",
    Motif: RedSunDisc,
    className: "absolute top-[9%] right-[6%] h-[15vmax] w-[15vmax] md:h-[12vmax] md:w-[12vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.2,
    animation: "breathe",
    scrollFactor: 0.08,
    androidSafe: true,
  },
  {
    id: "enso-mid-left",
    Motif: EnsoCircle,
    className: "absolute top-[46%] -left-[5%] h-[19vmax] w-[19vmax] md:h-[16vmax] md:w-[16vmax] rotate-[-12deg]",
    colorClass: "text-ronin-white",
    opacity: 0.13,
    animation: "drift-reverse",
    scrollFactor: -0.22,
    androidSafe: true,
  },
  {
    id: "katana-mid-right",
    Motif: KatanaDetail,
    className: "absolute top-[34%] -right-[6%] h-[9vmax] w-[30vmax] md:h-[7vmax] md:w-[24vmax] rotate-[10deg]",
    colorClass: "text-ronin-red",
    opacity: 0.12,
    animation: "drift-reverse",
    scrollFactor: 0.2,
    androidSafe: false,
    animationDelay: "-4s",
  },
  {
    id: "wave-bottom-left",
    Motif: WaveCrest,
    className: "absolute bottom-[6%] left-[1%] h-[15vmax] w-[26vmax] md:h-[13vmax] md:w-[22vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.15,
    animation: "drift",
    scrollFactor: -0.18,
    androidSafe: true,
  },
  {
    id: "geometric-top-center",
    Motif: GeometricPattern,
    className: "absolute -top-[1%] left-[28%] h-[8vmax] w-[26vmax] md:h-[7vmax] md:w-[21vmax]",
    colorClass: "text-ronin-white",
    opacity: 0.1,
    animation: "breathe",
    scrollFactor: -0.1,
    androidSafe: false,
    animationDelay: "-2s",
  },
  {
    // 浪人 itself, in real ink-brush calligraphy — see KanjiMark.tsx for why
    // this is extracted glyph data rather than a hand-drawn stroke.
    id: "kanji-mid-right-lower",
    Motif: KanjiMark,
    className: "absolute top-[64%] -right-[7%] h-[10vmax] w-[22vmax] md:h-[9vmax] md:w-[19vmax] rotate-[-4deg]",
    colorClass: "text-ronin-red",
    opacity: 0.14,
    animation: "breathe",
    scrollFactor: 0.24,
    androidSafe: true,
    animationDelay: "-5s",
  },
];
