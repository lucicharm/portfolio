// Close-ups of the focus ring on each surface, normal and forced colors.
//   node site-ring-shots.mjs http://localhost:4321/portfolio <out dir>
import puppeteer from "puppeteer-core";
const [BASE, OUT] = process.argv.slice(2);
const targets = [
  ["/", "header a[aria-current]", "nav-current"],
  ["/", "a.bg-ink", "black-button"],
  ["/", ".stretched-link", "work-row"],
  ["/", "footer a[href$='privacy']", "footer-link"],
  ["/work/accessible-design-systems", "p.mb-2 a", "back-link"],
  ["/work/accessible-design-systems", "button[aria-pressed='true']", "chip-pressed"],
  ["/work/accessible-design-systems", "button[aria-pressed='false']", "chip"],
  ["/work/accessible-design-systems", "figure summary", "summary"],
  ["/work/accessible-design-systems", "nav[aria-labelledby=toc-heading] li:nth-child(3) a", "toc-link"],
  ["/work/accessibility-programs-tooling", "section.bg-panel figure a", "panel-link"],
  ["/work/accessibility-program", ".link-row .stretched-link", "link-card"],
  ["/work/accessibility-program", "nav[aria-label='Project navigation'] a", "project-nav"],
  ["/privacy", "#who-heading + p a", "inline-link"],
  ["/contact", "#email", "input"],
  ["/", "a[href='#main-content']", "skip-link"],
];
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const forced of [false, true]) {
  for (const [route, sel, name] of targets) {
    const p = await b.newPage();
    await p.evaluateOnNewDocument(() => localStorage.setItem("portfolio-authenticated", "true"));
    const cdp = await p.createCDPSession();
    await cdp.send("Emulation.setEmulatedMedia", { features: forced ? [{ name: "forced-colors", value: "active" }] : [] });
    await p.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await p.goto(BASE + route, { waitUntil: "networkidle0" });
    await p.evaluate(() => document.fonts.ready);
    await p.keyboard.press("Tab"); // keyboard modality, so focus() shows :focus-visible
    const box = await p.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      el.focus();
      if (getComputedStyle(el).position !== "fixed") el.scrollIntoView({ block: "center" });
      const host = el.closest(".link-row") ?? el;
      const r = host.getBoundingClientRect();
      return { x: Math.max(0, r.x + scrollX - 20), y: Math.max(0, r.y + scrollY - 20), width: Math.min(r.width + 40, 1280), height: r.height + 40 };
    }, sel);
    if (box) await p.screenshot({ path: `${OUT}/ring-${name}${forced ? "-forced" : ""}.png`, clip: box });
    else console.log("missing", sel);
    await p.close();
  }
}
await b.close();
