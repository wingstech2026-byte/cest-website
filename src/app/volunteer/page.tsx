import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { VolunteerForm } from "@/components/forms/Forms";

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
      />
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-bold">Why volunteer with CEST?</h2>
            <p className="mt-3 text-muted">
              Volunteers help CEST deliver training, community engagement and events. You can volunteer in Sierra Leone
              or from the diaspora. Tell us about yourself and where you would like to help, and we will be in touch.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-8">
            <h2 className="mb-6 text-2xl font-bold">Volunteer application</h2>
            <VolunteerForm />
          </div>
        </div>
      </Section>
    </>
  );
}
