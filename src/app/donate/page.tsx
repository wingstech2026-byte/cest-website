import type { Metadata } from "next";
import { Building2, CreditCard, Landmark, Repeat, Smartphone, Wallet } from "lucide-react";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description:
    "Support CEST. Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and other development activities in Sierra Leone.",
  path: "/donate",
});

const options = [
  {
    title: "One-time donation",
    text: "Make a single contribution to support CEST’s work.",
    icon: Wallet,
  },
  {
    title: "Monthly support",
    text: "Give regularly to help CEST plan and sustain its programs.",
    icon: Repeat,
  },
  {
    title: "Corporate partnership",
    text: "Businesses and organizations can partner with CEST on programs and projects.",
    icon: Building2,
  },
];

/** Payment methods CEST may enable later. None are active in the MVP. */
const futureMethods = [
  { name: "Card payments (Stripe)", icon: CreditCard },
  { name: "PayPal", icon: Wallet },
  { name: "Mobile money", icon: Smartphone },
  { name: "Bank transfer", icon: Landmark },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Support CEST"
        intro="Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and other development activities."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Donate" }]}
      />

      <Section tone="canvas" labelledBy="ways-title">
        <SectionHeading title="Ways to give" id="ways-title" />
        <ul className="grid gap-6 md:grid-cols-3">
          {options.map(({ title, text, icon: I }) => (
            <li key={title} className="flex flex-col rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card">
              <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent-300/40 text-primary-800">
                <I aria-hidden="true" className="size-6" />
              </span>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" labelledBy="how-title">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="How to donate" id="how-title" />
            <div className="rounded-[var(--radius-card)] border-2 border-dashed border-[#c99a1b] bg-[#fff9e6] p-6">
              <p className="font-semibold text-[#5c4300]">Online donations are not yet active.</p>
              <p className="mt-2">
                <Placeholder>[DONATION PAYMENT INFORMATION TO BE PROVIDED]</Placeholder>
              </p>
              <p className="mt-4 text-sm text-[#5c4300]">
                Until payment details are confirmed, please contact CEST directly to discuss a donation or partnership.
                CEST does not publish bank details on this site until its official account information is supplied.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                Get In Touch About Giving
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}?subject=Donation%20enquiry`} variant="outline" size="lg">
                Email CEST
              </ButtonLink>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Payment options planned</h2>
            <p className="mt-3 text-muted">
              The site is built so that these can be connected later. None of them are active yet, and no payments can
              be made through this website today.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {futureMethods.map(({ name, icon: I }) => (
                <li key={name} className="flex items-center gap-3 rounded-xl border border-sand-200 bg-white p-4 text-muted">
                  <I aria-hidden="true" className="size-5 shrink-0" />
                  <span>
                    {name}
                    <span className="block text-xs font-semibold uppercase tracking-wide">Coming later</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="use-title">
        <SectionHeading
          title="How funds are used"
          id="use-title"
          intro="CEST’s constitution requires that all money raised by or on behalf of the organization is used only to further its aims, and its accounts are reviewed by an external auditor appointed at the Annual General Meeting."
        />
      </Section>
    </>
  );
}
