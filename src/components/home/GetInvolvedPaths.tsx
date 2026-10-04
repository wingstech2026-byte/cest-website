import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Screen 10: three large paths to act. Images are real CEST photographs, used as backdrops. */
const paths = [
  {
    title: "Donate",
    text: "Give financial support to programs that empower young people and strengthen communities.",
    cta: "Donate",
    href: "/donate",
    cursor: "SUPPORT",
    image: "/images/cest/quiz-audience-wide.jpg",
    alt: "Pupils, teachers and parents at a CEST quiz competition",
  },
  {
    title: "Volunteer",
    text: "Share your skills, time and passion to help communities thrive.",
    cta: "Become a Volunteer",
    href: "/volunteer",
    cursor: "JOIN",
    image: "/images/cest/refreshments.jpg",
    alt: "A volunteer serving refreshments at a CEST event",
  },
  {
    title: "Partner",
    text: "Work with CEST to design and implement initiatives that contribute to sustainable community transformation.",
    cta: "Partner With Us",
    href: "/partner",
    cursor: "JOIN",
    image: "/images/cest/quiz-judges-panel.jpg",
    alt: "A panel table with a laptop and papers at a CEST event",
  },
];

export function GetInvolvedPaths() {
  return (
    <section aria-labelledby="involved-title" className="bg-canvas py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Get involved</p>
        <AnimatedHeading
          id="involved-title"
          lines={["There is a place", "for you here."]}
          className="mb-14 font-display text-[clamp(2rem,7vw,6.5rem)] font-semibold uppercase leading-[0.95]"
        />
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {paths.map((p, i) => (
            <li key={p.title} className="min-w-0">
              <Reveal delay={i * 0.1} className="h-full">
                <Link
                  href={p.href}
                  data-cursor={p.cursor}
                  className="group relative flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-2xl bg-night text-white lg:min-h-[38rem]"
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    quality={75}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/10 transition-opacity duration-500" />
                  <span aria-hidden="true" className="absolute left-6 top-6 font-display text-6xl font-semibold leading-none text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative p-6 sm:p-8">
                    <h3 className="font-display text-4xl font-semibold uppercase leading-none sm:text-6xl">{p.title}</h3>
                    <p className="mt-4 max-w-sm text-white/90">{p.text}</p>
                    <p className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent-400 px-6 py-3 font-bold text-primary-900 transition-colors group-hover:bg-accent-300">
                      {p.cta}
                      <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-muted">
          Prefer to belong?{" "}
          <Link href="/membership" className="font-bold text-primary-700 underline">
            Express interest in joining CEST
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
