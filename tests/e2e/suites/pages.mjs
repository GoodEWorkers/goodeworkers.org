// Every page, on a phone and on a desktop: it loads clean, fits the viewport, shows all of itself once scrolled through, and shows
// all of itself at load without motion (reduced motion) and without JS.
import { check, close, newPage, noConsoleErrors, noOverflow, ok, open, pagePaths, pool, scrollThrough, until, vp } from '../lib.mjs';

// What the engine hides until it reveals it (global.css, html.motion). [data-illo-slot] is the illustration picker's slot.
const REVEALS = '[data-reveal], [data-split], [data-stagger] > *, [data-illo-slot] svg';

const hidden = (page) =>
  page.evaluate((sel) => [...document.querySelectorAll(sel)].filter((e) => getComputedStyle(e).opacity !== '1').map((e) => `${e.tagName.toLowerCase()}.${(e.getAttribute('class') ?? '').split(' ')[0]}`), REVEALS);

async function allShown(page, timeout) {
  try {
    await until(page, (sel) => ![...document.querySelectorAll(sel)].some((e) => getComputedStyle(e).opacity !== '1'), 'reveals did not finish', timeout, REVEALS);
  } catch {
    const left = await hidden(page);
    throw new Error(`${left.length} stay at opacity < 1: ${left.slice(0, 3).join(', ')}`);
  }
}

// Inter has two faces (global.css): Regular serves 400-700, so font-bold is Regular as the site was approved; the Bold face is
// opt-in at 800-900 (font-extrabold: the Why card titles). Weight is measured as ink: the alpha a canvas draws the words
// with, over the same words in 400.
const weights = (page, selector) =>
  page.evaluate(async (selector) => {
    await Promise.all(['400', '700', '800'].map((w) => document.fonts.load(`${w} 16px Inter`)));
    const ink = (text, weight, size) => {
      const g = Object.assign(document.createElement('canvas'), { width: 900, height: 80 }).getContext('2d');
      Object.assign(g, { font: `${weight} ${size} Inter`, textBaseline: 'top' }).fillText(text, 4, 4);
      return g.getImageData(0, 0, 900, 80).data.reduce((sum, v, i) => sum + (i % 4 === 3 ? v : 0), 0);
    };
    return [...document.querySelectorAll(selector)].filter((el) => el.offsetParent).map((el) => {
      const { fontWeight, fontSize } = getComputedStyle(el);
      const text = (el.innerText || el.textContent).trim().split('\n')[0]; // a rolled label holds its words twice
      return { text, fontWeight, ratio: ink(text, fontWeight, fontSize) / ink(text, '400', fontSize), loaded: document.fonts.check('800 16px Inter') };
    });
  }, selector);

export async function run({ browser, base }) {
  const onHome = async (...selectors) => {
    const page = await newPage(browser, vp.desktop);
    await open(page, base, '/');
    const found = (await Promise.all(selectors.map((s) => weights(page, s)))).flat();
    await close(page);
    return found;
  };
  await check('Why card titles are Inter 800: the face loads, and each is measurably heavier than regular text', async () => {
    const titles = await onHome('#why [data-stagger] > div > p:first-of-type');
    ok(titles.length === 3, `${titles.length} Why card titles, expected 3`);
    ok(titles.every((t) => t.loaded), "document.fonts.check('800 16px Inter') is false");
    const wrong = titles.filter((t) => t.fontWeight !== '800' || t.ratio <= 1.1);
    ok(!wrong.length, `not 800 and heavier: ${wrong.map((t) => `"${t.text}" ${t.fontWeight} x${t.ratio.toFixed(2)}`).join('; ')}`);
    return `ink x${Math.min(...titles.map((t) => t.ratio)).toFixed(2)} or more`;
  });
  await check('hero card titles are Inter 700, which renders as Regular', async () => {
    const titles = await onHome('#hero [data-stagger] p');
    ok(titles.length === 5, `${titles.length} hero card titles, expected 5`);
    const wrong = titles.filter((t) => t.fontWeight !== '700');
    ok(!wrong.length, `not 700: ${wrong.map((t) => `"${t.text}" ${t.fontWeight}`).join('; ')}`);
  });
  await check('font-bold stays Regular: the nav links (700) are within 1.1 of regular ink', async () => {
    const links = await onHome('[data-navbar] ul a');
    ok(links.length >= 4, `${links.length} nav links`);
    const heavy = links.filter((l) => l.fontWeight !== '700' || l.ratio > 1.1);
    ok(!heavy.length, `not 700 at regular ink: ${heavy.map((l) => `"${l.text}" ${l.fontWeight} x${l.ratio.toFixed(2)}`).join('; ')}`);
    return `ink x${Math.max(...links.map((l) => l.ratio)).toFixed(2)} at most`;
  });

  const sizes = [vp.phone, vp.desktop];
  const jobs = pagePaths().flatMap((path) => sizes.map((size) => ({ path, size })));
  await pool(jobs, 4, async ({ path, size }) => {
    const label = `${path} @${size.width}`;

    // With motion: scroll through the page, as a reader does.
    const page = await newPage(browser, size);
    await check(`${label} loads with the engine`, () => open(page, base, path));
    await check(`${label} fits the viewport at load and at the bottom`, async () => {
      await noOverflow(page);
      await scrollThrough(page);
      await noOverflow(page);
    });
    await check(`${label} reveals complete after scrolling to the bottom`, async () => {
      await scrollThrough(page);
      await allShown(page, 6000);
    });
    await check(`${label} no console errors`, () => noConsoleErrors(page));
    await close(page);

    // Without motion (reduced motion, no JS) nothing waits for the engine: everything is there at load.
    for (const [what, options] of [['reduced motion shows everything at load', { reducedMotion: true }], ['without JS shows everything', { js: false }]]) {
      const plain = await newPage(browser, { ...size, ...options });
      await check(`${label} ${what}`, async () => {
        await open(plain, base, path);
        await allShown(plain, 1000);
        if (options.reducedMotion) {
          await noOverflow(plain);
          noConsoleErrors(plain);
        }
      });
      await close(plain);
    }
  });
}
