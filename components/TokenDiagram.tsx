"use client";

import { useState } from "react";
import {
  primitives,
  semantics,
  tokenComponents,
  primitiveHex,
} from "@/lib/design-tokens";
import { FigureNumber } from "@/components/ProjectImage";

const P = { x: 10, w: 200 };
const S = { x: 340, w: 250 };
const C = { x: 760, w: 210 };
const NODE_HEIGHT = 38;

const sy = (i: number) => 70 + i * 46;
const span = sy(semantics.length - 1) - sy(0);
const py = (i: number) => sy(0) + (i * span) / (primitives.length - 1);
const cy = (i: number) => sy(0) + (i * span) / (tokenComponents.length - 1);
const restY = py(primitives.length - 1) + 70;
const VIEW_HEIGHT = restY + 110;

function curve(x1: number, y1: number, x2: number, y2: number) {
  const d = (x2 - x1) * 0.45;
  return `M ${x1} ${y1} C ${x1 + d} ${y1}, ${x2 - d} ${y2}, ${x2 - 8} ${y2}`;
}

type Edge = { from: string; to: string; d: string };

const edges: Edge[] = [
  ...semantics.flatMap((s, i) =>
    s.from.map((src) => {
      const pi = primitives.findIndex((p) => p.id === src);
      return {
        from: src,
        to: s.id,
        d: curve(P.x + P.w, py(pi) + NODE_HEIGHT / 2, S.x, sy(i) + NODE_HEIGHT / 2),
      };
    }),
  ),
  ...tokenComponents.flatMap((c, i) =>
    c.uses.map((u) => {
      const si = semantics.findIndex((s) => s.id === u);
      return {
        from: u,
        to: c.id,
        d: curve(S.x + S.w, sy(si) + NODE_HEIGHT / 2, C.x, cy(i) + NODE_HEIGHT / 2),
      };
    }),
  ),
];

const pathChoices = [
  "All",
  "Focus indicator",
  "Link",
  "Primary button",
  "Info message",
  "Success message",
  "Error message",
  "Destructive button",
];

const captions: Record<string, string> = {
  All: "Every path. Select a component to follow it from the palette.",
  "Focus indicator":
    "The focus ring is one token built from three colors. Whatever the background, at least one band stands out from it.",
  Link: "Link text has its own token, even though it shares navy-500 with the primary button and info icons. Each job can change on its own.",
  "Primary button":
    "The primary button pairs navy-500 with a white label. That pair needs 4.5:1.",
  "Info message":
    "An info message pairs info-dark with info-light. The icon needs 3:1 against the light background, and any link inside needs 4.5:1.",
  "Success message":
    "A success message has a green-500 icon and green-600 text on green-100. The icon and the words carry the meaning, so it doesn't depend on color alone.",
  "Error message":
    "An error message has a red-500 icon and red-600 text on red-100. The icon and the words carry the meaning, so it doesn't depend on color alone.",
  "Destructive button":
    "The destructive button reuses red-500 with a white label, so it needs its own 4.5:1 check.",
};

function litTokens(choice: string): Set<string> | null {
  const component = tokenComponents.find((c) => c.id === choice);
  if (!component) return null;
  const lit = new Set([component.id]);
  for (const use of component.uses) {
    lit.add(use);
    semantics.find((s) => s.id === use)?.from.forEach((src) => lit.add(src));
  }
  return lit;
}

type NodeState = "" | "lit" | "dim";

function Node({
  state,
  x,
  y,
  w,
  children,
}: {
  state: NodeState;
  x: number;
  y: number;
  w: number;
  children: React.ReactNode;
}) {
  return (
    <g opacity={state === "dim" ? 0.22 : 1}>
      <rect
        x={x}
        y={y}
        width={w}
        height={NODE_HEIGHT}
        rx={6}
        fill={state === "lit" ? "var(--color-mark-wash)" : "var(--color-paper)"}
        stroke={state === "lit" ? "var(--color-mark)" : "var(--color-rule-strong)"}
        strokeWidth={state === "lit" ? 2 : 1}
      />
      {children}
    </g>
  );
}

