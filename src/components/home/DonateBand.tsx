import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Screen 11: the donation call, a full-width band that mirrors the donate page headline. */
export function DonateBand() {
  return (
    <section aria-labelledby="donate-band-title" className="relative isolate overflow-hidden bg-secondary-800 py-28 text-white sm:py-40">
      <span aria-hidden="true" className="float-slow absolute -left-32 top-10 -z-10 size-[30rem] rounded-full border border-white/10" />
      <span aria-hidden="true" className="float-slow absolute -bottom-40 right-10 -z-10 size-[28rem] rounded-full border border-accent-400/30" />
      <span aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-50" />
      <Container className="max-w-[90rem]">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">Support CEST</p>
        <AnimatedHeading
          id="donate-band-title"
          lines={["Help build a", "better community."]}
          className="font-display text-[clamp(2.1rem,7.2vw,7rem)] font-semibold uppercase leading-[0.95]"
        />
        <Reveal delay={0.2} className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl lg:col-span-7">
            Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and
            other development activities.
          </p>
          <div className="lg:col-span-5 lg:text-right">
            <Link
              href="/donate"
              data-cursor="SUPPORT"
              className="group inline-flex min-h-16 items-center gap-3 rounded-full bg-accent-400 px-9 text-lg font-extrabold text-primary-900 transition-all hover:bg-accent-300 hover:pr-8"
            >
              Support CEST
              <ArrowRight aria-hidden="true" className="size-6 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
