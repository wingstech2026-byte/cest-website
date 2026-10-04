import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { getGallery } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Placeholder, Rich } from "@/components/ui/Placeholder";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: "Photos from the activities of Community Engagements for Sustainable Transformation (CEST) in Masingbi, Sierra Leone.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Photo gallery"
        intro="Moments from CEST’s activities in and around Masingbi."
        crumbs={[{ label: "Gallery" }]}
      />
      <Section tone="canvas">
        <p className="mb-8 text-sm text-muted">
          Dates and further details for each photo: <Placeholder>[ADD DETAILS]</Placeholder>
        </p>
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-sand-300 p-8 text-center text-muted">Photos will be added soon.</p>
        ) : (
          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((it) => (
              <li key={it.id} className="mb-5 break-inside-avoid">
                <figure className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-card">
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={800}
                    height={600}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                  <figcaption className="p-4 text-sm text-muted"><Rich text={it.caption} /></figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
