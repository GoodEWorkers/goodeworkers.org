import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots', { recursive: true });
const TARGETS = [
  { url: 'https://goodeworkers.org', label: 'orig' },
  { url: 'http://localhost:4321/', label: 'astro' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const t of TARGETS) {
  const page = await ctx.newPage();
  await page.goto(t.url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(300);
  const el = await page.locator('#who-are-we').first();
  await el.screenshot({ path: `screenshots/about-${t.label}.png` });
  console.log(`OK screenshots/about-${t.label}.png`);
  await page.close();
}
await browser.close();
