import Link from "next/link";
import type { ReactNode } from "react";

const INK = "text-[#14261f]";
const TEAL = "text-[#0b5d4f]";

function Band({
  id,
  tone,
  eyebrow,
  title,
  children,
}: {
  id: string;
  tone: "white" | "mint";
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={tone === "mint" ? "bg-[#edf2f0]" : "bg-white"}
    >
      <div className="max-w-5xl mx-auto px-6 py-14 sm:py-16">
        <p
          className={`font-sans text-xs font-bold uppercase tracking-wider ${TEAL} mb-3`}
        >
          {eyebrow}
        </p>
        <h2
          id={id}
          className={`font-display font-semibold text-3xl ${INK} leading-tight max-w-3xl mb-6`}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Placeholder({
  title,
  show,
  alt,
}: {
  title: string;
  show: string;
  alt: string;
}) {
  return (
    <figure className="mt-8 border-2 border-dashed border-[#6b7f77] rounded-xl bg-[#f4f6f5] p-6">
      <p
        className={`font-sans text-xs font-bold uppercase tracking-wider ${TEAL} mb-1`}
      >
        Screenshot placeholder
      </p>
      <figcaption className={`font-display font-semibold text-lg ${INK} mb-2`}>
        {title}
      </figcaption>
      <p className="font-sans text-base text-[#374151] leading-relaxed">
        <span className="font-semibold">To show: </span>
        {show}
      </p>
      <p className="font-sans text-sm text-[#374151] leading-relaxed mt-2">
        <span className="font-semibold">Alt text: </span>
        {alt}
      </p>
    </figure>
  );
}

const glance = [
  ["Role", "Sole designer and builder; owner of the ACR program"],
  ["Used by", "8 teammates so far"],
  ["Output", "About 4–6 customer-facing provisional ACR updates published"],
];

const steps = [
  [
    "Connect",
    "Load an existing ACR and pull open accessibility issues from Jira.",
  ],
  [
    "Draft",
    "The tool maps issues to WCAG criteria, proposes conformance updates, and drafts plain-language explanations.",
  ],
  ["Review", "A person edits every proposed change in context."],
  [
    "Export",
    "An editable Word document in our VPAT template, published only after human review.",
  ],
];

const impact = [
  ["40+ → 1–4 hrs", "Per ACR update"],
  ["≈90%", "Less production time"],
  ["2,232+ hrs", "Saved across 62 ACRs"],
];

const lessons = [
  [
    "Influence without authority",
    "The tool only works if teams label tickets consistently. I got there with training, short docs, and repeating the why, not by mandate.",
  ],
  [
    "Design for change",
    "Jira epics proved fragile as work moved around, so I'm shifting to durable audit labels that stay attached to each issue.",
  ],
  [
    "Own the whole system",
    "I also trained teammates in keyboard and screen-reader testing so more people can check the evidence behind each statement.",
  ],
];

export default function AcrToolPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <header className="bg-white">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          <Link
            href="/portfolio"
            className="font-sans text-sm text-[#374151] underline underline-offset-4 hover:text-primary transition-colors mb-10 inline-block"
          >
            ← Back to work
          </Link>
          <p
            className={`font-sans text-xs font-bold uppercase tracking-wider ${TEAL} mb-4`}
          >
            {title}
          </p>
          <h1
            className={`font-display font-light text-4xl sm:text-5xl ${INK} leading-[1.1] tracking-tight max-w-3xl mb-6`}
          >
            An internal tool that turns a 40-hour accessibility report into a
            few hours
          </h1>
          <p className="font-sans text-lg text-[#374151] leading-relaxed max-w-2xl">
            {description}. I designed and built a tool that drafts Accessibility
            Conformance Reports (ACRs) from current Jira issues, with human
            review required before anything is published.
          </p>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#aebbb6] pt-6">
            {glance.map(([k, v]) => (
              <div key={k}>
                <dt className="font-sans text-xs font-bold uppercase tracking-wider text-[#374151] mb-1">
                  {k}
                </dt>
                <dd className={`font-sans text-base font-medium ${INK}`}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pb-14">
        <Placeholder
          title="Product overview"
          show="Full-width screenshot of the tool on the WCAG criteria view, with product details and related Jira issues visible."
          alt="Internal ACR drafting tool showing product information, WCAG criteria, related Jira accessibility issues, and draft remarks ready for human review."
        />
      </div>

      <Band
        id="problem"
        tone="white"
        eyebrow="The problem"
        title="Customers needed current accessibility reports. We could only afford them every two years."
      >
        <p className="font-sans text-lg text-[#374151] leading-relaxed max-w-3xl">
          Vendors typically updated our ACRs about every two years, and
          commissioning them more often wasn&apos;t practical. Doing it in-house
          took more than 40 hours per report. The audit data existed. Turning it
          into publishable documentation was the bottleneck.
        </p>
      </Band>

      <Band
        id="solution"
        tone="mint"
        eyebrow="The solution"
        title="Automate the busywork, keep the judgment human"
      >
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(([t, d], i) => (
            <li
              key={t}
              className="bg-white border border-[#c9d3cf] rounded-xl p-5"
            >
              <p className={`font-mono text-xs ${TEAL} mb-2`}>
                <span className="sr-only">Step </span>
                {i + 1}
              </p>
              <h3 className={`font-display font-semibold text-lg ${INK} mb-1`}>
                {t}
              </h3>
              <p className="font-sans text-base text-[#374151] leading-relaxed">
                {d}
              </p>
            </li>
          ))}
        </ol>
        <p className="font-sans text-base text-[#374151] leading-relaxed mt-6 max-w-3xl">
          AI drafts the language. It never decides whether a product conforms.
        </p>

        <Placeholder
          title="Jira connection and evaluation setup"
          show="The Jira connection state, the open-issues scope, and the form for product and evaluation details. Blur any sensitive project data."
          alt="Tool setup screen with an active Jira connection, issue scope, and fields for product and evaluation details."
        />
        <Placeholder
          title="Reviewing a WCAG criterion"
          show="One WCAG 2.2 criterion with its related Jira issues, the proposed conformance level, and the editable draft explanation."
          alt="WCAG 2.2 criterion review screen showing related open Jira issues, a proposed conformance level, and an editable draft explanation."
        />
        <Placeholder
          title="Standards tabs and Word export"
          show="Tabs for WCAG 2.2, Revised Section 508 and EN 301 549, with the export-to-Word action."
          alt="ACR tool with tabs for WCAG 2.2, Revised Section 508, and EN 301 549, and an action to export an editable Word document."
        />
      </Band>

      <Band
        id="impact"
        tone="white"
        eyebrow="Projected impact"
        title="Estimated time returned to the program"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {impact.map(([big, label]) => (
            <li
              key={big}
              className="border border-[#c9d3cf] rounded-xl p-6 bg-[#f4f6f5]"
            >
              <p className={`font-display font-light text-3xl ${INK}`}>{big}</p>
              <p className="font-sans text-base text-[#374151] mt-1">{label}</p>
            </li>
          ))}
        </ul>
        <p className="font-sans text-sm text-[#374151] leading-relaxed mt-4 max-w-3xl">
          Projected, not yet measured. Based on a 40-hour manual baseline and a
          4-hour upper estimate with the tool: 62 ACRs × 36 hours = 2,232 hours.
        </p>
      </Band>

      <Band
        id="lessons"
        tone="mint"
        eyebrow="What I learned"
        title="The hard part wasn't the code"
      >
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lessons.map(([t, d]) => (
            <li
              key={t}
              className="bg-white border border-[#c9d3cf] rounded-xl p-5"
            >
              <h3 className={`font-display font-semibold text-lg ${INK} mb-2`}>
                {t}
              </h3>
              <p className="font-sans text-base text-[#374151] leading-relaxed">
                {d}
              </p>
            </li>
          ))}
        </ul>
        <p className="font-sans text-base text-[#374151] leading-relaxed mt-6 max-w-3xl">
          <span className={`font-semibold ${INK}`}>Next: </span>
          measure real production time, add version history and permissions, and
          import existing PDF ACRs to preserve their testing context.
        </p>
      </Band>
    </>
  );
}
