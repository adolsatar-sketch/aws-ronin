import { motion } from "motion/react";
import type { ComponentType, ElementType } from "react";

/**
 * `motion.create()` must not be called fresh on every render — the resulting
 * component's identity would change each time, remounting it and losing any
 * in-flight animation state. Cache by tag at module scope instead.
 *
 * Typed loosely (any props) because this wraps arbitrary host tags — the
 * call sites pass a mix of standard HTML attributes and motion props.
 */
const cache = new Map<ElementType, ComponentType<Record<string, unknown>>>();

export function getMotionTag(as: ElementType): ComponentType<Record<string, unknown>> {
  let Tag = cache.get(as);
  if (!Tag) {
    Tag = motion.create(as) as ComponentType<Record<string, unknown>>;
    cache.set(as, Tag);
  }
  return Tag;
}
