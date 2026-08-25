// Generate public/og-image.png (1200x630) from the site's own header.
//
// The card is not a re-drawing of the header — it is the header, rendered by the
// browser with the real fonts, colours, weights and the Encircled outline, then
// composed onto a 1200x630 stage. That means it cannot drift from the design:
// change LandingHeader.astro or the palette and re-run this.
//
// Needs the dev server running (see scripts/smoke.sh for the same convention):
//   npm run dev          # in another terminal
//   node scripts/og-image.mjs [url]
import { chromium } from 'playwright';
import sharp from 'sharp';

const URL = process.argv[2] ?? 'http://localhost:4321/';
const OUT = 'public/og-image.png';
const W = 1200, H = 630, SCALE = 2;

// The header's own lg values, used to keep every ratio identical as type scales.
const BASE_FONT = 72;   // lg:text-7xl
const BASE_GAP = 48;    // lg:mt-12 between wordmark and tagline
const BASE_BORDER = 2;  // md:border-2 on the Encircled outline

// Leave margins; a social card is cropped and letterboxed by every platform.
const MAX_INK_W = W * 0.86;
const MAX_INK_H = H * 0.74;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

await page.addStyleTag({ content: `
  astro-dev-toolbar { display: none !important; }
  nav, header > p, main, footer { display: none !important; }
  html, body { overflow: hidden !important; background: #111111 !important; margin: 0 !important; }
  body > div { padding: 0 !important; margin: 0 !important; }
  header {
    display: flex !important; align-items: center !important; justify-content: center !important;
    height: ${H}px !important; padding: 0 !important; margin: 0 !important;
  }
  header h1 { margin: 0 !important; text-wrap: balance; }
`});

// True ink bounds: the union of the heading's per-line client rects, not its box.
const measure = (fontSize) => page.evaluate((args) => {
  const { fontSize, BASE_FONT, BASE_GAP, BASE_BORDER, maxW } = args;
  const k = fontSize / BASE_FONT;
  const h1 = document.querySelector('header h1');
  h1.style.fontSize = `${fontSize}px`;
  h1.style.lineHeight = '1';
  h1.style.maxWidth = `${maxW}px`;
  h1.style.marginLeft = 'auto';
  h1.style.marginRight = 'auto';
  // scale the gap and the outline so their ratio to the type never changes
  const tagline = h1.querySelector(':scope > span');
  if (tagline) tagline.style.marginTop = `${BASE_GAP * k}px`;
  const ring = h1.querySelector('span.relative > span:last-child');
  if (ring) ring.style.borderWidth = `${BASE_BORDER * k}px`;

  const r = document.createRange();
  r.selectNodeContents(h1);
  const rects = [...r.getClientRects()].filter((x) => x.width > 1 && x.height > 1);
  const left = Math.min(...rects.map((x) => x.left));
  const right = Math.max(...rects.map((x) => x.right));
  const top = Math.min(...rects.map((x) => x.top));
  const bottom = Math.max(...rects.map((x) => x.bottom));
  return { w: right - left, h: bottom - top, top, bottom, lines: rects.length };
}, { fontSize, BASE_FONT, BASE_GAP, BASE_BORDER, maxW: MAX_INK_W });

// Largest type that still fits the stage. Descending, first fit wins.
let chosen = null;
for (let f = 132; f >= 48; f -= 2) {
  const m = await measure(f);
  if (m.w <= MAX_INK_W && m.h <= MAX_INK_H) { chosen = { f, ...m }; break; }
}
if (!chosen) throw new Error('no font size fits the stage');
const m = await measure(chosen.f);

// Optically centre the ink, not the box. ClashDisplay sits small inside its em
// box, so flex-centring the heading leaves the visible type sitting low.
const drift = (H - m.bottom - m.top) / 2;
await page.evaluate((dy) => {
  document.querySelector('header h1').style.transform = `translateY(${dy}px)`;
}, drift);
const after = await page.evaluate(() => {
  const r = document.createRange();
  r.selectNodeContents(document.querySelector('header h1'));
  const rects = [...r.getClientRects()].filter((x) => x.width > 1 && x.height > 1);
  return { top: Math.min(...rects.map((x) => x.top)), bottom: Math.max(...rects.map((x) => x.bottom)) };
});
console.log(`type ${chosen.f}px · ink ${Math.round(chosen.w)}x${Math.round(chosen.h)} · ${chosen.lines} lines`);
console.log(`shifted ${Math.round(drift)}px · margins top ${Math.round(after.top)} / bottom ${Math.round(H - after.bottom)}`)

await page.waitForTimeout(300);
const shot = await page.screenshot();
await sharp(shot).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`wrote ${OUT} ${W}x${H}`);
await browser.close();
