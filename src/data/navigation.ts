import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about#our-story", description: "From KADA in 2014 to CEST today" },
      { label: "Vision & Mission", href: "/about#vision-mission", description: "What we work toward" },
      { label: "Objectives", href: "/about#objectives", description: "What CEST sets out to do" },
      { label: "Values", href: "/about#values", description: "Principles that guide us" },
      { label: "Organizational Structure", href: "/about#structure", description: "How CEST is governed" },
      { label: "Leadership", href: "/leadership", description: "Executive and corporate structure" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "Youth Empowerment", href: "/programs/youth-empowerment" },
      { label: "Entrepreneurship & Business Development", href: "/programs/entrepreneurship-business-development" },
      { label: "Education & Skills Training", href: "/programs/education-skills-training" },
      { label: "Peacebuilding & Community Engagement", href: "/programs/peacebuilding-community-engagement" },
      { label: "Health & Sanitation", href: "/programs/health-sanitation" },
      { label: "Research & Consultancy", href: "/programs/research-consultancy" },
      { label: "Community Development", href: "/programs/community-development" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Impact", href: "/impact" },
  {
    label: "Get Involved",
    href: "/get-involved",
    children: [
      { label: "Volunteer", href: "/volunteer", description: "Share your skills and time" },
      { label: "Partner With Us", href: "/partner", description: "Collaborate on initiatives" },
      { label: "Donate", href: "/donate", description: "Support our work" },
      { label: "Membership", href: "/membership", description: "Express interest in joining" },
    ],
  },
  { label: "News & Stories", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  quick: [
    { label: "About CEST", href: "/about" },
    { label: "Our Projects", href: "/projects" },
    { label: "Impact", href: "/impact" },
    { label: "Leadership", href: "/leadership" },
    { label: "Gallery", href: "/gallery" },
    { label: "News & Stories", href: "/news" },
  ],
  programs: [
    { label: "Youth Empowerment", href: "/programs/youth-empowerment" },
    { label: "Entrepreneurship", href: "/programs/entrepreneurship-business-development" },
    { label: "Education & Skills", href: "/programs/education-skills-training" },
    { label: "Peacebuilding", href: "/programs/peacebuilding-community-engagement" },
    { label: "Health & Sanitation", href: "/programs/health-sanitation" },
    { label: "All programs", href: "/programs" },
  ],
  involved: [
    { label: "Volunteer", href: "/volunteer" },
    { label: "Partner With Us", href: "/partner" },
    { label: "Donate", href: "/donate" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Code of Conduct", href: "/code-of-conduct" },
  ],
};