export default function TokenDiagram({ number }: { number?: number }) {
  const [choice, setChoice] = useState("All");
  const lit = litTokens(choice);

  // Dimmed when another path is selected; highlighted when on the path.
  const nodeState = (id: string): NodeState =>
    !lit ? "" : lit.has(id) ? "lit" : "dim";

  return (
    // On wide windows the figure grows into the gap left of the text column
    // and the free space right of it, so the diagram fits without scrolling.
    <figure className="border border-rule bg-paper p-4 sm:p-6 flex flex-col gap-4 lg:-ml-12 lg:mr-[calc(-1*max(0px,min(100vw,74rem)-2*var(--gutter)-62rem))]">
      <div className="flex flex-wrap items-center gap-3">
        <span id="token-path-label" className="text-sm text-ink-2">
          Follow a path:
        </span>
        <div
          role="group"
          aria-labelledby="token-path-label"
          className="flex flex-wrap gap-2"
        >
          {pathChoices.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={choice === c}
              onClick={() => setChoice(c)}
              className={`min-h-9 rounded-xs border px-3 py-1.5 text-sm font-semibold ${
                choice === c
                  ? "bg-mark border-mark text-paper"
                  : "bg-paper border-rule-strong text-ink hover:border-mark hover:bg-panel"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="min-[74rem]:hidden text-sm text-ink-2">
        Scroll sideways to see all three layers, or open the table below.
      </p>
      {/* Focusable so keyboard users can scroll it on narrow screens. */}
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Token layers diagram, scrollable"
      >
        <svg
          viewBox={`0 0 980 ${VIEW_HEIGHT}`}
          className="block w-full min-w-[800px] h-auto"
          role="img"
          aria-labelledby="token-svg-title token-svg-desc"
        >
          <title id="token-svg-title">Token layers diagram</title>
          <desc id="token-svg-desc">
            Primitive color tokens point to semantic tokens, which point to
            components. The same mapping is listed in the table after the
            figure.
          </desc>
          <defs>
            {[
              ["token-arrow", "var(--color-rule-strong)"],
              ["token-arrow-lit", "var(--color-mark)"],
            ].map(([id, fill]) => (
              <marker
                key={id}
                id={id}
                viewBox="0 0 10 10"
                refX={2}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={fill} />
              </marker>
            ))}
          </defs>

          {[
            [P.x, "1  PRIMITIVE", "The raw palette"],
            [S.x, "2  SEMANTIC", "What each color is for"],
            [C.x, "3  COMPONENT", "Where it's used"],
          ].map(([x, head, sub]) => (
            <g key={head}>
              <text
                x={x}
                y={24}
                className="font-mono font-medium"
                fontSize={13}
                letterSpacing="0.04em"
                fill="var(--color-ink)"
              >
                {head}
              </text>
              <text x={x} y={42} className="font-sans" fontSize={12} fill="var(--color-ink-2)">
                {sub}
              </text>
            </g>
          ))}

          {edges.map((e) => {
            const on = lit !== null && lit.has(e.from) && lit.has(e.to);
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={e.d}
                fill="none"
                stroke={on ? "var(--color-mark)" : "var(--color-rule-strong)"}
                strokeWidth={on ? 3 : 1.5}
                opacity={lit && !on ? 0.22 : 1}
                markerEnd={`url(#${on ? "token-arrow-lit" : "token-arrow"})`}
                              />
            );
          })}

          {primitives.map((p, i) => (
            <Node key={p.id} state={nodeState(p.id)} x={P.x} y={py(i)} w={P.w}>
              <rect
                x={P.x + 10}
                y={py(i) + 10}
                width={18}
                height={18}
                rx={3}
                fill={p.hex}
                stroke="var(--color-rule-strong)"
              />
              <text x={P.x + 38} y={py(i) + 24} className="font-mono" fontSize={13} fill="var(--color-ink)">
                {p.id}
              </text>
              <text
                x={P.x + P.w - 10}
                y={py(i) + 24}
                textAnchor="end"
                className="font-mono"
                fontSize={11}
                fill="var(--color-ink-2)"
              >
                {p.hex}
              </text>
            </Node>
          ))}

          {/* The stack is faded; its label stays at full contrast. */}
          <g opacity={0.35}>
            {[8, 4, 0].map((o) => (
              <rect
                key={o}
                x={P.x + o}
                y={restY + o}
                width={P.w}
                height={NODE_HEIGHT}
                rx={6}
                fill="var(--color-paper)"
                stroke="var(--color-rule-strong)"
              />
            ))}
          </g>
          <text x={P.x + 22} y={restY + 32} className="font-mono" fontSize={13} fill="var(--color-ink)">
              + about 90 more colors
            </text>
          <text x={P.x} y={restY + 72} className="font-sans" fontSize={12} fill="var(--color-ink-2)">
            Not mapped to any semantic token,
          </text>
          <text x={P.x} y={restY + 88} className="font-sans" fontSize={12} fill="var(--color-ink-2)">
            so they can&apos;t carry meaning.
          </text>

          {semantics.map((s, i) => (
            <Node key={s.id} state={nodeState(s.id)} x={S.x} y={sy(i)} w={S.w}>
              <text x={S.x + 14} y={sy(i) + 24} className="font-mono" fontSize={13} fill="var(--color-ink)">
                {s.id}
              </text>
            </Node>
          ))}

          {tokenComponents.map((c, i) => (
            <Node key={c.id} state={nodeState(c.id)} x={C.x} y={cy(i)} w={C.w}>
              <text x={C.x + 14} y={cy(i) + 24} className="font-sans" fontSize={13} fill="var(--color-ink)">
                {c.id}
              </text>
            </Node>
          ))}
        </svg>
      </div>

      <figcaption className="text-sm text-ink-2 leading-normal">
        <FigureNumber number={number} />
        {captions[choice]}
      </figcaption>

      <details className="border-t border-rule pt-4">
        <summary className="inline-block py-1 text-sm font-semibold text-mark cursor-pointer">
          The same mapping as a table
        </summary>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-ink text-ink-2">
                <th scope="col" className="py-2 pr-4 font-semibold">Component</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Semantic token</th>
                <th scope="col" className="py-2 font-semibold">Primitive</th>
              </tr>
            </thead>
            <tbody>
              {tokenComponents.flatMap((c) =>
                c.uses.map((u, i) => (
                  <tr key={`${c.id}-${u}`} className="border-b border-rule align-top">
                    {i === 0 ? (
                      <th scope="row" rowSpan={c.uses.length} className="py-2 pr-4 font-normal text-ink">
                        {c.id}
                      </th>
                    ) : null}
                    <td className="py-2 pr-4 font-mono text-ink">{u}</td>
                    <td className="py-2 font-mono text-ink">
                      {semantics
                        .find((s) => s.id === u)
                        ?.from.map((src) => (
                          <span key={src} className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="inline-block w-3 h-3 rounded-xs border border-rule-strong"
                              style={{ background: primitiveHex(src) }}
                            />
                            {src}
                          </span>
                        ))}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
