// Helpers shared by the suites (suites/*.mjs, run one by one by worker.mjs). Conditions, never sleeps: every wait polls the page on
// animation frames and fails with a message at its timeout. A check prints one line: `PASS|FAIL|PEND name (detail)`.
import { readdirSync } from 'node:fs';
import { chromium, webkit } from 'playwright';
import { routes } from '../../src/i18n/routes.ts';

export const CAP = 10_000; // ms one check may take

const say = (status, name, detail) => console.log(`${status} ${name}${detail ? ` (${detail})` : ''}`);

/** check(name, fn, pending('part-b')): while fn fails the check reports PEND (the change it waits for is not in yet); once it
 *  passes it says the mark can go. Without fn it is only listed as PEND. fn may return a detail string. */
export const pending = (tag) => ({ pending: tag });

export async function check(name, fn, { pending: tag } = {}) {
  if (!fn) return say('PEND', name, tag);
  let timer;
  try {
    const capped = new Promise((_, reject) => (timer = setTimeout(() => reject(new Error(`over ${CAP / 1000} s`)), CAP)));
    const running = Promise.resolve().then(fn);
    running.catch(() => {}); // a check abandoned at the cap may still reject later
    const detail = await Promise.race([running, capped]);
    say('PASS', name, [detail, tag && `${tag} landed: drop its pending mark`].filter(Boolean).join('; '));
  } catch (e) {
    const why = String(e?.message ?? e).split('\n')[0].slice(0, 300);
    say(tag ? 'PEND' : 'FAIL', name, tag ? `${tag}: ${why}` : why);
  } finally {
    clearTimeout(timer);
  }
}

export const ok = (condition, message) => { if (!condition) throw new Error(message); };

/** Run fn over items, `n` at a time. */
export async function pool(items, n, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (queue.length) await fn(queue.shift()); }));
}

export const launch = (name = 'chromium') => ({ chromium, webkit })[name].launch();

/** The viewports the plan names. `touch` is a phone: touch events, no hover, the mobile menu. */
export const vp = { phone: { width: 390, height: 844, touch: true }, tablet: { width: 768, height: 1024 }, desktop: { width: 1440, height: 900 }, wide: { width: 1920, height: 1080 } };

/** A page in its own context. reducedMotion and js:false give the two no-motion contexts; scale is the pixel ratio.
 *  page.errors collects console errors and uncaught exceptions from the start. */
export async function newPage(browser, { width = 1440, height = 900, touch = false, reducedMotion = false, js = true, scale = 1 } = {}) {
  const context = await browser.newContext({
    viewport: { width, height }, deviceScaleFactor: scale, hasTouch: touch, isMobile: touch, javaScriptEnabled: js,
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(CAP);
  page.mode = { js, motion: js && !reducedMotion };
  page.errors = [];
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()));
  page.on('pageerror', (e) => page.errors.push(e.message));
  return page;
}

export const close = (page) => page.context().close();

/** Every page the suites walk: all of routes.ts in both languages, plus one contributor and one project page. */
export function pagePaths() {
  const slug = (dir) => readdirSync(new URL(`../../src/content/${dir}/`, import.meta.url)).find((f) => f.endsWith('.yaml')).slice(0, -5);
  const [c, p] = [slug('contributors'), slug('projects')];
  return [...Object.values(routes).flatMap((r) => Object.values(r)), `/contributors/${c}/`, `/fr/contributeurs/${c}/`, `/projects/${p}/`, `/fr/projets/${p}/`];
}

/** Wait until fn (it runs in the page; `arg` is passed to it) returns something truthy, and return that. */
export async function until(page, fn, msg, timeout = CAP, arg) {
  try { return await (await page.waitForFunction(fn, arg, { timeout, polling: 'raf' })).jsonValue(); }
  catch (e) { throw e.name === 'TimeoutError' ? new Error(`${msg} (waited ${timeout} ms)`) : e; }
}

/** Fonts in, Lenis idle, and the sampled element (a selector; without one only the page counts) still: no running CSS animation,
 *  effective opacity 1 (a GSAP reveal ends there) and the same box, transform, clip and scroll position for 4 frames. Lenis keeps
 *  `lenis-scrolling` 400 ms after a scroll, and for good after a jump whose last scroll event moves nothing: 30 still frames count. */
export async function settle(page, selector) {
  await page.evaluate(() => Object.assign(window, { __held: 0, __sig: '', __why: '' }));
  try {
    return await until(page, (sel) => {
      const root = document.documentElement;
      const el = sel ? document.querySelector(sel) : root;
      if (!el) return !(window.__why = `${sel} not found`);
      let opacity = 1;
      for (let e = el; e && e !== root; e = e.parentElement) opacity *= +getComputedStyle(e).opacity;
      const [r, cs] = [el.getBoundingClientRect(), getComputedStyle(el)];
      const sig = [r.x, r.y, r.width, r.height, opacity, cs.transform, cs.clipPath, scrollY].join();
      window.__held = sig === window.__sig ? window.__held + 1 : 0;
      window.__sig = sig;
      window.__why = [
        document.fonts.status !== 'loaded' && 'fonts loading',
        root.classList.contains('lenis-scrolling') && window.__held < 30 && 'Lenis scrolling',
        opacity !== 1 && `opacity ${opacity.toFixed(3)}`,
        el.getAnimations({ subtree: true }).length && 'CSS animation running',
        window.__held < 4 && 'moving',
      ].find(Boolean) || '';
      return !window.__why;
    }, '', 5000, selector ?? null);
  } catch {
    throw new Error(`${selector ?? 'the page'} never settled: ${await page.evaluate(() => window.__why).catch(() => '?')}`);
  }
}

