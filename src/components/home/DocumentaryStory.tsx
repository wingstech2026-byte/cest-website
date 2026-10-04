"use client";

import Image from "next/image";
import { AnimatePresence, m, useTransform } from "motion/react";
import { documentaryStages } from "@/data/story";
import { Rich } from "@/components/ui/Placeholder";
import { usePrefersReducedMotion } from "@/components/motion/hooks";
import { useScrollStages } from "@/components/motion/useScrollStages";

/**
 * Screen 6b: documentary-style storytelling. The photograph stays fixed while the text changes
 * as you scroll: THE CHALLENGE → THE PEOPLE → THE ACTION → THE RESULT → THE FUTURE.
 * Copy only restates documented aims; “the result” stays a placeholder until verified.
 */
export function DocumentaryStory() {
  const reduced = usePrefersReducedMotion();
  const { ref, index, progress } = useScrollStages(documentaryStages.length);
  const stage = documentaryStages[index];
  const scale = useTransform(progress, [0, 1], [1.02, 1.18]);

  const image = (
    <Image
      src="/images/cest/quiz-hall.jpg"
      alt=""
      fill
      quality={75}
      sizes="100vw"
      className="object-cover"
    />
  );

  if (reduced) {
    return (
      <section aria-labelledby="doc-title" className="relative isolate bg-night text-white">
        <div className="absolute inset-0 -z-10 opacity-35">{image}</div>
        <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
          <h2 id="doc-title" className="sr-only">
            The story of CEST’s work
          </h2>
          <ol className="space-y-16">
            {documentaryStages.map((s, i) => (
              <li key={s.label}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold leading-tight">{s.title}</p>
                <p className="mt-4 text-lg text-white/85">
                  <Rich text={s.text} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="doc-title" className="relative h-[520vh] bg-night text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <m.div className="absolute inset-0" style={{ scale }}>
          {image}
        </m.div>
        <div aria-hidden="true" className="absolute inset-0 bg-night/70" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-night/50" />

        <h2 id="doc-title" className="sr-only">
          The story of CEST’s work
        </h2>

        <div className="relative mx-auto flex h-full max-w-[90rem] flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <m.div
                key={stage.label}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
              >
                <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
                  <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px w-10 bg-accent-400" />
                  {stage.label}
                </p>
                <p className="max-w-4xl font-display text-[clamp(2.2rem,6vw,5.25rem)] font-semibold leading-[1.02]">
                  {stage.title}
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                  <Rich text={stage.text} />
                </p>
              </m.div>
            </AnimatePresence>
          </div>

          <ol aria-hidden="true" className="mt-10 flex gap-2">
            {documentaryStages.map((s, i) => (
              <li key={s.label} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                <span className={`block h-full bg-accent-400 transition-transform duration-500 origin-left ${i <= index ? "scale-x-100" : "scale-x-0"}`} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
