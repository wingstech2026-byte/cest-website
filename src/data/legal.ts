/**
 * Legal / trust pages. These contain placeholders only; no official CEST policy has
 * been supplied, and none is invented here. Replace each placeholder with approved text.
 */

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPage {
  slug: "privacy" | "terms" | "safeguarding" | "code-of-conduct";
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}

const P = "[POLICY TEXT TO BE PROVIDED AND APPROVED BY CEST]";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How CEST handles information collected through this website.",
    intro:
      "This page is a working draft. The final privacy policy must be reviewed and approved by CEST before the website is publicised.",
    sections: [
      {
        heading: "What this website collects",
        body: [
          "When you submit a form (contact, volunteer, partnership, membership interest or newsletter), the information you enter, such as your name, email address, phone number and message, is sent to CEST so that CEST can respond to you.",
          "This website does not run advertising trackers. [CONFIRM once analytics or other services are added.]",
        ],
      },
      { heading: "How information is used and kept", body: [P] },
      { heading: "Your rights and how to contact CEST about your data", body: [P] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "Terms for using the CEST website.",
    intro: "This page is a placeholder until CEST provides approved terms of use.",
    sections: [
      { heading: "Use of this website", body: [P] },
      { heading: "Content and copyright", body: [P] },
      { heading: "Limitation of liability", body: [P] },
    ],
  },
  {
    slug: "safeguarding",
    title: "Safeguarding",
    description: "CEST’s commitment to protecting children and vulnerable people.",
    intro:
      "CEST works with children and young people. A formal safeguarding policy approved by CEST has not yet been supplied for this website. This page is a placeholder and does not represent an approved CEST policy.",
    sections: [
      { heading: "Our commitment", body: [P] },
      { heading: "Photographs and consent", body: [P] },
      { heading: "Reporting a concern", body: [`Contact: ${P}`] },
    ],
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    description: "Standards of behaviour expected of CEST members, staff and volunteers.",
    intro:
      "This page is a placeholder until CEST provides its approved code of conduct. The constitution contains rules of conduct for members; a public code of conduct should be drawn from it and approved by CEST.",
    sections: [
      { heading: "Standards of behaviour", body: [P] },
      { heading: "Volunteers and partners", body: [P] },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((p) => p.slug === slug);
}
