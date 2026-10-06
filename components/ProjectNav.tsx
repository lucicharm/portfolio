import Link from "next/link";
import { selectedWork } from "@/lib/selected-work";

// Card titles carry a category prefix ("Accessible design: …"); the nav only
// needs the project name after it.
function shortTitle(title: string) {
  const name = title.includes(":") ? title.slice(title.indexOf(":") + 1).trim() : title;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Previous/next links follow the Selected Work order on the portfolio page.
export default function ProjectNav({ slug }: { slug: string }) {
  const index = selectedWork.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? selectedWork[index - 1] : null;
  const next =
    index >= 0 && index < selectedWork.length - 1
      ? selectedWork[index + 1]
      : null;

  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Project navigation"
      className="max-w-5xl mx-auto px-6 py-12 border-t border-border"
    >
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
