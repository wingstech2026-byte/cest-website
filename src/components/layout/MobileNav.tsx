"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/components/motion/hooks";
import { ButtonLink } from "@/components/ui/Button";

/** Full-screen menu for screens narrower than the desktop breakpoint (xl). */
export function MobileNav({ solid }: { solid: boolean }) {
  const pathname = usePathname();
  const isClient = useIsClient();
  // The menu is "open" only for the page it was opened on, so navigating closes it
  // without needing an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape to close, focus handling, scroll lock, simple focus trap.
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border transition-colors",
          solid ? "border-sand-300 bg-white text-ink hover:bg-primary-50" : "border-white/40 bg-white/10 text-white hover:bg-white/20",
        )}
      >
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <m.div
                key="panel"
                ref={panelRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night text-white xl:hidden"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-accent-300">Menu</span>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10"
                  >
                    <X aria-hidden="true" className="size-6" />
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>

                <nav aria-label="Mobile" className="flex-1 px-5 pb-6">
                  <ul>
                    {mainNav.map((item, i) => (
                      <m.li
                        key={item.href}
                        className="border-b border-white/10"
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                      >
                        {item.children ? (
                          <details className="group">
                            <summary className="flex min-h-16 items-center justify-between font-display text-3xl font-semibold">
                              {item.label}
                              <ChevronDown aria-hidden="true" className="chevron size-6 text-accent-300 transition-transform" />
                            </summary>
                            <ul className="mb-4 space-y-1 border-l-2 border-accent-400/60 pl-4">
                              <li>
                                <Link href={item.href} className="flex min-h-12 items-center font-semibold text-accent-300">
                                  {item.label} overview
                                </Link>
                              </li>
                              {item.children.map((child) => (
                                <li key={child.href}>
                                  <Link href={child.href} className="flex min-h-12 items-center text-lg text-white/90">
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <Link href={item.href} className="flex min-h-16 items-center font-display text-3xl font-semibold">
                            {item.label}
                          </Link>
                        )}
                      </m.li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-white/10 p-5">
                  <ButtonLink href="/donate" variant="accent" size="lg" className="w-full">
                    Support Our Work
                  </ButtonLink>
                </div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
