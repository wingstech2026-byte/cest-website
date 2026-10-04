import type { ImpactStat } from "@/types";

/**
 * Impact statistics. NO figures are published until CEST supplies verified data.
 * To publish a stat, set `value` to a number (and `asOf` to a date or period):
 * the homepage counter then animates up to it automatically instead of showing
 * "[ADD VERIFIED NUMBER]". `featured` stats appear in the big homepage numbers.
 */
export const impactStats: ImpactStat[] = [
  { id: "youth-reached", label: "Young people reached", icon: "users", value: null, featured: true },
  { id: "communities-engaged", label: "Communities engaged", icon: "home", value: null, featured: true },
  { id: "programs", label: "Programs", icon: "sprout", value: null, featured: true },
  { id: "partnerships", label: "Partnerships", icon: "handshake", value: null, featured: true },
  { id: "businesses-supported", label: "Businesses supported", icon: "briefcase", value: null },
  { id: "volunteers", label: "Volunteers", icon: "heart-pulse", value: null },
  { id: "projects-completed", label: "Projects completed", icon: "sprout", value: null },
  { id: "women-supported", label: "Women supported", icon: "users", value: null },
];
