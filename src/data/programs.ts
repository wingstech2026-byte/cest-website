import type { Program } from "@/types";

/**
 * Program content is a public-facing rewrite of CEST's aims and objectives
 * (Constitution, Article 2). "Activities" and "expected outcomes" describe the
 * kinds of work and intended direction named in the constitution; CEST should add
 * specific locations, numbers and dates once verified.
 */
export const programs: Program[] = [
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    icon: "users",
    summary:
      "Capacity building, mentoring, enterprise development and opportunities for young people.",
    description:
      "CEST works to strengthen the capacity of young men and women and support pathways toward self-reliance through training, mentoring, entrepreneurship and business support. It also gives young people a platform to take the lead on the welfare, economic, social and development issues that affect them.",
    objectives: [
      "Strengthen the capacity of young men and women so they can become self-reliant.",
      "Mentor young people in enterprise development and business activities.",
      "Provide training services and capacity building to non-formal youth groups.",
      "Create a network that recognises the contribution of youth and youth-led organisations to national development.",
      "Serve as a training ground where young people champion their own welfare, economic, social and development issues.",
      "Encourage hard work, determination and dedication as alternatives to drug abuse, violence, cultism and other social vices.",
    ],
    beneficiaries: [
      "Young men and women",
      "Youth groups and youth-led organisations",
      "Non-formal groups seeking training",
    ],
    activities: [
      "Capacity-building workshops and training sessions",
      "Mentoring in enterprise and business activities",
      "Youth-led community engagement",
      "Edutainment and social programs",
    ],
    outcomes: [
      "More young people able to earn a living and support themselves",
      "Stronger, better-recognised youth-led organisations",
      "Young people taking part in decisions that affect their communities",
    ],
  },
  {
    slug: "entrepreneurship-business-development",
    title: "Entrepreneurship & Business Development",
    icon: "briefcase",
    summary:
      "Support for emerging entrepreneurs, SMEs and youth-led businesses.",
    description:
      "CEST supports emerging young business owners with capacity building, technical assistance and business support services, and helps them find ways to sustain and grow their enterprises. Our aim is to create employment through small business development and partnerships.",
    objectives: [
      "Provide capacity building, technical assistance and financial support to emerging young businesswomen and businessmen, and help them sustain their businesses.",
      "Offer business support services and business management skills to enterprising young people.",
      "Help young entrepreneurs access financial services, mentoring and credit.",
      "Share knowledge and best practices on sustainable enterprises.",
      "Create employment through small business development and partnerships.",
    ],
    beneficiaries: [
      "Emerging young entrepreneurs",
      "Small and medium-sized enterprises (SMEs)",
      "Youth-led businesses and groups",
    ],
    activities: [
      "Training on developing and implementing business plans",
      "Business and financial management workshops",
      "Mentoring for young entrepreneurs",
      "Linking entrepreneurs with financial services",
    ],
    outcomes: [
      "More sustainable youth-owned businesses",
      "Improved business and financial management skills",
      "New employment opportunities created through small businesses",
    ],
  },
  {
    slug: "education-skills-training",
    title: "Education & Skills Training",
    icon: "graduation-cap",
    image: "/images/cest/quiz-audience-wide.jpg",
    imageAlt: "Pupils, teachers and parents gathered at CEST’s quiz and spelling bee competition at Masingbi Court Barray",
    summary:
      "Training, knowledge sharing, business management and technical/vocational capacity building.",
    description:
      "Education is at the heart of CEST’s symbol, an academic hat, and of its work. CEST runs skills training and capacity-building workshops, supports technical and vocational education and training (TVET), and campaigns for parents to send their children to school.",
    objectives: [
      "Deliver skills training and capacity-building workshops on business planning, business management, financial management and knowledge sharing.",
      "Build capacity of youth groups, SMEs, community-based organisations and non-formal TVET groups through training services.",
      "Support formal and non-formal technical and vocational education and training (TVET) for young people.",
      "Run public campaigns encouraging parents to send their children to school.",
      "Conduct edutainment programs that contribute to national development.",
    ],
    beneficiaries: [
      "Young people seeking practical skills",
      "Non-formal TVET groups",
      "School pupils, parents and teachers",
      "Community-based organisations (CBOs) and SMEs",
    ],
    activities: [
      "Skills training and workshops",
      "Quiz and spelling bee competitions for primary school pupils in Masingbi",
      "Public campaigns on school attendance",
      "Edutainment events",
    ],
    outcomes: [
      "Practical skills that open pathways to work and enterprise",
      "More children encouraged to attend and stay in school",
      "Stronger non-formal training groups",
    ],
  },
  {
    slug: "peacebuilding-community-engagement",
    title: "Peacebuilding & Community Engagement",
    icon: "handshake",
    image: "/images/cest/community-meeting.jpg",
    imageAlt: "Community members seated in a circle under a thatched shelter, in a discussion led by a speaker",
    summary:
      "Community-level peacebuilding, conflict resolution and social cohesion.",
    description:
      "CEST’s symbol, a hand holding three people, stands for standing together for development and social cohesion. We take part in peacebuilding at community level and serve as a network for conflict resolution, working to build a united and responsible citizenship.",
    objectives: [
      "Undertake peacebuilding engagements at community level.",
      "Serve as a network for conflict resolution.",
      "Help reactivate national consciousness and love for our nation, laying a building block for responsible citizenship.",
      "Stay neutral on politics, religion, race and tradition, and oppose discrimination of any kind.",
    ],
    beneficiaries: [
      "Community members and community leaders",
      "Young people and families",
      "Groups involved in disputes at community level",
    ],
    activities: [
      "Community dialogue and engagement meetings",
      "Conflict-resolution support",
      "Awareness on responsible and patriotic citizenship",
    ],
    outcomes: [
      "Stronger social cohesion within communities",
      "Disputes addressed through dialogue",
      "Communities and young people working together for development",
    ],
  },
  {
    slug: "health-sanitation",
    title: "Health & Sanitation",
    icon: "heart-pulse",
    summary:
      "Community sensitization and activities promoting health and sanitation.",
    description:
      "CEST promotes good health and sanitation by actively sensitizing communities on health-related issues, and comes to the aid of communities during emergencies.",
    objectives: [
      "Promote good health and sanitation by sensitizing communities on health-related issues.",
      "Come to the aid of the community in emergencies.",
    ],
    beneficiaries: ["Community members and families", "Communities affected by emergencies"],
    activities: [
      "Community health and sanitation sensitization",
      "Emergency response support",
    ],
    outcomes: [
      "Greater community awareness of health and sanitation",
      "Support available to communities when emergencies strike",
    ],
  },
  {
    slug: "research-consultancy",
    title: "Research & Consultancy",
    icon: "search",
    summary:
      "Research, needs assessments, operational documents, roadmaps and consultancy services.",
    description:
      "CEST undertakes research and consultancy work for partners and clients, including needs assessments and the development of operational documents and roadmaps. This is part of CEST’s corporate work and helps generate income that supports its mission.",
    objectives: [
      "Undertake research and other consultancies.",
      "Carry out needs assessments and develop operational documents and roadmaps.",
      "Implement donor-funded or government-funded projects for the benefit of all.",
    ],
    beneficiaries: [
      "Development partners, NGOs and government bodies",
      "Community-based organisations and youth groups",
      "Businesses and clients seeking consultancy",
    ],
    activities: [
      "Needs assessments",
      "Research studies",
      "Development of operational documents and roadmaps",
      "Consultancy services",
    ],
    outcomes: [
      "Well-informed programs and projects built on evidence",
      "Clear roadmaps and operational plans for partners",
    ],
  },
  {
    slug: "community-development",
    title: "Community Development",
    icon: "home",
    image: "/images/cest/farm-site-visit.jpg",
    imageAlt: "CEST members walking through a tall-grass farm site during a site visit",
    summary:
      "Collaboration, welfare and community-led development initiatives, including food security.",
    description:
      "CEST brings communities, members and partners together around practical development. We collaborate with development partners, support members’ welfare, and take part in community-level work including food security, where CEST has been recognised by the Ministry of Agriculture and Food Security in Tonkolili District.",
    objectives: [
      "Collaborate with development partners working on similar goals.",
      "Seek the welfare of all members.",
      "Implement donor-funded or government-funded projects for the benefit of all.",
      "Participate in social activities and edutainment for national development.",
      "Come to the aid of communities in emergencies.",
    ],
    beneficiaries: [
      "Communities in Masingbi and surrounding areas",
      "CEST members at home and in the diaspora",
      "Farmers and community groups",
    ],
    activities: [
      "Community engagement and social activities",
      "Partnership projects with development partners and government",
      "Farming and food-security activities [ADD INFORMATION]",
    ],
    outcomes: [
      "Communities and partners working together on shared priorities",
      "Improved welfare for members and communities",
    ],
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}

