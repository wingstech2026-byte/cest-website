import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPrograms } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { ProgramArt } from "@/components/ui/ProgramArt";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Screen 4: an editorial layout instead of icon cards. Staggered tiles with a large
 * number, image (or a designed stand-in where no real photo exists), a short description
 * and a hover state: the image expands, the title shifts, the arrow moves.
 */
export async function WhatWeDo() {
  const programs = (await getPrograms()).slice(0, 6);

  return (
    <section aria-labelledby="wwd-title" className="bg-white py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <div className="mb-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">What we do</p>
            <AnimatedHeading
              id="wwd-title"
              lines={["We build", "opportunities."]}
              className="font-display text-[clamp(1.9rem,7.6vw,7rem)] font-semibold uppercase leading-[0.95]"
            />
          </div>
          <Reveal delay={0.15} className="mt-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              From training young entrepreneurs to building peace at community level, CEST’s work is built around the
              needs of the people it serves.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <li key={p.slug} className={`min-w-0 ${i % 3 === 1 ? "lg:mt-24" : i % 3 === 2 ? "lg:mt-12" : ""}`}>
              <Reveal delay={(i % 3) * 0.08}>
                <Link
                  href={`/programs/${p.slug}`}
                  data-cursor="EXPLORE"
                  className="group block rounded-2xl p-2 transition-colors duration-300 hover:bg-primary-50 focus-visible:outline-offset-0"
                >
                  <ImageReveal className="aspect-[4/5] rounded-xl">
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.imageAlt ?? ""}
                          fill
                          quality={75}
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover"
                        />
                      ) : (
                        <ProgramArt index={i} icon={p.icon} />
                      )}
                    </div>
                    <span className="absolute left-4 top-3 font-display text-6xl font-semibold leading-none text-white drop-shadow-[0_2px_12px_rgb(0_0_0/0.45)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </ImageReveal>
                  <div className="px-2 pb-3 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="min-w-0 font-display text-2xl font-semibold uppercase leading-tight transition-transform duration-300 group-hover:translate-x-1.5 lg:text-3xl">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-7 shrink-0 text-primary-700 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </div>
                    <p className="mt-3 text-muted">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
