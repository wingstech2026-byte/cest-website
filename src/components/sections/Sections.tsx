import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Eye,
  Handshake,
  Heart,
  Mail,
  Phone,
  Target,
  Users,
} from "lucide-react";
import { legalStatus, site } from "@/data/site";
import { objectiveGroups } from "@/data/objectives";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { PostCard, ProgramCard, ProjectCard, StatCard } from "@/components/cards/Cards";
import { getImpactStats, getPosts, getPrograms, getProjects } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Homepage hero                                                       */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-primary-900 text-white">
      <div className="pattern-dots absolute inset-0 opacity-60" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent-300">
            Masingbi, Sierra Leone
          </p>
          <h1 id="hero-title" className="text-5xl font-extrabold leading-[1.05] sm:text-6xl">
            Building a Better Community
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{site.tagline}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/donate" variant="accent" size="lg">
              Support Our Work
            </ButtonLink>
            <ButtonLink href="/get-involved" variant="outlineLight" size="lg">
              Get Involved
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/80" aria-label="What CEST stands for">
            {["Community", "Youth", "Development", "Hope", "Action"].map((w) => (
              <li key={w} className="flex items-center gap-5">
                {w}
                <span aria-hidden="true" className="text-accent-400 last:hidden">•</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-3 sm:gap-4">
            <figure className="relative col-span-5 aspect-[16/10] overflow-hidden rounded-2xl border-4 border-white/20 shadow-card sm:col-span-5">
              <Image
                src="/images/cest/quiz-audience-wide.jpg"
                alt="Pupils, teachers and parents gathered at a CEST quiz and spelling bee competition in Masingbi"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium">
                CEST Quiz &amp; Spelling Bee, Masingbi
              </figcaption>
            </figure>
            <figure className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/20 shadow-card">
              <Image
                src="/images/cest/community-meeting.jpg"
                alt="Community members meeting in a circle under a thatched shelter"
                fill
                sizes="(min-width: 1024px) 27vw, 60vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/20 shadow-card">
              <Image
                src="/images/cest/farm-site-visit.jpg"
                alt="CEST members at a farm site"
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="object-cover"
              />
            </figure>
          </div>
          <p className="mt-3 text-sm text-white/80">Photos: CEST activities in and around Masingbi.</p>
        </div>
      </Container>
      <div className="weave" aria-hidden="true" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Intro + legal status                                                */
/* ------------------------------------------------------------------ */
export function Intro() {
  return (
    <Section tone="white" labelledBy="intro-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Who we are" title="Communities leading their own transformation" id="intro-title" />
          <p className="text-lg leading-relaxed text-muted">
            Community Engagements for Sustainable Transformation (CEST) is a community-focused organization working
            to promote positive social and economic transformation through community engagement, youth-led action,
            capacity building, entrepreneurship, education, peacebuilding and development initiatives.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Our members live and work in Sierra Leone and in the diaspora, united by a shared aim: a better, more
            prosperous nation built by responsible citizens.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="outline">
              Learn more about CEST
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
            <BadgeCheck aria-hidden="true" className="size-6 text-primary-700" />
            Registered and recognised in Sierra Leone
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {legalStatus.map((l) => (
              <li key={l.body} className="rounded-xl border border-sand-200 bg-canvas p-4">
                <p className="font-semibold">{l.body}</p>
                <p className="mt-1 text-sm text-muted">{l.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* What we do                                                          */
/* ------------------------------------------------------------------ */
export async function WhatWeDo({ limit = 6 }: { limit?: number }) {
  const programs = (await getPrograms()).slice(0, limit);
  return (
    <Section tone="canvas" labelledBy="what-we-do-title">
      <SectionHeading
        eyebrow="What we do"
        title="Programs that strengthen people and communities"
        id="what-we-do-title"
        intro="From training young entrepreneurs to building peace at community level, CEST’s work is built around the needs of the people we serve."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <li key={p.slug}>
            <ProgramCard program={p} />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <ButtonLink href="/programs" variant="outline">
          Explore all programs
        </ButtonLink>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Key program areas (in focus)                                        */
/* ------------------------------------------------------------------ */
export async function ProgramsInFocus() {
  const all = await getPrograms();
  const focus = all.filter((p) => ["education-skills-training", "peacebuilding-community-engagement", "community-development"].includes(p.slug));
  return (
    <Section tone="sand" labelledBy="focus-title">
      <SectionHeading eyebrow="Key program areas" title="In focus" id="focus-title" />
      <div className="grid gap-8 lg:grid-cols-3">
        {focus.map((p) => (
          <article key={p.slug} className="overflow-hidden rounded-[var(--radius-card)] border border-sand-200 bg-white shadow-card">
            {p.image && (
              <div className="relative aspect-[16/10]">
                <Image src={p.image} alt={p.imageAlt ?? ""} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <ul className="mt-3 space-y-2 text-muted">
                {p.objectives.slice(0, 3).map((o) => (
                  <li key={o} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-600" />
                    {o}
                  </li>
                ))}
              </ul>
              <Link href={`/programs/${p.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-700 hover:underline">
                See the full program <span className="sr-only">: {p.title}</span>
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Our story timeline                                                  */
/* ------------------------------------------------------------------ */
export const timeline = [
  {
    year: "2014",
    title: "Where it began",
    text: "The organization began as the Kunike Academic Descendants’ Association (KADA), formed by a coalition of students from Kunike Sanda chiefdom.",
  },
  {
    year: "2018",
    title: "A new name",
    text: "The association changed its name to Community Engagements for Sustainable Transformation (CEST).",
  },
  {
    year: "2022",
    title: "A formal constitution",
    text: "CEST’s constitution was formally adopted on 14 January 2022, setting out its aims, membership and structure.",
  },
] as const;

export function Timeline() {
  return (
    <ol className="relative space-y-8 border-l-2 border-primary-200 pl-8">
      {timeline.map((t) => (
        <li key={t.year} className="relative">
          <span aria-hidden="true" className="absolute -left-[2.6rem] top-1 flex size-5 items-center justify-center rounded-full border-4 border-canvas bg-primary-600" />
          <p className="text-3xl font-extrabold text-primary-700">{t.year}</p>
          <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
          <p className="mt-1 max-w-xl text-muted">{t.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function StoryTeaser() {
  return (
    <Section tone="canvas" labelledBy="story-title">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Our story" title="From a student association to a community organization" id="story-title" />
          <p className="mb-8 text-lg text-muted">
            CEST grew out of a student association formed in 2014. Today it brings together members at home and in the
            diaspora to serve communities across Sierra Leone.
          </p>
          <ButtonLink href="/about#our-story" variant="outline">
            Read our story
          </ButtonLink>
        </div>
        <Timeline />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Vision & mission                                                    */
/* ------------------------------------------------------------------ */
export const visionIdeas = [
  "Social transformation",
  "Community engagement",
  "Youth-led action",
  "Responsible citizenship",
  "Positive national development",
  "Sustainable improvement in people’s lives",
];

export function VisionMission({ detailed }: { detailed?: boolean }) {
  return (
    <Section tone="green" id="vision-mission" labelledBy="vm-title">
      <h2 id="vm-title" className="sr-only">
        Vision and mission
      </h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <article className="rounded-[var(--radius-card)] bg-white/10 p-8 ring-1 ring-white/20">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">
            <Eye aria-hidden="true" className="size-5" /> Our vision
          </p>
          <h3 className="text-2xl font-bold sm:text-3xl">Society change through community engagement and youth-led action.</h3>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            CEST is anchored on changing society through community engagement and youth-led action, instilling
            responsible and patriotic citizenship. It also seeks to reach more clients through its corporate work and
            generate income, to improve the lives of CEST members and clients for a better nation.
          </p>
          {detailed && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {visionIdeas.map((v) => (
                <li key={v} className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                  {v}
                </li>
              ))}
            </ul>
          )}
        </article>
        <article className="rounded-[var(--radius-card)] bg-white/10 p-8 ring-1 ring-white/20">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">
            <Target aria-hidden="true" className="size-5" /> Our mission
          </p>
          <h3 className="text-2xl font-bold sm:text-3xl">Change agents for a better and more prosperous nation.</h3>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            CEST is a group of like-minded people serving as change agents for society’s transformation. Through
            community engagement, youth-led action and business skills, we work to meet the challenges our country
            faces and to build a better, more prosperous nation.
          </p>
          <ul className="mt-6 space-y-2 text-white/90">
            {[
              "Mainstreaming young people and youth-led institutions to bring about positive change",
              "Respecting human rights and the rule of law",
              "Increasing the participation of every Sierra Leonean in the country’s development",
            ].map((m) => (
              <li key={m} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-400" />
                {m}
              </li>
            ))}
          </ul>
        </article>
      </div>
      {!detailed && (
        <div className="mt-8">
          <ButtonLink href="/about#vision-mission" variant="outlineLight">
            Our vision, mission &amp; objectives
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Objectives accordion                                                */
/* ------------------------------------------------------------------ */
export function ObjectivesAccordion() {
  return (
    <div className="space-y-3">
      {objectiveGroups.map((g, i) => (
        <details key={g.id} open={i === 0} className="group rounded-2xl border border-sand-200 bg-white shadow-card">
          <summary className="flex min-h-16 items-center justify-between gap-4 rounded-2xl px-6 py-4">
            <span>
              <span className="block text-lg font-bold">{g.title}</span>
              <span className="block text-sm text-muted">{g.summary}</span>
            </span>
            <ChevronDown aria-hidden="true" className="chevron size-6 shrink-0 text-primary-700 transition-transform" />
          </summary>
          <ul className="space-y-3 border-t border-sand-200 px-6 py-5">
            {g.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured projects                                                   */
/* ------------------------------------------------------------------ */
export async function FeaturedProjects({ all }: { all?: boolean }) {
  const projects = await getProjects();
  const shown = all ? projects : projects.filter((p) => !p.isPlaceholder).slice(0, 3);
  return (
    <Section tone="white" labelledBy="projects-title">
      <SectionHeading
        eyebrow={all ? undefined : "Projects"}
        title={all ? "Our projects and activities" : "Featured projects"}
        id="projects-title"
        intro="A selection of CEST activities. More verified project details will be added as they are confirmed."
      />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
      {!all && (
        <div className="mt-10">
          <ButtonLink href="/projects" variant="outline">
            See all projects
          </ButtonLink>
        </div>
      )}
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact                                                              */
/* ------------------------------------------------------------------ */
export async function ImpactSection({ tone = "sand" }: { tone?: "sand" | "canvas" }) {
  const stats = await getImpactStats();
  const hasData = stats.some((s) => s.value !== null);
  return (
    <Section tone={tone} labelledBy="impact-title">
      <SectionHeading
        eyebrow="Impact"
        title="Our impact"
        id="impact-title"
        intro={
          hasData ? (
            "Verified results from CEST’s work."
          ) : (
            <>
              Impact data coming soon. We only publish figures we can verify. <Placeholder>[ADD VERIFIED IMPACT DATA]</Placeholder>
            </>
          )
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <li key={s.id}>
            <StatCard stat={s} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Get involved                                                        */
/* ------------------------------------------------------------------ */
export const involvementOptions = [
  {
    id: "volunteer",
    title: "Volunteer",
    text: "Share your skills, time and passion to help communities thrive.",
    cta: "Become a Volunteer",
    href: "/volunteer",
    icon: Heart,
  },
  {
    id: "partner",
    title: "Partner",
    text: "Work with CEST to design and implement initiatives that contribute to sustainable community transformation.",
    cta: "Partner With Us",
    href: "/partner",
    icon: Handshake,
  },
  {
    id: "donate",
    title: "Donate",
    text: "Support programs that empower young people and strengthen communities.",
    cta: "Donate",
    href: "/donate",
    icon: BadgeCheck,
  },
  {
    id: "membership",
    title: "Membership",
    text: "Express your interest in joining CEST and being part of its community of change agents.",
    cta: "Express Interest",
    href: "/membership",
    icon: Users,
  },
] as const;

export function InvolvementGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {involvementOptions.map(({ id, title, text, cta, href, icon: I }) => (
        <li key={id} className="flex flex-col rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card">
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent-300/40 text-primary-800">
            <I aria-hidden="true" className="size-6" />
          </span>
          <H className="text-xl font-bold">{title}</H>
          <p className="mt-2 flex-1 text-muted">{text}</p>
          <ButtonLink href={href} variant={id === "donate" ? "accent" : "primary"} className="mt-6 w-full">
            {cta}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}

export function GetInvolvedSection() {
  return (
    <Section tone="canvas" labelledBy="involved-title">
      <SectionHeading
        eyebrow="Get involved"
        title="There is a place for you in this work"
        id="involved-title"
        intro="Whether you give time, skills, partnership or support, you can help build a better community."
      />
      <InvolvementGrid />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Latest news                                                         */
/* ------------------------------------------------------------------ */
export async function LatestNews() {
  const posts = (await getPosts()).slice(0, 3);
  return (
    <Section tone="white" labelledBy="news-title">
      <SectionHeading eyebrow="News & stories" title="Latest news" id="news-title" />
      {posts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-sand-300 p-8 text-center text-muted">
          No news has been published yet. Please check back soon.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <PostCard post={p} />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10">
        <ButtonLink href="/news" variant="outline">
          All news &amp; stories
        </ButtonLink>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Partners placeholder                                                */
/* ------------------------------------------------------------------ */
export function PartnersPlaceholder() {
  return (
    <Section tone="canvas" labelledBy="partners-title">
      <SectionHeading
        align="center"
        eyebrow="Partners & supporters"
        title="Working together"
        id="partners-title"
        intro="We value the organizations and individuals who work alongside CEST."
      />
      <div className="mx-auto max-w-3xl rounded-2xl border-2 border-dashed border-sand-300 bg-white p-8 text-center">
        <p className="text-muted">
          Partner and supporter logos will appear here once CEST confirms and approves them.{" "}
          <Placeholder>[ADD PARTNERS / SUPPORTERS]</Placeholder>
        </p>
        <div className="mt-6">
          <ButtonLink href="/partner" variant="outline">
            Partner With CEST
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA bands                                                           */
/* ------------------------------------------------------------------ */
export function DonateCTA() {
  return (
    <Section tone="blue" labelledBy="donate-cta-title" className="py-14 sm:py-16">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="donate-cta-title" className="text-3xl font-bold sm:text-4xl">
            Help us build a better community
          </h2>
          <p className="mt-3 text-lg text-white/90">
            Your support can help strengthen community initiatives, youth empowerment, education, entrepreneurship and
            other development activities.
          </p>
        </div>
        <ButtonLink href="/donate" variant="accent" size="lg">
          Support CEST
        </ButtonLink>
      </div>
    </Section>
  );
}

export function ContactCTA() {
  return (
    <Section tone="white" labelledBy="contact-cta-title" className="py-14 sm:py-16">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 id="contact-cta-title" className="text-3xl font-bold sm:text-4xl">
            Questions? Let’s talk.
          </h2>
          <p className="mt-3 text-lg text-muted">
            We would love to hear from you, whether you are a community member, a young person, a partner or a
            supporter.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">
            Get In Touch
          </ButtonLink>
          <ButtonLink href={`tel:${site.phones[0].tel}`} variant="outline" size="lg">
            <Phone aria-hidden="true" className="size-5" /> Call
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
            <Mail aria-hidden="true" className="size-5" /> Email
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

export function CTABand({
  title,
  text,
  cta,
  href,
  tone = "green",
}: {
  title: string;
  text?: string;
  cta: string;
  href: string;
  tone?: "green" | "blue";
}) {
  return (
    <Section tone={tone} className="py-12 sm:py-14">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {text && <p className="mt-2 text-lg text-white/90">{text}</p>}
        </div>
        <ButtonLink href={href} variant="accent" size="lg">
          {cta}
        </ButtonLink>
      </div>
    </Section>
  );
}
