import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

/** Screen 6. Story cards are placeholders: no stories are invented. Below, real photographs from CEST activities. */
const stories = [
  { id: 1, tall: true },
  { id: 2, tall: false },
  { id: 3, tall: false },
];

const moments = [
  { src: "/images/cest/quiz-hall.jpg", alt: "A packed hall seen from the organisers’ table during a CEST quiz competition", caption: "Quiz competition, Masingbi Court Barray" },
  { src: "/images/cest/refreshments.jpg", alt: "A volunteer serving refreshments to guests at a CEST event", caption: "Hospitality for participants and guests" },
  { src: "/images/cest/participants-organisers.jpg", alt: "Pupils standing with CEST organisers after the spelling bee", caption: "Participants and organisers, Spelling Bee" },
  { src: "/images/cest/farm-site-visit.jpg", alt: "CEST members walking between tall crops at a farm site", caption: "A farm-site visit" },
];

export function RealStories() {
  return (
    <section aria-labelledby="stories-title" className="bg-canvas py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Stories</p>
        <AnimatedHeading
          id="stories-title"
          lines={["Real people.", "Real communities.", "Real change."]}
          className="font-display text-[clamp(2rem,8vw,7.5rem)] font-semibold uppercase leading-[0.95]"
        />

        <ul className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {stories.map((s, i) => (
            <li key={s.id} className={s.tall ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6"}>
              <Reveal delay={i * 0.1} className="h-full">
                <Link
                  href="/news/category/community-stories"
                  data-cursor="READ"
                  className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl bg-primary-800 text-white focus-visible:outline-offset-4"
                >
                  <div aria-hidden="true" className="pattern-dots absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute -right-16 -top-16 size-72 rounded-full border border-white/15" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
                    Community story
                  </span>
                  <Camera aria-hidden="true" className="absolute right-6 top-6 size-6 text-white/50" />
                  <div className="relative p-6 sm:p-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-accent-300">
                      <Placeholder>[PHOTO]</Placeholder>
                    </p>
                    <h3 className={`font-display font-semibold leading-tight ${s.tall ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>
                      <Placeholder>[Story title]</Placeholder>
                    </h3>
                    <p className="mt-3 max-w-md text-white/85">
                      <Placeholder>[Short summary of a real story, told with the person’s consent]</Placeholder>
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 font-bold text-accent-300">
                      Read Story
                      <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          Stories will appear here once CEST shares them, with consent. We never invent stories or quotes.
        </p>

        {/* Real photographs */}
        <div className="mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-semibold uppercase sm:text-4xl">From the field</h3>
            <Link href="/gallery" data-cursor="VIEW" className="group inline-flex min-h-11 items-center gap-2 font-bold text-primary-700">
              <span className="link-underline">See the gallery</span>
              <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {moments.map((p, i) => (
              <li key={p.src} className={i % 2 === 1 ? "lg:mt-12" : ""}>
                <figure>
                  <ImageReveal className="aspect-[4/5] rounded-xl" delay={i * 0.08}>
                    <Image src={p.src} alt={p.alt} fill quality={75} sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
                  </ImageReveal>
                  <figcaption className="mt-3 text-sm text-muted">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
