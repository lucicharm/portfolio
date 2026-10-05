export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-programs-tooling",
    title: "Accessibility programs & tooling: ACR Generator",
    description:
      "As sole designer and builder, I made a tool that drafts accessibility reports from Jira issues, with every conformance decision left to a human reviewer. Eight teammates now use it.",
  },
  {
    slug: "matrix-schedule-accessibility",
    title: "Accessible design: A Clearer View of the Matrix Schedule",
    description:
      "Turning a complex class schedule into a text view screen-reader users can navigate by heading",
  },
  /*
  {
    slug: "accessible-design-systems",
    title: "Accessible design systems",
    description: "Designing components and patterns with accessibility built in",
  },
  */
  {
    slug: "accessibility-design-handoff",
    title: "Accessibility in design handoff",
    description: "Making accessibility requirements actionable for engineering",
  },
];
