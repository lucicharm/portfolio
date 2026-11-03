import Link from "next/link";
import type { ReactNode } from "react";
import ProjectImage from "@/components/ProjectImage";

const LABEL = "font-mono text-sm tracking-[0.02em]";

function Band({
  id,
  tone,
  eyebrow,
  title,
  children,
}: {
  id: string;
  tone: "paper" | "panel";
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`border-t border-rule ${tone === "panel" ? "bg-panel" : "bg-paper"}`}
    >
      <div className="wrap py-14 sm:py-16">
        <p className={`${LABEL} text-mark mb-3`}>{eyebrow}</p>
        <h2
          id={id}
          className="text-2xl font-extrabold tracking-[-0.02em] max-w-[40rem] mb-6"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

const SHOT = { width: 1091, height: 940 };

const glance = [
  ["Role", "Sole designer and builder; owner of the ACR program"],
  ["Used by", "8 teammates so far"],
  ["Output", "About 4 to 6 customer-facing provisional ACR updates published"],
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
  ["40+ to 1-4 hrs", "Per ACR update"],
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
  back,
}: {
  title: string;
  description: string;
  back: { href: string; label: string };
}) {
  return (
    <>
      <header className="pt-8 pb-12">
        <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-5">
          <p className="mb-2">
            <Link
              href={back.href}
              className={`${LABEL} inline-flex min-h-11 items-center gap-1 text-ink-2`}
            >
              <span aria-hidden="true">←</span>
              {back.label}
            </Link>
          </p>
          <p className={`${LABEL} text-mark`}>{title}</p>
          <h1 className="max-w-[22ch] text-3xl font-extrabold leading-[1.08] tracking-[-0.03em]">
            An internal tool that turns a 40-hour accessibility report into a
            few hours
          </h1>
          <p className="max-w-[38rem] text-lg leading-normal text-ink-2">
            {description}
          </p>
          <dl className="grid max-w-[60rem] grid-cols-[minmax(0,1fr)] gap-x-8 border-t border-ink sm:grid-cols-3">
            {glance.map(([k, v]) => (
              <div key={k} className="grid content-start gap-1 border-b border-rule py-3">
                <dt className={`${LABEL} text-ink-2`}>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="wrap pb-14">
        <ProjectImage
          src="/images/acr-updater/updater-general-tab.png"
          {...SHOT}
          number={1}
          alt="The ACR Updater's General Information tab. A header shows the report type, WCAG 2.2 Level A and AA, and the report's Jira label, with Logout and Export to Word buttons. Tabs for General Information, WCAG 2.2, Revised Section 508, and EN 301 549 sit above a form with fields for product name, version, report date, product description, and evaluation methods."
          caption="The working view: product details, four standards tabs, and export to Word."
        />
      </div>

      <Band
        id="problem"
        tone="paper"
        eyebrow="The problem"
        title="Customers needed current accessibility reports. We could only afford them every two years."
      >
        <p className="text-lg leading-normal text-ink-2 max-w-[44rem]">
          Vendors typically updated our ACRs about every two years, and
          commissioning them more often wasn&apos;t practical. Doing it in-house
          took more than 40 hours per report. The audit data existed. Turning it
          into publishable documentation was the bottleneck.
        </p>
      </Band>

      <Band
        id="solution"
        tone="panel"
        eyebrow="The solution"
        title="Automate the busywork, keep the judgment human"
      >
        <ol className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-paper border border-rule-strong p-5">
              <p className={`${LABEL} text-mark mb-2`}>
                <span className="sr-only">Step </span>
                {i + 1}
              </p>
              <h3 className="text-lg font-semibold mb-1">{t}</h3>
              <p className="text-ink-2">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[44rem]">
          AI drafts the language. It never decides whether a product conforms.
        </p>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] md:grid-cols-2 gap-6">
          <ProjectImage
            src="/images/acr-updater/updater-login1.png"
            {...SHOT}
            number={2}
            alt="The ACR Updater start screen. An introduction explains that the tool loads accessibility issues by Jira label, and that each issue must also carry a WCAG success criterion label in the format WCAG_X.X.X. Below, a Get Started panel offers an optional drag-and-drop upload for an existing VPAT PDF."
            caption="Start: optionally import an existing VPAT PDF."
          />
          <ProjectImage
            src="/images/acr-updater/updater-login2.png"
            {...SHOT}
            number={3}
            alt="The rest of the start screen: required fields for Jira email address, Jira API token, and the VPAT Jira label for the report, a Continue button, and a privacy notice saying credentials stay in the browser session and are sent only to the company's Jira."
            caption="Connect: Jira credentials and the label that ties issues to this report."
          />
        </div>
        <div className="mt-8">
          <ProjectImage
            src="/images/acr-updater/updater-wcag-tab2.png"
            {...SHOT}
            number={4}
            alt="Part of the WCAG 2.2 review table. Criterion 1.2.3, Audio Description or Media Alternative, is set to Supports, with a red asterisk marking a drafted explanation that needs review. Criterion 1.3.1, Info and Relationships, is set to Partially Supports. Its draft explanation summarizes problems with table headers, headings, and form labels, and ten related Jira issues are listed beside it with statuses from Open to Closed."
            caption="Each criterion shows a proposed conformance level, an editable draft explanation, and the Jira issues behind it. A red asterisk flags drafts that need a person's review."
          />
        </div>
        <div className="mt-8">
          <ProjectImage
            src="/images/acr-updater/updater-508-tab.png"
            {...SHOT}
            number={5}
            alt="The Revised Section 508 tab. Criteria such as 302.1 Without Vision, 302.2 With Limited Vision, and 302.3 Without Perception of Color are each set to Partially Supports, with a remark listing the WCAG criteria that have documented issues, such as 1.4.3 Contrast (Minimum) and 1.4.11 Non-text Contrast."
            caption="Section 508 remarks point back to the WCAG criteria with documented issues."
          />
        </div>
      </Band>

      <Band
        id="impact"
        tone="paper"
        eyebrow="Projected impact"
        title="Estimated time returned to the program"
      >
        <ul
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] border-t border-ink"
          role="list"
        >
          {impact.map(([big, label]) => (
            <li key={big} className="grid content-start gap-1 border-b border-rule py-4 pr-4">
              <p className="text-2xl font-extrabold tabular-nums text-mark">{big}</p>
              <p className="font-semibold">{label}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-ink-2 mt-4 max-w-[44rem]">
          Projected, not yet measured. Based on a 40-hour manual baseline and a
          4-hour upper estimate with the tool: 62 ACRs × 36 hours = 2,232 hours.
        </p>
      </Band>

      <Band
        id="lessons"
        tone="panel"
        eyebrow="What I learned"
        title="Most of the work was changing team habits"
      >
        <ul className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-3 gap-4">
          {lessons.map(([t, d]) => (
            <li key={t} className="bg-paper border border-rule-strong p-5">
              <h3 className="text-lg font-semibold mb-2">{t}</h3>
              <p className="text-ink-2">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[44rem]">
          <span className="font-semibold">Next: </span>
          measure real production time, add version history and permissions, and
          import existing PDF ACRs to preserve their testing context.
        </p>
      </Band>
    </>
  );
}
