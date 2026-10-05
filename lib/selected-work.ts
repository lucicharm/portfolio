export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-tooling",
    title: "Accessibility Tooling",
    description: "Turning accessibility processes into usable tools",
  },
  {
    slug: "accessible-design-systems",
    title: "Accessible Design Systems",
    description: "Designing components and patterns with accessibility built in",
  },
  {
    slug: "accessibility-design-handoff",
    title: "Accessibility in Design Handoff",
    description: "Making accessibility requirements actionable for engineering",
  },
];
