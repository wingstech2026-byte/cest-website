import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categorySlug, postCategories } from "@/data/news";
import { pageMetadata } from "@/lib/seo";
import { getPostsByCategory } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { NewsMagazine } from "@/components/home/NewsMagazine";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CategoryNav } from "@/components/sections/CategoryNav";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return postCategories.map((c) => ({ category: categorySlug(c) }));
}

export const dynamicParams = false;

function findCategory(slug: string) {
  return postCategories.find((c) => categorySlug(c) === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const name = findCategory(category);
  if (!name) return {};
  return pageMetadata({
    title: `${name}: News & Stories`,
    description: `CEST news and stories in the category: ${name}.`,
    path: `/news/category/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const name = findCategory(category);
  if (!name) notFound();
  const posts = await getPostsByCategory(category);

  return (
    <>
      <PageHero
        eyebrow="News & stories"
        title={name}
        crumbs={[{ label: "News & Stories", href: "/news" }, { label: name }]}
      />
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-[90rem]">
        <CategoryNav active={category} />
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sand-300 p-10 text-center">
            <p className="text-lg font-semibold">No {name.toLowerCase()} stories yet.</p>
            <p className="mt-2 text-muted">Check back soon, or browse all news.</p>
            <ButtonLink href="/news" variant="outline" className="mt-6">
              All news &amp; stories
            </ButtonLink>
          </div>
        ) : (
          <NewsMagazine posts={posts} />
        )}
        </Container>
      </section>
    </>
  );
}
