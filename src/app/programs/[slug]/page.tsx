import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getProgram, getPrograms } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { ProgramCard } from "@/components/cards/Cards";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPrograms()).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return {};
  return pageMetadata({
    title: program.title,
    description: program.summary,
    path: `/programs/${program.slug}`,
    image: program.image,
  });
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary-600" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();
  const others = (await getPrograms()).filter((p) => p.slug !== program.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Program"
        title={program.title}
        intro={program.description}
        crumbs={[{ label: "Programs", href: "/programs" }, { label: program.title }]}
        image={program.image}
        imageAlt={program.imageAlt}
        imagePlaceholderLabel={program.image ? undefined : `${program.title}: photo to be added`}
        actions={
          <ButtonLink href="/donate" variant="accent" size="lg">
            Support This Program
          </ButtonLink>
        }
      />

      <Section tone="canvas">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-7 shadow-card">
            <h2 className="mb-4 text-2xl font-bold">Objectives</h2>
            <List items={program.objectives} />
          </div>
          <div className="space-y-10">
            <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-7 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">Who this program is for</h2>
              <List items={program.beneficiaries} />
            </div>
            <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-7 shadow-card">
              <h2 className="mb-4 text-2xl font-bold">Activities</h2>
              <List items={program.activities} />
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-[var(--radius-card)] border border-sand-200 bg-white p-7 shadow-card">
          <h2 className="mb-4 text-2xl font-bold">Expected outcomes</h2>
          <List items={program.outcomes} />
          <p className="mt-6 text-sm text-muted">
            Locations, dates and results for this program: <Placeholder>[ADD VERIFIED PROGRAM DETAILS]</Placeholder>
          </p>
        </div>
      </Section>

      <Section tone="green" className="py-14">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">Interested in supporting this program?</h2>
            <p className="mt-3 text-lg text-white/90">
              Work with CEST to design and deliver this program, or help fund it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/partner" variant="accent" size="lg">
              Partner With Us
            </ButtonLink>
            <ButtonLink href="/volunteer" variant="outlineLight" size="lg">
              Volunteer
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading title="Other programs" />
        <ul className="grid gap-6 md:grid-cols-3">
          {others.map((p) => (
            <li key={p.slug}>
              <ProgramCard program={p} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
