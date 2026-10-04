import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import {
  ContactCTA,
  DonateCTA,
  FeaturedProjects,
  GetInvolvedSection,
  Hero,
  ImpactSection,
  Intro,
  LatestNews,
  PartnersPlaceholder,
  ProgramsInFocus,
  StoryTeaser,
  VisionMission,
  WhatWeDo,
} from "@/components/sections/Sections";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} (${site.shortName}) | ${site.motto}`,
    description: `${site.shortName} supports communities, empowers young people and creates pathways toward sustainable transformation in Sierra Leone.`,
    path: "/",
  }),
  title: { absolute: `${site.name} (${site.shortName}) | ${site.motto}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <WhatWeDo />
      <ProgramsInFocus />
      <StoryTeaser />
      <VisionMission />
      <FeaturedProjects />
      <ImpactSection />
      <GetInvolvedSection />
      <LatestNews />
      <PartnersPlaceholder />
      <DonateCTA />
      <ContactCTA />
    </>
  );
}
