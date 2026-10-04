import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { legalStatus, site } from "@/data/site";
import { values } from "@/data/objectives";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand, ObjectivesAccordion, Timeline, VisionMission } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "About CEST",
  description:
    "The story, vision, mission, objectives, values and structure of Community Engagements for Sustainable Transformation (CEST) in Sierra Leone.",
  path: "/about",
});

const organs = [
  {
    title: "General Membership",
    text: "All members of CEST, at home and in the diaspora. It is the largest body and debates and approves policies for the general membership.",
  },
  {
    title: "Executive Management Body & Advisory Board",
    text: "Elected and appointed officers, area coordinators and committees who run day-to-day affairs, guided by an Advisory Board.",
  },
  {
    title: "Board of Directors",
    text: "The strategic, corporate face of CEST. The Board oversees corporate affairs and works with the CEO & Founder and Executive Director.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CEST"
        title="Building a Better Community"
        intro="CEST is a community-focused organization in Masingbi, Sierra Leone, working through community engagement and youth-led action for sustainable transformation."
        crumbs={[{ label: "About" }]}
        image="/images/cest/community-meeting.jpg"
        imageAlt="Community members meeting in a circle under a thatched shelter"
      />

      <Section tone="canvas" id="our-story" labelledBy="story-h">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="From a student association to CEST" id="story-h" />
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              <p>
                CEST was formed in 2014 by a coalition of students from Kunike Sanda chiefdom, under the name Kunike
                Academic Descendants’ Association (KADA). In 2018 the association changed its name to Community
                Engagements for Sustainable Transformation.
              </p>
              <p>
                Today CEST has both home-based members and members in the diaspora, and is working to grow its
                membership nationally and internationally. Its constitution was formally adopted on 14 January 2022.
              </p>
            </div>
            <figure className="mt-8 flex items-center gap-5 rounded-2xl border border-sand-200 bg-white p-5">
              <Image src={site.logo} alt="CEST logo: a hand holding three people and an academic hat" width={96} height={98} className="size-24 shrink-0 object-contain" />
              <figcaption className="text-muted">
                <span className="block font-semibold text-ink">Our symbol</span>A hand holding three people and an
                academic hat: standing together for development and social cohesion, and using education as a tool for
                sustainable transformation.
              </figcaption>
            </figure>
          </div>
          <Timeline />
        </div>
      </Section>

      <VisionMission detailed />

      <Section tone="canvas" id="objectives" labelledBy="obj-h">
        <SectionHeading
          eyebrow="Objectives"
          title="What CEST sets out to do"
          id="obj-h"
          intro={
            <>
              CEST’s overall goal is to help build national consciousness and love for our country, and to lay the
              foundations for responsible citizenship in a united, progressive and business-oriented nation. The
              objectives below are grouped by theme to make them easier to read.
            </>
          }
        />
        <ObjectivesAccordion />
      </Section>

      <Section tone="white" id="values" labelledBy="values-h">
        <SectionHeading
          eyebrow="Values"
          title="The principles that guide us"
          id="values-h"
          intro="Drawn from CEST’s constitution and the way it asks members to conduct themselves."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="rounded-[var(--radius-card)] border border-sand-200 bg-canvas p-6">
              <h3 className="text-lg font-bold text-primary-800">{v.title}</h3>
              <p className="mt-2 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" id="structure" labelledBy="structure-h">
        <SectionHeading
          eyebrow="Organizational structure"
          title="How CEST is organized"
          id="structure-h"
          intro="CEST has three main organs. Members at home and abroad take part through the general membership, which elects officers every four years by secret ballot."
        />
        <ol className="grid gap-6 lg:grid-cols-3">
          {organs.map((o, i) => (
            <li key={o.title} className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card">
              <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary-700 font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold">{o.title}</h3>
              <p className="mt-2 text-muted">{o.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6">
            <h3 className="text-lg font-bold">Accountability and finance</h3>
            <ul className="mt-3 space-y-2 text-muted">
              <li>An Annual General Meeting is held each year and appoints an external auditor or audit firm.</li>
              <li>Funds raised are used only to further CEST’s aims.</li>
              <li>CEST’s sources of funds include registration fees, donations, member contributions, social activities, returns from corporate activities and humanitarian assistance.</li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <BadgeCheck aria-hidden="true" className="size-6 text-primary-700" /> Registered in Sierra Leone
            </h3>
            <ul className="mt-3 space-y-2 text-muted">
              {legalStatus.map((l) => (
                <li key={l.body}>
                  <span className="font-semibold text-ink">{l.body}.</span> {l.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/leadership">Meet the leadership structure</ButtonLink>
          <ButtonLink href="/membership" variant="outline">
            Membership
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-muted">
          CEST is neutral in politics, religion, race and tradition, and opposes discrimination of any kind.
        </p>
      </Section>

      <CTABand title="Be part of the story" text="Volunteer, partner or support CEST’s work." cta="Get Involved" href="/get-involved" />
    </>
  );
}
