import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { developer, fullAddress, site } from "@/data/site";
import { whatsappLink } from "@/lib/utils";
import { NewsletterForm } from "@/components/forms/Forms";
import { Placeholder } from "@/components/ui/Placeholder";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const socials = [
  { key: "facebook", label: "CEST on Facebook", Icon: FacebookIcon },
  { key: "x", label: "CEST on X", Icon: XIcon },
  { key: "instagram", label: "CEST on Instagram", Icon: InstagramIcon },
  { key: "youtube", label: "CEST on YouTube", Icon: YouTubeIcon },
  { key: "linkedin", label: "CEST on LinkedIn", Icon: LinkedInIcon },
] as const;

const actions = [
  { label: "Donate", href: "/donate", cursor: "SUPPORT" },
  { label: "Volunteer", href: "/volunteer", cursor: "JOIN" },
  { label: "Partner", href: "/partner", cursor: "JOIN" },
  { label: "Contact", href: "/contact", cursor: "WRITE" },
];

function LinkList({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-accent-300">{title}</h2>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1.5 text-white/85 transition-colors hover:text-white">
              <span className="link-underline">{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The final chapter of the story: a closing statement, four ways to act, then the details. */
export function Footer() {
  const activeSocials = socials.filter((s) => site.social[s.key]);
  const devLink = whatsappLink(developer.whatsappNumber, "Hello, I saw the CEST website and would like to get in touch.");
  return (
    <footer className="bg-night text-white">
      <div className="weave" aria-hidden="true" />

      {/* Closing statement */}
      <div className="mx-auto max-w-[90rem] px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-accent-300">The next chapter is yours</p>
        <p className="font-display text-[clamp(2.2rem,9vw,8rem)] font-semibold uppercase leading-[0.95] tracking-tight">
          Let’s build a<br />
          <span className="italic text-accent-300">better</span> community.
        </p>
        <ul className="mt-14 grid grid-cols-1 border-t border-white/20 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((a) => (
            <li key={a.href} className="border-b border-white/20 sm:border-r sm:last:border-r-0 lg:border-b-0">
              <Link
                href={a.href}
                data-cursor={a.cursor}
                className="group flex items-center justify-between gap-4 px-1 py-7 text-2xl font-semibold transition-colors hover:bg-white/5 sm:px-6"
              >
                {a.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-7 text-accent-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Details */}
      <div className="mx-auto grid grid-cols-1 max-w-[90rem] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-12">
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
          <p className="mt-5 max-w-sm leading-relaxed text-white/85">
            A community-focused organization in Masingbi, Sierra Leone, working through community engagement,
            youth-led action, capacity building, education and entrepreneurship.
          </p>
          <address className="mt-5 space-y-2 text-sm not-italic text-white/85">
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
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-300">Follow CEST</h2>
            {activeSocials.length > 0 ? (
              <ul className="flex gap-3">
                {activeSocials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
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
          <LinkList title="Explore" links={footerLinks.quick} />
          <LinkList title="Programs" links={footerLinks.programs} />
          <LinkList title="Get involved" links={footerLinks.involved} />
        </div>

        <div className="lg:col-span-3">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-300">Newsletter</h2>
          <p className="mb-4 text-white/85">Get news and updates from CEST.</p>
          <NewsletterForm tone="dark" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-3 px-5 py-6 text-sm text-white/80 sm:px-8 md:flex-row md:items-center md:justify-between">
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
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-center gap-x-3 gap-y-2 px-5 pb-6 text-sm text-white/80 sm:px-8">
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
              href={devLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline hover:text-accent-300"
            >
              {developer.name}
              <span className="sr-only"> (contact on WhatsApp, opens in a new tab)</span>
            </a>
            <span aria-hidden="true"> · </span>
            WhatsApp:{" "}
            <a
              href={devLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline hover:text-accent-300"
            >
              {developer.whatsappDisplay}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
