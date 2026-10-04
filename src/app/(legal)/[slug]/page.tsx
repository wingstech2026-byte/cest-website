import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Rich } from "@/components/ui/Placeholder";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/${page.slug}` });
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero title={page.title} intro={page.intro} crumbs={[{ label: page.title }]} />
      <Section tone="canvas">
        <div className="mx-auto max-w-3xl space-y-10">
          <p role="note" className="rounded-xl border border-dashed border-[#c99a1b] bg-[#fff9e6] p-4 text-sm text-[#5c4300]">
            <strong>Draft placeholder.</strong> This page has not yet been approved by CEST.
          </p>
          {page.sections.map((s, idx) => (
            <section key={s.heading} aria-labelledby={`legal-h-${idx}`}>
              <h2 id={`legal-h-${idx}`} className="text-2xl font-bold">
                {s.heading}
              </h2>
              <div className="mt-3 space-y-3 text-lg leading-relaxed">
                {s.body.map((b, i) => (
                  <p key={i}>
                    <Rich text={b} />
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
