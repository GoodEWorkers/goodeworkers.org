// Tight crop around the "nonprofits" encircled text for close inspection.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots', { recursive: true });

const TARGETS = [
  { url: 'https://goodeworkers.org', label: 'orig' },
  { url: 'http://localhost:4321/',   label: 'astro' },
];

const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  for (const t of TARGETS) {
    const page = await context.newPage();
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(300);
    // The headline h1 is the first h1 in the page
    const el = await page.locator('h1').first();
    await el.screenshot({ path: `screenshots/title-${t.label}.png` });
    console.log(`OK screenshots/title-${t.label}.png`);
    await page.close();
  }
} finally {
  await browser.close();
}
