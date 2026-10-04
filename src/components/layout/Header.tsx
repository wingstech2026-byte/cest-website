"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

/** Routes whose first screen is NOT a dark hero: the bar is always solid there. */
const SOLID_ROUTES = ["/admin"];

/**
 * Premium navigation: transparent over the hero, then a compact glass bar after
 * scrolling. Hover/focus opens animated dropdowns; Escape closes them.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || SOLID_ROUTES.some((r) => pathname.startsWith(r));
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        solid
          ? "border-b border-sand-200/80 bg-canvas/95 shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-5 transition-[padding] duration-300 sm:px-8",
          solid ? "py-2" : "py-4",
        )}
      >
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} (${site.shortName}), home`}>
          <span className="rounded-xl bg-white p-1 shadow-sm">
            <Image src={site.logo} alt="" width={48} height={49} priority className="size-10 object-contain sm:size-11" />
          </span>
          <span className="leading-tight">
            <span className={cn("block text-xl font-extrabold tracking-tight", solid ? "text-primary-800" : "text-white")}>
              {site.shortName}
            </span>
            <span className={cn("hidden max-w-[15rem] text-[0.68rem] font-medium sm:block", solid ? "text-muted" : "text-white/80")}>
              {site.name}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5" onKeyDown={(e) => e.key === "Escape" && setOpenKey(null)}>
            {mainNav.map((item) => {
              const open = openKey === item.href;
              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenKey(item.href)}
                  onMouseLeave={() => setOpenKey(null)}
                  onFocus={() => item.children && setOpenKey(item.href)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenKey(null);
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? open : undefined}
                    className={cn(
                      "group flex min-h-11 items-center gap-1 whitespace-nowrap px-3 text-[0.78rem] font-bold uppercase tracking-[0.12em] transition-colors",
                      solid ? "text-ink hover:text-primary-700" : "text-white hover:text-accent-300",
                    )}
                  >
                    <span className="link-underline inline-block pb-0.5 transition-transform duration-300 group-hover:-translate-y-px" aria-current={isActive(item.href) ? "page" : undefined}>
                      {item.label}
                    </span>
                    {item.children && (
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-3.5 opacity-70 transition-transform duration-200", open && "rotate-180")}
                      />
                    )}
                  </Link>

                  {item.children && (
                      <div
                        className={cn(
                          "absolute left-0 top-full z-50 w-80 origin-top-left pt-2 transition-[opacity,transform,visibility] duration-150 ease-out",
                          open ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-y-2 scale-[0.98] opacity-0",
                        )}
                      >
                        <ul className="rounded-2xl border border-sand-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgb(11_31_20/0.35)]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpenKey(null)}
                                className="group/item block rounded-xl px-4 py-2.5 text-ink transition-colors hover:bg-primary-50"
                              >
                                <span className="block text-[0.95rem] font-semibold transition-transform duration-200 group-hover/item:translate-x-1">
                                  {child.label}
                                </span>
                                {child.description && <span className="block text-sm text-muted">{child.description}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            data-cursor="SUPPORT"
            className="hidden min-h-11 items-center rounded-full bg-accent-400 px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.12em] text-primary-900 transition-transform hover:scale-[1.04] hover:bg-accent-300 sm:inline-flex"
          >
            Donate
          </Link>
          <MobileNav solid={solid} />
        </div>
      </div>
    </header>
  );
}
