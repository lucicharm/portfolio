export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
  // Labels the item and its case study as unfinished.
  inProgress?: boolean;
  // Slug of the case study this item is an appendix of. Appendices keep
  // their own page but are left out of the Selected Work list.
  parent?: string;
};

export const selectedWork: SelectedWorkItem[] = [
  {
    slug: "accessibility-program",
    title: "Accessibility program: From no documentation to 40 products",
    description:
      "I built PowerSchool's accessibility program from nothing: an ACR process, tooling, a champions network, and training. Every product now has an ACR, and teams own accessibility instead of waiting on me to approve it.",
  },
  {
    slug: "accessible-design-systems",
    title: "Design systems: Accessibility built into the tokens",
    description:
      "In a palette of about 100 colors, a small set of semantic tokens carries meaning. Contrast is checked once on token pairs, and one three-band focus ring works on every background.",
    inProgress: true,
  },
  {
    slug: "matrix-schedule-accessibility",
    title: "Accessible design: A clearer view of the matrix schedule",
    description:
      "Turning a complex class schedule into a text view screen-reader users can navigate by heading",
  },
  {
    slug: "sms-job-offers",
    title: "Inclusive product design: SMS job offers for substitute teachers",
    description:
      "Fewer than 5% of automated job-offer calls were answered. I designed two-way text offers that work on any phone, with no app or data plan, so substitutes can accept a job with one reply.",
    inProgress: true,
  },
  // Appendices to the accessibility program case study.
  {
    slug: "accessibility-programs-tooling",
    title: "Accessibility programs & tooling: Accessibility conformance report (ACR) Generator",
    description:
      "As sole designer and builder, I made a tool that drafts accessibility reports from Jira issues, with every conformance decision left to a human reviewer. Eight teammates now use it.",
    parent: "accessibility-program",
  },
  {
    slug: "acr-dashboard",
    title: "Accessibility programs & tooling: ACR Dashboard",
    description:
      "An internal dashboard I designed and built to track every ACR's status, report conformance to executives, and show where issues cluster so I know what to train teams on.",
    parent: "accessibility-program",
  },
];

// The case studies listed on the Work page, in order.
export const topLevelWork = selectedWork.filter((item) => !item.parent);
