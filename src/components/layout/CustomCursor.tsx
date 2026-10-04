"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useRichMotion } from "@/components/motion/hooks";

/**
 * Subtle desktop-only cursor label. The normal cursor is never hidden: a small
 * bubble simply follows it while hovering elements marked with data-cursor="VIEW"
 * (or EXPLORE, SUPPORT…). Not rendered on touch devices or for reduced motion.
 */
export function CustomCursor() {
  const enabled = useRichMotion();
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setLabel(null);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]">
      <m.div style={{ x: sx, y: sy }} className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence>
          {label && (
            <m.span
              key="bubble"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.16 }}
              className="flex size-20 items-center justify-center rounded-full bg-accent-400 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-primary-900 shadow-lg"
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
