import type { Person } from "@/types";

/**
 * Leadership roles from the Constitution (Articles 22–27). Names and photos are
 * intentionally null: they must only be published once CEST supplies verified,
 * approved details. Set `name` and `photo` to show a real person.
 */
const role = (
  id: string,
  position: string,
  group: Person["group"],
  note?: string,
): Person => ({ id, position, group, name: null, photo: null, note });

export const leadership: Person[] = [
  // Executive Management Body (general membership level)
  role("president", "President", "executive", "Presides over executive and general meetings."),
  role("vice-president", "Vice President", "executive", "Assumes the President’s duties in their absence."),
  role("secretary-general", "Secretary General", "executive", "Keeps records and handles the Association’s correspondence."),
  role("assistant-secretary-general", "Assistant Secretary General", "executive"),
  role("financial-secretary", "Financial Secretary", "executive", "Oversees the Association’s financial records and receipts."),
  role("social-secretary-pro", "Social Secretary / Public Relations Officer", "executive", "Leads social activities and communicates with the public."),
  role("auditor-general", "Auditor General", "executive", "Heads the audit team reviewing financial records."),

  // Governance bodies
  role("board-of-directors", "Board of Directors", "governance", "The strategic corporate face of CEST. A minimum of five and a maximum of seven members."),
  role("advisory-board", "Advisory Board", "governance", "Advises the executive on the smooth running of the Association."),
  role("committees", "Committees", "governance", "Disciplinary, Social and Micro-Finance committees, plus other functional committees."),

  // Corporate management
  role("executive-director", "Executive Director", "corporate"),
  role("ceo-founder", "CEO & Founder", "corporate"),
  role("admin-officer", "Admin Officer", "corporate"),
  role("programs-manager", "Programs Manager", "corporate"),
  role("finance-officer", "Finance Officer", "corporate"),
  role("procurement-officer", "Procurement Officer", "corporate"),
  role("field-officers", "Programs Training Facilitators / Field Officers", "corporate"),
  role("marketing-communication-officer", "Marketing & Communication Officer", "corporate"),
  role("operations-officer", "Operations Officer", "corporate"),
];

export const leadershipGroups = [
  {
    id: "executive",
    title: "Executive Management Body",
    intro:
      "Elected and appointed officers who run the day-to-day affairs of the CEST Association at general membership level.",
  },
  {
    id: "governance",
    title: "Governance bodies",
    intro: "Bodies that provide oversight, strategic direction and advice.",
  },
  {
    id: "corporate",
    title: "Corporate management",
    intro:
      "The management team for CEST’s corporate work, reporting to the Board of Directors.",
  },
] as const;
