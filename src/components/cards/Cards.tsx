import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, User } from "lucide-react";
import type { ImpactStat, Person, Post, Program, Project } from "@/types";
import { formatDate } from "@/data/news";
import { statusIsPlaceholder } from "@/data/projects";
import { Icon } from "@/components/ui/Icon";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Rich } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

const cardBase = "overflow-hidden rounded-[var(--radius-card)] border border-sand-200 bg-white shadow-card";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className={cn(cardBase, "group relative flex h-full flex-col p-6 transition-shadow hover:shadow-lg")}>
      <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-700">
        <Icon name={program.icon} className="size-7" />
      </span>
      <h3 className="text-xl font-bold">
        <Link href={`/programs/${program.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4">
          {program.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-muted">{program.summary}</p>
      <p className="mt-5 flex items-center gap-1.5 font-semibold text-primary-700" aria-hidden="true">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </p>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={cn(cardBase, "flex h-full flex-col")}>
      <div className="relative aspect-[16/10] bg-sand-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder label="Project photo to be added" />
        )}
        {project.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-primary-900">
            Template
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">
          <Rich text={project.title} />
        </h3>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex items-start gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-secondary-700" />
            <dd>
              <Rich text={project.location} />
            </dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="font-semibold">Status:</dt>
            <dd>{statusIsPlaceholder(project.status) ? <Rich text={project.status} /> : project.status}</dd>
          </div>
        </dl>
        <p className="mt-3 flex-1 text-muted">
          <Rich text={project.summary} />
        </p>
        <p className="mt-3 text-sm">
          <span className="font-semibold">Impact: </span>
          <Rich text={project.impact} />
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-700 hover:underline"
        >
          View Project
          <span className="sr-only">: {project.title}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className={cn(cardBase, "group relative flex h-full flex-col")}>
      <div className="relative aspect-[16/10] bg-sand-100">
        {post.image ? (
          <Image src={post.image} alt={post.imageAlt ?? ""} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <ImagePlaceholder label="Featured image" />
        )}
        {post.isSample && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-primary-900">
            Sample post
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-secondary-700">{post.category}</p>
        <h3 className="mt-2 text-xl font-bold">
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
            <Rich text={post.title} />
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-muted">{post.summary}</p>
        <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar aria-hidden="true" className="size-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <User aria-hidden="true" className="size-4" />
            <Rich text={post.author} />
          </span>
        </p>
      </div>
    </article>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className={cn(cardBase, "flex h-full flex-col items-center p-6 text-center")}>
      <div className="relative mb-4 flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-sand-300 bg-sand-100">
        {person.photo ? (
          <Image src={person.photo} alt={person.name ? `Portrait of ${person.name}` : ""} fill sizes="112px" className="object-cover" />
        ) : (
          <span className="placeholder-chip">[PHOTO]</span>
        )}
      </div>
      <p className="text-lg font-bold">{person.name ?? <span className="placeholder-chip">[NAME]</span>}</p>
      <p className="mt-1 font-semibold text-primary-700">{person.position}</p>
      {person.note && <p className="mt-2 text-sm text-muted">{person.note}</p>}
    </article>
  );
}

export function StatCard({ stat }: { stat: ImpactStat }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-sand-200 bg-white p-6 text-center shadow-card">
      <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-secondary-50 text-secondary-700">
        <Icon name={stat.icon} className="size-6" />
      </span>
      {stat.value === null ? (
        <p className="text-lg font-bold text-muted">Coming soon</p>
      ) : (
        <p className="text-4xl font-extrabold text-primary-700">{stat.value.toLocaleString("en-GB")}</p>
      )}
      <p className="mt-1 font-semibold">{stat.label}</p>
      {stat.value !== null && stat.asOf && <p className="mt-1 text-sm text-muted">As of {stat.asOf}</p>}
    </div>
  );
}
