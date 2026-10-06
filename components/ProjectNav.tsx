import Link from "next/link";
import { selectedWork, topLevelWork } from "@/lib/selected-work";

// Card titles carry a category prefix ("Accessible design: …"); the nav only
// needs the project name after it.
function shortTitle(title: string) {
  const name = title.includes(":") ? title.slice(title.indexOf(":") + 1).trim() : title;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Previous/next links follow the Selected Work order on the portfolio page.
// An appendix steps through its siblings instead, ending at its parent.
export default function ProjectNav({ slug }: { slug: string }) {
  const item = selectedWork.find((work) => work.slug === slug);
  const sequence = item?.parent
    ? selectedWork.filter((work) => work.parent === item.parent)
    : topLevelWork;
  const index = sequence.findIndex((work) => work.slug === slug);
  const prev = index > 0 ? sequence[index - 1] : null;
  const next =
    index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;
  const parent = selectedWork.find((work) => work.slug === item?.parent);

  if (!prev && !next && !parent) return null;

  return (
    <nav
      aria-label="Project navigation"
      className="max-w-5xl mx-auto px-6 py-12 border-t border-border"
    >
      {parent && (
        <p className="font-sans text-sm text-muted mb-8">
          Appendix to{" "}
          <Link
            href={`/work/${parent.slug}`}
            className="font-medium text-secondary underline underline-offset-4"
          >
            {parent.title.split(":")[0]}
          </Link>
        </p>
      )}
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {prev ? (
          <Link
            href={`/work/${prev.slug}`}
            className="flex flex-col gap-1 group max-w-xs"
          >
            <span className="font-sans text-xs text-muted">
              <span aria-hidden="true">← </span>Previous
              <span className="sr-only"> project:</span>
            </span>
            <span className="font-display font-semibold text-primary group-hover:text-secondary transition-colors">
              {shortTitle(prev.title)}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="flex flex-col gap-1 group max-w-xs sm:text-right"
          >
            <span className="font-sans text-xs text-muted">
              Next<span className="sr-only"> project:</span>
              <span aria-hidden="true"> →</span>
            </span>
            <span className="font-display font-semibold text-primary group-hover:text-secondary transition-colors">
              {shortTitle(next.title)}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
