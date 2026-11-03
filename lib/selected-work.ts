export type SelectedWorkItem = {
  slug: string;
  title: string;
  description: string;
  // Labels the item and its case study as unfinished.
  inProgress?: boolean;
  // Shown in `npm run dev` only; left out of production builds, so an
  // outline with open questions never reaches the live site.
  draft?: boolean;
  // Slug of the case study this item is an appendix of. Appendices keep
  // their own page but are left out of the Selected Work list.
  parent?: string;
  // Drawn tile for the Work page card, picked to echo the case study.
  // Items without one get a plain title tile.
  thumbnail?: "products" | "swatches" | "schedule" | "messages" | "code";
};

const allWork: SelectedWorkItem[] = [
  {
    slug: "ai-prototyping",
    title: "AI-assisted prototyping: Design system rules built into every prototype",
    description:
      "My team built tools that let 12 designers prototype with AI in real code that follows our design system. When a design needs to break a rule, the exception and the reason are recorded for engineers.",
    inProgress: true,
    thumbnail: "code",
  },
  {
    slug: "accessibility-program",
    title: "Accessibility program: From no documentation to 40 products",
    description:
      "I built PowerSchool's accessibility program from nothing: an ACR process, tooling, a champions network, and training. Every product now has an ACR, and teams own accessibility instead of waiting on me to approve it.",
    thumbnail: "products",
  },
  {
    slug: "accessible-design-systems",
    title: "Design systems: Accessibility built into the tokens",
    description:
      "In a palette of about 100 colors, a small set of semantic tokens carries meaning. Contrast is checked once on token pairs, and one three-band focus ring works on every background.",
    thumbnail: "swatches",
  },
  {
    slug: "design-system-operations",
    title: "Design systems: From 0% to nearly 80% adoption across 40 products",
    description:
      "I lead the team of 6 that built PowerSchool's framework-agnostic design system and got it adopted by nearly 80% of a 40-product portfolio.",
    draft: true,
    inProgress: true,
  },
  {
    slug: "matrix-schedule-accessibility",
    title: "Accessible design: A clearer view of the matrix schedule",
    description:
      "Turning a complex class schedule into a text view screen-reader users can navigate by heading",
    thumbnail: "schedule",
  },
  {
    slug: "sms-job-offers",
    title: "Inclusive product design: SMS job offers for substitute teachers",
    description:
      "Fewer than 5% of automated job-offer calls were answered. I designed two-way text offers that work on any phone, with no app or data plan, so substitutes can accept a job with one reply.",
    inProgress: true,
    thumbnail: "messages",
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

export const selectedWork = allWork.filter(
  (item) => !item.draft || process.env.NODE_ENV !== "production",
);

// The case studies listed on the Work page, in order.
export const topLevelWork = selectedWork.filter((item) => !item.parent);
