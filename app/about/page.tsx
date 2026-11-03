import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "UX Principal with 20+ years of experience in accessibility, design systems, and inclusive product design. Currently at PowerSchool, serving millions of users worldwide.",
};

const experience = [
  {
    title: "UX Principal, Design System & Accessibility",
    company: "PowerSchool",
    scope: "40 products · Millions of users worldwide",
    period: "Apr 2022 – Present",
    highlights: [
      "Lead a cross-functional team of 6 designers, engineers, and writers building and scaling a framework-agnostic design system adopted by nearly 80% of PowerSchool's 40-product portfolio, reducing design and engineering debt while creating greater consistency across products.",
      "Built PowerSchool's enterprise accessibility program from the ground up, establishing a repeatable approach to accessibility documentation, evaluation, remediation, and organizational accountability across more than 40 products.",
      "Managed the VPAT/ACR program across 40 products, defining scope, managing third-party accessibility vendors, and driving the organization from zero prior accessibility documentation to comprehensive product coverage within five years.",
      "Established and lead a cross-organizational network of accessibility champions, defining company-wide accessibility policy, standards, and best practices while distributing accessibility ownership across product teams.",
      "Train technical writers and QA engineers in accessibility evaluation using Axe, manual testing, and assistive technologies including NVDA and VoiceOver, building sustainable accessibility capability beyond a centralized expert model.",
      "Advise product and design teams on accessible interaction patterns, WCAG requirements, design decisions, and remediation priorities throughout the product-development process.",
      "Present accessibility strategy and design-system roadmaps to executive leadership, translating product quality, accessibility, and regulatory requirements into organizational priorities.",
      "Mentor and coach designers in interaction design, accessibility, design craft, and leadership, increasing accessibility expertise throughout the design organization.",
      "Pioneer AI-assisted prototyping workflows using LLMs to rapidly generate reusable code prototypes and bridge the gap between design intent and engineering implementation.",
      "Oversee localization design for products translated into dozens of languages, including complex writing systems such as Arabic and Thai.",
    ],
  },
  {
    title: "UX Designer",
    company: "PowerSchool",
    period: "Aug 2018 – Apr 2022",
    highlights: [
      "Conducted user research and usability testing, including research with deaf and blind users, to identify usability and accessibility barriers and inform product design decisions.",
      "Designed wireframes, prototypes, and high-fidelity experiences for web and mobile applications across the education product suite.",
      "Led end-to-end product design for teacher evaluation and education-focused HR tools used by school districts nationwide.",
      "Partnered with cross-functional teams to translate research findings and user needs into practical product improvements.",
    ],
  },
  {
    title: "UX Designer",
    company: "PeopleAdmin (formerly Performance Matters)",
    period: "Oct 2015 – Aug 2018",
    highlights: [
      "Defined the UI style guide for a re-branded enterprise application, establishing visual standards, accessibility requirements, and voice and tone guidelines.",
      "Conducted accessibility audits of customer-facing applications and translated WCAG 2.0 findings into actionable remediation recommendations.",
      "Managed an offshore development team through a full enterprise UI rebrand and platform update, collaborating across design and engineering to carry design decisions through implementation.",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "Q2 Software",
    period: "Jan 2014 – Sep 2015",
    highlights: [
      "Led the design of a new treasury management product that opened a new business line for the company.",
      "Helped define company-wide user research processes and UI/interaction patterns for mobile and desktop banking software.",
      "Introduced a usability-testing program that provided rapid design feedback while helping new employees learn the product.",
    ],
  },
  {
    title: "Founding Designer → Design Lead",
    company: "Tk20, Inc.",
    period: "Jun 2002 – Jan 2014",
    highlights: [
      "Joined as a founding team member and helped grow the company from 4 employees and 1 client to 80+ employees serving more than 200 institutions.",
      "Built and led a design team of 4, providing art direction across products and customer-facing experiences while overseeing information architecture for educational assessment and learning-management systems.",
      "Established the company's design and development training program, embedding usability and accessibility practices across global teams.",
      "Created the company's corporate identity, branding, marketing materials, and online presence from the ground up.",
    ],
  },
];

const competencies = [
  "Accessibility strategy & governance",
  "WCAG",
  "Inclusive product design",
  "Design systems",
  "Accessible components & patterns",
  "Interaction design",
  "Figma",
  "Assistive technology and screen readers",
  "Accessibility audits",
  "Manual accessibility testing",
  "VPAT / ACR documentation",
  "Design strategy",
  "Prototyping",
  "User research & usability testing",
  "Design team leadership",
  "AI-assisted prototyping",
];

const labelClass = "font-mono text-sm tracking-[0.02em]";
const sideHeadingClass = "text-lg font-extrabold mb-4";

export default function AboutPage() {
  return (
    <div className="wrap py-16">
      {/* Header */}
      <header className="max-w-[44rem] mb-16 pb-16 border-b border-rule grid grid-cols-[minmax(0,1fr)] gap-5">
        <p className={`${labelClass} text-ink-2`}>About</p>
        <h1 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em]">
          Melissa Garland
        </h1>
        <p className="text-lg leading-normal text-ink-2">
          Principal UX designer and accessibility leader with 20+ years of
          experience combining hands-on interaction and visual design with the
          ability to embed accessibility into products, design systems, and
          organizational practice.
        </p>
        <p className="text-ink-2">
          At PowerSchool, I built the accessibility program from the ground up,
          coordinating VPAT/ACR conformance reporting across 40 products and
          establishing an accessibility champion network that distributes
          ownership across teams. I lead a design system adopted by nearly 80%
          of the portfolio, with accessibility integrated into components,
          patterns, and design-to-engineering workflows.
        </p>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-16">
        {/* Experience */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-0.02em] mb-8">
            Experience
          </h2>
          <ol className="border-t border-ink" role="list">
            {experience.map((role) => (
              <li
                key={`${role.title}-${role.company}`}
                className="grid grid-cols-[minmax(0,1fr)] gap-3 border-b border-rule py-8"
              >
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold leading-[1.3]">
                    {role.title}
                  </h3>
                  <p className="text-ink-2">{role.company}</p>
                  {role.scope && <p className="text-ink-2">{role.scope}</p>}
                  <p className={`${labelClass} text-mark`}>{role.period}</p>
                </div>
                <ul className="dash-list grid gap-2 pl-5" role="list">
                  {role.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Sidebar */}
        <div className="grid content-start gap-12">
          {/* Competencies */}
          <section
            aria-labelledby="competencies-heading"
            className="border-t border-ink pt-4"
          >
            <h2 id="competencies-heading" className={sideHeadingClass}>
              Core competencies
            </h2>
            <ul className="flex flex-wrap gap-1.5" role="list">
              {competencies.map((c) => (
                <li
                  key={c}
                  className="rounded-xs border border-rule-strong px-2 font-mono text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section
            aria-labelledby="education-heading"
            className="border-t border-ink pt-4"
          >
            <h2 id="education-heading" className={sideHeadingClass}>
              Education & certifications
            </h2>
            <ul className="grid gap-4" role="list">
              <li>
                <p className="font-semibold">
                  Nielsen Norman Group UX Certification
                </p>
                <p className="text-ink-2">Interaction Design Specialty</p>
              </li>
              <li>
                <p className="font-semibold">
                  Virginia Commonwealth University
                </p>
                <p className="text-ink-2">
                  BFA, Cum Laude · Communication Arts & Design
                </p>
              </li>
              <li>
                <p className="font-semibold">Rhode Island School of Design</p>
                <p className="text-ink-2">Coursework</p>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section
            aria-labelledby="contact-heading"
            className="border-t border-ink pt-4"
          >
            <h2 id="contact-heading" className={sideHeadingClass}>
              Contact
            </h2>
            <Link href="/contact" className="inline-flex min-h-11 items-center gap-1">
              Send me a message<span aria-hidden="true"> →</span>
            </Link>
          </section>
        </div>
      </div>

      {/* Back to work */}
      <div className="mt-16 pt-10 border-t border-rule">
        <Link
          href="/portfolio"
          className="inline-flex min-h-11 items-center gap-1 font-semibold"
        >
          <span aria-hidden="true">← </span>View my work
        </Link>
      </div>
    </div>
  );
}
