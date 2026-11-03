import puppeteer from "puppeteer-core";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
const axe = await readFile(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const [OUT, SHOTS] = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--allow-file-access-from-files"] });
for (const scheme of ["light", "dark"]) {
  const p = await b.newPage(); await p.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
  await p.setViewport({ width: 1440, height: 1000 });
  await p.goto(`file://${OUT}/index.html`, { waitUntil: "networkidle0" });
  await p.addScriptTag({ content: axe });
  const v = await p.evaluate(async () => (await axe.run({ exclude: [["iframe"]] }, { iframes: false, runOnly: { type: "tag", values: ["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa","best-practice"] } })).violations.map(v => v.id + "(" + v.nodes.length + ")"));
  console.log(scheme, "axe:", v.length ? v.join(",") : 0);
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: `${SHOTS}/shell-${scheme}.png` });
  await p.close();
}
await b.close();
