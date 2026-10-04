import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { legalStatus, site } from "@/data/site";
import { values } from "@/data/objectives";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CTABand, ObjectivesAccordion } from "@/components/sections/Sections";
import { HistoryTimeline } from "@/components/home/HistoryTimeline";
import { MissionVision } from "@/components/home/MissionVision";
import { Accountability } from "@/components/home/Accountability";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

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

      <HistoryTimeline />

      <section className="bg-white py-16 sm:py-20" aria-label="Our symbol">
        <Container className="max-w-5xl">
          <Reveal className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
            <Image src={site.logo} alt="CEST logo: a hand holding three people and an academic hat" width={160} height={163} className="size-36 shrink-0 object-contain" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Our symbol</p>
              <p className="mt-3 font-display text-2xl font-medium leading-snug sm:text-3xl">
                A hand holding three people and an academic hat: standing together for development and social
                cohesion, and using education as a tool for sustainable transformation.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <MissionVision />

      <section id="objectives" aria-labelledby="obj-h" className="scroll-mt-20 bg-canvas py-20 sm:py-28">
        <Container className="max-w-6xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Objectives</p>
          <AnimatedHeading
            id="obj-h"
            lines={["What CEST sets", "out to do."]}
            className="font-display text-[clamp(1.9rem,6vw,5rem)] font-semibold uppercase leading-[0.98]"
          />
          <p className="mb-10 mt-6 max-w-3xl text-lg text-muted">
            CEST’s overall goal is to help build national consciousness and love for our country, and to lay the
            foundations for responsible citizenship in a united, progressive and business-oriented nation. The
            objectives below are grouped by theme to make them easier to read.
          </p>
          <ObjectivesAccordion />
        </Container>
      </section>

      <section id="values" aria-labelledby="values-h" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <Container className="max-w-[90rem]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Values</p>
          <AnimatedHeading
            id="values-h"
            lines={["The principles", "that guide us."]}
            className="font-display text-[clamp(1.9rem,6vw,5rem)] font-semibold uppercase leading-[0.98]"
          />
          <p className="mt-6 max-w-2xl text-lg text-muted">Drawn from CEST’s constitution and the way it asks members to conduct themselves.</p>
          <RevealGroup as="ul" className="mt-12 grid grid-cols-1 border-t border-sand-300 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {values.map((v, i) => (
              <RevealItem as="li" key={v.title} className="border-b border-sand-300 py-8 sm:pr-8">
                <p className="font-display text-4xl font-semibold text-primary-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-muted">{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="structure" aria-labelledby="structure-h" className="scroll-mt-20 bg-sand-100 py-20 sm:py-28">
        <Container className="max-w-[90rem]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Organizational structure</p>
          <AnimatedHeading
            id="structure-h"
            lines={["How CEST", "is organized."]}
            className="font-display text-[clamp(1.9rem,6vw,5rem)] font-semibold uppercase leading-[0.98]"
          />
          <p className="mt-6 max-w-3xl text-lg text-muted">
            CEST has three main organs. Members at home and abroad take part through the general membership, which
            elects officers every four years by secret ballot.
          </p>
          <RevealGroup as="ol" className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3" stagger={0.1}>
            {organs.map((o, i) => (
              <RevealItem as="li" key={o.title} className="rounded-2xl border border-sand-300 bg-white p-7 shadow-card">
                <span className="font-display text-5xl font-semibold text-primary-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-bold">{o.title}</h3>
                <p className="mt-2 text-muted">{o.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-sand-300 bg-white p-7">
              <h3 className="text-lg font-bold">Accountability and finance</h3>
              <ul className="mt-3 space-y-2 text-muted">
                <li>An Annual General Meeting is held each year and appoints an external auditor or audit firm.</li>
                <li>Funds raised are used only to further CEST’s aims.</li>
                <li>
                  CEST’s sources of funds include registration fees, donations, member contributions, social activities,
                  returns from corporate activities and humanitarian assistance.
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border border-sand-300 bg-white p-7">
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
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/leadership">The people behind the mission</ButtonLink>
            <ButtonLink href="/membership" variant="outline">
              Membership
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            CEST is neutral in politics, religion, race and tradition, and opposes discrimination of any kind. See{" "}
            <Link href="/accountability" className="font-semibold underline">
              governance and documents
            </Link>
            .
          </p>
        </Container>
      </section>

      <Accountability compact />

      <CTABand title="Be part of the story" text="Volunteer, partner or support CEST’s work." cta="Get Involved" href="/get-involved" />
    </>
  );
}
