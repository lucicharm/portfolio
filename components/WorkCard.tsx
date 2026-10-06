import Link from "next/link";
import type { SelectedWorkItem } from "@/lib/selected-work";
import { primitives } from "@/lib/design-tokens";

// The thumbnail is decorative: the card's heading link already names the
// case study, so screen readers skip the image instead of hearing it twice.
function Thumbnail({ item }: { item: SelectedWorkItem }) {
  const { thumbnail } = item;

  if (thumbnail === "swatches") {
    return (
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-3" aria-hidden="true">
        {primitives.map((p) => (
          <div
            key={p.id}
            className="rounded border border-divider"
            style={{ backgroundColor: p.hex }}
          />
        ))}
      </div>
    );
  }

  // One square for each of the 40 products the program covers.
  if (thumbnail === "products") {
    return (
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 gap-1 p-3" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="rounded-sm bg-secondary" />
        ))}
      </div>
    );
  }

  // The color grid becoming a list with headings, as in the text view.
  if (thumbnail === "schedule") {
    return (
      <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={14 + col * 17}
              y={30 + row * 21}
              width="14"
              height="18"
              rx="2"
              fill={row === 1 && col === 1 ? "var(--color-secondary)" : "var(--color-divider)"}
            />
          )),
        )}
        <path d="M70 60 h14 m-4 -4 l4 4 l-4 4" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" />
        <rect x="96" y="28" width="44" height="6" rx="1" fill="var(--color-primary)" />
        <rect x="100" y="42" width="34" height="5" rx="1" fill="var(--color-secondary)" />
        {[56, 66].map((y) => (
          <g key={y}>
            <circle cx="106" cy={y + 2} r="1.5" fill="var(--color-muted)" />
            <rect x="111" y={y} width="30" height="4" rx="1" fill="var(--color-divider)" />
          </g>
        ))}
        <rect x="100" y="80" width="34" height="5" rx="1" fill="var(--color-secondary)" />
        <circle cx="106" cy="96" r="1.5" fill="var(--color-muted)" />
        <rect x="111" y="94" width="26" height="4" rx="1" fill="var(--color-divider)" />
      </svg>
    );
  }

  // A job offer by text, and the one-word reply that accepts it.
  if (thumbnail === "messages") {
    return (
      <svg viewBox="0 0 160 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="16" y="20" width="96" height="44" rx="10" fill="var(--color-surface)" stroke="var(--color-divider)" />
        {[32, 42, 52].map((y, i) => (
          <rect key={y} x="28" y={y - 2} width={i === 2 ? 44 : 72} height="4" rx="1" fill="var(--color-divider)" />
        ))}
        <rect x="84" y="74" width="60" height="26" rx="10" fill="var(--color-secondary)" />
        <text
          x="114"
          y="91"
          textAnchor="middle"
          fontSize="10"
          fill="var(--color-surface)"
          className="font-mono"
        >
          ACCEPT
        </text>
      </svg>
    );
  }

  // No drawn tile yet: show the case study's category, the part of the
  // title before the colon.
  return (
    <div className="absolute inset-0 flex items-end p-3" aria-hidden="true">
      <p className="font-display font-semibold text-sm text-primary leading-tight">
        {item.title.split(":")[0]}
      </p>
    </div>
  );
}

export default function WorkCard({ item }: { item: SelectedWorkItem }) {
  return (
    <article className="group relative flex items-start gap-5 sm:gap-8">
      <div className="relative w-24 sm:w-40 shrink-0 aspect-[4/3] overflow-hidden rounded-lg border border-divider bg-paper transition-colors group-hover:border-secondary">
        <Thumbnail item={item} />
      </div>

      <div className="flex flex-col gap-2">
        {item.inProgress && (
          <p className="font-mono text-sm text-muted">Work in progress</p>
        )}
        <h3 className="font-display font-semibold text-xl text-primary leading-snug">
          {item.slug ? (
            // The stretched link makes the whole card, image included, clickable.
            <Link
              href={`/work/${item.slug}`}
              className="underline decoration-1 underline-offset-4 group-hover:text-secondary after:absolute after:inset-0"
            >
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        <p className="font-sans text-lg text-body leading-relaxed">
          {item.description}
        </p>
      </div>
    </article>
  );
}
