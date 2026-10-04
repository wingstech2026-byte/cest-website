import type { Location } from "@/types";

/**
 * "Where we work". Only Masingbi is verified (CEST’s address and the places named in
 * its registration documents). Add further verified locations here; they appear on
 * the map automatically. Future versions can filter by kind (project / community /
 * program / impact).
 */
export const locations: Location[] = [
  {
    id: "masingbi",
    name: "Masingbi",
    lat: 8.636758,
    lng: -11.4722494,
    kind: "base",
    note: "CEST’s base: 38A Kono Road, Masingbi, Tonkolili District.",
  },
  {
    id: "placeholder-1",
    name: "[ADD VERIFIED LOCATION]",
    lat: null,
    lng: null,
    kind: "placeholder",
    note: "Project, community or program location to be confirmed by CEST.",
  },
  {
    id: "placeholder-2",
    name: "[ADD VERIFIED LOCATION]",
    lat: null,
    lng: null,
    kind: "placeholder",
    note: "Project, community or program location to be confirmed by CEST.",
  },
];

export function mapSrc(lat: number, lng: number, zoom = 11) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}
