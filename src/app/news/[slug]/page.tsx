import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Mail, User } from "lucide-react";
import { formatDate } from "@/data/news";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { getPost, getPosts, getRelatedPosts } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Rich } from "@/components/ui/Placeholder";
import { PostCard } from "@/components/cards/Cards";
import { FacebookIcon, WhatsAppIcon, XIcon } from "@/components/ui/SocialIcons";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/news/${post.slug}`,
    image: post.image,
    noindex: post.isSample,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post);

  const url = `${site.url}/news/${post.slug}`;
  const enc = encodeURIComponent;
  const share = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, Icon: FacebookIcon },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(post.title)}`, Icon: XIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(`${post.title} ${url}`)}`, Icon: WhatsAppIcon },
    { label: "Share by email", href: `mailto:?subject=${enc(post.title)}&body=${enc(url)}`, Icon: null },
  ];

  return (
    <>
      {!post.isSample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            image: post.image ? `${site.url}${post.image}` : undefined,
            publisher: { "@id": `${site.url}/#organization` },
            mainEntityOfPage: url,
          }}
        />
      )}
      <PageHero
        eyebrow={post.category}
        title={post.title.replace(/^\[Sample Post\]\s*/, "")}
        crumbs={[{ label: "News & Stories", href: "/news" }, { label: post.category }]}
        intro={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1 text-base">
            <span className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <User aria-hidden="true" className="size-4" /> {post.author}
            </span>
          </span>
        }
      />
      <Section tone="canvas">
        <article className="mx-auto max-w-3xl">
          {post.isSample && (
            <p role="note" className="mb-8 rounded-xl border border-dashed border-[#c99a1b] bg-[#fff9e6] p-4 text-sm text-[#5c4300]">
              <strong>Sample post.</strong> This shows how a news story will look. It is not real CEST news.
            </p>
          )}
          {post.image && (
            <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={post.image} alt={post.imageAlt ?? ""} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}
          <p className="mb-6 text-xl leading-relaxed text-muted">{post.summary}</p>
          <div className="space-y-5 text-lg leading-relaxed">
            {post.body.map((para, i) => (
              <p key={i}>
                <Rich text={para} />
              </p>
            ))}
          </div>

          <div className="mt-10 border-t border-sand-200 pt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Share this story</h2>
            <ul className="flex flex-wrap gap-3">
              {share.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-12 items-center justify-center rounded-full border border-sand-300 bg-white text-primary-800 hover:bg-primary-50"
                  >
                    {Icon ? <Icon /> : <Mail aria-hidden="true" className="size-5" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Section>

      {related.length > 0 && (
        <Section tone="sand" labelledBy="related-title">
          <SectionHeading title="Related stories" id="related-title" />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
