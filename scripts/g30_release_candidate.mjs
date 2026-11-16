import { chromium } from 'playwright';

const base = 'https://workledger-enterprise.vercel.app/ui/app/index.html';
const journeys = [
  ['project-director', 'home'],
  ['contract-admin', 'contract'],
  ['site-manager', 'diary'],
  ['site-supervisor', 'progress'],
  ['quantity-surveyor', 'programme'],
  ['independent-reviewer', 'progress'],
  ['auditor', 'reports'],
];
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const checks = [];
for (const [role, route] of journeys) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${base}#${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.locator('select.role').selectOption(role);
  await page.waitForTimeout(300);
  const text = await page.locator('body').innerText();
  checks.push({ role, route, visible: !text.includes('Access restricted'), roleLabel: text.includes('LOCAL FIXTURE MODE') });
  await page.close();
}

const states = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await states.goto(`${base}#boq`, { waitUntil: 'domcontentloaded', timeout: 15000 });
await states.waitForTimeout(500);
await states.locator('select.role').selectOption('quantity-surveyor');
await states.waitForTimeout(300);
const stateText = await states.locator('body').innerText();
const stateChecks = {
  stale: stateText.includes('Source needs refresh'),
  readOnly: stateText.includes('Writes are disabled'),
  synthetic: stateText.includes('Synthetic data only'),
};
const denied = await browser.newPage();
await denied.goto(`${base}#audit`, { waitUntil: 'domcontentloaded', timeout: 15000 });
await denied.waitForTimeout(400);
stateChecks.denied = (await denied.locator('body').innerText()).includes('Access restricted');
await denied.close();
const pending = await browser.newPage();
await pending.goto(`${base}#reports`, { waitUntil: 'domcontentloaded', timeout: 15000 });
await pending.waitForTimeout(400);
stateChecks.pending = (await pending.locator('body').innerText()).includes('Awaiting review');
await pending.close();
await states.screenshot({ path: 'evidence/g30-release-candidate.png', fullPage: true });
await states.close();
await browser.close();

const result = { deployment: 'https://workledger-enterprise.vercel.app/', journeys: checks, stateChecks };
console.log(JSON.stringify(result, null, 2));
if (checks.some((item) => !item.visible || !item.roleLabel) || Object.values(stateChecks).some((value) => !value)) process.exitCode = 1;
