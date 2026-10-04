import type { Project } from "@/types";
import { PLACEHOLDER } from "./site";

const TBC = "[ADD VERIFIED DATA]";

/**
 * Projects. Two entries are real CEST activities evidenced by CEST’s own photos and
 * documents; only what those sources show is stated, everything else is a placeholder.
 * The third is a template showing administrators how a project appears.
 */
export const projects: Project[] = [
  {
    slug: "quiz-and-spelling-bee",
    title: "Quiz & Spelling Bee Competition",
    location: "Masingbi, Tonkolili District",
    status: "[ADD STATUS]",
    summary:
      "A quiz and spelling bee competition bringing together primary school pupils, teachers and parents in Masingbi.",
    description: [
      "CEST organises a quiz and spelling bee competition for primary schools in Masingbi Town. The events bring pupils, teachers and parents together at Masingbi Court Barray, with a panel of judges, prizes and certificates of participation for those who take part.",
      "The competition reflects CEST’s commitment to education as a tool for sustainable transformation, and its objective of encouraging children’s education and a culture of hard work and dedication.",
    ],
    challenge: `${TBC} (the specific education challenge this project responds to)`,
    approach:
      "CEST brings schools together around a friendly, public competition: a quiz and spelling bee judged by a panel, celebrated with prizes and certificates, and attended by teachers and parents.",
    activities: [
      "Quiz competition between primary schools",
      "Spelling bee",
      "A panel of judges",
      "Prizes and certificates of participation",
      "Guests and community members attending",
    ],
    beneficiaries: ["Primary school pupils in Masingbi Town", "Teachers and parents who attend"],
    impact: `${TBC} (e.g. number of schools and pupils reached)`,
    partners: [PLACEHOLDER],
    timeline: [
      { when: PLACEHOLDER, what: "First edition of the competition" },
      { when: PLACEHOLDER, what: "Most recent edition" },
    ],
    image: "/images/cest/quiz-audience-wide.jpg",
    imageAlt:
      "Pupils, teachers and parents seated together at CEST’s quiz and spelling bee competition at Masingbi Court Barray",
    isPlaceholder: false,
    gallery: [
      "/images/cest/quiz-hall.jpg",
      "/images/cest/quiz-judges-panel.jpg",
      "/images/cest/prize-presentation-a.jpg",
      "/images/cest/prizes-display.jpg",
      "/images/cest/participation-certificate.jpg",
    ],
  },
  {
    slug: "food-security-and-farming",
    title: "Food Security & Farming",
    location: "Masingbi, Tonkolili District",
    status: "[ADD STATUS]",
    summary:
      "Participation in rice, cassava and potato production, recognised by the Ministry of Agriculture and Food Security.",
    description: [
      "In a March 2025 attestation, the Ministry of Agriculture and Food Security (Tonkolili District) recognised CEST as a progressive partner of the Ministry, actively participating in the production of rice, cassava and potato, and encouraging other farmers to take part in the value chain and the drive toward food self-sufficiency.",
    ],
    challenge: `${TBC} (the specific food-security challenge this project responds to)`,
    approach:
      "CEST works alongside the Ministry of Agriculture and Food Security in Tonkolili District: taking part in production itself and encouraging other farmers to join the value chain.",
    activities: [
      "Production of rice, cassava and potato",
      "Encouraging other farmers to take part in the value chain",
      "Supporting the food self-sufficiency drive",
    ],
    beneficiaries: [`${TBC} (farmers and families involved)`],
    impact: `${TBC} (e.g. farm size, farmers involved, yields)`,
    partners: ["Ministry of Agriculture and Food Security (MAFS), Tonkolili District"],
    timeline: [
      { when: "March 2025", what: "Ministry of Agriculture and Food Security attestation recognising CEST as a progressive partner" },
      { when: PLACEHOLDER, what: "Further milestones" },
    ],
    image: "/images/cest/farm-site-visit.jpg",
    imageAlt: "CEST members walking through tall crops at a farm site during a site visit",
    isPlaceholder: false,
  },
  {
    slug: "project-name-placeholder",
    title: "[Project Name]",
    location: "[Location]",
    status: "[ADD STATUS]",
    summary: "[Add project description]",
    description: [
      "This is a template. When CEST has a verified project to share, an administrator adds its details in src/data/projects.ts (or later in the CMS): name, location, status, overview, challenge, approach, activities, beneficiaries, verified impact, partners, timeline and photos.",
    ],
    challenge: "[Add the challenge]",
    approach: "[Add the approach]",
    activities: ["[Add activities]"],
    beneficiaries: ["[Add beneficiaries]"],
    impact: "[Add verified impact]",
    partners: ["[Add partners]"],
    timeline: [{ when: "[Date]", what: "[Milestone]" }],
    isPlaceholder: true,
  },
];

export function statusIsPlaceholder(status: string) {
  return status.startsWith("[");
}
