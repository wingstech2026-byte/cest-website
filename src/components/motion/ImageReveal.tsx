"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.2, 0.7, 0.1, 1] as const;

/**
 * Mask reveal for large photographs: the frame wipes open (bottom to top, or
 * left to right) while the picture settles from a slight zoom. Use sparingly.
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "right";
  delay?: number;
}) {
  const hidden = direction === "up" ? "inset(100% 0% 0% 0%)" : "inset(0% 100% 0% 0%)";
  return (
    <m.div
      data-reveal
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      <m.div
        className="absolute inset-0"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 1.4, delay, ease }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
