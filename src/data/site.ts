/**
 * Core organisation facts. Source: CEST Constitution (adopted 14 January 2022),
 * CEST letterhead, and registration documents supplied by CEST.
 * Anything unknown is the PLACEHOLDER string so it is easy to find and replace.
 */

export const PLACEHOLDER = "[ADD INFORMATION]";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const site = {
  name: "Community Engagements for Sustainable Transformation",
  shortName: "CEST",
  motto: "Building a Better Community",
  tagline:
    "Supporting communities, empowering young people, and creating pathways toward sustainable transformation in Sierra Leone.",
  url: siteUrl,
  email: "cestmasingbi2018@gmail.com",
  phones: [
    { display: "+232 78865887", tel: "+23278865887" },
    { display: "+232 88554636", tel: "+23288554636" },
    { display: "+232 88472158", tel: "+23288472158" },
  ],
  address: {
    street: "38A Kono Road",
    locality: "Masingbi",
    country: "Sierra Leone",
    countryCode: "SL",
  },
  /**
   * CEST's official WhatsApp number (confirmed by CEST), international format, digits only.
   * Can be overridden with NEXT_PUBLIC_WHATSAPP_NUMBER.
   */
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "23278865887").replace(/\D/g, ""),
  /** Social links: leave empty until official pages are confirmed. */
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },
  /**
   * Map pin for Masingbi (coordinates from the Google Maps place CEST supplied).
   * This marks the town, not the exact building; replace with a precise pin for
   * 38A Kono Road via NEXT_PUBLIC_MAP_EMBED_URL when available.
   */
  mapCoordinates: { lat: 8.636758, lng: -11.4722494 },
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
    "https://maps.google.com/maps?q=8.636758,-11.4722494&z=15&output=embed",
  foundedAs: {
    name: "Kunike Academic Descendants’ Association (KADA)",
    year: 2014,
  },
  renamedYear: 2018,
  constitutionAdopted: "14 January 2022",
  logo: "/logo/cest-logo.jpg",
} as const;

/** Website developer credit shown in the footer. This is NOT CEST's WhatsApp number. */
export const developer = {
  name: "S.A. Marrah",
  whatsappNumber: "8619382020640",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.country}`;

/** Legal status shown as a trust signal. Sourced from certificates supplied by CEST. Numbers are deliberately NOT published. */
export const legalStatus = [
  {
    body: "Corporate Affairs Commission, Sierra Leone",
    detail: "Incorporated as a private company limited by guarantee on 7 February 2025.",
  },
  {
    body: "Ministry of Social Welfare (Tonkolili District)",
    detail: "Registered as a Community Based Organization; renewed annually.",
  },
  {
    body: "Tonkolili District Council",
    detail: "Registered as a Community Based Organization; renewed annually.",
  },
  {
    body: "Ministry of Agriculture and Food Security (Tonkolili District)",
    detail:
      "Recognised in a March 2025 attestation as a progressive partner participating in rice, cassava and potato production.",
  },
] as const;
