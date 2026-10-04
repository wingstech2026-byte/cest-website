import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { statusIsPlaceholder } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { getProject, getProjects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Placeholder";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.isPlaceholder ? "Project template" : project.title,
    description: project.summary.replace(/\[|\]/g, ""),
    path: `/projects/${project.slug}`,
    image: project.image,
    noindex: project.isPlaceholder,
  });
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid grid-cols-1 gap-4 border-t border-sand-300 py-10 lg:grid-cols-12 lg:gap-10">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-700 lg:col-span-3">{label}</h2>
      <div className="text-lg leading-relaxed lg:col-span-9">{children}</div>
    </Reveal>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-primary-600" />
          <span>
            <Rich text={i} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const others = (await getProjects()).filter((p) => p.slug !== project.slug && !p.isPlaceholder);

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={project.title}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        intro={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-5 text-accent-300" />
              <Rich text={project.location} />
            </span>
            <span className="rounded-full border border-white/40 px-3 py-1 text-sm font-semibold">
              Status: {statusIsPlaceholder(project.status) ? <Rich text={project.status} /> : project.status}
            </span>
          </span>
        }
        image={project.image}
        imageAlt={project.imageAlt}
        actions={
          <ButtonLink href="/partner" variant="accent" size="lg">
            Learn About This Project
          </ButtonLink>
        }
      />

      <section className="bg-canvas py-16 sm:py-24">
        <Container className="max-w-6xl">
          <Block label="Overview">
            <div className="space-y-5">
              {project.description.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Block>
          <Block label="The challenge">
            <p>
              <Rich text={project.challenge} />
            </p>
          </Block>
          <Block label="Our approach">
            <p>
              <Rich text={project.approach} />
            </p>
          </Block>
          <Block label="Activities">
            <BulletList items={project.activities} />
          </Block>
          <Block label="Beneficiaries">
            <BulletList items={project.beneficiaries} />
          </Block>
          <Block label="Impact">
            <p className="font-display text-3xl font-semibold text-primary-800">
              <Rich text={project.impact} />
            </p>
          </Block>
          <Block label="Partners">
            <BulletList items={project.partners} />
          </Block>
          <Block label="Project timeline">
            <ol className="space-y-4">
              {project.timeline.map((t, i) => (
                <li key={i} className="grid grid-cols-1 gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <span className="font-bold text-primary-700">
                    <Rich text={t.when} />
                  </span>
                  <span>
                    <Rich text={t.what} />
                  </span>
                </li>
              ))}
            </ol>
          </Block>
        </Container>

        {project.gallery && project.gallery.length > 0 && (
          <Container className="mt-10 max-w-[90rem]">
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-secondary-700">Gallery</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <li key={src} className={i % 3 === 1 ? "lg:mt-10" : ""}>
                  <ImageReveal className="aspect-[4/3] rounded-2xl" delay={(i % 3) * 0.08}>
                    <Image
                      src={src}
                      alt={`${project.title}: photo from a CEST event`}
                      fill
                      quality={75}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                </li>
              ))}
            </ul>
          </Container>
        )}
      </section>

      <section className="bg-primary-800 py-20 text-white sm:py-28">
        <Container className="max-w-[90rem]">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[1.02]">Want to be part of this?</h2>
              <p className="mt-4 text-lg text-white/90">Partner with CEST, volunteer your skills or support the work.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/partner" variant="accent" size="lg">
                Partner With Us
              </ButtonLink>
              <ButtonLink href="/donate" variant="outlineLight" size="lg">
                Donate
              </ButtonLink>
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-14 border-t border-white/20 pt-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">More projects</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/projects/${o.slug}`} className="group inline-flex items-center gap-2 text-xl font-semibold">
                      <span className="link-underline">{o.title}</span>
                      <ArrowRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
