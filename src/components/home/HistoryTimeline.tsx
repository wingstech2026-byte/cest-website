"use client";

import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { timeline } from "@/data/story";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Screen 7: the story timeline. A line fills as you scroll and each year's dot lights
 * when it comes into view. Only the three facts documented in the constitution appear.
 */
export function HistoryTimeline({ tone = "canvas" }: { tone?: "canvas" | "white" }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="our-story" aria-labelledby="history-title" className={`scroll-mt-20 py-24 sm:py-32 ${tone === "white" ? "bg-white" : "bg-canvas"}`}>
      <Container className="max-w-[90rem]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Our story</p>
              <AnimatedHeading
                id="history-title"
                lines={["From a student", "association", "to CEST."]}
                className="font-display text-[clamp(2rem,5.5vw,4.75rem)] font-semibold uppercase leading-[0.98]"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                  CEST grew out of a student association formed in 2014. Today it brings together members at home and
                  in the diaspora to serve communities across Sierra Leone.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol ref={ref} className="relative space-y-20 pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-2 w-0.5 bg-sand-300 sm:left-[15px]" />
              <m.span
                aria-hidden="true"
                className="absolute bottom-0 left-[11px] top-2 w-0.5 origin-top bg-primary-600 sm:left-[15px]"
                style={{ scaleY: fill }}
              />
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <m.span
                    aria-hidden="true"
                    className="absolute -left-10 top-4 size-6 rounded-full border-4 border-canvas bg-primary-600 shadow sm:-left-14 sm:size-8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  />
                  <Reveal>
                    <p className="font-display text-[clamp(4rem,10vw,8rem)] font-semibold leading-none text-primary-700">{t.year}</p>
                    <h3 className="mt-3 text-2xl font-bold">{t.title}</h3>
                    <p className="mt-2 max-w-xl text-lg leading-relaxed text-muted">{t.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
