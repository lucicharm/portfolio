import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/case-studies";

const stats = [
  { value: "~80%", label: "design system adoption", context: "across 40 products" },
  { value: "40", label: "VPATs delivered", context: "from zero prior documentation" },
  { value: "20+", label: "years experience", context: "in enterprise UX" },
];

export default function HomePage() {
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
            I build the systems that make good design consistent — and make
            sure those systems work for every user. 20+ years leading design
            systems and accessibility programs in enterprise software.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium bg-primary text-surface px-5 py-2.5 rounded hover:bg-secondary transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map(({ value, label, context }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="font-display font-bold text-4xl text-primary">
                  {value}
                </span>
                <p className="font-sans text-sm text-muted mt-1">
                  {label}
                  <br />
                  <span className="text-xs text-muted">{context}</span>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Case Studies */}
      <section
        aria-labelledby="work-heading"
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h2
          id="work-heading"
          className="font-display font-semibold text-2xl text-primary mb-10"
        >
          Selected Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* About Teaser */}
      <section
        aria-labelledby="about-teaser-heading"
        className="max-w-5xl mx-auto px-6 py-16 border-t border-border"
      >
        <div className="max-w-2xl">
          <h2
            id="about-teaser-heading"
            className="font-display font-semibold text-2xl text-primary mb-4"
          >
            About
          </h2>
          <p className="font-sans text-base text-muted leading-relaxed mb-6">
            I&apos;ve spent 20+ years at the intersection of systems thinking
            and inclusive design — growing design system adoption from 0% to
            nearly 80% across a 40-product portfolio, building accessibility
            programs from scratch, and mentoring designers to do the same.
            I&apos;m currently a UX Principal at PowerSchool, where I lead a
            cross-functional team spanning design, engineering, and content.
          </p>
          <Link
            href="/about"
            className="font-sans text-sm font-medium text-secondary hover:underline"
          >
            Full background and experience →
          </Link>
        </div>
      </section>
    </>
  );
}
