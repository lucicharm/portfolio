// Builds the design-direction preview into ./out.
//   node --no-warnings build.mjs [portfolio repo; defaults to the parent folder]
import { mkdir, writeFile, readFile, copyFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, selectedWork, caseData, pageShell, stubBody, imagesUsed, esc } from "./shared.mjs";
import { directions } from "./directions.mjs";
import { palettes, checks } from "./palettes.mjs";
import { writeups, comparison, recommendation, verification } from "./writeup.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "out");
await rm(OUT, { recursive: true, force: true });

const base = await readFile(path.join(HERE, "base.css"), "utf8");
const files = [];
const write = async (rel, text) => {
  const full = path.join(OUT, rel);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, text);
  files.push(rel);
};

for (const dir of directions) {
  const css = await readFile(path.join(HERE, `${dir.id}.css`), "utf8");
  await write(`${dir.id}/style.css`, `${base}\n${css}`);
  const shell = (title, current, body) =>
    pageShell({ dir, title, current, body, headerClass: dir.headerClass, footerClass: dir.footerClass });

  await write(`${dir.id}/home.html`, shell("Work", "work", dir.home()));
  for (const item of selectedWork) {
    const d = caseData(item);
    await write(`${dir.id}/case-${item.slug}.html`, shell(d.title, "work", dir.case(d)));
  }
  for (const [file, name, key] of [["about", "About", "about"], ["contact", "Contact", "contact"], ["privacy", "Privacy", ""]]) {
    await write(`${dir.id}/${file}.html`, shell(name, key, stubBody(name)));
  }
}

