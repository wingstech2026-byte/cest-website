import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Admin (planned)",
  robots: { index: false, follow: false },
};

/**
 * Placeholder for the future admin dashboard. It exists to show the intended
 * structure and is protected by src/proxy.ts. It manages nothing yet: content is
 * edited in src/data/* until a CMS is connected (see src/lib/content.ts).
 */
const modules = [
  { name: "Dashboard", note: "Overview of recent activity" },
  { name: "Projects", note: "Add and edit projects (today: src/data/projects.ts)" },
  { name: "News", note: "Publish stories (today: src/data/news.ts)" },
  { name: "Programs", note: "Edit program content (today: src/data/programs.ts)" },
  { name: "Team", note: "Leadership names and photos (today: src/data/leadership.ts)" },
  { name: "Volunteers", note: "Review volunteer applications (today: email / form_submissions table)" },
  { name: "Donations", note: "Needs a payment provider" },
  { name: "Messages", note: "Contact form messages (today: email / form_submissions table)" },
  { name: "Impact statistics", note: "Verified figures (today: src/data/impact.ts)" },
  { name: "Users", note: "Admin accounts and roles" },
  { name: "Settings", note: "Site-wide settings (today: src/data/site.ts and environment variables)" },
];

export default function AdminPage() {
  return (
    <Section tone="canvas" className="pt-36">
      <h1 className="text-3xl font-bold">Admin dashboard (planned)</h1>
      <p className="mt-3 max-w-2xl text-muted">
        This area is a placeholder for CEST’s future content management dashboard. No data is managed here yet.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <li key={m.name} className="rounded-2xl border border-sand-200 bg-white p-5">
            <h2 className="text-lg font-bold">{m.name}</h2>
            <p className="mt-1 text-sm text-muted">{m.note}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-secondary-700">Planned</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
