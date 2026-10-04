/**
 * Content types. Every content collection on the site (programs, projects,
 * news, team, gallery, impact) has a type here so it can later be served from a
 * CMS or database (see src/lib/content.ts) without touching the UI.
 */

export type IconName =
  | "users"
  | "briefcase"
  | "graduation-cap"
  | "handshake"
  | "heart-pulse"
  | "search"
  | "home"
  | "sprout";

export interface Program {
  slug: string;
  title: string;
  icon: IconName;
  /** Only set when a real CEST photo genuinely matches the program. */
  image?: string;
  imageAlt?: string;
  /** One-sentence card summary. */
  summary: string;
  description: string;
  objectives: string[];
  beneficiaries: string[];
  activities: string[];
  outcomes: string[];
}

export type ProjectStatus = "Ongoing" | "Completed" | "Planned" | "[ADD STATUS]";

export interface Project {
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  /** Overview paragraphs. */
  description: string[];
  challenge: string;
  approach: string;
  activities: string[];
  beneficiaries: string[];
  impact: string;
  partners: string[];
  timeline: Array<{ when: string; what: string }>;
  image?: string;
  imageAlt?: string;
  /** True while the entry is a template waiting for real, verified details. */
  isPlaceholder: boolean;
  gallery?: string[];
}

export type PostCategory =
  | "Community Stories"
  | "Youth"
  | "Education"
  | "Entrepreneurship"
  | "Peacebuilding"
  | "Health"
  | "Events"
  | "Announcements";

export interface Post {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  category: PostCategory;
  author: string;
  summary: string;
  /** Paragraphs of plain text. A CMS can later supply rich text instead. */
  body: string[];
  image?: string;
  imageAlt?: string;
  isSample: boolean;
}

export interface Person {
  id: string;
  position: string;
  /** Left as a placeholder until CEST supplies verified, approved details. */
  name: string | null;
  photo: string | null;
  group: "executive" | "corporate" | "governance";
  note?: string;
  /** Only set when CEST officially provides it. */
  linkedin?: string;
}

export interface ImpactStat {
  id: string;
  label: string;
  icon: IconName;
  /** null = no verified figure yet; the UI shows "coming soon". */
  value: number | null;
  asOf?: string;
  /** Shown in the big homepage numbers. */
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** What the picture is: a verified CEST photo or a stand-in. */
  source: "cest" | "placeholder";
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  /** Echoed back on error so the form can keep what the person typed. */
  values?: Record<string, string>;
}


export interface Location {
  id: string;
  name: string;
  /** null until CEST confirms a verified operating location. */
  lat: number | null;
  lng: number | null;
  kind: "base" | "project" | "community" | "program" | "placeholder";
  note: string;
}

export interface Partner {
  name: string;
  logo: string;
  href?: string;
}
