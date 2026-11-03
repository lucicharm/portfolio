import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ study }: { study: Project }) {
  return (
    <article className="group border border-rule-strong p-8 bg-paper hover:border-mark flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-sm text-ink-2 border border-rule-strong rounded px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-sans text-sm text-ink-2">
          {study.client} · {study.year}
        </p>
        <h3 className="font-semibold text-xl text-ink leading-snug">
          {study.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-ink-2">
          {study.summary}
        </p>
      </div>

      {study.heroMetric && (
        <div className="border-t border-rule-strong pt-6 flex items-baseline gap-3">
          <span className="font-bold text-3xl text-mark">
            {study.heroMetric.value}
          </span>
          <span className="font-sans text-sm text-ink-2">
            {study.heroMetric.label}
          </span>
        </div>
      )}

      <Link
        href={`/work/${study.slug}`}
        className="font-sans text-sm font-medium text-mark hover:underline group-hover:underline mt-auto"
        aria-label={`Read project: ${study.title}`}
      >
        Read project →
      </Link>
    </article>
  );
}
