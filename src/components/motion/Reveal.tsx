"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.2, 0.7, 0.1, 1] as const;

/**
 * Fades and lifts content into place when it scrolls into view.
 * Animates only transform + opacity. The hidden state is applied by JS, and a
 * <noscript> rule in the layout keeps content visible if JavaScript is off.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
  amount = 0.2,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "section" | "article" | "span";
  amount?: number;
}) {
  const Cmp = m[as];
  return (
    <Cmp
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </Cmp>
  );
}

/** Staggers its <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Cmp = m[as];
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Cmp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Cmp = m[as];
  return (
    <Cmp
      data-reveal
      className={className}
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
    >
      {children}
    </Cmp>
  );
}
