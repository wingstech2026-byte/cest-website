import type { Metadata } from "next";
import { Lock, ShieldCheck } from "lucide-react";
import { getDocuments } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { Rich } from "@/components/ui/Placeholder";
import { DocumentViewer } from "@/components/home/DocumentViewer";
import { CTABand } from "@/components/sections/Sections";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Accountability",
  description:
    "Governance and transparency at Community Engagements for Sustainable Transformation (CEST): read the CEST Constitution and see which reports will be published.",
  path: "/accountability",
});

const governance = [
  "A written constitution is the supreme document of CEST and binds all its members.",
  "Three organs run CEST: the General Membership, the Executive Management Body with an Advisory Board, and the Board of Directors.",
  "Officers are elected by secret ballot every four years, with an independent electoral committee.",
  "The Annual General Meeting appoints an external auditor or audit firm and approves the financial statements.",
  "All money raised by or on behalf of CEST may be used only to further its aims.",
  "CEST is neutral in politics, religion, race and tradition, and opposes discrimination of any kind.",
];

export default async function AccountabilityPage() {
  const docs = await getDocuments();
  const constitution = docs.find((d) => d.id === "constitution");
  const others = docs.filter((d) => d.id !== "constitution");

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Accountability matters."
        intro="Donors, partners and communities should be able to see how CEST is governed. Here is our constitution, and the reports we will publish as they become available."
        crumbs={[{ label: "About", href: "/about" }, { label: "Accountability" }]}
      />

      <section id="constitution" className="scroll-mt-24 bg-canvas py-16 sm:py-24" aria-labelledby="const-title">
        <Container className="max-w-6xl">
          <h2 id="const-title" className="mb-8 font-display text-3xl font-semibold uppercase sm:text-5xl">
            The CEST Constitution
          </h2>
          {constitution?.available && constitution.file ? (
            <>
              <p className="mb-8 max-w-3xl text-lg text-muted">{constitution.description}</p>
              <DocumentViewer file={constitution.file} title={constitution.title} />
            </>
          ) : (
            <p className="rounded-2xl border border-dashed border-sand-300 p-8 text-muted">The constitution is not available online at the moment.</p>
          )}
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24" aria-labelledby="gov-title">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ShieldCheck aria-hidden="true" className="mb-4 size-10 text-primary-700" strokeWidth={1.5} />
              <h2 id="gov-title" className="font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">
                How CEST is governed
              </h2>
            </div>
            <RevealGroup as="ul" className="space-y-4 lg:col-span-8" stagger={0.08}>
              {governance.map((g) => (
                <RevealItem as="li" key={g} className="flex gap-4 border-t border-sand-300 pt-4 text-lg">
                  <span aria-hidden="true" className="mt-3 size-2 shrink-0 rounded-full bg-primary-600" />
                  {g}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-16 sm:py-24" aria-labelledby="reports-title">
        <Container className="max-w-6xl">
          <h2 id="reports-title" className="font-display text-3xl font-semibold uppercase sm:text-4xl">
            Reports and policies
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            We publish documents only once they exist and have been approved. We do not claim financial figures that
            have not been supplied.
          </p>
          <RevealGroup as="ul" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.07}>
            {others.map((d) => (
              <RevealItem as="li" key={d.id} className="flex gap-4 rounded-2xl border border-dashed border-sand-300 bg-white/70 p-6">
                <Lock aria-hidden="true" className="mt-1 size-6 shrink-0 text-muted" />
                <div>
                  <h3 className="text-lg font-bold">{d.title}</h3>
                  <p className="mt-1 text-muted">{d.description}</p>
                  <p className="mt-2 text-sm font-semibold">
                    <Rich text={d.meta} />
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <p className="text-muted">
              Questions about governance or finances? Contact CEST and we will respond.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTABand title="Questions about how we work?" cta="Get In Touch" href="/contact" />
    </>
  );
}
