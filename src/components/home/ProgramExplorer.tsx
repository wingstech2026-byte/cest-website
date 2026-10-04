"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/types";
import { ProgramArt } from "@/components/ui/ProgramArt";
import { cn } from "@/lib/utils";

/**
 * Screen 5: interactive programs. Hover (or focus / tap) a program on the left and the large
 * image and description on the right change. On phones the image sits above the list.
 */
export function ProgramExplorer({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return (
    <section aria-labelledby="explorer-title" className="bg-night py-24 text-white sm:py-32">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">Programs</p>
        <h2 id="explorer-title" className="mb-14 max-w-4xl font-display text-[clamp(2rem,6vw,5.5rem)] font-semibold uppercase leading-[0.98]">
          Seven ways CEST works
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Visual panel */}
          <div className="lg:order-2 lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 lg:aspect-[4/5]">
                <AnimatePresence initial={false}>
                  <m.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.2, 0.7, 0.1, 1] }}
                  >
                    {current.image ? (
                      <Image
                        src={current.image}
                        alt={current.imageAlt ?? ""}
                        fill
                        quality={75}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <ProgramArt index={active} icon={current.icon} />
                    )}
                  </m.div>
                </AnimatePresence>
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-6 font-display text-7xl font-semibold leading-none text-white/90" aria-hidden="true">
                  {String(active + 1).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* Program list */}
          <ul className="lg:col-span-6">
            {programs.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.slug} className="border-b border-white/20 first:border-t">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex w-full items-center gap-3 py-5 text-left sm:gap-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0 h-full w-[3px] origin-top bg-accent-400 transition-transform duration-300",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span className={cn("pl-4 text-sm font-bold tabular-nums transition-colors", isActive ? "text-accent-300" : "text-white/50")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 font-display text-xl font-semibold uppercase leading-tight transition-all duration-300 sm:text-4xl",
                        isActive ? "translate-x-2 text-white" : "text-white/55 group-hover:text-white/85",
                      )}
                    >
                      {p.title}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <m.div
                        key="detail"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-14 pr-2">
                          <p className="max-w-xl text-lg leading-relaxed text-white/85">{p.summary}</p>
                          <Link
                            href={`/programs/${p.slug}`}
                            data-cursor="EXPLORE"
                            className="group/link mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-accent-300"
                          >
                            <span className="link-underline">Explore this program</span>
                            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover/link:translate-x-1" />
                          </Link>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
