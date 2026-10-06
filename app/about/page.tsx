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

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="max-w-2xl mb-16 pb-16 border-b border-border">
        <p className="font-mono text-sm text-muted mb-3">About</p>
        <h1 className="font-display font-bold text-4xl text-primary mb-6 leading-tight">
          Melissa Garland
        </h1>
        <p className="font-sans text-lg text-muted leading-relaxed mb-4">
          Principal UX designer and accessibility leader with 20+ years of
          experience combining hands-on interaction and visual design with the
          ability to embed accessibility into products, design systems, and
          organizational practice.
        </p>
        <p className="font-sans text-base text-muted leading-relaxed">
          At PowerSchool, I built the accessibility program from the ground up,
          coordinating VPAT/ACR conformance reporting across 40 products and
          establishing an accessibility champion network that distributes
          ownership across teams. I lead a design system adopted by nearly 80%
          of the portfolio, with accessibility integrated into components,
          patterns, and design-to-engineering workflows.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Experience */}
        <div className="lg:col-span-2">
          <h2 className="font-display font-semibold text-2xl text-primary mb-10">
            Experience
          </h2>
          <ol className="relative space-y-12" role="list">
            {experience.map((role) => (
              <li
                key={`${role.title}-${role.company}`}
                className="border-l-2 border-border pl-8 relative"
              >
                <div
                  className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-secondary"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1 mb-3">
                  <h3 className="font-display font-semibold text-lg text-primary leading-snug">
                    {role.title}
                  </h3>
                  <p className="font-sans text-sm text-muted">
                    {role.company}
                  </p>
                  {role.scope && (
                    <p className="font-sans text-sm text-muted">{role.scope}</p>
                  )}
                  <p className="font-mono text-xs text-muted">{role.period}</p>
                </div>
                <ul className="space-y-2" role="list">
                  {role.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="font-sans text-sm text-muted leading-relaxed flex gap-2"
                    >
                      <span
                        className="text-secondary shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          {/* Competencies */}
          <section aria-labelledby="competencies-heading">
            <h2
              id="competencies-heading"
              className="font-display font-semibold text-lg text-primary mb-4"
            >
              Core competencies
            </h2>
            <ul className="space-y-2" role="list">
              {competencies.map((c) => (
                <li
                  key={c}
                  className="font-sans text-sm text-muted flex items-start gap-2"
                >
                  <span className="text-secondary shrink-0" aria-hidden="true">
                    ·
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="font-display font-semibold text-lg text-primary mb-4"
            >
              Education & certifications
            </h2>
            <ul className="space-y-4" role="list">
              <li className="font-sans text-sm text-muted">
                <p className="font-medium text-primary text-sm">
                  Nielsen Norman Group UX Certification
                </p>
                <p>Interaction Design Specialty</p>
              </li>
              <li className="font-sans text-sm text-muted">
                <p className="font-medium text-primary text-sm">
                  Virginia Commonwealth University
                </p>
                <p>BFA, Cum Laude · Communication Arts & Design</p>
              </li>
              <li className="font-sans text-sm text-muted">
                <p className="font-medium text-primary text-sm">
                  Rhode Island School of Design
                </p>
                <p>Coursework</p>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="font-display font-semibold text-lg text-primary mb-4"
            >
              Contact
            </h2>
            <Link
              href="/contact"
              className="font-sans text-sm text-secondary hover:underline"
            >
              Send me a message<span aria-hidden="true"> →</span>
            </Link>
          </section>
        </aside>
      </div>

      {/* Back to work */}
      <div className="mt-16 pt-12 border-t border-border">
        <Link
          href="/portfolio"
          className="font-sans text-sm font-medium text-secondary hover:underline"
        >
          <span aria-hidden="true">← </span>View my work
        </Link>
      </div>
    </div>
  );
}
