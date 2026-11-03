import puppeteer from "puppeteer-core";
const OUT = process.argv[2];
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const dir of ["a", "b", "c", "d"]) for (const vp of [[1280, 900], [1280, 560], [320, 640]]) {
  let worst = 1, worstKey = "";
  for (const f of ["home", "case-matrix-schedule-accessibility", "case-accessibility-program", "case-accessible-design-systems", "case-ai-prototyping", "case-acr-dashboard", "case-accessibility-programs-tooling"]) {
    const p = await b.newPage(); await p.setViewport({ width: vp[0], height: vp[1] });
    await p.goto(`file://${OUT}/${dir}/${f}.html`, { waitUntil: "networkidle0" });
    for (let i = 0; i < 60; i++) {
      await p.keyboard.press("Tab");
      const r = await p.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body) return null; if (el.classList.contains("skip") || el.closest(".site-header")) return { key: "skip", frac: 1 };
        const h = document.querySelector(".site-header"); const hs = getComputedStyle(h).position === "sticky" ? h.getBoundingClientRect().bottom : 0;
        const rc = el.getBoundingClientRect(); const top = Math.max(rc.top, hs, 0), bot = Math.min(rc.bottom, innerHeight);
        return { key: el.outerHTML.slice(0, 60), frac: Math.max(0, bot - top) / Math.max(1, rc.height) };
      });
      if (!r) break; if (r.frac < worst) { worst = r.frac; worstKey = f + " " + r.key; }
    }
    await p.close();
  }
  console.log(dir, vp.join("x"), "least visible focused element:", (worst * 100).toFixed(0) + "%", worst < 1 ? worstKey : "");
}
await b.close();
