export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-programs-tooling",
    title: "Accessibility Programs & Tooling",
    description: "Building durable systems that make accessibility continuous, scalable, and accountable",
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
