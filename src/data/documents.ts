/**
 * Organizational documents shown on the Accountability page and homepage.
 * Set `available: false` (or remove the file from public/documents) to take a
 * document offline. Only documents CEST has approved for publication belong here.
 */

export interface OrgDocument {
  id: string;
  title: string;
  description: string;
  /** Path in /public, or null while the document is not yet available. */
  file: string | null;
  available: boolean;
  meta: string;
}

export const documents: OrgDocument[] = [
  {
    id: "constitution",
    title: "CEST Constitution",
    description:
      "The supreme governing document of CEST: its vision, mission, objectives, membership rules, structure and financial provisions. Adopted on 14 January 2022.",
    file: "/documents/cest-constitution.pdf",
    available: true,
    meta: "PDF · 16 pages",
  },
  { id: "annual-report", title: "Annual Reports", description: "Yearly reports on CEST’s activities and results.", file: null, available: false, meta: "[ADD WHEN AVAILABLE]" },
  { id: "financial-report", title: "Financial Reports", description: "Audited financial statements, once an external audit is completed.", file: null, available: false, meta: "[ADD WHEN AVAILABLE]" },
  { id: "policies", title: "Policies", description: "Safeguarding, code of conduct and other approved policies.", file: null, available: false, meta: "[ADD WHEN APPROVED]" },
  { id: "project-reports", title: "Project Reports", description: "Reports on individual projects and their verified results.", file: null, available: false, meta: "[ADD WHEN AVAILABLE]" },
];

export const constitutionDoc = documents[0];
