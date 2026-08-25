// Render the 1200x630 social-sharing card into public/og-image.png.
// Re-run after a brand change: node scripts/og-image.mjs
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const logo = await readFile('src/assets/images/goodeworkers.svg', 'utf8');
const clash = (await readFile('src/assets/fonts/ClashDisplay-Variable.woff2')).toString('base64');
const inter = (await readFile('src/assets/fonts/Inter-Regular.ttf')).toString('base64');

const html = `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: ClashDisplay; src: url(data:font/woff2;base64,${clash}) format('woff2'); font-weight: 200 700; }
  @font-face { font-family: Inter; src: url(data:font/truetype;base64,${inter}) format('truetype'); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #111111; display: flex; flex-direction: column;
         justify-content: center; gap: 48px; padding: 0 96px; font-family: Inter, sans-serif; }
  svg { width: 420px; height: auto; }
  h1 { font-family: ClashDisplay, sans-serif; font-weight: 500; font-size: 66px; line-height: 1.1; color: #ECECEC; }
  h2 { font-family: ClashDisplay, sans-serif; font-weight: 400; font-size: 38px; line-height: 1.2;
       color: #B3A0CF; margin-top: 20px; }
  .accent { font-weight: 700; color: #FDC959; }
  p { font-size: 26px; color: #E0E0E0; }
  .bar { display: flex; gap: 12px; }
  .bar span { height: 10px; width: 84px; border-radius: 999px; }
</style>
<body>
  ${logo}
  <div>
    <h1>Helping <span class="accent">nonprofits</span> go remote</h1>
    <h2>Le numérique au service des associations</h2>
  </div>
  <p>goodeworkers.org</p>
  <div class="bar">
    <span style="background:#FD5E09"></span>
    <span style="background:#FDC959"></span>
    <span style="background:#B3A0CF"></span>
  </div>
</body>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og-image.png' });
await browser.close();
console.log('wrote public/og-image.png');
