import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PostCard } from "@/components/cards/Cards";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { NewsletterForm } from "@/components/forms/Forms";

export const metadata: Metadata = pageMetadata({
  title: "News & Stories",
  description: "News, community stories and updates from Community Engagements for Sustainable Transformation (CEST).",
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero
        eyebrow="News & stories"
        title="News & stories"
        intro="Updates, events and stories from CEST and the communities we work with."
        crumbs={[{ label: "News & Stories" }]}
      />
      <Section tone="canvas">
        <CategoryNav />
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-sand-300 p-8 text-center text-muted">No stories have been published yet.</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Section tone="sand">
        <div className="mx-auto max-w-xl">
          <h2 className="text-2xl font-bold">Get CEST news by email</h2>
          <p className="mb-6 mt-2 text-muted">Occasional updates about our work. Unsubscribe at any time.</p>
          <NewsletterForm />
        </div>
      </Section>
    </>
  );
}
