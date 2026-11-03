import Link from "next/link";
import WorkCard from "@/components/WorkCard";
import { topLevelWork } from "@/lib/selected-work";

const offers = [
  {
    label: "Design systems",
    text: "Build a design system that product teams adopt, and run it as it grows.",
  },
  {
    label: "Accessibility",
    text: "Make accessibility part of every team's everyday work, with the process, tools, and training to keep it there.",
  },
  {
    label: "AI prototyping",
    text: "Set up AI prototyping that follows your design system and hands engineers code they can reuse.",
  },
  {
    label: "Leadership",
    text: "Lead and grow designers, and tie design decisions to what leadership cares about.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero, over faint column guides */}
      <section aria-labelledby="hero-heading" className="border-b border-rule">
        <div className="wrap column-guides grid grid-cols-[minmax(0,1fr)] gap-6 pt-[clamp(3rem,8vw,6rem)] pb-[clamp(3rem,6vw,5rem)]">
          <p className="font-mono text-sm tracking-[0.02em] text-ink-2">
            UX Principal · Design Systems · Accessibility
          </p>
          <h1
            id="hero-heading"
            className="max-w-[14ch] text-3xl font-extrabold tracking-[-0.03em]"
          >
            Design that scales.
            <br />
            <span className="text-mark">For everyone.</span>
          </h1>
          <p className="max-w-[38rem] text-lg leading-normal text-ink-2">
            I&apos;ve spent 20+ years in design, most recently leading design
            systems and accessibility across 40 enterprise products. Here&apos;s
            what I can do for your team:
          </p>
          <ul
            className="grid max-w-[52rem] grid-cols-[minmax(0,1fr)] border-t border-ink sm:grid-cols-2"
            role="list"
          >
            {offers.map(({ label, text }) => (
              <li
                key={label}
                className="grid content-start gap-1 border-b border-rule bg-paper/88 pt-4 pr-5 pb-5 sm:odd:border-r sm:even:pl-5"
              >
                <p className="font-mono text-sm tracking-[0.02em] text-mark">
                  {label}
                </p>
                <p>{text}</p>
              </li>
            ))}
          </ul>
          <p>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-xs bg-ink px-5 py-2 font-semibold text-paper no-underline hover:bg-mark"
            >
              Get in touch
            </Link>
          </p>
          <p className="max-w-[38rem] text-sm text-ink-2">
            <span className="mr-1 inline-block border border-mark px-1.5 font-mono tracking-[0.02em] text-mark">
              Note
            </span>{" "}
            This portfolio is a work in progress. I&apos;m adding case studies
            and screenshots as I finish them.
          </p>
        </div>
      </section>

      {/* Selected Work */}
      <section
        aria-labelledby="selected-work-heading"
        className="wrap py-[clamp(3rem,7vw,5rem)]"
      >
        <div className="mb-10 grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-4 min-[56rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2
            id="selected-work-heading"
            className="text-2xl font-extrabold tracking-[-0.02em]"
          >
            Selected work
          </h2>
          <div className="grid max-w-[40rem] grid-cols-[minmax(0,1fr)] gap-3 text-ink-2">
            <p>
              I design systems, tools, and product experiences that make
              complex software easier to use and more accessible. My recent
              work spans accessibility infrastructure, design systems,
              inclusive research, and AI-assisted experiences.
            </p>
            <p>
              I find the problem, understand the users and workflow, design the
              solution, and increasingly build it myself.
            </p>
          </div>
        </div>
        <ul className="border-t border-ink" role="list">
          {topLevelWork.map((item) => (
            <li key={item.title} className="border-b border-rule">
              <WorkCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
