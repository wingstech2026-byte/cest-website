import type { Metadata } from "next";
import { getImpactStats, getLocations } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { StatCard } from "@/components/cards/Cards";
import { ImpactNumbers } from "@/components/home/ImpactNumbers";
import { WhereWeWork } from "@/components/home/WhereWeWork";
import { CTABand } from "@/components/sections/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Impact",
  description: "The impact of Community Engagements for Sustainable Transformation (CEST). Verified figures will be published here as they are confirmed.",
  path: "/impact",
});

export default async function ImpactPage() {
  const [stats, locations] = await Promise.all([getImpactStats(), getLocations()]);
  const more = stats.filter((s) => !s.featured);
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Honest numbers"
        intro="We believe in honest reporting. Figures are published here only once CEST has verified them."
        crumbs={[{ label: "Impact" }]}
        image="/images/cest/community-meeting.jpg"
        imageAlt="Community members meeting under a thatched shelter"
      />

      <ImpactNumbers />

      <section className="bg-sand-100 py-20 sm:py-24" aria-labelledby="more-indicators">
        <Container className="max-w-[90rem]">
          <h2 id="more-indicators" className="mb-8 font-display text-3xl font-semibold uppercase sm:text-4xl">
            More indicators we will report
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((s) => (
              <li key={s.id}>
                <StatCard stat={s} />
              </li>
            ))}
          </ul>
          <Reveal className="mt-10 rounded-2xl border-2 border-dashed border-sand-300 bg-white/60 p-8 text-center">
            <h3 className="text-2xl font-bold">Impact data coming soon</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              As CEST collects and verifies results from its programs, they will appear here and on the homepage
              counters.
            </p>
            <p className="mt-4">
              <Placeholder>[ADD VERIFIED IMPACT DATA]</Placeholder>
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="where-we-work" aria-labelledby="where-title" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <Container className="max-w-[90rem]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Where we work</p>
          <h2 id="where-title" className="mb-10 max-w-3xl font-display text-[clamp(1.9rem,6vw,5rem)] font-semibold uppercase leading-[0.98]">
            Rooted in Masingbi, Sierra Leone
          </h2>
          <WhereWeWork locations={locations} />
        </Container>
      </section>

      <CTABand title="Help us reach more people" cta="Support Our Work" href="/donate" />
    </>
  );
}
