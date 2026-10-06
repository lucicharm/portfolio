export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
  // Labels the item and its case study as unfinished.
  inProgress?: boolean;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-programs-tooling",
    title: "Accessibility programs & tooling: Accessibility conformance report (ACR) Generator",
    description:
      "As sole designer and builder, I made a tool that drafts accessibility reports from Jira issues, with every conformance decision left to a human reviewer. Eight teammates now use it.",
  },
  {
    slug: "matrix-schedule-accessibility",
    title: "Accessible design: A clearer view of the matrix schedule",
    description:
      "Turning a complex class schedule into a text view screen-reader users can navigate by heading",
  },
  {
    slug: "acr-dashboard",
    title: "Accessibility programs & tooling: ACR Dashboard",
    description:
      "An internal dashboard I designed and built to track every ACR's status, report conformance to executives, and show where issues cluster so I know what to train teams on.",
  },
  {
    slug: "accessibility-design-handoff",
    title: "Accessibility in design handoff",
    description: "Making accessibility requirements actionable for engineering",
  },
  {
    slug: "sms-job-offers",
    title: "Inclusive product design: SMS job offers for substitute teachers",
    description:
      "Fewer than 5% of automated job-offer calls were answered. I designed two-way text offers that work on any phone, with no app or data plan, so substitutes can accept a job with one reply.",
    inProgress: true,
  },
  /*
  {
    slug: "accessible-design-systems",
    title: "Accessible design systems",
    description: "Designing components and patterns with accessibility built in",
  },
  */
];
