import type { Metadata } from "next";
import { leadershipGroups } from "@/data/leadership";
import { pageMetadata } from "@/lib/seo";
import { getLeadership } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { PersonCard } from "@/components/cards/Cards";
import { CTABand } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Leadership",
  description:
    "The leadership structure of Community Engagements for Sustainable Transformation (CEST): executive management, governance bodies and corporate management.",
  path: "/leadership",
});

export default async function LeadershipPage() {
  const people = await getLeadership();
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Leadership & structure"
        intro="CEST is led by an elected executive at general membership level, supported by an Advisory Board and a Board of Directors, with a corporate management team for day-to-day operations."
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
      />

      <Section tone="canvas">
        <p className="mb-10 rounded-xl border border-dashed border-[#c99a1b] bg-[#fff9e6] p-4 text-sm text-[#5c4300]">
          Names and photos are shown only once CEST provides verified details and approves publication.{" "}
          <Placeholder>[ADD VERIFIED LEADERSHIP DETAILS]</Placeholder>
        </p>

        {leadershipGroups.map((g) => {
          const members = people.filter((p) => p.group === g.id);
          return (
            <div key={g.id} className="mb-16 last:mb-0" role="group" aria-labelledby={`g-${g.id}`}>
              <SectionHeading title={g.title} intro={g.intro} id={`g-${g.id}`} />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((p) => (
                  <li key={p.id}>
                    <PersonCard person={p} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Section>

      <CTABand
        title="Work with CEST’s leadership"
        text="Partners and supporters are welcome to get in touch."
        cta="Get In Touch"
        href="/contact"
      />
    </>
  );
}
