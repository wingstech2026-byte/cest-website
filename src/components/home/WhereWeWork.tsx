"use client";

import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { MapPin } from "lucide-react";
import type { Location } from "@/types";
import { mapSrc } from "@/data/locations";
import { Rich } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

/**
 * "Where we work". Future-ready: locations live in src/data/locations.ts with a kind
 * (base / project / community / program). Selecting a verified location re-centres the map.
 * Only Masingbi is verified; other entries are clearly marked placeholders.
 * The map loads lazily from Google Maps when this section is reached.
 */
export function WhereWeWork({ locations }: { locations: Location[] }) {
  const first = locations.find((l) => l.lat !== null) ?? locations[0];
  const [activeId, setActiveId] = useState(first.id);
  const active = locations.find((l) => l.id === activeId) ?? first;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <ul className="space-y-3 lg:col-span-4">
        {locations.map((l) => {
          const verified = l.lat !== null && l.lng !== null;
          const isActive = l.id === active.id;
          return (
            <li key={l.id}>
              <button
                type="button"
                disabled={!verified}
                onClick={() => setActiveId(l.id)}
                aria-pressed={isActive}
                className={cn(
                  "flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors",
                  isActive ? "border-primary-700 bg-primary-700 text-white" : "border-sand-300 bg-white",
                  verified ? "hover:border-primary-700" : "cursor-not-allowed border-dashed opacity-80",
                )}
              >
                <MapPin aria-hidden="true" className={cn("mt-1 size-6 shrink-0", isActive ? "text-accent-300" : "text-secondary-700")} />
                <span>
                  <span className="block text-lg font-bold">
                    <Rich text={l.name} />
                  </span>
                  <span className={cn("mt-1 block text-sm", isActive ? "text-white/85" : "text-muted")}>{l.note}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="lg:col-span-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sand-300 bg-sand-100 sm:aspect-[16/10]">
          <AnimatePresence initial={false}>
            {active.lat !== null && active.lng !== null && (
              <m.iframe
                key={active.id}
                title={`Map showing ${active.name}, Sierra Leone`}
                src={mapSrc(active.lat, active.lng, active.kind === "base" ? 9 : 12)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            )}
          </AnimatePresence>
        </div>
        <p className="mt-3 text-sm text-muted">
          The pin marks Masingbi town. More verified locations will appear here as CEST confirms them.
        </p>
      </div>
    </div>
  );
}
