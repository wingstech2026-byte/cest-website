import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPrograms } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ProgramCard } from "@/components/cards/Cards";
import { CTABand } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Programs",
  description:
    "CEST’s programs: youth empowerment, entrepreneurship, education and skills, peacebuilding, health and sanitation, research and consultancy, and community development.",
  path: "/programs",
});

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Our programs"
        intro="CEST’s work is organized around seven program areas that respond to the needs of young people and communities in Sierra Leone."
        crumbs={[{ label: "Programs" }]}
      />
      <Section tone="canvas">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <li key={p.slug}>
              <ProgramCard program={p} />
            </li>
          ))}
        </ul>
      </Section>
      <CTABand
        title="Interested in supporting a program?"
        text="Partner with CEST or make a contribution to help these programs reach more people."
        cta="Support Our Work"
        href="/donate"
      />
    </>
  );
}
