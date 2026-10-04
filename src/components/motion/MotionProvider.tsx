"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Animation features are loaded on demand so they stay out of the initial bundle.
const loadFeatures = () => import("motion/react").then((m) => m.domAnimation);

/**
 * Wraps the app once. `reducedMotion="user"` makes motion drop transform/layout
 * animations automatically for people who prefer reduced motion.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
