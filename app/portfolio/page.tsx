import Link from "next/link";
import { selectedWork } from "@/lib/selected-work";

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
          <p className="font-sans text-lg text-muted leading-relaxed mb-8 max-w-xl">
            I build the systems that make good design consistent, and make
            sure those systems work for every user. 20+ years leading design
            systems and accessibility programs in enterprise software.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors"
          >
            Get in touch
          </a>
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
          Selected Work
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
        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {selectedWork.map((item) => (
            <li key={item.title} className="py-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-display font-semibold text-xl text-primary">
                  {item.slug ? (
                    <Link
                      href={`/work/${item.slug}`}
                      className="hover:text-secondary hover:underline"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="font-sans text-lg text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

    </>
  );
}
