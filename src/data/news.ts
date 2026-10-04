import type { Post, PostCategory } from "@/types";

export const postCategories: PostCategory[] = [
  "Community Stories",
  "Youth",
  "Education",
  "Entrepreneurship",
  "Peacebuilding",
  "Health",
  "Events",
  "Announcements",
];

export function categorySlug(c: PostCategory) {
  return c.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Sample posts only, to show the layout. None of this content is real: replace
 * these entries (or connect a CMS in src/lib/content.ts) with CEST’s actual stories.
 * Posts with `isSample: true` are marked "noindex" and left out of the sitemap.
 */
export const posts: Post[] = [
  {
    slug: "sample-announcement-post",
    title: "[Sample Post] Announcing a CEST update",
    date: "2026-01-01",
    category: "Announcements",
    author: "[Author name]",
    summary:
      "This is a sample announcement that shows how a news article appears. Replace it with a real CEST announcement.",
    body: [
      "[ADD INFORMATION] This sample post shows how an announcement looks: a featured image, title, date, category, author, summary and full article.",
      "To publish a real story, add a new entry to src/data/news.ts, or connect a CMS in src/lib/content.ts. Each post needs a slug, title, date, category, author, summary and body paragraphs.",
    ],
    isSample: true,
  },
  {
    slug: "sample-event-post",
    title: "[Sample Post] Event report template",
    date: "2026-01-02",
    category: "Events",
    author: "[Author name]",
    summary: "A sample event report layout. Replace with a real report on a CEST event.",
    body: [
      "[ADD INFORMATION] Describe the event: what happened, where and when, who took part and what it achieved.",
      "Use only verified facts and photos CEST has permission to publish, especially photos of children.",
    ],
    isSample: true,
  },
  {
    slug: "sample-community-story",
    title: "[Sample Post] Community story template",
    date: "2026-01-03",
    category: "Community Stories",
    author: "[Author name]",
    summary: "A sample community story layout. Replace with a real story told with the person’s consent.",
    body: [
      "[ADD INFORMATION] Tell the story in the person’s own words where possible, and only with their written consent.",
    ],
    isSample: true,
  },
];

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
