/** Facts from the constitution (Article 2 and Article 29). Nothing else is claimed. */
export const timeline = [
  {
    year: "2014",
    title: "Where it began",
    text: "The organization began as the Kunike Academic Descendants’ Association (KADA), formed by a coalition of students from Kunike Sanda chiefdom.",
  },
  {
    year: "2018",
    title: "A new name",
    text: "The association changed its name to Community Engagements for Sustainable Transformation (CEST).",
  },
  {
    year: "2022",
    title: "A formal constitution",
    text: "CEST’s constitution was formally adopted on 14 January 2022, setting out its aims, membership and structure.",
  },
] as const;

/** “Change starts with…” word sequence. Each line restates documented aims, with no claims about results. */
export const changeWords = [
  { word: "People", line: "Young people and community members are where every CEST effort begins." },
  { word: "Community", line: "Communities engaging with one another, and with their own challenges." },
  { word: "Action", line: "Youth-led action: training, mentoring, enterprise support and peacebuilding." },
  { word: "Impact", line: "Results we publish only once we have verified them." },
  { word: "Transformation", line: "Sustainable improvement in people’s lives, for a better nation." },
] as const;

/** Documentary stages. “The result” is deliberately a placeholder until CEST supplies verified results. */
export const documentaryStages = [
  {
    label: "The challenge",
    title: "A country with many challenges to meet.",
    text: "CEST was founded to help meet the challenges Sierra Leone faces, through community engagement and youth-led action rather than waiting for change to arrive from outside.",
  },
  {
    label: "The people",
    title: "Members at home and across the world.",
    text: "Young people, community members and CEST members in Sierra Leone and in the diaspora, like-minded people who serve as change agents for their society.",
  },
  {
    label: "The action",
    title: "Training, mentoring, peacebuilding, enterprise.",
    text: "Capacity building for young entrepreneurs, skills training, community peacebuilding, health and sanitation sensitization, and support for communities in emergencies.",
  },
  {
    label: "The result",
    title: "Results we can stand behind.",
    text: "We publish results only once they are verified. [ADD VERIFIED RESULTS]",
  },
  {
    label: "The future",
    title: "A better and more prosperous nation.",
    text: "Responsible citizens, strong youth-led institutions and a sustainable improvement in people’s lives. That is the future CEST is working toward.",
  },
] as const;

export const missionPoints = [
  "Mainstreaming young people and youth-led institutions to bring about positive change",
  "Respecting human rights and the rule of law",
  "Increasing the participation of every Sierra Leonean in the country’s development",
] as const;

export const visionIdeas = [
  "Social transformation",
  "Community engagement",
  "Youth-led action",
  "Responsible citizenship",
  "Positive national development",
  "Sustainable improvement in people’s lives",
] as const;
