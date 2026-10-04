import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  narrow,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", narrow ? "max-w-3xl" : "max-w-7xl", className)}>
      {children}
    </div>
  );
}

type Tone = "canvas" | "white" | "sand" | "green" | "blue";

const tones: Record<Tone, string> = {
  canvas: "bg-canvas text-ink",
  white: "bg-surface text-ink",
  sand: "bg-sand-100 text-ink",
  green: "bg-primary-800 text-white",
  blue: "bg-secondary-800 text-white",
};

export function Section({
  children,
  tone = "canvas",
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-20 scroll-mt-20", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  light,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <header className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-bold uppercase tracking-[0.14em]", light ? "text-accent-300" : "text-secondary-700")}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className="text-3xl font-bold sm:text-4xl">
        {title}
      </Tag>
      {intro && (
        <div className={cn("mt-4 text-lg leading-relaxed", light ? "text-white/90" : "text-muted")}>{intro}</div>
      )}
    </header>
  );
}
