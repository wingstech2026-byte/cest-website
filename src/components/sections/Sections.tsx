import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { objectiveGroups } from "@/data/objectives";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/** Objectives as a native <details> accordion (zero JavaScript). Presentation of Constitution Article 2(d), not new objectives. */
export function ObjectivesAccordion() {
  return (
    <div className="space-y-3">
      {objectiveGroups.map((g, i) => (
        <details key={g.id} open={i === 0} className="group rounded-2xl border border-sand-300 bg-white shadow-card">
          <summary className="flex min-h-20 items-center justify-between gap-4 rounded-2xl px-6 py-4 transition-colors hover:bg-primary-50">
            <span className="flex min-w-0 items-center gap-4 sm:gap-5">
              <span className="font-display text-2xl font-semibold text-primary-600 sm:text-3xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block text-lg font-bold sm:text-xl">{g.title}</span>
                <span className="block text-sm text-muted">{g.summary}</span>
              </span>
            </span>
            <ChevronDown aria-hidden="true" className="chevron size-6 shrink-0 text-primary-700 transition-transform" />
          </summary>
          <ul className="space-y-3 border-t border-sand-200 px-6 py-5 sm:pl-20">
            {g.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** A closing call-to-action band for inner pages. */
export function CTABand({
  title,
  text,
  cta,
  href,
  tone = "green",
}: {
  title: string;
  text?: string;
  cta: string;
  href: string;
  tone?: "green" | "blue";
}) {
  return (
    <section className={`relative isolate overflow-hidden py-20 text-white sm:py-28 ${tone === "green" ? "bg-primary-800" : "bg-secondary-800"}`}>
      <span aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-50" />
      <span aria-hidden="true" className="float-slow absolute -right-24 -top-24 -z-10 size-96 rounded-full border border-white/10" />
      <Container className="max-w-[90rem]">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[1.02]">{title}</h2>
            {text && <p className="mt-4 text-lg text-white/90 sm:text-xl">{text}</p>}
          </div>
          <Link
            href={href}
            data-cursor="GO"
            className="group inline-flex min-h-14 shrink-0 items-center gap-3 rounded-full bg-accent-400 px-8 text-lg font-extrabold text-primary-900 transition-colors hover:bg-accent-300"
          >
            {cta}
            <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
