"use client";

import Image, { type ImageProps } from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useRichMotion } from "./hooks";

/**
 * A photograph that drifts slightly slower than the page. Subtle on purpose.
 * Disabled on touch/small screens and for reduced motion.
 */
export function ParallaxImage({
  className,
  imageClassName,
  strength = 7,
  alt,
  ...image
}: Omit<ImageProps, "fill" | "className"> & {
  className?: string;
  imageClassName?: string;
  /** Percentage of the frame height the image travels. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <m.div className="absolute -inset-[10%]" style={rich ? { y } : undefined}>
        <Image fill alt={alt} className={cn("object-cover", imageClassName)} {...image} />
      </m.div>
    </div>
  );
}
