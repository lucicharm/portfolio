// node test.mjs <out dir> <screenshot dir>
import puppeteer from "puppeteer-core";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const [OUT, SHOTS] = process.argv.slice(2);
await mkdir(SHOTS, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--allow-file-access-from-files"],
});

const dirs = ["a", "b", "c", "d"];
const pages = [
  "home.html",
  "case-matrix-schedule-accessibility.html",
  "case-accessibility-program.html",
  "case-accessible-design-systems.html",
  "case-sms-job-offers.html",
  "case-ai-prototyping.html",
  "case-acr-dashboard.html",
  "case-accessibility-programs-tooling.html",
  "about.html",
];
const report = [];

const spacingCss = `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
p { margin-bottom: 2em !important; }`;

async function overflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const over = doc.scrollWidth - doc.clientWidth;
    const offenders = [];
    if (over > 0) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > doc.clientWidth + 1 && !el.closest(".table-scroll")) {
          offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join(".")} right=${Math.round(r.right)}`);
          if (offenders.length > 5) break;
        }
      }
    }
    return { over, offenders };
  });
}

for (const dir of dirs) {
  for (const file of pages) {
    const url = "file://" + path.join(OUT, dir, file);
    const page = await browser.newPage();
    const entry = { dir, file };

    // Desktop: axe, fonts, headings, focus walk.
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    entry.fonts = await page.evaluate(() =>
      [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family))],
    );
    await page.addScriptTag({ content: axeSource });
    const axe = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
      });
      return {
        violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes[0]?.target.join(" ") })),
        incomplete: r.incomplete.map((v) => ({ id: v.id, n: v.nodes.length, nodes: v.nodes.slice(0, 20).map((n) => n.target.join(" ") + " :: " + (n.any[0]?.message ?? "")) })),
        passes: r.passes.length,
      };
    });
    entry.axe = axe;
    entry.headings = await page.evaluate(() => {
      const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
      const skips = [];
      hs.forEach((l, i) => { if (i && l > hs[i - 1] + 1) skips.push(`${hs[i - 1]}→${l}`); });
      return { count: hs.length, h1: hs.filter((l) => l === 1).length, skips };
    });

    // Tab through every stop; each must show an outline or box-shadow.
    const focus = [];
    await page.evaluate(() => document.activeElement?.blur());
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press("Tab");
      const f = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const host = el.closest("article"); const hostRing = host && getComputedStyle(host).boxShadow !== "none";
        const ring = hostRing || (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2 && cs.outlineColor !== "rgba(0, 0, 0, 0)") || cs.boxShadow !== "none";
        const r = el.getBoundingClientRect();
        return { key: el.outerHTML.slice(0, 80), ring, w: Math.round(r.width), h: Math.round(r.height), inView: r.top >= 0 && r.bottom <= innerHeight };
      });
      if (!f) break;
      if (focus.length && f.key === focus[0].key) break;
      focus.push(f);
    }
    entry.focusStops = focus.length;
    entry.focusWithoutRing = focus.filter((f) => !f.ring).map((f) => f.key);
    entry.focusOutOfView = focus.filter((f) => !f.inView).map((f) => f.key);

    if (file === "home.html" || file === "case-matrix-schedule-accessibility.html" || file === "case-accessibility-program.html") {
      const name = `${dir}-${file.replace(".html", "")}`;
      await page.screenshot({ path: path.join(SHOTS, `${name}-1280.png`), fullPage: true });
    }

    // 320px reflow, then with WCAG 1.4.12 text spacing.
    await page.setViewport({ width: 320, height: 640 });
    await page.reload({ waitUntil: "networkidle0" });
    entry.reflow320 = await overflow(page);
    await page.addStyleTag({ content: spacingCss });
    entry.textSpacing320 = await overflow(page);
    if (file === "home.html" || file === "case-matrix-schedule-accessibility.html") {
      await page.reload({ waitUntil: "networkidle0" });
      await page.screenshot({ path: path.join(SHOTS, `${dir}-${file.replace(".html", "")}-320.png`), fullPage: true });
    }

    // Reduced motion: nothing should still be animating or transitioning.
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.setViewport({ width: 1280, height: 900 });
    await page.reload({ waitUntil: "networkidle0" });
    entry.reducedMotion = await page.evaluate(() => {
      const running = document.getAnimations().filter((a) => {
        const t = a.effect?.getComputedTiming();
        return t && t.duration > 1;
      }).length;
      const slow = [...document.querySelectorAll("*")].filter((el) => {
        const d = getComputedStyle(el).transitionDuration.split(",").map(parseFloat);
        return d.some((x) => x > 0.01);
      }).length;
      return { running, slowTransitions: slow };
    });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

    report.push(entry);
    await page.close();
  }
}

// The comparison shell itself (frames excluded; they're tested above).
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("file://" + path.join(OUT, "index.html"), { waitUntil: "networkidle0" });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const r = await window.axe.run({ exclude: [["iframe"]] }, { iframes: false, runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
    return r.violations.map((v) => ({ id: v.id, n: v.nodes.length, sample: v.nodes[0]?.target.join(" ") }));
  });
  await page.screenshot({ path: path.join(SHOTS, "shell-1440.png") });
  await page.setViewport({ width: 320, height: 700 });
  const reflow = await overflow(page);
  report.push({ dir: "shell", file: "index.html", axe: { violations: axe }, reflow320: reflow });
  await page.close();
}

await browser.close();
await writeFile(path.join(SHOTS, "report.json"), JSON.stringify(report, null, 2));

for (const e of report) {
  const v = e.axe.violations;
  console.log(
    `${e.dir}/${e.file}`.padEnd(48),
    `axe:${v.length ? v.map((x) => `${x.id}(${x.n})`).join(",") : "0"}`,
    e.headings ? `h:${e.headings.count}/h1=${e.headings.h1}${e.headings.skips.length ? "/skip " + e.headings.skips.join(",") : ""}` : "",
    e.focusStops !== undefined ? `tab:${e.focusStops} noRing:${e.focusWithoutRing.length}` : "",
    `reflow:${e.reflow320.over}`,
    e.textSpacing320 ? `spacing:${e.textSpacing320.over}` : "",
    e.reducedMotion ? `rm:${e.reducedMotion.running}/${e.reducedMotion.slowTransitions}` : "",
  );
}
const fonts = report.filter((e) => e.file === "home.html" && e.fonts).map((e) => `${e.dir}: ${e.fonts.join(", ")}`);
console.log("Fonts loaded:\n " + fonts.join("\n "));
