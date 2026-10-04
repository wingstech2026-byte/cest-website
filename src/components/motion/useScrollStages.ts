"use client";

import { useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { useRef, useState, type RefObject } from "react";

/**
 * Maps scroll progress through a tall container to a stage index (0..count-1).
 * The container should be tall (e.g. count * 80vh) with a sticky 100vh child.
 */
export function useScrollStages(count: number): {
  ref: RefObject<HTMLDivElement | null>;
  index: number;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  return { ref, index, progress: scrollYProgress };
}
