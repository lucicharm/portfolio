export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-programs-tooling",
    title: "Accessibility Programs & Tooling",
    description:
      "I designed and built an internal tool that drafts Accessibility Conformance Reports (ACRs) from Jira issues, with human review before publication. It cut update time from 40+ hours to 1–4 hours per report.",
  },
  {
    slug: "matrix-schedule-accessibility",
    title: "A Clearer View of the Matrix Schedule",
    description:
      "Turning a complex class schedule into a text view screen-reader users can navigate by heading",
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
