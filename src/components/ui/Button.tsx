import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "accent" | "outline" | "outlineLight" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors " +
  "focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed text-center";

const variants: Record<Variant, string> = {
  primary: "bg-primary-700 text-white hover:bg-primary-800",
  secondary: "bg-secondary-700 text-white hover:bg-secondary-800",
  accent: "bg-accent-400 text-primary-900 hover:bg-accent-300",
  outline: "border-2 border-primary-700 text-primary-700 hover:bg-primary-50",
  outlineLight: "border-2 border-white/80 text-white hover:bg-white/10",
  ghost: "text-primary-700 hover:bg-primary-50",
};

// min-h-12 = 48px: comfortable touch target (WCAG 2.5.5 recommends 44px+)
const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

interface Common {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href as string}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
