import type { ImpactStat } from "@/types";

/**
 * Impact statistics. NO figures are published until CEST supplies verified data.
 * To publish a stat, set `value` to a number (and `asOf` to a date or period):
 * the UI will then show it automatically instead of "Impact data coming soon".
 */
export const impactStats: ImpactStat[] = [
  { id: "youth-trained", label: "Young people trained", icon: "users", value: null },
  { id: "businesses-supported", label: "Businesses supported", icon: "briefcase", value: null },
  { id: "communities-reached", label: "Communities reached", icon: "home", value: null },
  { id: "volunteers", label: "Volunteers", icon: "heart-pulse", value: null },
  { id: "projects-completed", label: "Projects completed", icon: "sprout", value: null },
  { id: "women-supported", label: "Women supported", icon: "users", value: null },
  { id: "partnerships", label: "Partnerships", icon: "handshake", value: null },
];
