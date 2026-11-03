// Accessibility checks for the built Next site, adapted from test.mjs and
// focus.mjs. Serve the static export under /portfolio first.
//   node site-test.mjs http://localhost:4321/portfolio <screenshot dir>
// PasswordGate reads a localStorage flag; it's set before each page loads,
// except for the run that tests the gate itself.
import puppeteer from "puppeteer-core";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const [BASE, SHOTS] = process.argv.slice(2);
await mkdir(SHOTS, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});

const pages = [
  "/", "/about", "/contact", "/privacy",
  "/work/ai-prototyping", "/work/accessibility-program", "/work/accessible-design-systems",
  "/work/matrix-schedule-accessibility", "/work/sms-job-offers",
  "/work/accessibility-programs-tooling", "/work/acr-dashboard",
];

const spacingCss = `* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
p { margin-bottom: 2em !important; }`;

async function open(route, { width = 1280, height = 900, unlocked = true, media = [] } = {}) {
  const page = await browser.newPage();
  if (unlocked) await page.evaluateOnNewDocument(() => localStorage.setItem("portfolio-authenticated", "true"));
  else await page.evaluateOnNewDocument(() => localStorage.removeItem("portfolio-authenticated"));
  // Straight to DevTools, as the Rendering panel does; puppeteer's wrapper
  // doesn't accept forced-colors.
  const cdp = await page.createCDPSession();
  await cdp.send("Emulation.setEmulatedMedia", { features: media });
  await page.setViewport({ width, height });
  await page.goto(BASE + route, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

async function overflow(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const over = doc.scrollWidth - doc.clientWidth;
    const offenders = [];
    if (over > 0) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > doc.clientWidth + 1 && !el.closest(".overflow-x-auto")) {
          offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join(".")} right=${Math.round(r.right)}`);
          if (offenders.length > 5) break;
        }
      }
    }
    return { over, offenders };
  });
}

// Runs in the page for the focused element. Finds what draws the ring (the
// element, or its .link-row when :has() moves the ring there), checks every
// band against the surface behind it, and checks the sticky header.
const inspectFocus = () => {
  const el = document.activeElement;
  if (!el || el === document.body) return null;
  const lum = (rgb) => {
    const [r, g, b] = rgb.match(/[\d.]+/g).slice(0, 3).map((v) => v / 255)
      .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((x, y) => y - x); return (h + 0.05) / (l + 0.05); };
  const opaque = (c) => c && c !== "transparent" && !/rgba\(.*,\s*0\)$/.test(c);
  const bgOf = (node) => {
    for (let n = node; n; n = n.parentElement) {
      const c = getComputedStyle(n).backgroundColor;
      if (opaque(c)) return c;
    }
    return "rgb(255, 255, 255)";
  };
  // A link inside a sentence. WCAG 2.5.8 exempts it from the target size.
  const inline = getComputedStyle(el).display === "inline" && el.parentElement.textContent.trim().length > el.textContent.trim().length;
  const row = el.closest(".link-row");
  const rowShadow = row && getComputedStyle(row).boxShadow;
  const host = rowShadow && rowShadow !== "none" ? row : el;
  const cs = getComputedStyle(host);
  // Ring bands only: an inset shadow (the current nav link's bar) isn't one.
  const bands = cs.boxShadow.split(/,(?![^(]*\))/).filter((sh) => !/inset/.test(sh))
    .map((sh) => sh.match(/rgba?\([^)]+\)/)?.[0]).filter(Boolean);
  const outline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2 && opaque(cs.outlineColor);
  const surface = bgOf(host.parentElement);
  const own = getComputedStyle(host).backgroundColor;
  const best = bands.length ? Math.max(...bands.map((b) => ratio(b, surface))) : 0;
  const bestOwn = bands.length && opaque(own) ? Math.max(...bands.map((b) => ratio(b, own))) : null;
  const r = host.getBoundingClientRect();
  const pad = bands.length ? 7 : 4;
  const header = document.querySelector("body header");
  // A fixed element (the skip link) sits above the header.
  const sticky = header && getComputedStyle(header).position === "sticky" && !header.contains(el) && getComputedStyle(el).position !== "fixed";
  const top = sticky ? header.getBoundingClientRect().bottom : 0;
  const visTop = Math.max(r.top - pad, top, 0), visBot = Math.min(r.bottom + pad, innerHeight);
  const frac = Math.max(0, visBot - visTop) / (r.height + 2 * pad);
  return {
    key: el.outerHTML.slice(0, 90), onRow: host === row, outline,
    // Three bands; two (paper, mark) for a link inside a sentence.
    ring: bands.includes("rgb(158, 20, 89)") && (bands.length === 3 || (bands.length === 2 && inline)),
    surface, best: +best.toFixed(2), bestOwn: bestOwn && +bestOwn.toFixed(2),
    inline,
    visibleFrac: +frac.toFixed(2), w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height),
  };
};

async function tabWalk(page, max = 120) {
  const stops = [];
  await page.evaluate(() => document.activeElement?.blur());
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    const f = await page.evaluate(inspectFocus);
    if (!f) break;
    if (stops.length && f.key === stops[0].key) break;
    stops.push(f);
  }
  return stops;
}

const report = [];
for (const route of pages) {
  const entry = { route };
  let page = await open(route);
  entry.fonts = await page.evaluate(() => [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family))]);
  await page.addScriptTag({ content: axeSource });
  entry.axe = await page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
    return {
      violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map((n) => n.target.join(" ")) })),
      incomplete: r.incomplete.map((v) => ({ id: v.id, n: v.nodes.length })),
    };
  });
  entry.headings = await page.evaluate(() => {
    const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
    const skips = [];
    hs.forEach((l, i) => { if (i && l > hs[i - 1] + 1) skips.push(`${hs[i - 1]}→${l}`); });
    return { count: hs.length, h1: hs.filter((l) => l === 1).length, first: hs[0], skips };
  });
  entry.landmarks = await page.evaluate(() =>
    [...document.querySelectorAll("header, nav, main, footer, aside, section[aria-labelledby], [role=region]")]
      .filter((n) => n.matches("nav, aside, [role=region]") && !n.getAttribute("aria-label") && !n.getAttribute("aria-labelledby"))
      .map((n) => n.outerHTML.slice(0, 60)));

  // Keyboard: every stop needs the three-band ring (or the row ring), at
  // least one band at 3:1 against the surface, and a 24px target.
  const stops = await tabWalk(page);
  entry.focusStops = stops.length;
  entry.noRing = stops.filter((f) => !f.ring).map((f) => f.key);
  entry.weakRing = stops.filter((f) => f.ring && f.best < 3).map((f) => `${f.key} ${f.best} on ${f.surface}`);
  entry.rowRings = stops.filter((f) => f.onRow).length;
  entry.minBand = stops.length ? Math.min(...stops.map((f) => f.best)) : null;
  entry.smallTargets = stops.filter((f) => (f.w < 24 || f.h < 24) && !f.inline).map((f) => `${f.key} ${f.w}x${f.h}`);
  await page.close();

  // Focus not obscured by the sticky header, ring included (2.4.11).
  entry.obscured = {};
  for (const [w, h] of [[1280, 900], [1280, 560], [1024, 700], [320, 640]]) {
    page = await open(route, { width: w, height: h });
    const s = await tabWalk(page);
    const worst = s.reduce((m, f) => (f.visibleFrac < m.visibleFrac ? f : m), { visibleFrac: 1 });
    entry.obscured[`${w}x${h}`] = worst.visibleFrac < 1 ? `${worst.visibleFrac} ${worst.key}` : 1;
    await page.close();
  }

  // Mouse clicks, through the browser's input pipeline, must not show the ring.
  page = await open(route);
  entry.realClick = [];
  for (const sel of ["header a[aria-current]", ".stretched-link", "nav[aria-labelledby=toc-heading] a", "figure button[aria-pressed]", "figure summary", "[tabindex='0']"]) {
    const h = await page.$(sel);
    if (!h || !(await h.isVisible())) continue;
    await h.evaluate((el) => el.addEventListener("click", (e) => { if (el.tagName === "A") e.preventDefault(); }, { once: true }));
    await h.click();
    const fv = await page.evaluate(() => {
      const a = document.activeElement; const row = a?.closest(".link-row");
      return { sel: a?.outerHTML.slice(0, 50), fv: a?.matches(":focus-visible"), shadow: getComputedStyle(row ?? a).boxShadow };
    });
    entry.realClick.push({ sel, ...fv, ringShown: fv.fv || /252, 238, 245/.test(fv.shadow) });
  }
  await page.close();

  // Forced colors: the box-shadow goes; an outline must take its place.
  page = await open(route, { media: [{ name: "forced-colors", value: "active" }] });
  const fc = await tabWalk(page, 60);
  entry.forcedColors = {
    active: await page.evaluate(() => matchMedia("(forced-colors: active)").matches),
    stops: fc.length,
    withoutOutline: fc.filter((f) => !f.outline && !(f.onRow)).map((f) => f.key),
    rowOutline: await page.evaluate(() => {
      const row = document.querySelector(".link-row"); const a = row?.querySelector(".stretched-link");
      if (!a) return null; a.focus(); // programmatic focus after keyboard use
      return getComputedStyle(row).outlineStyle + " " + getComputedStyle(row).outlineColor;
    }),
  };
  await page.close();

  // 320px reflow, then with WCAG 1.4.12 text spacing.
  page = await open(route, { width: 320, height: 640 });
  entry.reflow320 = await overflow(page);
  await page.addStyleTag({ content: spacingCss });
  entry.spacing320 = await overflow(page);
  await page.close();

  // Reduced motion: nothing animating or transitioning.
  page = await open(route, { media: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  entry.reducedMotion = await page.evaluate(() => ({
    running: document.getAnimations().filter((a) => (a.effect?.getComputedTiming().duration ?? 0) > 1).length,
    slow: [...document.querySelectorAll("*")].filter((el) => getComputedStyle(el).transitionDuration.split(",").some((x) => parseFloat(x) > 0.01)).length,
  }));
  await page.close();
  // And without the preference: A has no motion at all.
  page = await open(route);
  entry.motionAnyway = await page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => getComputedStyle(el).transitionDuration.split(",").some((x) => parseFloat(x) > 0.01)).length);
  await page.close();

  report.push(entry);
}

// The password screen itself.
{
  const page = await open("/", { unlocked: false });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } })).violations.map((v) => `${v.id}(${v.nodes.length})`));
  const stops = await tabWalk(page);
  await page.screenshot({ path: path.join(SHOTS, "gate-1280.png") });
  await page.setViewport({ width: 320, height: 640 });
  report.push({ route: "(password gate)", axe: { violations: axe.map((id) => ({ id, n: "" })) }, focusStops: stops.length, noRing: stops.filter((f) => !f.ring).map((f) => f.key), minBand: Math.min(...stops.map((f) => f.best)), reflow320: await overflow(page) });
  await page.close();
}

await browser.close();
await writeFile(path.join(SHOTS, "site-report.json"), JSON.stringify(report, null, 2));

for (const e of report) {
  const v = e.axe.violations;
  console.log(
    e.route.padEnd(38),
    `axe:${v.length ? v.map((x) => `${x.id}(${x.n})`).join(",") : "0"}`,
    e.headings ? `h:${e.headings.count}/h1=${e.headings.h1}${e.headings.skips.length ? "/skip " + e.headings.skips.join(",") : ""}` : "",
    `tab:${e.focusStops} noRing:${e.noRing.length}`,
    e.weakRing ? `weak:${e.weakRing.length}` : "",
    `minBand:${e.minBand}`,
    e.rowRings !== undefined ? `rows:${e.rowRings}` : "",
    `reflow:${e.reflow320.over}`,
    e.spacing320 ? `spacing:${e.spacing320.over}` : "",
    e.reducedMotion ? `rm:${e.reducedMotion.running}/${e.reducedMotion.slow} motion:${e.motionAnyway}` : "",
  );
  if (e.obscured) {
    const bad = Object.entries(e.obscured).filter(([, v]) => v !== 1);
    if (bad.length) console.log("   obscured:", bad);
    const rc = e.realClick.filter((c) => c.ringShown);
    if (rc.length) console.log("   ring on real click:", rc);
    if (!e.forcedColors.active || e.forcedColors.withoutOutline.length) console.log("   forced colors:", e.forcedColors);
    if (e.smallTargets.length) console.log("   small targets:", e.smallTargets);
    if (e.landmarks.length) console.log("   unlabeled landmarks:", e.landmarks);
    if (e.noRing.length) console.log("   no ring:", e.noRing);
  }
}
console.log("Fonts:", report[0].fonts.join(", "));
console.log("Real clicks tested:", report.flatMap((e) => e.realClick ?? []).length, "Forced-colors row outline:", report[0].forcedColors.rowOutline);
