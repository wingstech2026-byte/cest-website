import { BadgeCheck } from "lucide-react";
import { legalStatus } from "@/data/site";
import { getImpactStats } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { Counter } from "@/components/motion/Counter";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";

/**
 * Screen 3: large impact numbers (count up when scrolled into view). NO figures are
 * invented: until CEST supplies verified data each shows a ghosted "00+" and a
 * [ADD VERIFIED NUMBER] marker. Below: a "can I trust you?" strip of real registrations.
 */
export async function ImpactNumbers() {
  const stats = (await getImpactStats()).filter((s) => s.featured);

  return (
    <section aria-labelledby="impact-title" className="bg-canvas py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Impact</p>
              <AnimatedHeading
                id="impact-title"
                lines={["Numbers", "that matter."]}
                className="font-display text-[clamp(2rem,5.5vw,4.75rem)] font-semibold uppercase leading-[0.98]"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
                  We publish figures only once they are verified. These counters will fill in as CEST confirms its results.
                </p>
              </Reveal>
            </div>
          </div>

          <RevealGroup as="ul" className="grid grid-cols-1 border-t border-sand-300 sm:grid-cols-2 lg:col-span-8" stagger={0.12}>
            {stats.map((s, i) => (
              <RevealItem
                key={s.id}
                as="li"
                className={`border-b border-sand-300 py-10 sm:px-8 ${i % 2 === 0 ? "sm:border-r" : ""}`}
              >
                <p
                  className={`font-display text-[clamp(4rem,9vw,7.5rem)] font-semibold leading-none tabular-nums ${
                    s.value === null ? "text-sand-300" : "text-primary-700"
                  }`}
                >
                  <Counter value={s.value} />
                </p>
                <p className="mt-3 text-lg font-bold">{s.label}</p>
                {s.value === null ? (
                  <p className="mt-2 text-sm">
                    <Placeholder>[ADD VERIFIED NUMBER]</Placeholder>
                  </p>
                ) : (
                  s.asOf && <p className="mt-2 text-sm text-muted">As of {s.asOf}</p>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-20">
          <h3 className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">
            <BadgeCheck aria-hidden="true" className="size-5" />
            Registered and recognised in Sierra Leone
          </h3>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sand-300 bg-sand-300 sm:grid-cols-2 lg:grid-cols-4">
            {legalStatus.map((l) => (
              <li key={l.body} className="bg-white p-5">
                <p className="font-semibold leading-snug">{l.body}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
