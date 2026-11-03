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

  const cellClass =
    "grid content-start gap-1 border border-rule-strong p-4 text-ink no-underline hover:border-mark hover:bg-panel";
  const dirClass = "font-mono text-sm tracking-[0.02em] text-mark";

  return (
    <nav aria-label="Project navigation" className="border-t border-ink py-10">
      <div className="wrap">
        {parent && (
          <p className="mb-6 text-ink-2">
            Appendix to{" "}
            <Link href={`/work/${parent.slug}`}>
              {parent.title.split(":")[0]}
            </Link>
          </p>
        )}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className={cellClass}>
              <span className={dirClass}>
                <span aria-hidden="true">← </span>Previous
                <span className="sr-only"> project:</span>
              </span>
              <span className="font-semibold">{shortTitle(prev.title)}</span>
            </Link>
          ) : (
            // Keeps Next in the right-hand cell on wide screens.
            <div className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className={`${cellClass} sm:text-right`}
            >
              <span className={dirClass}>
                Next<span className="sr-only"> project:</span>
                <span aria-hidden="true"> →</span>
              </span>
              <span className="font-semibold">{shortTitle(next.title)}</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
