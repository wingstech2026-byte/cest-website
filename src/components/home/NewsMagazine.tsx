import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/data/news";
import { Rich } from "@/components/ui/Placeholder";
import { ProgramArt } from "@/components/ui/ProgramArt";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

function Visual({ post, index }: { post: Post; index: number }) {
  return post.image ? (
    <Image
      src={post.image}
      alt={post.imageAlt ?? ""}
      fill
      quality={75}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
    />
  ) : (
    <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
      <ProgramArt index={index} icon="users" />
    </div>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <span className="rounded-full bg-primary-50 px-3 py-0.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-800 transition-colors group-hover:bg-accent-300">
        {post.category}
      </span>
      <span className="flex items-center gap-1.5 text-muted">
        <Calendar aria-hidden="true" className="size-4" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      {post.isSample && <span className="rounded-full bg-accent-300 px-2.5 py-0.5 text-xs font-bold text-primary-900">Sample post</span>}
    </p>
  );
}

/** Magazine layout: one large featured story, with the rest as a compact list beside it. */
export function NewsMagazine({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-sand-300 p-10 text-center text-muted">
        No stories have been published yet. Please check back soon.
      </p>
    );
  }
  const [featured, ...rest] = posts;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <article className="group relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/11]">
            <Visual post={featured} index={0} />
          </div>
          <div className="pt-6">
            <Meta post={featured} />
            <h3 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
              <Link href={`/news/${featured.slug}`} data-cursor="READ" className="after:absolute after:inset-0 after:content-['']">
                <Rich text={featured.title} />
              </Link>
            </h3>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{featured.summary}</p>
          </div>
        </article>
      </Reveal>

      {rest.length > 0 && (
        <ul className="divide-y divide-sand-300 border-y border-sand-300 lg:col-span-5 lg:self-start">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.08}>
                <article className="group relative flex gap-5 py-6">
                  <div className={cn("relative size-24 shrink-0 overflow-hidden rounded-xl sm:size-28")}>
                    <Visual post={p} index={i + 1} />
                  </div>
                  <div className="min-w-0">
                    <Meta post={p} />
                    <h3 className="mt-2 text-xl font-bold leading-snug">
                      <Link href={`/news/${p.slug}`} data-cursor="READ" className="after:absolute after:inset-0 after:content-['']">
                        <Rich text={p.title} />
                      </Link>
                      <ArrowUpRight aria-hidden="true" className="ml-1 inline size-5 text-primary-700 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
