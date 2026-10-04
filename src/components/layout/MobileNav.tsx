"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";

/** Hamburger menu for screens narrower than the desktop breakpoint (xl). */
export function MobileNav() {
  const pathname = usePathname();
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
    const previouslyFocused = openerRef.current;
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
      previouslyFocused?.focus();
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
        className="inline-flex size-12 items-center justify-center rounded-full border border-sand-300 bg-white text-ink hover:bg-primary-50"
      >
        <Menu aria-hidden="true" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      {open &&
        createPortal(
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-canvas xl:hidden"
        >
          <div className="flex items-center justify-between border-b border-sand-200 px-5 py-3">
            <span className="text-lg font-extrabold text-primary-800">Menu</span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-sand-300 bg-white"
            >
              <X aria-hidden="true" className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 px-5 py-4">
            <ul className="divide-y divide-sand-200">
              {mainNav.map((item) => (
                <li key={item.href}>
                  {item.children ? (
                    <details className="group">
                      <summary className="flex min-h-14 items-center justify-between text-lg font-semibold">
                        {item.label}
                        <ChevronDown aria-hidden="true" className="chevron size-5 text-muted transition-transform" />
                      </summary>
                      <ul className="mb-3 space-y-1 border-l-2 border-primary-200 pl-4">
                        <li>
                          <Link href={item.href} className="flex min-h-12 items-center text-base font-semibold text-primary-700">
                            {item.label} overview
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="flex min-h-12 items-center text-base">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href} className="flex min-h-14 items-center text-lg font-semibold">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-sand-200 p-5">
            <ButtonLink href="/donate" variant="accent" size="lg" className="w-full">
              Support Our Work
            </ButtonLink>
          </div>
        </div>,
        document.body,
        )}
    </div>
  );
}
