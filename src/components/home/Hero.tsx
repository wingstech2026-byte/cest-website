import { ButtonLink } from "@/components/ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";

/**
 * Screen 1: the cinematic opener. Choreography is pure CSS (see globals.css) so it paints
 * instantly and does not wait for JavaScript:
 *   0ms background · 200ms heading · 400ms description · 600ms buttons · 800ms scroll cue.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-white"
    >
      <HeroBackdrop />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-night/80 via-night/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-[90rem] px-5 pb-20 pt-32 sm:px-8 sm:pb-24">
        <p className="hero-sub mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
          <span aria-hidden="true" className="h-px w-10 bg-accent-400" />
          Masingbi, Sierra Leone
        </p>

        <h1 id="hero-title" className="font-display text-[clamp(2.4rem,min(9.2vw,16vh),8.5rem)] font-semibold uppercase leading-[0.92] tracking-tight">
          <span className="hero-line">
            <span>Building</span>
          </span>
          <span className="hero-line">
            <span>
              a <span className="italic text-accent-300">better</span>
            </span>
          </span>
          <span className="hero-line">
            <span>community</span>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-2xl sm:leading-snug">
          Empowering young people. Strengthening communities. Creating pathways for sustainable transformation.
        </p>

        <div className="hero-cta mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/donate" variant="accent" size="lg" data-cursor="SUPPORT">
            Support Our Work
          </ButtonLink>
          <ButtonLink href="/impact" variant="outlineLight" size="lg">
            Explore Our Impact
          </ButtonLink>
        </div>
      </div>

      <a
        href="#change"
        className="hero-cue absolute bottom-6 right-5 hidden items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85 sm:flex sm:right-8"
        aria-label="Scroll to the next section"
      >
        Scroll
        <span aria-hidden="true" className="cue-line block h-14 w-px bg-white/30" />
      </a>
    </section>
  );
}
