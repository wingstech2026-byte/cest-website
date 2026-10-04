import type { Metadata } from "next";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PartnerForm } from "@/components/forms/Forms";

export const metadata: Metadata = pageMetadata({
  title: "Partner With Us",
  description:
    "Work with CEST to design and implement initiatives that contribute to sustainable community transformation in Sierra Leone.",
  path: "/partner",
});

const ways = [
  "Collaborate on youth, education, entrepreneurship and peacebuilding programs",
  "Fund or co-implement donor- or government-funded projects",
  "Commission research, needs assessments or consultancy",
  "Support training for young people, SMEs and community groups",
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Partner with CEST"
        intro="Work with CEST to design and implement initiatives that contribute to sustainable community transformation."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Partner With Us" }]}
      />
      <Section tone="canvas">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold">Ways to work together</h2>
            <ul className="mt-5 space-y-3">
              {ways.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary-600" />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              CEST collaborates with development partners working toward similar goals, and is a neutral organization
              in politics, religion, race and tradition.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
            <h2 className="mb-6 text-2xl font-bold">Partnership enquiry</h2>
            <PartnerForm />
          </div>
        </div>
      </Section>
    </>
  );
}
