"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import type { SocialImage } from "@/lib/data/social";

interface PostLightboxProps {
  images: SocialImage[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const MAX_SCALE = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function distance(a: PointerEvent | React.PointerEvent, b: PointerEvent | React.PointerEvent) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

/**
 * Full-size post viewer: pinch/wheel zoom, drag-to-pan while zoomed,
 * swipe-to-navigate while not zoomed, arrow-key/button navigation. Plain
 * pointer events — no gesture library — so it costs nothing on every
 * other page that never opens it (only mounted while open).
 */
export function PostLightbox({ images, index, alt, onClose, onIndexChange }: PostLightboxProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [interacting, setInteracting] = useState(false);
  const [renderedIndex, setRenderedIndex] = useState(index);

  const pointers = useRef(new Map<number, PointerEvent>());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const image = images[index];
  const total = images.length;

  const goTo = (next: number) => {
    onIndexChange(((next % total) + total) % total);
  };

  // Reset zoom/pan whenever the visible image changes — adjusted during
  // render (React's recommended pattern for resetting state on a prop
  // change) rather than in an effect, so there's no extra render pass.
  if (index !== renderedIndex) {
    setRenderedIndex(index);
    setScale(1);
    setPan({ x: 0, y: 0 });
  }

  // Lock page scroll while the lightbox is open.
  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, []);

  // Keyboard: Escape closes, arrows navigate — matched to the buttons'
  // fixed screen position (right = next, left = previous) rather than
  // reading direction, so the physical key always agrees with the button
  // in the same spot on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- goTo closes over index/total, both listed
  }, [index, total, onClose]);

  // Desktop wheel-zoom: needs a non-passive native listener so
  // preventDefault actually stops the page/backdrop from scrolling.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => clamp(s - e.deltaY * 0.0015, 1, MAX_SCALE));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const clampPan = (x: number, y: number, s: number) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const maxX = (el.clientWidth * (s - 1)) / 2;
    const maxY = (el.clientHeight * (s - 1)) / 2;
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, e.nativeEvent);

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = { dist: distance(a, b), scale };
      dragStart.current = null;
      swipeStart.current = null;
      setInteracting(true);
    } else if (pointers.current.size === 1) {
      if (scale > 1) {
        dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
        setInteracting(true);
      } else {
        swipeStart.current = { x: e.clientX, y: e.clientY };
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, e.nativeEvent);

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const ratio = distance(a, b) / (pinchStart.current.dist || 1);
      setScale(clamp(pinchStart.current.scale * ratio, 1, MAX_SCALE));
    } else if (dragStart.current) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPan(clampPan(dragStart.current.panX + dx, dragStart.current.panY + dy, scale));
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) pinchStart.current = null;

    if (dragStart.current && pointers.current.size === 0) {
      dragStart.current = null;
    }

    if (pointers.current.size === 0) setInteracting(false);

    if (swipeStart.current && pointers.current.size === 0 && scale === 1) {
      const dx = e.clientX - swipeStart.current.x;
      const dy = e.clientY - swipeStart.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        goTo(dx < 0 ? index + 1 : index - 1);
      }
      swipeStart.current = null;
    }
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPan({ x: 0, y: 0 });
    } else {
      setScale(2.2);
    }
  };

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className="fixed inset-0 z-[600] flex items-center justify-center bg-ronin-black/95 p-4 md:p-10"
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.social.lightbox.close}
          className="cursor-hover absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ronin-white/20 text-ronin-white transition-colors hover:border-ronin-red hover:text-ronin-red md:top-8 md:right-8"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
            <path d="M5 5L19 19M19 5L5 19" />
          </svg>
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index - 1);
              }}
              aria-label={t.social.lightbox.previous}
              className="cursor-hover absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ronin-white/20 text-ronin-white transition-colors hover:border-ronin-red hover:text-ronin-red md:left-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index + 1);
              }}
              aria-label={t.social.lightbox.next}
              className="cursor-hover absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ronin-white/20 text-ronin-white transition-colors hover:border-ronin-red hover:text-ronin-red md:right-6"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}

        <div
          ref={containerRef}
          className="relative flex h-full w-full items-center justify-center overflow-hidden touch-none"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onDoubleClick={toggleZoom}
        >
          <div
            className="relative"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
              transition: interacting ? "none" : "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
              cursor: scale > 1 ? "grab" : "zoom-in",
            }}
          >
            <Image
              key={image.src}
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              sizes="92vw"
              className="max-h-[82vh] w-auto max-w-[92vw] object-contain md:max-h-[85vh]"
              priority
              draggable={false}
            />
          </div>
        </div>

        {total > 1 && (
          <div
            dir="ltr"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ronin-black/70 px-3 py-1 text-xs text-ronin-mist md:bottom-6"
          >
            {index + 1} / {total}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
