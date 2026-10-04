"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query: returns `fallback` on the server and during hydration. */
export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Heavy effects (parallax, custom cursor) only on roomy screens with a real pointer. */
export function useRichMotion() {
  const reduced = usePrefersReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
  return desktop && !reduced;
}

/** False on the server and during hydration, true afterwards (safe for portals). */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
