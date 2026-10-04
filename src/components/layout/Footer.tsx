import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { developer, fullAddress, site } from "@/data/site";
import { NewsletterForm } from "@/components/forms/Forms";
import { whatsappLink } from "@/lib/utils";
import { Placeholder } from "@/components/ui/Placeholder";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const socials = [
  { key: "facebook", label: "CEST on Facebook", Icon: FacebookIcon },
  { key: "x", label: "CEST on X", Icon: XIcon },
  { key: "instagram", label: "CEST on Instagram", Icon: InstagramIcon },
  { key: "youtube", label: "CEST on YouTube", Icon: YouTubeIcon },
  { key: "linkedin", label: "CEST on LinkedIn", Icon: LinkedInIcon },
] as const;

function LinkList({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">{title}</h2>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1.5 text-white/90 hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const activeSocials = socials.filter((s) => site.social[s.key]);
  return (
    <footer className="bg-primary-900 text-white">
      <div className="weave" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-white p-1.5">
              <Image src={site.logo} alt="CEST logo" width={56} height={57} className="size-14 object-contain" />
            </span>
            <span>
              <span className="block text-2xl font-extrabold">{site.shortName}</span>
              <span className="block font-medium text-accent-300">“{site.motto}”</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-white/90">
            A community-focused organization in Masingbi, Sierra Leone, working through community engagement,
            youth-led action, capacity building, education and entrepreneurship.
          </p>
          <address className="mt-5 space-y-2 text-sm not-italic text-white/90">
            <p className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              {fullAddress}
            </p>
            <p className="flex items-start gap-2">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              <span>
                {site.phones.map((p, i) => (
                  <span key={p.tel}>
                    {i > 0 && " · "}
                    <a href={`tel:${p.tel}`} className="hover:underline">
                      {p.display}
                    </a>
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              <a href={`mailto:${site.email}`} className="break-all hover:underline">
                {site.email}
              </a>
            </p>
          </address>

          <div className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">Follow CEST</h2>
            {activeSocials.length > 0 ? (
              <ul className="flex gap-3">
                {activeSocials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">
                <Placeholder>[ADD SOCIAL MEDIA LINKS]</Placeholder>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <LinkList title="Quick links" links={footerLinks.quick} />
          <LinkList title="Programs" links={footerLinks.programs} />
          <LinkList title="Get involved" links={footerLinks.involved} />
        </div>

        <div className="lg:col-span-3">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-accent-300">Newsletter</h2>
          <p className="mb-4 text-white/90">Get news and updates from CEST.</p>
          <NewsletterForm tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/85 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Community Engagements for Sustainable Transformation (CEST). All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {footerLinks.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 pb-6 text-sm text-white/85 sm:px-8">
          <Image
            src={developer.photo}
            alt={`Portrait of ${developer.name}, website developer`}
            width={40}
            height={40}
            className="size-10 rounded-full border-2 border-white/30 object-cover"
          />
          <p>
            Developed by{" "}
            <a
            href={whatsappLink(developer.whatsappNumber, "Hello, I saw the CEST website and would like to get in touch.")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white underline hover:text-accent-300"
          >
            {developer.name}
            <span className="sr-only"> (contact on WhatsApp, opens in a new tab)</span>
          </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
