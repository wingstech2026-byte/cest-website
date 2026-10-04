import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Inner-page opener: a cinematic dark band (with the page’s photograph behind it when
 * there is one), breadcrumb, a single H1 and optional actions. Sits under the
 * transparent navigation bar. Entrance is CSS-only so it paints instantly.
 */
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
  /** Kept for API compatibility: when no image is available a patterned panel is used. */
  imagePlaceholderLabel?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden bg-night text-white">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="-z-20 object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/90 to-transparent" />
        </>
      ) : (
        <div aria-hidden="true" className="pattern-dots absolute inset-0 -z-10 opacity-70">
          <span className="float-slow absolute -right-24 -top-24 size-[28rem] rounded-full border border-white/10" />
          <span className="float-slow absolute -bottom-40 right-1/4 size-[22rem] rounded-full border border-accent-400/20" />
        </div>
      )}
      <Container className="relative flex min-h-[26rem] flex-col justify-end pb-14 pt-36 sm:min-h-[30rem] sm:pb-20 sm:pt-44">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="enter mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-4" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-white hover:underline">
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
        {eyebrow && (
          <p className="enter mb-4 text-xs font-bold uppercase tracking-[0.2em] text-accent-300" style={{ animationDelay: "80ms" }}>
            {eyebrow}
          </p>
        )}
        <h1
          className="enter max-w-4xl font-display text-[clamp(1.9rem,7vw,5.5rem)] font-semibold uppercase leading-[0.98] tracking-tight"
          style={{ animationDelay: "160ms" }}
        >
          {title}
        </h1>
        {intro && (
          <div className="enter mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl" style={{ animationDelay: "280ms" }}>
            {intro}
          </div>
        )}
        {actions && (
          <div className="enter mt-9 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
            {actions}
          </div>
        )}
        {!image && imagePlaceholderLabel && (
          <p className="sr-only">{imagePlaceholderLabel}</p>
        )}
      </Container>
      <div className="weave" aria-hidden="true" />
    </div>
  );
}
