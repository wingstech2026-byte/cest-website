import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { FeaturedProjects, CTABand } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Projects and activities of Community Engagements for Sustainable Transformation (CEST) in Masingbi and Tonkolili District, Sierra Leone.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Projects & activities"
        intro="See what CEST is doing on the ground. We publish only what we can verify, so some details are still to be added."
        crumbs={[{ label: "Projects" }]}
      />
      <FeaturedProjects all />
      <CTABand
        title="Want to support a project?"
        text="Partner with CEST or contribute to help these activities grow."
        cta="Learn About This Project"
        href="/partner"
      />
    </>
  );
}
