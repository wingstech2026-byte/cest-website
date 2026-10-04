import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { getPrograms } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DonationCard } from "@/components/forms/DonationCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { paymentProviders } from "@/lib/payments";

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description:
    "Support CEST. Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and other development activities in Sierra Leone.",
  path: "/donate",
});

export default async function DonatePage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Help build a better community."
        intro="Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and other development activities."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Donate" }]}
        image="/images/cest/quiz-audience-wide.jpg"
        imageAlt="Pupils, teachers and parents gathered at a CEST quiz and spelling bee competition in Masingbi"
      />

      <section className="bg-canvas py-16 sm:py-24" aria-labelledby="give-title">
        <Container className="max-w-[90rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="give-title" className="sr-only">
                Make a donation
              </h2>
              <DonationCard />
            </div>
            <aside className="space-y-6 lg:col-span-5" aria-label="About giving to CEST">
              <Reveal>
                <div className="rounded-2xl border border-sand-300 bg-white p-7">
                  <h3 className="font-display text-2xl font-semibold">Where your support goes</h3>
                  <p className="mt-3 leading-relaxed text-muted">
                    CEST’s constitution requires that all money raised by or on behalf of the organization is used only
                    to further its aims, and its accounts are reviewed by an external auditor appointed at the Annual
                    General Meeting. Support goes toward CEST’s program areas:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {programs.map((p) => (
                      <li key={p.slug} className="flex items-center gap-3">
                        <Icon name={p.icon} className="size-5 shrink-0 text-primary-700" />
                        {p.title}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted">
                    We do not claim what a particular amount achieves. Cost and outcome details will be added once
                    CEST has verified them.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl bg-primary-800 p-7 text-white">
                  <h3 className="font-display text-2xl font-semibold">Prefer to talk first?</h3>
                  <p className="mt-3 text-white/90">
                    Contact CEST to discuss a gift, a monthly pledge or a corporate partnership.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ButtonLink href="/contact" variant="accent">
                      Get In Touch
                    </ButtonLink>
                    <ButtonLink href={`mailto:${site.email}?subject=Donation%20enquiry`} variant="outlineLight">
                      Email CEST
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-20" aria-labelledby="providers-title">
        <Container className="max-w-[90rem]">
          <h2 id="providers-title" className="font-display text-3xl font-semibold uppercase sm:text-4xl">
            Payment options planned
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            The site is built so these can be connected later. None is active yet, and no payment can be made through
            this website today.
          </p>
          <RevealGroup as="ul" className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {paymentProviders.map((p) => (
              <RevealItem as="li" key={p.id} className="rounded-xl border border-sand-300 bg-white p-5 text-muted">
                <span className="block font-semibold text-ink">{p.label}</span>
                <span className="block text-sm">{p.note}</span>
                <span className="mt-2 block text-xs font-bold uppercase tracking-wide">Coming later</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
