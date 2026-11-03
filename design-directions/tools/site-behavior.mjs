// Behavior the redesign must keep. Serve the export under /portfolio first.
//   node site-behavior.mjs http://localhost:4321/portfolio
import puppeteer from "puppeteer-core";
import { readFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE = process.argv[2];
const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const env = await readFile(path.join(ROOT, ".env.local"), "utf8").catch(() => "");
const password = env.match(/^NEXT_PUBLIC_PASSWORD=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");
const results = [];
const check = (name, ok, detail = "") => results.push({ name, ok: Boolean(ok), detail });
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const open = async (route, { w = 1280, h = 900, unlocked = true } = {}) => {
  const p = await b.newPage();
  await p.evaluateOnNewDocument((u) => (u ? localStorage.setItem("portfolio-authenticated", "true") : localStorage.clear()), unlocked);
  await p.setViewport({ width: w, height: h });
  await p.goto(BASE + route, { waitUntil: "networkidle0" });
  return p;
};

// Password gate: wrong password, then the right one; focus lands on the h1.
{
  const p = await open("/", { unlocked: false });
  check("gate shows on a private page", await p.$("#portfolio-password"));
  await p.type("#portfolio-password", "not-the-password");
  await p.keyboard.press("Enter");
  check("wrong password shows an alert", await p.$eval("#password-error", (e) => e.getAttribute("role") === "alert").catch(() => false));
  if (password) {
    await p.$eval("#portfolio-password", (e) => (e.value = ""));
    await p.click("#portfolio-password", { clickCount: 3 });
    await p.keyboard.press("Backspace");
    await p.type("#portfolio-password", password);
    await p.keyboard.press("Enter");
    await p.waitForSelector("#main-content h1");
    check("right password unlocks and focuses the h1", await p.evaluate(() => document.activeElement?.matches("#main-content h1")));
  } else check("right password unlocks", false, "no NEXT_PUBLIC_PASSWORD in .env.local");
  await p.close();
  const priv = await open("/privacy", { unlocked: false });
  check("privacy is public", await priv.$eval("h1", (h) => h.textContent === "Privacy notice").catch(() => false));
  await priv.close();
}

// Mobile menu: opens, Escape closes it and returns focus to the button.
{
  const p = await open("/about", { w: 375, h: 700 });
  const btn = "button[aria-controls=mobile-menu]";
  check("menu button is 44px", await p.$eval(btn, (e) => e.getBoundingClientRect().width >= 44 && e.getBoundingClientRect().height >= 44));
  await p.focus(btn); await p.keyboard.press("Enter");
  check("menu opens", (await p.$eval(btn, (e) => e.getAttribute("aria-expanded"))) === "true" && (await p.$("#mobile-menu")));
  check("mobile current link", (await p.$eval("#mobile-menu a[aria-current=page]", (a) => a.textContent).catch(() => null)) === "About");
  await p.keyboard.press("Tab");
  await p.keyboard.press("Escape");
  check("Escape closes and returns focus", !(await p.$("#mobile-menu")) && (await p.evaluate((s) => document.activeElement.matches(s), btn)));
  await p.close();
}

// aria-current on the desktop nav.
for (const [route, label] of [["/", "Work"], ["/work/sms-job-offers", "Work"], ["/about", "About"], ["/contact", "Contact"], ["/privacy", null]]) {
  const p = await open(route);
  const cur = await p.$$eval("header nav a[aria-current=page]", (as) => as.map((a) => a.textContent));
  check(`aria-current on ${route}`, label ? cur.length === 1 && cur[0] === label : cur.length === 0, cur.join());
  await p.close();
}

// Links keep the basePath; full-size images resolve; prev/next order.
{
  const p = await open("/work/matrix-schedule-accessibility");
  const hrefs = await p.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
  check("internal links keep /portfolio", hrefs.every((h) => h.startsWith("/portfolio")), hrefs.filter((h) => !h.startsWith("/portfolio")).join());
  const full = await p.$$eval("a", (as) => as.filter((a) => a.textContent.startsWith("View full-size image")).map((a) => a.href));
  const statuses = await Promise.all(full.map((u) => fetch(u).then((r) => r.status)));
  check("full-size image links resolve", full.length && statuses.every((s) => s === 200), `${full.length} links ${[...new Set(statuses)]}`);
  const figs = await p.$$eval("figcaption", (fs) => fs.map((f) => f.textContent.match(/^Fig\. (\d+)/)?.[1]).filter(Boolean).map(Number));
  check("figures numbered 1..n", figs.length && figs.every((n, i) => n === i + 1), figs.join());
  const tocHidden = await p.$$eval("nav[aria-labelledby=toc-heading] li", (lis) => lis.every((li) => li.firstElementChild.getAttribute("aria-hidden") === "true" && li.querySelector("a").textContent === document.getElementById(li.querySelector("a").hash.slice(1))?.textContent));
  check("outline H2 tags hidden, link names match headings", tocHidden);
  const nav = await p.$$eval("nav[aria-label='Project navigation'] a", (as) => as.map((a) => a.getAttribute("href")));
  check("prev/next follow Selected Work", nav.join() === "/portfolio/work/accessible-design-systems,/portfolio/work/sms-job-offers", nav.join());
  await p.close();
  const ap = await open("/work/acr-dashboard");
  const apNav = await ap.$$eval("nav[aria-label='Project navigation'] a", (as) => as.map((a) => a.getAttribute("href")));
  check("appendix nav: parent link and sibling", apNav.join() === "/portfolio/work/accessibility-program,/portfolio/work/accessibility-programs-tooling", apNav.join());
  check("appendix back link", (await ap.$eval("#main-content header a", (a) => a.textContent)) === "←Back to Accessibility program");
  await ap.close();
  const home = await open("/");
  const rows = await home.$$eval(".stretched-link", (as) => as.map((a) => a.textContent));
  check("work rows named by full title", rows[0] === "AI-assisted prototyping: Design system rules built into every prototype", rows[0]);
  check("work rows: drawings hidden", await home.$$eval(".link-row svg", (s) => s.every((x) => x.closest("[aria-hidden=true]"))));
  await home.close();
}

// Drafts stay out of production.
check("draft case study not exported", await access(path.join(ROOT, "out/work/design-system-operations.html")).then(() => false, () => true));

await b.close();
for (const r of results) console.log(r.ok ? "pass" : "FAIL", r.name, r.detail ? `(${r.detail})` : "");
process.exit(results.every((r) => r.ok) ? 0 : 1);
