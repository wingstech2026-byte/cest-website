import type { Metadata } from "next";
import { site } from "@/data/site";

interface PageMeta {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL and og:url. */
  path: string;
  image?: string;
  noindex?: boolean;
}

/** Builds consistent title, description, canonical, Open Graph and Twitter/X metadata. */
export function pageMetadata({ title, description, path, image, noindex }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const images = [{ url: image ?? "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.shortName}: ${site.motto}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.shortName}`,
      description,
      url,
      locale: "en_GB",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.shortName}`,
      description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.motto,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    email: site.email,
    telephone: site.phones.map((p) => p.tel),
    description:
      "A community-focused organization in Sierra Leone working through community engagement, youth-led action, capacity building, entrepreneurship, education, peacebuilding and development initiatives.",
    foundingDate: String(site.foundedAs.year),
    areaServed: { "@type": "Country", name: "Sierra Leone" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressCountry: site.address.countryCode,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}
