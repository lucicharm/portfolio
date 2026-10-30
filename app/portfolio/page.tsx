import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { topLevelWork } from "@/lib/selected-work";

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="max-w-5xl mx-auto px-6 pt-20 pb-16 border-b border-border"
      >
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-muted mb-4">
            UX Principal · Design Systems · Accessibility
          </p>
          <h1
            id="hero-heading"
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6"
          >
            Design that scales.
            <br />
            <span className="text-secondary">For everyone.</span>
          </h1>
          <p className="font-sans text-lg text-muted leading-relaxed mb-4 max-w-xl">
            I&apos;ve spent 20+ years in design, most recently leading design
            systems and accessibility across 40 enterprise products. Here&apos;s
            what I can do for your team:
          </p>
          <ul className="space-y-2 mb-8 max-w-xl" role="list">
            {[
              "Build a design system that product teams adopt, and run it as it grows.",
              "Make accessibility part of every team's everyday work, with the process, tools, and training to keep it there.",
              "Set up AI prototyping that follows your design system and hands engineers code they can reuse.",
              "Lead and grow designers, and tie design decisions to what leadership cares about.",
            ].map((item) => (
              <li
                key={item}
                className="font-sans text-lg text-muted leading-relaxed flex gap-3"
              >
                <span
                  className="size-2 shrink-0 rounded-full bg-secondary mt-[0.6em]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors"
          >
            Get in touch
          </Link>
          <p className="font-mono text-sm text-muted mt-8">
            This portfolio is a work in progress. I&apos;m adding case studies
            and screenshots as I finish them.
          </p>
        </div>

      </section>

      {/* Selected Work */}
      <section
        aria-labelledby="selected-work-heading"
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h2
          id="selected-work-heading"
          className="font-display font-bold text-3xl text-primary mb-4"
        >
          Selected work
        </h2>
        <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl mb-6">
          I design systems, tools, and product experiences that make complex
          software easier to use and more accessible. My recent work spans
          accessibility infrastructure, design systems, inclusive research, and
          AI-assisted experiences.
        </p>
        <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl mb-12">
          I find the problem, understand the users and workflow, design the solution, and
          increasingly build it myself.
        </p>
        <ul className="flex flex-col gap-16" role="list">
          {topLevelWork.map((item) => (
            <li key={item.title}>
              <WorkCard item={item} />
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
