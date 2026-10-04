import type { Project } from "@/types";
import { PLACEHOLDER } from "./site";

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
      `Dates, participating schools, number of pupils, sponsors and results: ${PLACEHOLDER}`,
    ],
    impact: "[ADD VERIFIED IMPACT, e.g. number of schools and pupils reached]",
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
      `Farm size, number of farmers involved, seasons and results: ${PLACEHOLDER}`,
    ],
    impact: "[ADD VERIFIED IMPACT]",
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
      "This is a template. When CEST has a verified project to share, an administrator adds its details in src/data/projects.ts (or later in the CMS): name, location, status, description, verified impact and photos.",
    ],
    impact: "[Add verified impact]",
    isPlaceholder: true,
  },
];

export function statusIsPlaceholder(status: string) {
  return status.startsWith("[");
}
