"use client";

import { AnimatePresence, m } from "motion/react";
import { changeWords } from "@/data/story";
import { usePrefersReducedMotion } from "@/components/motion/hooks";
import { useScrollStages } from "@/components/motion/useScrollStages";

/**
 * Screen 2: "CHANGE STARTS WITH PEOPLE." As the page scrolls through this tall section
 * the key word advances: PEOPLE → COMMUNITY → ACTION → IMPACT → TRANSFORMATION.
 * With reduced motion the five words are simply listed.
 */
export function ChangeStatement() {
  const reduced = usePrefersReducedMotion();
  const { ref, index, progress } = useScrollStages(changeWords.length);
  const current = changeWords[index];

  if (reduced) {
    return (
      <section id="change" aria-labelledby="change-title" className="bg-night px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-[90rem]">
          <h2 id="change-title" className="font-display text-[clamp(2rem,8vw,6.5rem)] font-semibold uppercase leading-none">
            Change starts with people.
          </h2>
          <ol className="mt-12 space-y-8">
            {changeWords.map((w) => (
              <li key={w.word} className="border-t border-white/20 pt-5">
                <p className="font-display text-4xl font-semibold uppercase text-accent-300">{w.word}</p>
                <p className="mt-2 max-w-xl text-lg text-white/85">{w.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="change" ref={ref} aria-labelledby="change-title" className="relative h-[340vh] bg-night text-white">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div aria-hidden="true" className="pattern-dots absolute inset-0 opacity-60" />
        <span aria-hidden="true" className="float-slow absolute -right-32 top-1/4 size-[34rem] rounded-full border border-white/10" />
        <span aria-hidden="true" className="float-slow absolute -left-40 bottom-0 size-[26rem] rounded-full border border-accent-400/20" />

        <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-8">
          {/* Screen readers get the whole sentence at once; the animation is decorative. */}
          <h2 id="change-title" className="sr-only">
            Change starts with {changeWords.map((w) => w.word.toLowerCase()).join(", ")}.
          </h2>
          <div aria-hidden="true">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">Our approach</p>
            <p className="font-display text-[clamp(2rem,6.5vw,5.5rem)] font-semibold uppercase leading-none">
              Change starts with
            </p>
            <div className="mt-2 h-[1.15em] overflow-hidden font-display text-[clamp(2rem,8.4vw,9rem)] font-semibold uppercase leading-[1.05] text-accent-300">
              <AnimatePresence mode="wait">
                <m.span
                  key={current.word}
                  className="block whitespace-nowrap"
                  initial={{ y: "60%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  {current.word}
                  <span className="text-white">.</span>
                </m.span>
              </AnimatePresence>
            </div>
            <div className="mt-8 min-h-[4.5rem] max-w-xl">
              <AnimatePresence mode="wait">
                <m.p
                  key={current.line}
                  className="text-lg leading-relaxed text-white/85 sm:text-xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {current.line}
                </m.p>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span className="whitespace-nowrap text-sm font-bold tabular-nums text-accent-300">
                {String(index + 1).padStart(2, "0")} / {String(changeWords.length).padStart(2, "0")}
              </span>
              <span className="relative block h-px w-full max-w-xs bg-white/20">
                <m.span className="absolute inset-0 origin-left bg-accent-400" style={{ scaleX: progress }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
