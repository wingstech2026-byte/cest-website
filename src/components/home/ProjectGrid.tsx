import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/types";
import { statusIsPlaceholder } from "@/data/projects";
import { Rich } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Portfolio-style project grid: alternating wide and narrow tiles. Hover: the image zooms, an
 * overlay deepens, the title lifts and the arrow moves. Click opens the full project story.
 */
export function ProjectGrid({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <ul className={cn("grid gap-5 lg:grid-cols-12", className)}>
      {projects.map((p, i) => {
        const wide = i % 4 === 0 || i % 4 === 3;
        return (
          <li key={p.slug} className={wide ? "lg:col-span-8" : "lg:col-span-4"}>
            <Reveal delay={(i % 2) * 0.1} className="h-full">
              <Link
                href={`/projects/${p.slug}`}
                data-cursor="EXPLORE"
                className="group relative block h-full min-h-[24rem] overflow-hidden rounded-2xl bg-primary-800 text-white lg:min-h-[32rem]"
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.imageAlt ?? ""}
                    fill
                    quality={75}
                    sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                ) : (
                  <div aria-hidden="true" className="pattern-dots absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
                    <span className="absolute -right-12 -top-12 size-64 rounded-full border border-white/15" />
                  </div>
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent transition-colors duration-500 group-hover:from-night" />
                {p.isPlaceholder && (
                  <span className="absolute left-5 top-5 rounded-full bg-accent-400 px-3 py-1 text-xs font-bold text-primary-900">Template</span>
                )}
                <ArrowUpRight
                  aria-hidden="true"
                  className="absolute right-5 top-5 size-9 rounded-full bg-white/15 p-2 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-accent-400 group-hover:text-primary-900"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="transition-transform duration-500 group-hover:-translate-y-2">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent-300">
                      <MapPin aria-hidden="true" className="size-4" />
                      <Rich text={p.location} />
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-white/80">
                        {statusIsPlaceholder(p.status) ? <Rich text={p.status} /> : p.status}
                      </span>
                    </p>
                    <h3 className={cn("font-display font-semibold uppercase leading-tight", wide ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl")}>
                      <Rich text={p.title} />
                    </h3>
                    <p className="mt-3 max-w-xl text-white/85 line-clamp-2">
                      <Rich text={p.summary} />
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
