import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { VolunteerWizard } from "@/components/forms/VolunteerWizard";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "Volunteer",
  description: "Share your skills, time and passion to help communities thrive. Apply to volunteer with CEST in Sierra Leone.",
  path: "/volunteer",
});

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Become a volunteer"
        intro="Share your skills, time and passion to help communities thrive."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Volunteer" }]}
        image="/images/cest/refreshments.jpg"
        imageAlt="A CEST volunteer serving refreshments to guests at an event"
      />
      <section className="bg-canvas py-16 sm:py-24">
        <Container className="max-w-[90rem]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-4">
              <Reveal className="lg:sticky lg:top-32">
                <h2 className="font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">Why volunteer with CEST?</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  Volunteers help CEST deliver training, community engagement and events. You can volunteer in Sierra
                  Leone or from the diaspora.
                </p>
                <p className="mt-4 text-muted">
                  Five short steps: tell us about yourself, your skills, where you would like to help and when you are
                  available. We will review your application and contact you.
                </p>
              </Reveal>
            </div>
            <div className="min-w-0 rounded-3xl border border-sand-300 bg-white p-5 shadow-card sm:p-10 lg:col-span-8">
              <VolunteerWizard />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
