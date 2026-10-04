import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Placeholder } from "@/components/ui/Placeholder";
import { MembershipForm } from "@/components/forms/Forms";

export const metadata: Metadata = pageMetadata({
  title: "Membership",
  description: "Express your interest in joining CEST. Membership is open to Sierra Leoneans aged 18 and over, at home and in the diaspora.",
  path: "/membership",
});

const eligibility = [
  "Be a Sierra Leonean",
  "Be 18 years of age or older",
  "Have no criminal record",
  "Be of sound mind",
];

const rights = [
  "Vote and be voted for, once registered and fully paid up",
  "Freedom of speech and opinion at meetings",
  "Attend general meetings, including the Annual General Meeting",
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Join CEST"
        intro="CEST welcomes members both at home in Sierra Leone and in the diaspora. Tell us you are interested and we will explain the next steps."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Membership" }]}
      />
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div>
              <h2 className="text-2xl font-bold">Who can join</h2>
              <ul className="mt-4 space-y-2">
                {eligibility.map((e) => (
                  <li key={e} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary-600" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Member rights</h2>
              <ul className="mt-4 space-y-2">
                {rights.map((e) => (
                  <li key={e} className="flex gap-3">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary-600" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-muted">
              Members attend regular meetings and pay agreed monthly subscriptions. Membership fees and registration
              steps: <Placeholder>[ADD MEMBERSHIP FEES AND PROCESS]</Placeholder>
            </p>
            <p className="text-muted">
              Not eligible or prefer another way to help? You can also <Link href="/volunteer" className="font-semibold text-primary-700 underline">volunteer</Link> or{" "}
              <Link href="/partner" className="font-semibold text-primary-700 underline">partner with CEST</Link>.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-7">
            <h2 className="mb-2 text-2xl font-bold">Express your interest</h2>
            <p className="mb-6 text-muted">This is an expression of interest only, not a membership application or payment.</p>
            <MembershipForm />
          </div>
        </div>
      </Section>
    </>
  );
}
