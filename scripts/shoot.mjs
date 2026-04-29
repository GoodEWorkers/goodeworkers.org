// Screenshot both sites at multiple viewports for visual diffing.
// Usage: node scripts/shoot.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const ORIG = 'https://goodeworkers.org';
const ASTRO = 'http://localhost:4321';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet',  width: 820,  height: 1180 },
  { name: 'mobile',  width: 390,  height: 844 },
];

const PAGES = [
  { name: 'home',  path: '/' },
  { name: 'legal', path: '/legal-notice' },
];

await mkdir('screenshots', { recursive: true });

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const target of [{ base: ORIG, label: 'orig' }, { base: ASTRO, label: 'astro' }]) {
      for (const p of PAGES) {
        const page = await context.newPage();
        const url = target.base + p.path;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          // wait for fonts
          await page.evaluate(() => document.fonts?.ready);
          await page.waitForTimeout(300);
          const out = `screenshots/${p.name}-${vp.name}-${target.label}.png`;
          await page.screenshot({ path: out, fullPage: true });
          console.log(`OK ${out}`);
        } catch (e) {
          console.log(`FAIL ${url} -> ${e.message}`);
        } finally {
          await page.close();
        }
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
