import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { CTABand } from "@/components/sections/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Projects and activities of Community Engagements for Sustainable Transformation (CEST) in Masingbi and Tonkolili District, Sierra Leone.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work on the ground"
        intro="See what CEST is doing in the communities it serves. We publish only what we can verify, so some details are still to be added."
        crumbs={[{ label: "Projects" }]}
        image="/images/cest/farm-site-visit.jpg"
        imageAlt="CEST members walking between tall crops at a farm site"
      />
      <section className="bg-white py-20 sm:py-28">
        <Container className="max-w-[90rem]">
          <ProjectGrid projects={projects} />
        </Container>
      </section>
      <CTABand
        title="Want to support a project?"
        text="Partner with CEST or contribute to help these activities grow."
        cta="Learn About This Project"
        href="/partner"
      />
    </>
  );
}
