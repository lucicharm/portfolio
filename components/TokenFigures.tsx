import {
  contrastChecks,
  contrastRatio,
  focusRingBands,
  primitiveHex,
  primitives,
  semanticHex,
} from "@/lib/design-tokens";

function Swatch({ hex }: { hex: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-3 h-3 rounded-sm border border-border mr-2 align-[-1px]"
      style={{ background: hex }}
    />
  );
}

function Result({ pass }: { pass: boolean }) {
  return (
    <span className={`font-medium ${pass ? "text-success" : "text-danger"}`}>
      {pass ? "Pass" : "Fail"}
    </span>
  );
}

// Ratios are calculated at build time from the token values, so the table
// can't drift from the palette.
export function ContrastChecks() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-x-auto">
        <table className="w-full font-sans text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-border-strong text-[#4b5563]">
              <th scope="col" className="py-2 pr-4 font-medium">Pair</th>
              <th scope="col" className="py-2 pr-4 font-medium">Ratio</th>
              <th scope="col" className="py-2 font-medium">Needs</th>
            </tr>
          </thead>
          <tbody>
            {contrastChecks.map((check) => {
              const ratio = contrastRatio(semanticHex(check.fg), semanticHex(check.bg));
              return (
                <tr key={`${check.fg}-${check.bg}`} className="border-b border-border/50 align-top">
                  <th scope="row" className="py-2 pr-4 font-normal text-body">
                    {check.use}
                    <span className="block font-mono text-xs text-[#4b5563] mt-0.5">
                      <Swatch hex={semanticHex(check.fg)} />
                      {check.fg} on {check.bg}
                    </span>
                  </th>
                  <td className="py-2 pr-4 font-mono tabular-nums whitespace-nowrap text-primary">
                    {ratio.toFixed(1)}:1
                  </td>
                  <td className="py-2 font-mono tabular-nums whitespace-nowrap">
                    {check.need}:1 <Result pass={ratio >= check.need} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption className="font-sans text-sm text-[#4b5563] leading-relaxed">
        Text needs 4.5:1. Icons and other non-text graphics need 3:1. Ratios
        are calculated from the token values.
      </figcaption>
    </figure>
  );
}

const ringShadow = focusRingBands
  .map((band, i) => `0 0 0 ${(i + 1) * 2}px ${primitiveHex(band)}`)
  .join(", ");

export function FocusRingSamples() {
  return (
    <figure className="flex flex-col gap-3">
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list">
        {primitives.map((background) => {
          const best = focusRingBands
            .map((band) => ({
              band,
              ratio: contrastRatio(primitiveHex(band), background.hex),
            }))
            .sort((a, b) => b.ratio - a.ratio)[0];
          return (
            <li
              key={background.id}
              className="border border-border rounded-lg overflow-hidden flex flex-col"
            >
              <div
                className="h-24 grid place-items-center"
                style={{ background: background.hex }}
              >
                <span
                  aria-hidden="true"
                  className="block w-16 h-7 rounded"
                  style={{ boxShadow: ringShadow }}
                />
              </div>
              <div className="px-3 py-2 font-sans text-sm flex flex-col gap-0.5">
                <span>
                  On <span className="font-mono text-primary">{background.id}</span>
                </span>
                <span className="text-[#4b5563]">
                  <span className="font-mono">{best.band}</span> band{" "}
                  <span className="font-mono tabular-nums">{best.ratio.toFixed(1)}:1</span>{" "}
                  <Result pass={best.ratio >= 3} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <figcaption className="font-sans text-sm text-[#4b5563] leading-relaxed">
        The focus ring on each palette color. From the inside out: white,
        navy-500, navy-100. Each ratio is the strongest band against that
        background, and a focus indicator needs 3:1.
      </figcaption>
    </figure>
  );
}

type PairingRule = {
  title: string;
  need: 4.5 | 3;
  kind: "icon" | "text";
  examples: { fg: string; bg: string }[];
};

// The palette's level rules, each shown with pairs whose values we have.
const pairingRules: PairingRule[] = [
  {
    title: "On a 100-level background, icons can use any 500 color",
    need: 3,
    kind: "icon",
    examples: [
      { fg: "navy-500", bg: "navy-100" },
      { fg: "green-500", bg: "green-100" },
      { fg: "red-500", bg: "red-100" },
    ],
  },
  {
    title: "On a 100-level background, text can use any 600 color",
    need: 4.5,
    kind: "text",
    examples: [
      { fg: "green-600", bg: "green-100" },
      { fg: "red-600", bg: "red-100" },
    ],
  },
  {
    title: "On any 500-level or darker background, text is white",
    need: 4.5,
    kind: "text",
    examples: [
      { fg: "white", bg: "navy-500" },
      { fg: "white", bg: "green-500" },
      { fg: "white", bg: "red-500" },
    ],
  },
];

function InfoIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} aria-hidden="true">
      <circle cx={12} cy={12} r={10} fill="none" stroke={color} strokeWidth={2} />
      <path d="M12 11v6M12 7.5v.5" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

export function PairingRules() {
  return (
    <figure className="flex flex-col gap-3">
      <ol className="flex flex-col gap-4" role="list">
        {pairingRules.map((rule, i) => (
          <li key={rule.title} className="border border-border rounded-lg p-4 flex flex-col gap-3">
            <p className="font-sans text-base font-medium text-primary">
              <span className="sr-only">Rule {i + 1}: </span>
              {rule.title}
            </p>
            <ul className="flex flex-wrap gap-3" role="list">
              {rule.examples.map(({ fg, bg }) => {
                const ratio = contrastRatio(primitiveHex(fg), primitiveHex(bg));
                return (
                  <li key={`${fg}-${bg}`} className="flex flex-col gap-1">
                    <span
                      className="w-36 h-16 rounded flex items-center justify-center border border-border/50"
                      style={{ background: primitiveHex(bg) }}
                    >
                      {rule.kind === "icon" ? (
                        <InfoIcon color={primitiveHex(fg)} />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="font-sans text-base font-medium"
                          style={{ color: primitiveHex(fg) }}
                        >
                          Sample text
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs text-[#4b5563]">
                      {fg} on {bg}
                    </span>
                    <span className="font-mono text-xs tabular-nums">
                      {ratio.toFixed(1)}:1 <Result pass={ratio >= rule.need} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <figcaption className="font-sans text-sm text-[#4b5563] leading-relaxed">
        Icons need 3:1 and text needs 4.5:1. Examples use the colors with
        values on this page; the rules apply to every color family.
      </figcaption>
    </figure>
  );
}
