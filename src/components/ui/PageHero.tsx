import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";
import { ImagePlaceholder } from "./ImagePlaceholder";

export interface Crumb {
  label: string;
  href?: string;
}

/** Standard inner-page header: breadcrumb, single H1, intro, optional image and actions. */
export function PageHero({
  title,
  eyebrow,
  intro,
  crumbs,
  image,
  imageAlt,
  imagePlaceholderLabel,
  actions,
}: {
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  /** When no image is available, show a labelled placeholder instead. */
  imagePlaceholderLabel?: string;
  actions?: ReactNode;
}) {
  const hasVisual = Boolean(image || imagePlaceholderLabel);
  return (
    <div className="bg-primary-800 text-white">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12">
        <div className={hasVisual ? "lg:col-span-7" : "lg:col-span-9"}>
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1 text-sm text-white/85">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                {crumbs.map((c, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <ChevronRight aria-hidden="true" className="size-4" />
                    {c.href ? (
                      <Link href={c.href} className="hover:underline">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
          {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">{intro}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {hasVisual && (
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/20 shadow-card">
              {image ? (
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder label={imagePlaceholderLabel} />
              )}
            </div>
          </div>
        )}
      </Container>
      <div className="weave" aria-hidden="true" />
    </div>
  );
}
