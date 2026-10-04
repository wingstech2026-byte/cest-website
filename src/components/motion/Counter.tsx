"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./hooks";

/**
 * Counts up when scrolled into view. `value === null` means CEST has not supplied a
 * verified figure: it shows a muted "00" instead of a number. With reduced motion the
 * final number appears immediately.
 */
export function Counter({
  value,
  suffix = "+",
  className,
}: {
  value: number | null;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (value === null || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.2, 0.7, 0.1, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  const display = reduced && inView && value !== null ? value : shown;

  if (value === null) {
    return (
      <span ref={ref} className={className} aria-hidden="true">
        00{suffix}
      </span>
    );
  }
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {display.toLocaleString("en-GB")}
        {suffix}
      </span>
      <span className="sr-only">
        {value.toLocaleString("en-GB")}
        {suffix}
      </span>
    </span>
  );
}
