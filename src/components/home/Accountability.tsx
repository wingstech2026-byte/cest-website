import Link from "next/link";
import { ArrowRight, Download, FileText, Lock } from "lucide-react";
import { getDocuments } from "@/lib/content";
import { Container } from "@/components/ui/Section";
import { Rich } from "@/components/ui/Placeholder";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Transparency for donor trust. Shows the constitution as an official document and lists
 * the documents CEST will publish. No financial statistics are claimed.
 */
export async function Accountability({ compact = false }: { compact?: boolean }) {
  const docs = await getDocuments();
  const [constitution, ...future] = docs;

  return (
    <section aria-labelledby="accountability-title" className="bg-sand-100 py-24 sm:py-32">
      <Container className="max-w-[90rem]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Transparency</p>
            <AnimatedHeading
              id="accountability-title"
              lines={["Accountability", "matters."]}
              className="font-display text-[clamp(1.9rem,6.5vw,5.75rem)] font-semibold uppercase leading-[0.96]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                CEST is governed by a written constitution. Funds raised are used only to further CEST’s aims, and
                the Annual General Meeting appoints an external auditor or audit firm.
              </p>
              {!compact && (
                <Link href="/accountability" className="group mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-primary-700">
                  <span className="link-underline">Governance and documents</span>
                  <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {constitution.available && constitution.file && (
              <Reveal>
                <article className="relative overflow-hidden rounded-2xl border border-sand-300 bg-white p-7 shadow-card sm:p-9">
                  <span aria-hidden="true" className="absolute -right-10 -top-10 size-44 rounded-full bg-primary-50" />
                  <FileText aria-hidden="true" className="relative size-10 text-primary-700" strokeWidth={1.5} />
                  <h3 className="relative mt-5 font-display text-3xl font-semibold">{constitution.title}</h3>
                  <p className="relative mt-3 max-w-xl text-muted">{constitution.description}</p>
                  <p className="relative mt-3 text-sm font-semibold text-muted">{constitution.meta}</p>
                  <div className="relative mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/accountability#constitution"
                      data-cursor="VIEW"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary-700 px-6 font-semibold text-white transition-colors hover:bg-primary-800"
                    >
                      Read online
                    </Link>
                    <a
                      href={constitution.file}
                      download
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-primary-700 px-6 font-semibold text-primary-700 transition-colors hover:bg-primary-50"
                    >
                      <Download aria-hidden="true" className="size-5" />
                      Download PDF
                    </a>
                  </div>
                </article>
              </Reveal>
            )}

            <RevealGroup as="ul" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.07}>
              {future.map((d) => (
                <RevealItem as="li" key={d.id} className="flex gap-3 rounded-xl border border-dashed border-sand-300 bg-white/60 p-4">
                  <Lock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted" />
                  <span>
                    <span className="block font-semibold">{d.title}</span>
                    <span className="block text-sm text-muted">
                      <Rich text={d.meta} />
                    </span>
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}
