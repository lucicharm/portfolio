// Contrast of every color pair the site uses, read from app/globals.css so
// the table can't drift from the theme. Exits non-zero if a pair fails.
//   node site-contrast.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const css = await readFile(path.join(ROOT, "app/globals.css"), "utf8");
const t = Object.fromEntries([...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, k, v]) => [k, v]));
const { primitives } = await import(pathToFileURL(path.join(ROOT, "lib/design-tokens.ts")).href);

const lum = (hex) => [1, 3, 5]
  .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
// Opaque mix of fg over bg at alpha a.
const mix = (fg, bg, a) => "#" + [1, 3, 5].map((i) => Math.round(parseInt(fg.slice(i, i + 2), 16) * a + parseInt(bg.slice(i, i + 2), 16) * (1 - a)).toString(16).padStart(2, "0")).join("");
const offerCell = mix(t.paper, t.guide, 0.88); // bg-paper/88 over a column guide

const pairs = [
  ["ink", "paper", 4.5, "Body and headings"],
  ["ink", "panel", 4.5, "Text on row hover, panel bands"],
  ["ink", "guide", 4.5, "Hero headline over a column guide"],
  ["ink", offerCell, 4.5, "Offer text over a guide"],
  ["ink", "mark-wash", 4.5, "Work-in-progress notice"],
  ["ink-2", "paper", 4.5, "Secondary text, captions, placeholders"],
  ["ink-2", "panel", 4.5, "Secondary text on panel"],
  ["ink-2", "guide", 4.5, "Eyebrow and lede over a guide"],
  ["mark", "paper", 4.5, "Links, mono labels, figure numbers"],
  ["mark", "panel", 4.5, "Links and labels on panel"],
  ["mark", "guide", 4.5, "“For everyone.” over a guide"],
  ["mark", offerCell, 4.5, "Offer labels over a guide"],
  ["mark", "mark-wash", 4.5, "Work-in-progress badge"],
  ["paper", "ink", 4.5, "Button and skip-link label"],
  ["paper", "mark", 4.5, "Button label on hover; pressed diagram button"],
  ["success", "paper", 4.5, "“Message sent”, Pass"],
  ["danger", "paper", 4.5, "Form errors, Fail"],
  ["rule-strong", "paper", 3, "Field, cell and chip borders"],
  ["rule-strong", "panel", 3, "Cell borders on a panel band"],
  ["danger", "paper", 3, "Invalid field border"],
  ["mark", "paper", 3, "Hover borders, crop marks, current-page bar"],
  ["mark", "panel", 3, "Crop marks on a hovered row"],
].map(([fg, bg, need, use]) => {
  const f = t[fg] ?? fg, b = t[bg] ?? bg;
  return { pair: `${fg} on ${t[bg] ? bg : b}`, use, need, r: ratio(f, b) };
});

// The ring needs one band at 3:1 against the surface it's drawn on.
const bands = { paper: t.paper, mark: t.mark, "mark-wash": t["mark-wash"] };
const surfaces = [
  ...["paper", "panel", "mark-wash", "ink", "mark", "guide"].map((k) => [k, t[k], "site"]),
  ...primitives.map((p) => [p.id, p.hex, "token figure tile"]),
];
const ring = surfaces.map(([name, hex, where]) => {
  const [band, r] = Object.entries(bands).map(([b, h]) => [b, ratio(h, hex)]).sort((a, b) => b[1] - a[1])[0];
  return { pair: `ring on ${name} (${hex})`, use: `${where}; best band ${band}`, need: 3, r };
});

let failed = 0;
for (const row of [...pairs, ...ring]) {
  const ok = row.r >= row.need;
  if (!ok) failed++;
  console.log(`${ok ? "pass" : "FAIL"}  ${row.r.toFixed(2).padStart(5)}:1  needs ${row.need}  ${row.pair.padEnd(34)} ${row.use}`);
}
console.log(failed ? `${failed} pair(s) fail` : `All ${pairs.length + ring.length} pairs pass.`);
process.exit(failed ? 1 : 0);
