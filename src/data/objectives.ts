/**
 * Website presentation of the objectives in Constitution Article 2(c)–(d).
 * These groupings are for readability only; they are not new objectives.
 */

export interface ObjectiveGroup {
  id: string;
  title: string;
  summary: string;
  items: string[];
}

export const objectiveGroups: ObjectiveGroup[] = [
  {
    id: "youth-entrepreneurship",
    title: "Youth & Entrepreneurship",
    summary: "Capacity building, business support, mentoring, access to finance and jobs.",
    items: [
      "Build the capacity of young men and women so they can be self-reliant.",
      "Provide capacity building, technical assistance and financial support to emerging young entrepreneurs, and help them sustain their businesses.",
      "Provide business support services to enterprising young people, including business management skills and access to financial services.",
      "Mentor young men and women in enterprise development and business activities, with access to credit and financial support.",
      "Create employment through small business development and partnerships.",
      "Serve as a training ground for young people to champion their own welfare, economic, social and development issues.",
      "Encourage hard work, determination and dedication among young people, in place of drug abuse, violence, cultism and other social vices.",
    ],
  },
  {
    id: "education-skills",
    title: "Education & Skills",
    summary: "Skills training, business and financial management, knowledge sharing and TVET.",
    items: [
      "Run skills training and capacity-building workshops on developing and implementing business plans, business management and financial management.",
      "Share knowledge and best practices on sustainable enterprises.",
      "Strengthen technical and vocational education and training (TVET), formal and non-formal, for young people.",
      "Provide training services to non-formal groups, youth groups, SMEs and community-based organisations.",
      "Run public campaigns encouraging parents to send their children to school.",
    ],
  },
  {
    id: "community-development",
    title: "Community Development",
    summary: "Peacebuilding, health, sanitation, emergency support and community engagement.",
    items: [
      "Help reactivate national consciousness and love for our nation.",
      "Take part in peacebuilding engagements at community level and serve as a network for conflict resolution.",
      "Promote good health and sanitation by sensitizing communities on health-related issues.",
      "Come to the aid of the community in emergencies.",
      "Conduct edutainment programs for national development and take part in other social activities.",
      "Seek the welfare of all members.",
    ],
  },
  {
    id: "research-consultancy",
    title: "Research & Consultancy",
    summary: "Research, needs assessments, operational documents, roadmaps and consultancy.",
    items: [
      "Undertake research and other consultancies.",
      "Carry out needs assessments.",
      "Develop operational documents and roadmaps.",
    ],
  },
  {
    id: "partnerships",
    title: "Partnerships",
    summary: "Working with development partners, government, donors, youth organizations, SMEs and CBOs.",
    items: [
      "Collaborate with development partners working toward similar goals.",
      "Implement donor-funded or government-funded projects for the benefit of all.",
      "Build youth groups, SMEs and community-based organisations through training services.",
      "Create a reliable network that recognises youth and youth-led organisations’ contribution to national development, within Sierra Leone and globally.",
      "Create employment opportunities for facilitators and members.",
      "Provide general merchandise to clients and partners.",
    ],
  },
];

/** Principles drawn from the constitution (Articles 2(f), 3 and 27) and presented as values. */
export const values = [
  {
    title: "Community-led change",
    text: "Lasting change starts with communities engaging with one another and with their own challenges.",
  },
  {
    title: "Youth leadership",
    text: "Young people are partners and leaders in development, not only beneficiaries.",
  },
  {
    title: "Responsible citizenship",
    text: "We encourage love for our country and a sense of responsibility to build it up.",
  },
  {
    title: "Neutrality and non-discrimination",
    text: "CEST is neutral on politics, religion, race and tradition, and opposes discrimination based on ethnic origin, gender, language, religion or politics.",
  },
  {
    title: "Education as a tool",
    text: "Our symbol’s academic hat reflects our belief in education as a tool for sustainable transformation.",
  },
  {
    title: "Respect and solidarity",
    text: "Members respect each other’s views and stand in solidarity in times of illness, loss and hardship.",
  },
  {
    title: "Accountability",
    text: "Funds raised are used only to further CEST’s aims, and accounts are open to audit.",
  },
] as const;
