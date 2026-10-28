// The values and initiatives pages: the band links (one painter, no seam), white on every orange surface, the tile tilt, the
// row a tile points at.
import { check, close, jump, newPage, ok, open, pixelsDarkerThan, pool, settle, until, vp } from '../lib.mjs';

const BANDS = 'a[style*="--c"]'; // a band link carries its value's colour as --c (and --on, the text on its band)
const [REST, BAND] = ['0% 100%, 100% 3px', '100% 100%, 100% 3px']; // background-size of its two layers: the band, the underline
const sel = (i) => `[data-e2e="${i}"]`; // the i-th band link of the page, tagged by tag()

const tag = (page) => page.evaluate((s) => [...document.querySelectorAll(s)].map((a, i) => (a.dataset.e2e = i)).length, BANDS);
const sizeIs = (page, i, want) =>
  until(page, ([s, want]) => getComputedStyle(document.querySelector(s)).backgroundSize === want, `band link ${i + 1} never reached ${want}`, 5000, [sel(i), want]);
const rects = (page, i) => page.evaluate((s) => [...document.querySelector(s).getClientRects()].map((r) => ({ x: r.x, y: r.y, w: r.width, h: r.height })), sel(i));

/** The i-th band link, scrolled to the middle of the screen and still: where its lines are is where they stay. Returns the lines. */
async function bring(page, i) {
  await jump(page, await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - innerHeight / 2, sel(i)));
  await settle(page, sel(i));
  return rects(page, i);
}

/** Ten screenshots from the moment the pointer enters the link, through the 0.5 s growth and after it. The text is made transparent,
 *  so only the two background layers paint: a dark pixel between light ones, in any column of any line of the link, is the seam. */
async function seamFrames(page, i, scale) {
  const lines = await bring(page, i);
  const [x0, y0] = [Math.max(0, Math.min(...lines.map((f) => f.x)) - 2), Math.min(...lines.map((f) => f.y)) - 4];
  const clip = { x: x0, y: y0, width: Math.max(...lines.map((f) => f.x + f.w)) + 2 - x0, height: Math.max(...lines.map((f) => f.y + f.h)) + 8 - y0 };
  await page.mouse.move(lines[0].x + lines[0].w / 2, lines[0].y + lines[0].h / 2);
  let worst = 0;
  for (let frame = 0; frame < 10; frame++) {
    const png = await page.screenshot({ clip });
    for (const f of lines) {
      // from 2px above a line's box to 3px below it: the band, the underline and whatever sits between them
      const box = { x: Math.round((f.x - clip.x) * scale), y: Math.round((f.y - 2 - clip.y) * scale), w: Math.round(f.w * scale), h: Math.round((f.h + 5) * scale) };
      worst = Math.max(worst, await pixelsDarkerThan(page, png, box, 90, true));
    }
  }
  ok(worst === 0, `${worst} dark pixels between the band and its underline in the worst of 10 hover frames`);
  return `${lines.length} line(s)`;
}

async function bandLinks(browser, base, path) {
  const page = await newPage(browser, vp.desktop);
  await open(page, base, path);
  const count = await tag(page);
  await check(`${path} has band links`, () => ok(count > 0, 'none found') ?? `${count}`);
  for (let i = 0; i < count; i++) {
    const name = `${path} band link ${i + 1}`;
    await check(`${name}: no text-decoration, two layers, ${REST} at rest`, async () => {
      const css = await page.evaluate((s) => {
        const cs = getComputedStyle(document.querySelector(s));
        return { line: cs.textDecorationLine, layers: cs.backgroundImage.split('linear-gradient(').length - 1, size: cs.backgroundSize };
      }, sel(i));
      ok(css.line === 'none', `text-decoration-line is ${css.line}`);
      ok(css.layers === 2, `${css.layers} background layer(s)`);
      ok(css.size === REST, `background-size is ${css.size}`);
    });
    await check(`${name}: ${BAND} on hover, text in its --on colour`, async () => {
      const [f] = await bring(page, i);
      await page.mouse.move(f.x + f.w / 2, f.y + f.h / 2);
      await sizeIs(page, i, BAND);
      await settle(page, sel(i));
      const { color, on } = await page.evaluate((s) => {
        const a = document.querySelector(s);
        const probe = Object.assign(document.createElement('i'), { style: `color: ${a.style.getPropertyValue('--on').trim()}` }); // --on as a computed colour
        document.body.append(probe);
        const on = getComputedStyle(probe).color;
        probe.remove();
        return { color: getComputedStyle(a).color, on };
      }, sel(i));
      ok(color === on, `text is ${color}, its --on is ${on}`);
      await page.mouse.move(0, 0);
      await sizeIs(page, i, REST);
    });
    await check(`${name}: ${BAND} on focus-visible`, async () => {
      await page.keyboard.press('Shift'); // a key first: focus() by script then counts as keyboard focus
      await page.locator(sel(i)).focus();
      ok(await page.evaluate((s) => document.querySelector(s).matches(':focus-visible'), sel(i)), 'not :focus-visible');
      await sizeIs(page, i, BAND);
      await page.locator(sel(i)).blur();
      await sizeIs(page, i, REST);
    });
  }
  await close(page);

  // The seam: its own page, at two pixels per pixel (a hair of ground is a whole device row there), the text made invisible.
  const sharp = await newPage(browser, { ...vp.desktop, scale: 2 });
  await open(sharp, base, path);
  await sharp.addStyleTag({ content: `${BANDS} { color: transparent !important; }` });
  await tag(sharp);
  for (let i = 0; i < count; i++) {
    await check(`${path} band link ${i + 1}: no dark seam in 10 hover frames`, () => seamFrames(sharp, i, 2));
    await sharp.mouse.move(0, 0);
  }
  await close(sharp);
}

