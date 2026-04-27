import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/case-studies";

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
            I build the systems that make good design consistent — and make
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

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-1">
            <dt className="sr-only">design system adoption</dt>
            <dd>
              <span className="font-display font-bold text-4xl text-primary">
                ~80%
              </span>
            </dd>
            <dd className="font-sans text-sm text-muted">design system adoption</dd>
            <dd className="font-sans text-xs text-muted">across 40 products</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="sr-only">VPATs delivered</dt>
            <dd>
              <span className="font-display font-bold text-4xl text-primary">
                40
              </span>
            </dd>
            <dd className="font-sans text-sm text-muted">VPATs delivered</dd>
            <dd className="font-sans text-xs text-muted">from zero prior documentation</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="sr-only">years experience</dt>
            <dd>
              <span className="font-display font-bold text-4xl text-primary">
                20+
              </span>
            </dd>
            <dd className="font-sans text-sm text-muted">years experience</dd>
            <dd className="font-sans text-xs text-muted">in enterprise UX</dd>
          </div>
        </dl>
      </section>

      {/* Case Studies */}
      <section
        aria-labelledby="case-studies-heading"
        className="max-w-5xl mx-auto px-6 py-16"
      >
        <h2
          id="case-studies-heading"
          className="font-display font-bold text-3xl text-primary mb-12"
        >
          Case Studies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </>
  );
}