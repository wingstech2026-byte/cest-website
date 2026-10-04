import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { fullAddress, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200 bg-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-canvas/85">
      {/* Utility bar: desktop only */}
      <div className="hidden bg-primary-900 text-sm text-white xl:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-1.5">
          <p className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 text-accent-300" />
            <span>{fullAddress}</span>
          </p>
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phones[0].tel}`} className="flex items-center gap-2 hover:underline">
              <Phone aria-hidden="true" className="size-4 text-accent-300" />
              {site.phones[0].display}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:underline">
              <Mail aria-hidden="true" className="size-4 text-accent-300" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} (${site.shortName}), home`}>
          <Image src={site.logo} alt="" width={56} height={57} priority className="size-12 object-contain sm:size-14" />
          <span className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight text-primary-800">{site.shortName}</span>
            <span className="hidden max-w-[16rem] text-[0.7rem] font-medium text-muted sm:block">{site.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.95rem] font-semibold text-ink hover:bg-primary-50 hover:text-primary-800"
                >
                  {item.label}
                  {item.children && <ChevronDown aria-hidden="true" className="size-4 text-muted" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 w-80 pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl border border-sand-200 bg-white p-2 shadow-card">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block rounded-xl px-4 py-2.5 hover:bg-primary-50">
                            <span className="block text-[0.95rem] font-semibold text-ink">{child.label}</span>
                            {child.description && <span className="block text-sm text-muted">{child.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/donate" variant="accent" className="hidden min-h-11 px-5 sm:inline-flex">
            Donate
          </ButtonLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
