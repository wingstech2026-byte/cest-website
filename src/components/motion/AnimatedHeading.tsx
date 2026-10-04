"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.2, 0.7, 0.1, 1] as const;

/**
 * Major headings: each line slides up from behind a mask, staggered.
 * Pass the lines explicitly so the break points are art-directed.
 */
export function AnimatedHeading({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  lineClassName?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className}>
      <m.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ staggerChildren: 0.11, delayChildren: delay }}
      >
        {lines.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.1em]">
            <m.span
              data-reveal
              className={cn("block", lineClassName)}
              variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 0.85, ease } } }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  );
}
