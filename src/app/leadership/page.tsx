import type { Metadata } from "next";
import { leadershipGroups } from "@/data/leadership";
import { pageMetadata } from "@/lib/seo";
import { getLeadership } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { LeadershipCard } from "@/components/cards/LeadershipCard";
import { CTABand } from "@/components/sections/Sections";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

export const metadata: Metadata = pageMetadata({
  title: "Leadership",
  description:
    "The people behind the mission: the leadership structure of Community Engagements for Sustainable Transformation (CEST), covering executive management, governance bodies and corporate management.",
  path: "/leadership",
});

export default async function LeadershipPage() {
  const people = await getLeadership();
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The people behind the mission"
        intro="CEST is led by an elected executive at general membership level, supported by an Advisory Board and a Board of Directors, with a corporate management team for day-to-day operations."
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
      />

      <section className="bg-canvas py-20 sm:py-28">
        <Container className="max-w-[90rem]">
          <p className="mb-14 rounded-xl border border-dashed border-[#c99a1b] bg-[#fff9e6] p-4 text-sm text-[#5c4300]">
            Names and photos are shown only once CEST provides verified details and approves publication.{" "}
            <Placeholder>[ADD VERIFIED LEADERSHIP DETAILS]</Placeholder>
          </p>

          {leadershipGroups.map((g) => {
            const members = people.filter((p) => p.group === g.id);
            return (
              <div key={g.id} className="mb-24 last:mb-0" role="group" aria-labelledby={`g-${g.id}`}>
                <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <AnimatedHeading
                    id={`g-${g.id}`}
                    lines={[g.title]}
                    className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold uppercase leading-none lg:col-span-6"
                  />
                  <p className="text-lg text-muted lg:col-span-5 lg:col-start-8">{g.intro}</p>
                </div>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((p, i) => (
                    <li key={p.id} className={i % 3 === 1 ? "lg:mt-10" : ""}>
                      <LeadershipCard person={p} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Container>
      </section>

      <CTABand
        title="Work with CEST’s leadership"
        text="Partners and supporters are welcome to get in touch."
        cta="Get In Touch"
        href="/contact"
      />
    </>
  );
}
