import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = 'https://workledger-enterprise.vercel.app/ui/app/index.html';
const checks = [];
const body = () => page.locator('body').innerText();
async function open(route, role) {
  await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(300);
  await page.locator('select.role').selectOption(role);
  await page.waitForTimeout(150);
}
await open('projects', 'project-director');
await page.locator('[data-workflow="open-provenance"]').click();
checks.push(['evidence provenance', (await body()).includes('Provenance lineage opened') && (await page.locator('#drawer').count()) === 1]);
await open('diary', 'site-manager');
await page.locator('[data-workflow="acknowledge-diary"]').click();
checks.push(['diary acknowledgement', (await body()).includes('Diary D-2026-1112 acknowledged')]);
await open('progress', 'independent-reviewer');
await page.locator('[data-workflow="open-review"]').click();
await page.locator('[data-workflow="complete-review"]').click();
checks.push(['review completion', (await body()).includes('independently verified')]);
await open('audit', 'contract-admin');
await page.locator('[data-workflow="filter-audit"]').click();
checks.push(['audit filter', (await body()).includes('Audit view filtered to verified records')]);
console.log(JSON.stringify({ deployment: page.url(), checks }, null, 2));
if (checks.some(([, ok]) => !ok)) process.exitCode = 1;
await browser.close();
