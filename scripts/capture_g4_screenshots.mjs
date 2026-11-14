import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const base = "snapshot://workledger";
const out = "evidence/g4-route-screenshots";
const routes = ["home", "projects", "contract", "diary", "programme", "boq", "progress", "audit", "reports", "admin"];
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", headless: true });
const css = await readFile("ui/app/styles.css", "utf8") + await readFile("ui/app/components.css", "utf8");
const fixtureJs = (await readFile("ui/app/fixtures.js", "utf8")).replaceAll("export ", "");
const appJs = (await readFile("ui/app/app.js", "utf8")).replace(/^import .*?;\r?\n/, "");
const snapshot = `<main id="app"></main><style>${css}</style><script>${fixtureJs}\n${appJs}</script>`;
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  await page.setContent(snapshot.replace("<main id=", `<script>location.hash='${route}'</script><main id=`), { waitUntil: "domcontentloaded", timeout: 5000 });
  await page.screenshot({ path: `${out}/${route}.png`, fullPage: true, timeout: 5000 });
  await page.close();
}
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
await page.setContent(snapshot.replace("<main id=", "<script>location.hash='programme'</script><main id="), { waitUntil: "domcontentloaded", timeout: 5000 });
await page.locator(`[data-drawer="programme"]`).click();
await page.screenshot({ path: `${out}/programme-provenance-open.png`, fullPage: true });
await page.locator(`[data-view="admin"]`).click();
await page.screenshot({ path: `${out}/admin-state-gallery.png`, fullPage: true });
await browser.close();
console.log(`Captured ${routes.length + 2} G4 screenshots in ${out}`);
