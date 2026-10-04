import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { CTABand, ImpactSection } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Impact",
  description: "The impact of Community Engagements for Sustainable Transformation (CEST). Verified figures will be published here as they are confirmed.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Our impact"
        intro="We believe in honest reporting. Figures are published here only once CEST has verified them."
        crumbs={[{ label: "Impact" }]}
      />
      <ImpactSection tone="canvas" />
      <Section tone="white">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-dashed border-sand-300 p-8 text-center">
          <h2 className="text-2xl font-bold">Impact data coming soon</h2>
          <p className="mt-3 text-muted">
            As CEST collects and verifies results from its programs, they will appear on this page, such as the number
            of young people trained, businesses supported and communities reached.
          </p>
          <p className="mt-4">
            <Placeholder>[ADD VERIFIED IMPACT DATA]</Placeholder>
          </p>
        </div>
      </Section>
      <CTABand title="Help us reach more people" cta="Support Our Work" href="/donate" />
    </>
  );
}
