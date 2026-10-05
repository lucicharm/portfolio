export type SelectedWorkItem = {
  title: string;
  description: string;
  // Set href when a sample page is ready.
  href?: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    title: "Accessibility Tooling",
    description: "Turning accessibility processes into usable tools",
  },
  {
    title: "Accessible Design Systems",
    description: "Designing components and patterns with accessibility built in",
  },
  {
    title: "Accessibility in Design Handoff",
    description: "Making accessibility requirements actionable for engineering",
  },
];
