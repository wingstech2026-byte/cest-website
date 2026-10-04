import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getPosts } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { NewsMagazine } from "@/components/home/NewsMagazine";
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
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-[90rem]">
          <CategoryNav />
          <NewsMagazine posts={posts} />
        </Container>
      </section>
      <section className="bg-sand-100 py-20">
        <Container className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold">Get CEST news by email</h2>
          <p className="mb-6 mt-2 text-muted">Occasional updates about our work. Unsubscribe at any time.</p>
          <NewsletterForm />
        </Container>
      </section>
    </>
  );
}
