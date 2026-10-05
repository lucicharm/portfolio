import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ study }: { study: Project }) {
  return (
    <article className="group border border-border rounded-lg p-8 bg-surface hover:border-secondary transition-colors flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-muted border border-border rounded px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-sans text-sm text-muted">
          {study.client} · {study.year}
        </p>
        <h3 className="font-display font-semibold text-xl text-primary leading-snug">
          {study.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted">
          {study.summary}
        </p>
      </div>

      {study.heroMetric && (
        <div className="border-t border-border pt-6 flex items-baseline gap-3">
          <span className="font-display font-bold text-3xl text-secondary">
            {study.heroMetric.value}
          </span>
          <span className="font-sans text-sm text-muted">
            {study.heroMetric.label}
          </span>
        </div>
      )}

      <Link
        href={`/work/${study.slug}`}
        className="font-sans text-sm font-medium text-secondary hover:underline group-hover:underline mt-auto"
        aria-label={`Read project: ${study.title}`}
      >
        Read project →
      </Link>
    </article>
  );
}
