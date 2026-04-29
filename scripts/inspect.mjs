import { chromium } from 'playwright';

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
  // find the inline-block span containing "Helping"
  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    const spans = [...h1.querySelectorAll('span')];
    return spans.slice(0, 6).map(s => ({
      classes: s.className,
      display: getComputedStyle(s).display,
      whiteSpace: getComputedStyle(s).whiteSpace,
      text: JSON.stringify(s.textContent),
      width: s.getBoundingClientRect().width.toFixed(2),
      paddingLeft: getComputedStyle(s).paddingLeft,
      paddingRight: getComputedStyle(s).paddingRight,
    }));
  });
  console.log(`\n=== ${t.label} ===`);
  for (const s of info) console.log(s);
  await page.close();
}
await browser.close();
