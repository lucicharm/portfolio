import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "20+ years of UX leadership in design systems and accessibility. Currently UX Principal at PowerSchool.",
};

const experience = [
  {
    title: "UX Principal, Design System & Accessibility",
    company: "PowerSchool",
    period: "Apr 2022 – Present",
    highlights: [
      "Lead a cross-functional team of 6 designers, engineers, and writers to build a framework-agnostic design system adopted by ~80% of a 40-product portfolio.",
      "Built PowerSchool's accessibility program from the ground up — delivered VPAT conformance reports for all 40 products within 5 years, from zero prior documentation.",
      "Trained technical writers and QA engineers on accessibility evaluation using Axe, NVDA, and VoiceOver, building a sustainable audit capability.",
      "Established a cross-organizational accessibility champions committee to define company-wide policy, standards, and best practices.",
      "Pioneered AI-assisted prototyping workflows using Cursor and LLMs to generate reusable code prototypes, bridging design and development.",
      "Oversaw localization design for products translated into dozens of languages including complex scripts such as Arabic and Thai.",
      "Present design strategy and accessibility roadmaps to executive leadership.",
    ],
  },
  {
    title: "UX Designer",
    company: "PowerSchool",
    period: "Aug 2018 – Apr 2022",
    highlights: [
      "Conducted user research and usability testing that directly contributed to improved satisfaction across teacher evaluation tools.",
      "Led end-to-end design of a suite of teacher evaluation and education-focused HR tools used by school districts nationwide.",
      "Created wireframes, prototypes, and high-fidelity mockups for web and mobile applications across the education product suite.",
    ],
  },
  {
    title: "UX Designer",
    company: "PeopleAdmin (formerly Performance Matters)",
    period: "Oct 2015 – Aug 2018",
    highlights: [
      "Defined the UI style guide for a re-branded enterprise application, establishing visual standards, accessibility requirements, and voice and tone guidelines.",
      "Conducted an accessibility audit of customer-facing applications and delivered WCAG 2.0-based remediation recommendations.",
      "Managed an offshore development team through a full enterprise UI rebrand and platform update.",
    ],
  },
  {
    title: "UX/UI Designer",
    company: "Q2 Software · Digital banking (publicly traded)",
    period: "Jan 2014 – Sep 2015",
    highlights: [
      "Led the design of a new treasury management product, opening a new business line for the company.",
      "Introduced a discount usability testing program using new hires as participants, providing fast design feedback.",
      "Helped define company-wide user research processes and UI/interaction patterns for mobile and desktop banking software.",
    ],
  },
  {
    title: "Founding Designer → Design Lead",
    company: "Tk20, Inc.",
    period: "Jun 2002 – Jan 2014",
    highlights: [
      "Recruited as a founding team member — helped grow the company from 4 employees and 1 client to 80+ employees serving 200+ institutions over 12 years.",
      "Built and led a design team of 4, providing art direction for all products and customer-facing media.",
      "Oversaw information architecture for educational assessment and learning management systems.",
      "Established the company's design and development training program, embedding usability and accessibility practices across global teams.",
      "Created corporate identity, branding, marketing materials, and online presence from scratch.",
    ],
  },
];

const competencies = [
  "Design Systems",
  "Accessibility (WCAG 2.2 AA/AAA)",
  "VPAT / Conformance Reporting",
  "Assistive Technology Testing",
  "User Research & Usability Testing",
  "Information Architecture",
  "Interaction Design",
  "Localization Design",
  "Cross-functional Team Leadership",
  "Executive Stakeholder Communication",
  "Mentorship & Coaching",
  "AI-Assisted Prototyping",
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
          Design leader with 20+ years of experience building and scaling design
          systems, driving enterprise accessibility, and leading cross-functional
          UX teams.
        </p>
        <p className="font-sans text-base text-muted leading-relaxed">
          At PowerSchool, I grew design system adoption from 0% to nearly 80%
          across a 40-product portfolio serving millions of users worldwide, and
          established an accessibility program that delivered VPAT documentation
          for all 40 products. I combine deep expertise in WCAG compliance,
          inclusive design, and systems thinking with a proven ability to mentor
          teams, align design strategy with business goals, and ship accessible,
          consistent experiences at scale.
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
              Core Competencies
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
              Education & Certifications
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
              Send me a message →
            </Link>
          </section>
        </aside>
      </div>

      {/* Back to work */}
      <div className="mt-16 pt-12 border-t border-border">
        <Link
          href="/"
          className="font-sans text-sm font-medium text-secondary hover:underline"
        >
          ← View my work
        </Link>
      </div>
    </div>
  );
}
