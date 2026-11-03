// Screenshots of the served site. PasswordGate reads a localStorage flag,
// so it's set before each page loads.
//   node site-shot.mjs <base url> <out dir> <width> <page:name>...
//   e.g. node site-shot.mjs http://localhost:4321/portfolio shots 1280 /:home /about:about
import puppeteer from "puppeteer-core";
const [BASE, OUT, W, ...pages] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const spec of pages) {
  const [route, name] = spec.split(":");
  const p = await b.newPage();
  await p.evaluateOnNewDocument(() => localStorage.setItem("portfolio-authenticated", "true"));
  await p.setViewport({ width: Number(W), height: 900 });
  await p.goto(BASE + route, { waitUntil: "networkidle0" });
  await p.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.querySelectorAll("img[loading=lazy]")) img.loading = "eager";
    await Promise.all([...document.images].map((i) => i.complete || new Promise((r) => (i.onload = i.onerror = r))));
  });
  await p.screenshot({ path: `${OUT}/${name}-${W}.png`, fullPage: true });
  await p.close();
}
await b.close();
