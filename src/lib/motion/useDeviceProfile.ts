"use client";

import { useEffect, useState } from "react";

interface DeviceProfile {
  /** Viewport-based, matches Tailwind's md breakpoint. */
  isMobile: boolean;
  /** User-agent Android check — used only to trim decorative element count,
   *  never to change layout or functionality. */
  isAndroid: boolean;
}

const initial: DeviceProfile = { isMobile: false, isAndroid: false };

/**
 * Central place for the "how much decoration can this device afford"
 * question, so the transition system, ambient background, and cinematic
 * motif layer all agree on the same answer instead of each re-deriving it.
 * Starts at the safe (full) default and corrects itself after mount, same
 * hydration-safety pattern as useReducedMotion.
 */
export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(initial);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const isAndroid = /Android/i.test(navigator.userAgent);
    const update = () => setProfile({ isMobile: mq.matches, isAndroid });
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return profile;
}