/** Client navigation (or a first load) is done: the path, the engine and the motion flag are those of the new page. */
export const arrived = (page, path, { motion = true } = {}) =>
  until(page, ({ path, motion }) => {
    const root = document.documentElement;
    return location.pathname === path && root.dataset.engine === '1' && root.classList.contains('motion') === motion;
  }, `never arrived at ${path}`, 8000, { path, motion });

/** goto + arrived. A page without JS has no engine to wait for. */
export async function open(page, base, path) {
  await page.goto(base + path, { waitUntil: 'load' });
  if (page.mode.js) await arrived(page, path, { motion: page.mode.motion });
}

/** n animation frames: what ScrollTrigger needs to apply a scrubbed tween after a scroll, and a layout to follow a resize. */
export const frames = (page, n = 2) =>
  page.evaluate(async (n) => { for (let i = 0; i < n; i++) await new Promise((resolve) => requestAnimationFrame(resolve)); }, n);

/** Jump the scroll position; returns where the page ended up. */
export async function jump(page, y) {
  await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), y);
  await frames(page);
  return page.evaluate(() => scrollY);
}

/** Walk down the page a screen at a time, so every scroll trigger on it gets passed, and end at the bottom. */
export async function scrollThrough(page) {
  const [height, step] = await page.evaluate(() => [document.documentElement.scrollHeight, innerHeight * 0.8]);
  for (let y = 0; y < height; y += step) await jump(page, y);
  await jump(page, height);
}

/** Resize the viewport and wait for the layout to follow (a measure taken at once is stale). */
export async function resize(page, width, height = 900) {
  await page.setViewportSize({ width, height });
  await frames(page);
  await until(page, (w) => document.documentElement.clientWidth === w, `viewport never became ${width} wide`, 5000, width);
}

/** A touch at the middle of an element. Not locator.tap(): it scrolls the target into view first, and for the sticky nav
 *  that scroll is not one a reader makes (it jumped 1500 to 703). */
export async function tap(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  ok(box, `${selector} has no box to tap`);
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
}

/** The page is not wider than the viewport. On failure the message names the first elements that stick out. */
export async function noOverflow(page) {
  const wide = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth <= width) return null;
    const name = (e) => e.tagName.toLowerCase() + (e.getAttribute('class') ? `.${e.getAttribute('class').trim().split(/\s+/)[0]}` : '');
    return [...document.body.querySelectorAll('*')].filter((e) => e.getBoundingClientRect().right > width + 1).slice(0, 3).map(name);
  });
  ok(!wide, `page is wider than the viewport: ${wide?.join(', ')}`);
}

/** No console error and no uncaught exception since the page was made (or since the last call). */
export function noConsoleErrors(page) {
  const errors = page.errors.splice(0);
  ok(!errors.length, `${errors.length} console error(s): ${errors.slice(0, 2).join(' | ')}`);
}

/** {top, right, bottom, left} of a computed `inset(...)`: Chromium shortens it to 1-3 values when sides repeat. */
export function insets(clipPath) {
  const m = /inset\(([^)]*)\)/.exec(clipPath);
  ok(m, `no inset() in "${clipPath}"`);
  const [top, right = top, bottom = top, left = right] = m[1].split(' round')[0].trim().split(/\s+/).map(parseFloat);
  return { top, right, bottom, left };
}

/**
 * How many pixels of a PNG screenshot `buffer`, inside `box` ({x, y, w, h} in screenshot pixels), are darker than `threshold` (0-255
 * luminance). `seam`: only those that are a gap inside a stripe, not its edge: a light pixel above and below them in their column,
 * and the same two pixels away on both sides (so not the column at the antialiased edge of a band that is still growing). The page
 * decodes the PNG on a canvas, so no PNG library is needed.
 */
export const pixelsDarkerThan = (page, buffer, box, threshold, seam = false) =>
  page.evaluate(async ({ png, box, threshold, seam }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const g = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height }).getContext('2d');
    g.drawImage(img, 0, 0);
    const { data, width } = g.getImageData(0, 0, img.width, img.height);
    const dark = (x, y) => 0.2126 * data[(y * width + x) * 4] + 0.7152 * data[(y * width + x) * 4 + 1] + 0.0722 * data[(y * width + x) * 4 + 2] < threshold;
    const [x1, y1] = [box.x + box.w, box.y + box.h];
    const lit = []; // per column: its first and last light pixel
    for (let x = box.x; x < x1; x++) {
      const ys = [];
      for (let y = box.y; y < y1; y++) if (!dark(x, y)) ys.push(y);
      lit[x] = [ys[0] ?? -1, ys.at(-1) ?? -1];
    }
    const gap = (x, y) => x >= box.x && x < x1 && dark(x, y) && y > lit[x][0] && y < lit[x][1];
    let count = 0;
    for (let x = box.x; x < x1; x++) {
      for (let y = box.y; y < y1; y++) if (seam ? gap(x, y) && gap(x - 2, y) && gap(x + 2, y) : dark(x, y)) count++;
    }
    return count;
  }, { png: buffer.toString('base64'), box, threshold, seam });
