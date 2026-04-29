import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('screenshots', { recursive: true });

const BASE = 'http://localhost:4321';
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];
const PAGES = [
  { name: 'home',    path: '/' },
  { name: 'list',    path: '/articles' },
  { name: 'detail',  path: '/articles/welcome-to-goodeworkers' },
];

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts?.ready);
      await page.waitForTimeout(300);
      const out = `screenshots/${p.name}-${vp.name}-astro.png`;
      await page.screenshot({ path: out, fullPage: true });
      console.log('OK', out);
      await page.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}
