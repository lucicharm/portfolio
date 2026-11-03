import Link from "next/link";
import type { SelectedWorkItem } from "@/lib/selected-work";
import { primitives } from "@/lib/design-tokens";

// Outlined wireframe parts. Colors are theme tokens, so the drawings stay
// in the site palette; only the swatches use the real token values.
const soft = { fill: "var(--color-panel)", stroke: "var(--color-rule-strong)" };
const card = { fill: "var(--color-paper)", stroke: "var(--color-ink)" };
const accent = { fill: "var(--color-mark-wash)", stroke: "var(--color-mark)" };
const solid = { fill: "var(--color-ink)" };
const onAccent = { fill: "var(--color-mark)" };
const line = {
  fill: "none",
  stroke: "var(--color-ink-2)",
  className: "stroke-line",
};

function DrawingShapes({ item }: { item: SelectedWorkItem }) {
  // One square for each of the 40 products the program covers.
  if (item.thumbnail === "products") {
    return Array.from({ length: 40 }, (_, i) => (
      <rect
        key={i}
        x={12 + (i % 8) * 17.5}
        y={14 + Math.floor(i / 8) * 19}
        width="13"
        height="14"
        rx="2"
        {...accent}
      />
    ));
  }

  // The PowerSchool palette, in its real token colors.
  if (item.thumbnail === "swatches") {
    return primitives.map((p, i) => (
      <rect
        key={p.id}
        x={14 + (i % 4) * 34}
        y={14 + Math.floor(i / 4) * 32}
        width="30"
        height="28"
        rx="3"
        fill={p.hex}
        stroke="var(--color-ink)"
      />
    ));
  }

  // The color grid becoming a list with headings, as in the text view.
  if (item.thumbnail === "schedule") {
    return (
      <>
        {[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={14 + col * 17}
              y={30 + row * 21}
              width="14"
              height="18"
              rx="2"
              {...(row === 1 && col === 1 ? accent : soft)}
            />
          )),
        )}
        <path d="M70 60 h14 m-4 -4 l4 4 l-4 4" {...line} />
        <rect x="96" y="28" width="44" height="6" rx="1" {...solid} />
        <rect x="100" y="42" width="34" height="5" rx="1" {...accent} />
        {[56, 66].map((y) => (
          <g key={y}>
            <circle cx="106" cy={y + 2} r="1.5" {...solid} />
            <rect x="111" y={y} width="30" height="4" rx="1" {...soft} />
          </g>
        ))}
        <rect x="100" y="80" width="34" height="5" rx="1" {...accent} />
        <circle cx="106" cy="96" r="1.5" {...solid} />
        <rect x="111" y="94" width="26" height="4" rx="1" {...soft} />
      </>
    );
  }

  // A job offer by text, and the one-word reply that accepts it.
  if (item.thumbnail === "messages") {
    return (
      <>
        <rect x="16" y="20" width="96" height="44" rx="10" {...card} />
        {[30, 40, 50].map((y, i) => (
          <rect key={y} x="28" y={y} width={i === 2 ? 44 : 72} height="4" rx="1" {...soft} />
        ))}
        <rect x="84" y="74" width="60" height="26" rx="10" {...accent} />
        <text
          x="114"
          y="91"
          textAnchor="middle"
          fontSize="10"
          className="font-mono"
          {...onAccent}
        >
          ACCEPT
        </text>
      </>
    );
  }

  // A prototype's code, one line checked against a rule, and the note that
  // records an exception for engineers.
  if (item.thumbnail === "code") {
    return (
      <>
        <rect x="12" y="14" width="104" height="80" rx="6" {...card} />
        <path d="M12 28 h104" {...line} />
        {[21, 29, 37].map((cx) => (
          <circle key={cx} cx={cx} cy="21" r="2" {...soft} />
        ))}
        <rect x="22" y="38" width="40" height="4" rx="1" {...soft} />
        <rect x="30" y="48" width="58" height="4" rx="1" {...accent} />
        <path d="M94 50 l3 3 l6 -6" {...line} />
        <rect x="30" y="58" width="46" height="4" rx="1" {...soft} />
        <rect x="22" y="68" width="30" height="4" rx="1" {...soft} />
        <rect x="84" y="66" width="62" height="40" rx="6" {...accent} />
        <rect x="92" y="76" width="44" height="4" rx="1" {...onAccent} />
        <rect x="92" y="86" width="32" height="4" rx="1" {...onAccent} />
      </>
    );
  }

  // No drawn tile yet: show the case study's category, the part of the
  // title before the colon.
  return (
    <text x="12" y="104" fontSize="12" className="font-sans font-semibold" {...solid}>
      {item.title.split(":")[0]}
    </text>
  );
}

// Status is always written out; the half-filled circle is a second cue.
export function ProgressIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 1.5 a6.5 6.5 0 0 1 0 13 z" fill="currentColor" />
    </svg>
  );
}

export default function WorkCard({ item }: { item: SelectedWorkItem }) {
  const colon = item.title.indexOf(":");
  const category = colon < 0 ? "" : item.title.slice(0, colon + 1);
  const name = colon < 0 ? item.title : item.title.slice(colon + 1).trim();

  return (
    <article className="link-row group relative grid gap-x-8 gap-y-4 px-2 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:py-8 hover:bg-panel focus-within:bg-panel">
      {/* The drawing is decorative: the heading link already names the case
          study, so screen readers skip it instead of hearing it twice. */}
      <div className="relative aspect-[4/3] max-w-44 p-2" aria-hidden="true">
        <span className="crop-marks" />
        <svg viewBox="0 0 160 120" className="line-drawing size-full overflow-visible" focusable="false">
          <DrawingShapes item={item} />
        </svg>
      </div>

      <div className="grid min-w-0 max-w-[44rem] content-start gap-2">
        <h3 className="text-lg font-semibold leading-[1.3] tracking-[-0.01em]">
          {item.slug ? (
            // The stretched link makes the whole row, drawing included,
            // clickable, and its name is the full title.
            <Link
              href={`/work/${item.slug}`}
              className="stretched-link text-ink no-underline"
            >
              {category && (
                <span className="mb-1 block font-mono text-sm font-medium tracking-[0.02em] text-mark">
                  {category}
                </span>
              )}{" "}
              <span className="underline-offset-[0.2em] group-hover:underline group-hover:decoration-mark group-hover:decoration-3 group-focus-within:underline group-focus-within:decoration-mark group-focus-within:decoration-3">
                {name}
              </span>
            </Link>
          ) : (
            item.title
          )}
        </h3>
        {/* After the heading, so people navigating by heading reach it. */}
        {item.inProgress && (
          <p className="inline-flex items-center gap-1.5 justify-self-start border border-mark bg-mark-wash px-2 py-0.5 rounded-xs font-mono text-sm tracking-[0.02em] text-mark">
            <ProgressIcon />
            Work in progress
          </p>
        )}
        <p className="text-ink-2">{item.description}</p>
      </div>
    </article>
  );
}