for (const src of imagesUsed) {
  const rel = src.replace(/^\//, "");
  await mkdir(path.dirname(path.join(OUT, rel)), { recursive: true });
  await copyFile(path.join(ROOT, "public", rel), path.join(OUT, rel));
  files.push(rel);
}

// ─── Comparison shell ────────────────────────────────────────────────────
const results = checks();
const swatchRow = (id) =>
  Object.entries(palettes[id])
    .map(
      ([name, hex]) =>
        `<li><span class="sw" style="background:${hex}" aria-hidden="true"></span><code>${name}</code> <span class="hex">${hex}</span></li>`,
    )
    .join("");
const contrastTable = (id) => `<div class="table-scroll"><table>
<caption class="sr-only">Contrast checks for Direction ${id.toUpperCase()}</caption>
<thead><tr><th scope="col">Foreground</th><th scope="col">Background</th><th scope="col">Used for</th><th scope="col" class="num">Ratio</th><th scope="col" class="num">Needs</th><th scope="col">Result</th></tr></thead>
<tbody>${results
  .filter((r) => r.d === id)
  .map(
    (r) => `<tr><td><span class="sw sm" style="background:${r.fgHex}" aria-hidden="true"></span><code>${r.fg}</code></td><td><span class="sw sm" style="background:${r.bgHex}" aria-hidden="true"></span><code>${r.bg}</code></td><td>${esc(
      r.use,
    )}</td><td class="num">${r.r.toFixed(2)}:1</td><td class="num">${r.need}:1</td><td>${r.pass ? "Pass" : "<strong>Fail</strong>"}</td></tr>`,
  )
  .join("")}</tbody></table></div>`;

const pageOptions = [
  ["home", "Home", "home.html"],
  ["work", "Selected work", "home.html#selected-work"],
  ["matrix", "Case study: matrix schedule", "case-matrix-schedule-accessibility.html"],
  ["program", "Case study: accessibility program", "case-accessibility-program.html"],
];
const widthOptions = [
  ["1280", "Desktop 1280"],
  ["768", "Tablet 768"],
  ["390", "Phone 390"],
  ["320", "Reflow 320"],
];
const radios = (name, legend, opts, checked) => `<fieldset class="seg">
  <legend>${legend}</legend>
  <div class="seg-row">${opts
    .map(
      ([v, label]) =>
        `<input type="radio" name="${name}" id="${name}-${v}" value="${v}"${v === checked ? " checked" : ""}><label for="${name}-${v}">${label}</label>`,
    )
    .join("")}</div>
</fieldset>`;

const frames = directions
  .map((dir) => {
    const w = writeups[dir.id];
    return `<div class="frame" role="group" data-dir="${dir.id}" aria-labelledby="frame-${dir.id}">
  <div class="frame-head">
    <h3 id="frame-${dir.id}"><span class="letter">${dir.letter}</span> ${esc(dir.name)}</h3>
    <p>${esc(w.oneLiner)}</p>
    <p class="frame-meta"><span class="scale" data-scale-for="${dir.id}"></span> <a class="open" data-open="${dir.id}" href="${dir.id}/home.html" target="_blank" rel="noopener">Open full size<span class="sr-only">: Direction ${dir.letter}, ${esc(
      dir.name,
    )} (new tab)</span></a></p>
  </div>
  <div class="viewport"><iframe title="Direction ${dir.letter}, ${esc(dir.name)}: preview" src="${dir.id}/home.html" loading="lazy"></iframe></div>
</div>`;
  })
  .join("\n");

const dirSections = directions
  .map((dir) => {
    const w = writeups[dir.id];
    return `<section class="dir" aria-labelledby="dir-${dir.id}">
  <h3 id="dir-${dir.id}"><span class="letter">${dir.letter}</span> ${esc(dir.name)}</h3>
  <p class="rationale">${w.rationale}</p>
  <div class="dir-grid">
    <div>
      <h4>Visual system</h4>
      <dl class="system">${w.system.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      <ul class="swatches" role="list" aria-label="Direction ${dir.letter} color tokens">${swatchRow(dir.id)}</ul>
    </div>
    <div>
      <h4>Page by page</h4>
      <dl class="system">${w.pages.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
    </div>
  </div>
  <h4>Accessibility risks and how the design handles them</h4>
  <div class="table-scroll"><table class="risks"><thead><tr><th scope="col">Risk</th><th scope="col">How this direction handles it</th></tr></thead><tbody>${w.risks
    .map(([r, m]) => `<tr><td>${r}</td><td>${m}</td></tr>`)
    .join("")}</tbody></table></div>
  <details class="contrast"><summary>Measured contrast for every color pair Direction ${dir.letter} uses</summary>${contrastTable(dir.id)}</details>
</section>`;
  })
  .join("\n");

const shellHtml = `<title>Portfolio Directions</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="claude:viewport-fit-sides" content="cover">
<style>
/* Layout: a control strip, three scaled frames side by side, then the written comparison. */
:root {
  --bg: #F7F7F5; --fg: #1C1D21; --fg-2: #50535C; --line: #D9DAD6; --line-strong: #7A7D86;
  --card: #FFFFFF; --accent: #2F4BB8; --accent-ink: #FFFFFF; --accent-wash: #E9EDFB;
  --font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #16171A; --fg: #ECEDEF; --fg-2: #B2B5BD; --line: #34363C; --line-strong: #858892;
  --card: #1F2024; --accent: #9DB0FF; --accent-ink: #11131A; --accent-wash: #262C45; color-scheme: dark; } }
:root[data-theme="dark"] {
  --bg: #16171A; --fg: #ECEDEF; --fg-2: #B2B5BD; --line: #34363C; --line-strong: #858892;
  --card: #1F2024; --accent: #9DB0FF; --accent-ink: #11131A; --accent-wash: #262C45; color-scheme: dark; }
* { box-sizing: border-box; }
body { background: var(--bg); color: var(--fg); font: 16px/1.55 var(--font); }
.page { max-width: 110rem; margin: 0 auto; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 2rem 4rem; }
h1, h2, h3, h4 { line-height: 1.2; text-wrap: balance; margin: 0; }
h1 { font-size: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem); letter-spacing: -0.02em; }
h2 { font-size: 1.5rem; margin-bottom: 1rem; }
h3 { font-size: 1.125rem; }
h4 { font-size: 0.9375rem; margin: 1.5rem 0 0.5rem; }
p { margin: 0; }
a { color: var(--accent); text-underline-offset: 0.2em; }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; border-radius: 2px; }
code, .hex { font-family: var(--mono); font-size: 0.8125rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.intro { display: grid; gap: 0.75rem; max-width: 46rem; margin-bottom: 1.5rem; }
.intro p { color: var(--fg-2); }
.letter { display: inline-grid; place-items: center; width: 1.6em; height: 1.6em; border-radius: 4px; background: var(--fg); color: var(--bg); font-size: 0.85em; margin-right: 0.25rem; }

.controls { display: flex; flex-wrap: wrap; gap: 1rem 2rem; padding: 1rem 0; border-block: 1px solid var(--line); margin-bottom: 1.25rem; }
.seg { border: 0; padding: 0; margin: 0; min-width: 0; }
.seg legend { font-size: 0.8125rem; font-weight: 600; color: var(--fg-2); padding: 0; margin-bottom: 0.375rem; }
.seg-row { display: flex; flex-wrap: wrap; gap: 0.25rem; }
.seg input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.seg label { display: inline-flex; align-items: center; min-height: 2.25rem; padding: 0.25rem 0.75rem; border: 1px solid var(--line-strong); border-radius: 6px; cursor: pointer; font-size: 0.875rem; background: var(--card); }
.seg input:checked + label { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); font-weight: 600; }
.seg input:checked + label::before { content: "✓" / ""; margin-right: 0.35em; }
.seg input:focus-visible + label { outline: 3px solid var(--accent); outline-offset: 2px; }

.frames { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr)); }
.frames[data-show="all"] { grid-template-columns: repeat(auto-fit, minmax(min(100%, 34rem), 1fr)); }
.frames[data-show="a"], .frames[data-show="b"], .frames[data-show="c"], .frames[data-show="d"] { grid-template-columns: 1fr; }
.frame { background: var(--card); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; min-width: 0; }
.frame[hidden] { display: none; }
.frame-head { padding: 0.875rem 1rem; display: grid; gap: 0.375rem; border-bottom: 1px solid var(--line); }
.frame-head p { font-size: 0.875rem; color: var(--fg-2); }
.frame-meta { display: flex; flex-wrap: wrap; gap: 0.25rem 1rem; align-items: center; }
.frame-meta a { display: inline-flex; align-items: center; min-height: 1.5rem; }
.viewport { position: relative; height: clamp(26rem, 72vh, 52rem); overflow: hidden; background: repeating-conic-gradient(var(--bg) 0 25%, var(--card) 0 50%) 0 0 / 16px 16px; }
.viewport iframe { position: absolute; top: 0; left: 0; border: 0; transform-origin: 0 0; background: #fff; }

.section { margin-top: 3.5rem; }
.dir { background: var(--card); border: 1px solid var(--line); border-radius: 8px; padding: clamp(1rem, 3vw, 2rem); margin-bottom: 1.25rem; }
.rationale { margin-top: 0.75rem; max-width: 48rem; }
.dir-grid { display: grid; gap: 0 2.5rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr)); }
.system { margin: 0; display: grid; gap: 0.5rem; }
.system div { display: grid; grid-template-columns: 7rem 1fr; gap: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--line); }
.system dt { font-weight: 600; font-size: 0.875rem; }
.system dd { margin: 0; font-size: 0.9375rem; min-width: 0; }
@media (max-width: 30rem) { .system div { grid-template-columns: 1fr; gap: 0.125rem; } }
.swatches { list-style: none; padding: 0; margin: 1rem 0 0; display: flex; flex-wrap: wrap; gap: 0.375rem 1rem; font-size: 0.8125rem; }
.swatches li { display: inline-flex; align-items: center; gap: 0.375rem; }
.sw { display: inline-block; width: 1rem; height: 1rem; border-radius: 3px; box-shadow: inset 0 0 0 1px rgba(0,0,0,0.25); vertical-align: -0.2em; }
.sw.sm { width: 0.75rem; height: 0.75rem; margin-right: 0.25rem; }
.table-scroll { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 0.875rem; }
th, td { text-align: left; vertical-align: top; padding: 0.5rem 0.75rem 0.5rem 0; border-bottom: 1px solid var(--line); }
th { font-weight: 600; color: var(--fg-2); }
td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.risks td:first-child { width: 32%; font-weight: 600; }
details.contrast { margin-top: 1.25rem; }
details.contrast summary { cursor: pointer; font-weight: 600; min-height: 2rem; display: list-item; }
.compare th[scope="row"] { color: var(--fg); }
.compare td, .compare th { min-width: 9rem; }
.callout { background: var(--accent-wash); border-radius: 8px; padding: 1.25rem; max-width: 52rem; display: grid; gap: 0.75rem; }
.prose { display: grid; gap: 0.75rem; max-width: 52rem; }
.prose ul { margin: 0; padding-left: 1.25rem; display: grid; gap: 0.375rem; }
</style>

<div class="page">
<header class="intro">
  <h1>Portfolio Directions</h1>
  <p>Four visual directions for the portfolio, each built as a small static site from the real content in <code>lib/selected-work.ts</code> and <code>lib/projects.ts</code>. D, Hybrid, combines A’s structure with B’s contrast and serif type. The live site is unchanged; the prototypes live in <code>design-directions/</code>.</p>
  <p>Pick a page and a width to compare them side by side. Frames wider than their column are scaled down to fit; use “Open full size” to read, zoom, or test with a keyboard or screen reader.</p>
</header>

<main>
<section aria-labelledby="compare-heading">
  <h2 id="compare-heading" class="sr-only">Side-by-side preview</h2>
  <form class="controls" id="controls" onsubmit="return false">
    ${radios("page", "Page", pageOptions.map(([v, l]) => [v, l]), "home")}
    ${radios("width", "Simulated width (CSS px)", widthOptions, "1280")}
    ${radios("show", "Show", [["abd", "D with A and B"], ["all", "All four"], ...directions.map((d) => [d.id, `${d.letter} only`])], "abd")}
  </form>
  <div class="frames" id="frames" data-show="abd">
${frames}
  </div>
</section>

<section class="section" aria-labelledby="dirs-heading">
  <h2 id="dirs-heading">The four directions</h2>
${dirSections}
</section>

<section class="section" aria-labelledby="cmp-heading">
  <h2 id="cmp-heading">Comparison</h2>
  ${comparison}
</section>

<section class="section" aria-labelledby="rec-heading">
  <h2 id="rec-heading">Recommendation</h2>
  ${recommendation}
</section>

<section class="section" aria-labelledby="ver-heading">
  <h2 id="ver-heading">What was verified, and what still needs a person</h2>
  ${verification}
</section>
</main>
</div>

<script>
document.documentElement.lang = document.documentElement.lang || "en";
const pages = ${JSON.stringify(Object.fromEntries(pageOptions.map(([v, , f]) => [v, f])))};
const form = document.getElementById("controls");
const framesEl = document.getElementById("frames");
const state = { page: "home", width: 1280, show: "abd" };

function fit() {
  for (const frame of framesEl.querySelectorAll(".frame")) {
    if (frame.hidden) continue;
    const vp = frame.querySelector(".viewport");
    const iframe = vp.querySelector("iframe");
    const scale = Math.min(1, vp.clientWidth / state.width);
    iframe.style.width = state.width + "px";
    iframe.style.height = Math.round(vp.clientHeight / scale) + "px";
    iframe.style.transform = "scale(" + scale + ")";
    frame.querySelector(".scale").textContent =
      state.width + " px wide, shown at " + Math.round(scale * 100) + "%.";
  }
}

function apply() {
  const file = pages[state.page];
  framesEl.dataset.show = state.show;
  for (const frame of framesEl.querySelectorAll(".frame")) {
    const id = frame.dataset.dir;
    frame.hidden = !(state.show === "all" || state.show === id || (state.show === "abd" && "abd".includes(id)));
    const src = id + "/" + file;
    const iframe = frame.querySelector("iframe");
    if (iframe.getAttribute("src") !== src) iframe.setAttribute("src", src);
    frame.querySelector(".open").setAttribute("href", src);
  }
  fit();
}

form.addEventListener("change", (e) => {
  const { name, value } = e.target;
  state[name] = name === "width" ? Number(value) : value;
  apply();
});
new ResizeObserver(fit).observe(framesEl);
apply();
</script>
`;
await writeFile(path.join(OUT, "index.html"), shellHtml);

console.log(`Wrote ${files.length + 1} files to ${OUT}`);
const fails = results.filter((r) => !r.pass);
console.log(fails.length ? `Contrast failures: ${fails.length}` : `All ${results.length} contrast pairs pass.`);
if (fails.length) process.exitCode = 1;
await writeFile(path.join(OUT, "files.json"), JSON.stringify(files, null, 2));
