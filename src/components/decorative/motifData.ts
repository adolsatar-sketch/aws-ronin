import type { ComponentType } from "react";
import { EnsoCircle } from "./motifs/EnsoCircle";
import { BrushStroke } from "./motifs/BrushStroke";
import { RedSunDisc } from "./motifs/RedSunDisc";
import { InkLines } from "./motifs/InkLines";
import { ToriiSilhouette } from "./motifs/ToriiSilhouette";
import { KatanaEdge } from "./motifs/KatanaEdge";
import { KanjiMark } from "./motifs/KanjiMark";
import { MountainSilhouette } from "./motifs/MountainSilhouette";

export type MotifAnimation = "drift" | "drift-reverse" | "breathe";

export interface MotifPlacement {
  id: string;
  Motif: ComponentType<{ className?: string }>;
  /** Tailwind position/size classes — everything except color and animation. */
  className: string;
  /** Tailwind text-color class at low opacity — motifs are pure currentColor strokes/fills. */
  colorClass: string;
  /** Base opacity fed to the CSS animation via --motif-opacity. */
  opacity: number;
  animation: MotifAnimation;
  /** Parallax multiplier applied to --scroll-shift; 0 = no scroll movement. */
  scrollFactor: number;
  /** Skipped entirely on Android to keep the decorative layer light there. */
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
    id: "enso-top-left",
    Motif: EnsoCircle,
    className: "absolute top-[6%] left-[4%] h-[26vmax] w-[26vmax] md:h-[20vmax] md:w-[20vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.11,
    animation: "drift",
    scrollFactor: 0.12,
    androidSafe: true,
  },
  {
    id: "brush-mid-right",
    Motif: BrushStroke,
    className: "absolute top-[22%] -right-[4%] h-[14vmax] w-[34vmax] md:h-[12vmax] md:w-[26vmax] rotate-[-8deg]",
    colorClass: "text-ronin-white",
    opacity: 0.075,
    animation: "drift-reverse",
    scrollFactor: -0.2,
    androidSafe: true,
  },
  {
    id: "sun-top-right",
    Motif: RedSunDisc,
    className: "absolute top-[10%] right-[8%] h-[16vmax] w-[16vmax] md:h-[12vmax] md:w-[12vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.10,
    animation: "breathe",
    scrollFactor: 0.08,
    androidSafe: true,
  },
  {
    id: "ink-bottom-left",
    Motif: InkLines,
    className: "absolute bottom-[4%] left-[2%] h-[30vmax] w-[24vmax] md:h-[24vmax] md:w-[20vmax]",
    colorClass: "text-ronin-red",
    opacity: 0.09,
    animation: "drift",
    scrollFactor: -0.16,
    androidSafe: false,
    animationDelay: "-14s",
  },
  {
    id: "torii-center-bottom",
    Motif: ToriiSilhouette,
    className: "absolute bottom-[-6%] left-1/2 h-[16vmax] w-[20vmax] md:h-[14vmax] md:w-[18vmax] -translate-x-1/2",
    colorClass: "text-ronin-white",
    opacity: 0.05,
    animation: "breathe",
    scrollFactor: 0.05,
    androidSafe: false,
  },
  {
    id: "katana-mid-left",
    Motif: KatanaEdge,
    className: "absolute top-[48%] -left-[6%] h-[8vmax] w-[30vmax] md:h-[6vmax] md:w-[24vmax] rotate-[6deg]",
    colorClass: "text-ronin-red",
    opacity: 0.085,
    animation: "drift-reverse",
    scrollFactor: 0.22,
    androidSafe: true,
    animationDelay: "-30s",
  },
  {
    id: "enso-bottom-right",
    Motif: EnsoCircle,
    className: "absolute bottom-[8%] right-[6%] h-[18vmax] w-[18vmax] md:h-[14vmax] md:w-[14vmax] rotate-[120deg]",
    colorClass: "text-ronin-white",
    opacity: 0.06,
    animation: "drift-reverse",
    scrollFactor: -0.1,
    androidSafe: false,
    animationDelay: "-8s",
  },
  {
    id: "brush-top-center",
    Motif: BrushStroke,
    className: "absolute -top-[2%] left-[30%] h-[10vmax] w-[28vmax] md:h-[8vmax] md:w-[22vmax] rotate-[10deg]",
    colorClass: "text-ronin-red",
    opacity: 0.07,
    animation: "drift",
    scrollFactor: -0.28,
    androidSafe: false,
    animationDelay: "-22s",
  },
  {
    // 浪人 itself, in real ink-brush calligraphy — see KanjiMark.tsx for why
    // this is extracted glyph data rather than a hand-drawn stroke.
    id: "kanji-mid-right",
    Motif: KanjiMark,
    className: "absolute top-[62%] -right-[8%] h-[10vmax] w-[22vmax] md:h-[9vmax] md:w-[19vmax] rotate-[-4deg]",
    colorClass: "text-ronin-red",
    opacity: 0.08,
    animation: "breathe",
    scrollFactor: 0.18,
    androidSafe: true,
    animationDelay: "-40s",
  },
  {
    id: "mountain-bottom-center",
    Motif: MountainSilhouette,
    className: "absolute bottom-[-2%] right-[22%] h-[10vmax] w-[16vmax] md:h-[9vmax] md:w-[14vmax]",
    colorClass: "text-ronin-white",
    opacity: 0.04,
    animation: "drift-reverse",
    scrollFactor: -0.06,
    androidSafe: false,
    animationDelay: "-16s",
  },
];
