import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { statusIsPlaceholder } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { getProject, getProjects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Rich } from "@/components/ui/Placeholder";

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow="Project"
        title={project.title}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        intro={<Rich text={project.summary} />}
        image={project.image}
        imageAlt={project.imageAlt}
        imagePlaceholderLabel={project.image ? undefined : "Project photo to be added"}
        actions={
          <ButtonLink href="/partner" variant="accent" size="lg">
            Learn About This Project
          </ButtonLink>
        }
      />
      <Section tone="canvas">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-2">
            {project.description.map((p, i) => (
              <p key={i}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <aside className="h-fit rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 shadow-card" aria-label="Project facts">
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-bold uppercase tracking-wide text-secondary-700">Location</dt>
                <dd className="mt-1 flex items-start gap-2">
                  <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
                  <Rich text={project.location} />
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wide text-secondary-700">Status</dt>
                <dd className="mt-1">{statusIsPlaceholder(project.status) ? <Rich text={project.status} /> : project.status}</dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-wide text-secondary-700">Impact</dt>
                <dd className="mt-1">
                  <Rich text={project.impact} />
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-5 text-2xl font-bold">Photos</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100">
                  <Image
                    src={src}
                    alt={`${project.title}: photo from a CEST event`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