/** The computed colour is white on every text and every icon stroke or fill inside `selector`. */
async function whiteOn(page, selector) {
  const wrong = await page.evaluate((s) => {
    const root = document.querySelector(s);
    if (!root) return ['not found'];
    const white = 'rgb(255, 255, 255)';
    const bad = [];
    for (const el of [root, ...root.querySelectorAll('*')]) {
      const cs = getComputedStyle(el);
      if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && cs.color !== white) bad.push(`${el.tagName.toLowerCase()} text ${cs.color}`);
      if (el instanceof SVGPathElement && !el.closest('[data-illo], [data-illo-slot]')) { // an icon, not an illustration (its own palette)
        for (const paint of [cs.fill, cs.stroke]) if (paint !== 'none' && paint !== white) bad.push(`icon ${paint}`);
      }
    }
    return bad;
  }, selector);
  ok(!wrong.length, `not white: ${wrong.slice(0, 3).join(', ')}`);
}

export async function run({ browser, base }) {
  await pool(['/values/', '/initiatives/', '/fr/valeurs/', '/fr/initiatives/'], 4, (path) => bandLinks(browser, base, path));

  // White on every orange surface (a designer decision, 3.1:1).
  const home = await newPage(browser, vp.desktop);
  await open(home, base, '/');
  await check('hero "And much more" card: white text and icon', () => whiteOn(home, '#hero [data-stagger] > .bg-orange'));
  await check('Why orange card: white text and icon', () => whiteOn(home, '#why [data-stagger] > .bg-orange'));
  await check('"Read our values" pill: white on both lines', () => whiteOn(home, '#values a[href="/values/"]'));
  await close(home);

  const page = await newPage(browser, vp.desktop);
  await open(page, base, '/values/');
  await check('Care tile: white name, tagline and arrow', () => whiteOn(page, 'a[href="#care"]'));

  await check('tiles tilt under the pointer and flatten when it leaves', async () => {
    const tile = 'a[href="#openness"]';
    await jump(page, await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY - innerHeight / 3, tile));
    await settle(page, tile);
    const box = await page.locator(tile).boundingBox();
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.25, { steps: 4 });
    // a rotation about x and y puts m23 and m13 of the transform matrix off zero
    await until(page, (s) => { const m = new DOMMatrix(getComputedStyle(document.querySelector(s)).transform); return Math.abs(m.m13) > 1e-3 && Math.abs(m.m23) > 1e-3; }, 'the tile never tilted', 5000, tile);
    await page.mouse.move(0, 0);
    await until(page, (s) => { const m = new DOMMatrix(getComputedStyle(document.querySelector(s)).transform); return Math.abs(m.m13) < 1e-3 && Math.abs(m.m23) < 1e-3; }, 'the tile never flattened', 5000, tile);
  });

  await check('a tile click makes its row the :target, lit and in view', async () => {
    const row = 'article#care';
    ok(await page.evaluate((s) => getComputedStyle(document.querySelector(s)).backgroundColor === 'rgba(0, 0, 0, 0)', row), 'the row is lit before the click');
    await page.locator('a[href="#care"]').click();
    await until(page, (s) => location.hash === '#care' && document.querySelector(`${s}:target`), 'the row never became :target', 5000, row);
    await until(page, (s) => getComputedStyle(document.querySelector(s)).backgroundColor === 'rgb(29, 29, 29)', 'the :target row never took the dark card', 5000, row);
    await until(page, (s) => { const r = document.querySelector(s).getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight / 2; }, 'the page never glided to the row', 5000, row);
  });
  await close(page);
}
