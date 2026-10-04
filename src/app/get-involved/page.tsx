import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { GetInvolvedPaths } from "@/components/home/GetInvolvedPaths";

export const metadata: Metadata = pageMetadata({
  title: "Get Involved",
  description:
    "Volunteer, partner, donate or express interest in membership. Join Community Engagements for Sustainable Transformation (CEST) in building a better community.",
  path: "/get-involved",
});

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="Help build a better community"
        intro="There are many ways to be part of CEST’s work. Choose the one that fits you."
        crumbs={[{ label: "Get Involved" }]}
        image="/images/cest/participants-organisers.jpg"
        imageAlt="Pupils and CEST organisers standing together after a spelling bee event"
      />
      <GetInvolvedPaths />
    </>
  );
}
