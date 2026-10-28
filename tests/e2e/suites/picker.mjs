// The illustration picker (src/scripts/motion/picker.ts, DESIGN.md Illustrations): ?pick shows a panel, a thumbnail swaps every slot of its
// subject, ?illo= reproduces a choice in a fresh browser, and a visitor without any of that sees the default set and no panel.
// A slot's style is read from what it draws: the <desc> inside its svg, compared with the <desc> of the file it should come from.
import { readFileSync } from 'node:fs';
import { arrived, check, close, newPage, noConsoleErrors, noOverflow, ok, until, vp } from '../lib.mjs';

const SUBJECTS = ['openness', 'autonomy', 'care', 'solidarity', 'health'];
const STYLES = ['bands', 'strings', 'partition', 'circles', 'grid', 'isometric']; // the default is the first
const descOf = (subject, style) =>
  /<desc>([^<]*)<\/desc>/.exec(readFileSync(new URL(`../../../public/illustrations/${subject}/${style}.svg`, import.meta.url), 'utf8'))[1];

const thumb = (subject, style) => `[data-illo-panel] button[data-pick="${subject}:${style}"]`;
const PANEL = '[data-illo-panel]';

/** goto + arrived. `open` in lib.mjs would compare the pathname with a path that carries a query. */
async function visit(page, base, path) {
  await page.goto(base + path, { waitUntil: 'load' });
  if (page.mode.js) await arrived(page, path.split('?')[0], { motion: page.mode.motion });
}

const slots = (page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('[data-illo-slot]')].map((slot) => {
      const svg = slot.querySelector('svg');
      return {
        subject: slot.dataset.illoSlot, context: slot.dataset.illoContext, cls: slot.className, marked: slot.dataset.illoStyle,
        desc: svg?.querySelector('desc')?.textContent ?? null, opacity: svg ? getComputedStyle(svg).opacity : null,
        inline: svg?.style.opacity ?? null, aria: svg?.getAttribute('aria-hidden'), focusable: svg?.getAttribute('focusable'), ids: slot.querySelectorAll('[id]').length,
      };
    }),
  );

/** Every slot draws `styles[subject]` (the default for a subject not named), and has finished fading in. */
async function shows(page, styles = {}, timeout = 6000) {
  const want = Object.fromEntries(SUBJECTS.map((s) => [s, descOf(s, styles[s] ?? STYLES[0])]));
  try {
    await until(page, (want) => {
      const all = [...document.querySelectorAll('[data-illo-slot]')];
      return all.length > 0 && all.every((slot) => {
        const svg = slot.querySelector('svg');
        return svg?.querySelector('desc')?.textContent === want[slot.dataset.illoSlot] && getComputedStyle(svg).opacity === '1' && svg.style.opacity === ''; // the fade has ended and cleared itself
      });
    }, 'slots never showed the expected drawings', timeout, want);
  } catch (e) {
    const wrong = (await slots(page)).filter((s) => s.desc !== want[s.subject] || s.opacity !== '1');
    throw new Error(`${wrong.length} slot(s) off: ${wrong.slice(0, 3).map((s) => `${s.subject}/${s.context} ${s.desc === want[s.subject] ? `opacity ${s.opacity}` : `draws "${(s.desc ?? 'nothing').slice(0, 40)}"`}`).join('; ')} (${e.message})`);
  }
}

const storage = (page, key = 'illoPick') => page.evaluate((key) => localStorage.getItem(key), key);
const panelUp = (page) => until(page, () => document.querySelectorAll('[data-illo-panel] button[data-pick]').length === 30, 'the panel never appeared', 6000);
const pressed = (page, subject) =>
  page.evaluate(({ subject, styles }) => styles.filter((st) => document.querySelector(`[data-illo-panel] [data-pick="${subject}:${st}"]`)?.getAttribute('aria-pressed') === 'true'), { subject, styles: STYLES });
const clipboard = (page, accepts) =>
  page.addInitScript((accepts) => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: (text) => (accepts ? ((window.__copied = text), Promise.resolve()) : Promise.reject(new Error('refused'))) },
    });
  }, accepts);

export async function run({ browser, base }) {
  // ---- The panel and the swap, on one page, in order ----
  const page = await newPage(browser, vp.desktop);
  await visit(page, base, '/values/?pick');
  await check('picker: ?pick shows the panel: five rows of six 48 px thumbnails, the default set pressed, fixed above the nav', async () => {
    await panelUp(page);
    await until(page, () => [...document.querySelectorAll('[data-illo-thumb]')].every((thumb) => thumb.querySelector('svg')), 'a thumbnail never got its drawing', 6000); // they arrive as the files do
    const panel = await page.evaluate(() => {
      const el = document.querySelector('[data-illo-panel]');
      const [cs, r] = [getComputedStyle(el), el.getBoundingClientRect()];
      const rows = [...el.querySelectorAll('[data-rows] > div')].map((row) => ({
        label: row.querySelector('p').textContent,
        thumbs: [...row.querySelectorAll('button[data-pick]')].map((b) => {
          const [box, svg] = [b.getBoundingClientRect(), b.querySelector('[data-illo-thumb] > svg')];
          return { size: [box.width, box.height].join('x'), pressedAttr: b.getAttribute('aria-pressed'), svg: !!svg, name: b.getAttribute('aria-label') };
        }),
      }));
      const outside = document.elementFromPoint(r.left - 6, r.top + 40); // a point just left of the card: the page's, not the panel's
      return {
        position: cs.position, z: +cs.zIndex, navZ: +getComputedStyle(document.querySelector('[data-navbar]')).zIndex, hitsOnlyItself: !el.contains(outside),
        right: innerWidth - r.right, bottom: innerHeight - r.bottom, title: el.querySelector('p').textContent, titleFont: getComputedStyle(el.querySelector('p')).fontFamily,
        rows, toggle: el.querySelector('[data-act="same"]')?.getAttribute('aria-checked'), buttons: ['copy', 'reset', 'close'].map((a) => !!el.querySelector(`[data-act="${a}"]`)),
      };
    });
    ok(panel.position === 'fixed', `position is ${panel.position}`);
    ok(panel.z > panel.navZ, `z-index ${panel.z} is not above the nav's ${panel.navZ}`);
    ok(panel.hitsOnlyItself, 'the page next to the card is covered by the panel');
    ok(panel.right > 0 && panel.right < 40 && panel.bottom > 0 && panel.bottom < 40, `not bottom right: ${panel.right}px from the right, ${panel.bottom}px from the bottom`);
    ok(panel.title === 'Illustrations' && panel.titleFont.includes('ClashDisplay'), `title "${panel.title}" in ${panel.titleFont}`);
    ok(panel.rows.map((r) => r.label).join() === 'Openness,Autonomy,Care,Solidarity,Health', `rows ${panel.rows.map((r) => r.label)}`);
    for (const row of panel.rows) {
      ok(row.thumbs.length === 6, `${row.label} has ${row.thumbs.length} thumbnails`);
      ok(row.thumbs.every((t) => t.size === '48x48' && t.svg), `${row.label}: a thumbnail is not 48x48 with its drawing in it`);
      ok(row.thumbs.map((t) => t.pressedAttr).join() === 'true,false,false,false,false,false', `${row.label}: aria-pressed is ${row.thumbs.map((t) => t.pressedAttr)}`);
    }
    ok(panel.toggle === 'false' && panel.buttons.every(Boolean), 'the switch, Copy link, Reset and Close are not all there');
    return `${panel.rows.length * 6} thumbnails`;
  });

  await check('picker: on a page with no slot of its own (the home page) the panel is complete: each subject\'s thumbnails sit on its tile colour', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/?pick');
    await panelUp(p);
    await until(p, () => [...document.querySelectorAll('[data-illo-thumb]')].every((thumb) => thumb.querySelector('svg')), 'a thumbnail never got its drawing', 6000);
    const colours = await p.evaluate((subjects) => subjects.map((s) => getComputedStyle(document.querySelector(`[data-illo-thumb="${s}"]`)).backgroundColor), SUBJECTS);
    ok(colours.join() === 'rgb(253, 201, 89),rgb(179, 160, 207),rgb(253, 94, 9),rgb(102, 103, 171),rgb(253, 201, 89)', `thumbnail backgrounds ${colours.join(' | ')}`);
    ok(!(await slots(p)).length, 'the home page has a slot now: pick another page for this check');
    noConsoleErrors(p);
    await close(p);
  });

  await check('picker: the panel is out of the layout: sheets keep their edges and the page its size with or without it, and nothing overflows', async () => {
    const layout = () => page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, sheets: [...document.querySelectorAll('.sheet')].map((e) => { const r = e.getBoundingClientRect(); return `${r.left.toFixed(1)}+${r.width.toFixed(1)}`; }) }));
    const [shown, hidden] = [await layout(), await page.evaluate(() => (document.querySelector('[data-illo-panel]').hidden = true)).then(layout)];
    await page.evaluate(() => (document.querySelector('[data-illo-panel]').hidden = false));
    ok(JSON.stringify(shown) === JSON.stringify(hidden), `with the panel ${JSON.stringify(shown)}, without ${JSON.stringify(hidden)}`);
    await noOverflow(page);
  });

  await check('picker: the default set shows before any choice, with no drawing id and the tile and night contexts kept', async () => {
    await shows(page);
    const all = await slots(page);
    ok(all.length === 8, `${all.length} slots on /values/, expected 8 (a tile and a row for each value)`);
    ok(all.every((s) => s.aria === 'true' && s.focusable === 'false' && s.ids === 0 && s.marked === 'bands'), 'a slot lacks aria-hidden, focusable=false, or carries an id');
    ok(all.every((s) => s.cls.includes(`illo-${s.context}`)), 'a slot lost its context class');
  });

  await check('picker: the charter illustrations sit in their tile corner, 52% wide (21rem at most), and are never pushed past the tile edge', async () => {
    for (const width of [390, 1440]) {
      const p = await newPage(browser, { ...vp.desktop, width, reducedMotion: true }); // nothing moves: the boxes are the layout's
      await visit(p, base, '/values/');
      const tiles = await p.evaluate(() =>
        [...document.querySelectorAll('section[aria-label] a[href^="#"]')].map((a) => {
          const [tile, slot] = [a.getBoundingClientRect(), a.querySelector('[data-illo-slot]').getBoundingClientRect()];
          return { id: a.getAttribute('href'), ratio: slot.width / tile.width, width: slot.width, right: tile.right - slot.right, bottom: tile.bottom - slot.bottom };
        }),
      );
      ok(tiles.length === 4, `@${width}: ${tiles.length} tiles`);
      for (const t of tiles) {
        ok(Math.abs(t.right) <= 0.5 && Math.abs(t.bottom) <= 0.5, `@${width} ${t.id}: the slot is ${t.right}px from the tile's right edge and ${t.bottom}px from its bottom (0 and 0: in the corner, not past it)`);
        ok(Math.abs(t.ratio - 0.52) < 0.005 || Math.abs(t.width - 336) < 0.5, `@${width} ${t.id}: the slot is ${(t.ratio * 100).toFixed(1)}% of the tile, ${t.width}px`);
      }
      await close(p);
    }
  });

  await check('picker: choosing a style swaps every slot of its subject, and only that subject, with a fade', async () => {
    await page.evaluate((old) => {
      window.__fade = new Promise((resolve) => {
        const watch = new MutationObserver(() => { // runs right after the swap and the tween's first write: the opacity the new drawing starts at
          const svg = document.querySelector('[data-illo-slot="openness"] svg');
          if (svg && svg.querySelector('desc')?.textContent !== old) (resolve(getComputedStyle(svg).opacity), watch.disconnect());
        });
        watch.observe(document.body, { childList: true, subtree: true });
      });
    }, descOf('openness', 'bands'));
    await page.locator(thumb('openness', 'strings')).click();
    await shows(page, { openness: 'strings' });
    const start = await page.evaluate(() => window.__fade);
    ok(+start < 0.5, `the new drawing started at opacity ${start}, not faded in`);
    const all = await slots(page);
    ok(all.filter((s) => s.subject === 'openness').length === 2, 'openness should have two slots on this page (tile, row)');
    ok(all.every((s) => s.aria === 'true' && s.focusable === 'false' && s.ids === 0), 'a swapped slot lost aria-hidden or focusable=false');
    ok(all.every((s) => s.inline === ''), 'a fade left an inline opacity on a drawing');
    ok((await pressed(page, 'openness')).join() === 'strings' && (await pressed(page, 'care')).join() === 'bands', 'aria-pressed does not follow the choice');
    ok((await storage(page)) === 'openness:strings', `localStorage.illoPick is ${await storage(page)}`);
    for (const style of STYLES.slice(1)) { // every style of one subject, one after the other
      await page.locator(thumb('care', style)).click();
      await shows(page, { openness: 'strings', care: style });
    }
  });

  await check('picker: "same style everywhere" makes one click set every subject', async () => {
    await page.locator('[data-illo-panel] [data-act="same"]').click();
    ok((await page.locator('[data-illo-panel] [data-act="same"]').getAttribute('aria-checked')) === 'true', 'the switch is not on');
    await page.locator(thumb('care', 'grid')).click();
    await shows(page, Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])));
    ok((await storage(page)) === 'all:grid', `localStorage.illoPick is ${await storage(page)}`);
    for (const s of SUBJECTS) ok((await pressed(page, s)).join() === 'grid', `${s}: grid is not the only pressed thumbnail`);
    await page.locator('[data-illo-panel] [data-act="same"]').click(); // off again: one click sets one subject
    await page.locator(thumb('health', 'circles')).click();
    await shows(page, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), health: 'circles' });
  });

  await check('picker: the thumbnails and Escape work from the keyboard', async () => {
    await page.locator(thumb('autonomy', 'partition')).focus();
    ok(await page.evaluate(() => document.activeElement?.dataset.pick === 'autonomy:partition'), 'a thumbnail does not take focus');
    await page.keyboard.press('Enter');
    await shows(page, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), health: 'circles', autonomy: 'partition' });
    await page.keyboard.press('Escape');
    await until(page, () => !document.querySelector('[data-illo-panel]'), 'Escape did not close the panel', 3000);
    await shows(page, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), health: 'circles', autonomy: 'partition' }); // the choice stays
  });
  await check('picker: no console errors while picking', () => noConsoleErrors(page));
  await close(page);

  // ---- Close, and Reset ----
  await check('picker: Close hides the panel for the session and keeps the choice; ?pick brings it back', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/values/?pick');
    await panelUp(p);
    await p.locator(thumb('openness', 'isometric')).click();
    await shows(p, { openness: 'isometric' });
    await p.locator('[data-illo-panel] [data-act="close"]').click();
    ok(!(await p.locator(PANEL).count()), 'the panel is still there');
    await visit(p, base, '/values/'); // a full reload: the choice applies, the panel stays shut
    await shows(p, { openness: 'isometric' });
    ok(!(await p.locator(PANEL).count()), 'the panel came back without ?pick');
    ok((await storage(p)) === 'openness:isometric', `localStorage.illoPick is ${await storage(p)}`);
    await visit(p, base, '/values/?pick');
    await panelUp(p);
    noConsoleErrors(p);
    await close(p);
  });

  await check('picker: Reset clears the choice and the storage, redraws the default, and the picker sleeps again', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/values/?pick&illo=all:strings');
    await panelUp(p);
    await shows(p, Object.fromEntries(SUBJECTS.map((s) => [s, 'strings'])));
    await p.locator('[data-illo-panel] [data-act="reset"]').click();
    await shows(p);
    ok((await storage(p)) === null, `localStorage.illoPick is ${await storage(p)}`);
    ok(!(await p.evaluate(() => location.search.includes('illo='))), 'the address still carries ?illo=');
    for (const s of SUBJECTS) ok((await pressed(p, s)).join() === 'bands', `${s}: the default is not the pressed one`);
    await visit(p, base, '/values/'); // nothing asks for the picker any more
    await shows(p);
    ok(!(await p.locator(PANEL).count()), 'a panel on a page nobody asked it for');
    noConsoleErrors(p);
    await close(p);
  });

  // ---- Links and storage ----
  await check('picker: Copy link writes the ?illo= URL; the link reproduces the choice in a fresh browser profile', async () => {
    const p = await newPage(browser, vp.desktop);
    await clipboard(p, true);
    await visit(p, base, '/values/?pick');
    await panelUp(p);
    await p.locator(thumb('openness', 'strings')).click();
    await p.locator(thumb('care', 'grid')).click();
    await shows(p, { openness: 'strings', care: 'grid' });
    await p.locator('[data-illo-panel] [data-act="copy"]').click();
    const link = await until(p, () => window.__copied, 'nothing was copied');
    const want = `${base}/values/?illo=openness:strings,autonomy:bands,care:grid,solidarity:bands,health:bands`;
    ok(link === want, `copied ${link}`);
    ok((await p.locator('[data-illo-panel] [data-act="copy"]').textContent()).trim() === 'Copied', 'no "Copied" on the button');
    const fresh = await newPage(browser, vp.desktop); // another context: empty storage
    await visit(fresh, base, link.slice(base.length));
    await shows(fresh, { openness: 'strings', care: 'grid' });
    ok((await storage(fresh)) === 'openness:strings,autonomy:bands,care:grid,solidarity:bands,health:bands', `the link was not stored: ${await storage(fresh)}`);
    noConsoleErrors(fresh);
    noConsoleErrors(p);
    await close(fresh);
    await close(p);
  });

  await check('picker: ?illo=all:strings gives every subject the strings, in a fresh context and on /initiatives/ too', async () => {
    for (const path of ['/values/', '/initiatives/', '/fr/valeurs/']) {
      const p = await newPage(browser, vp.desktop);
      await visit(p, base, `${path}?illo=all:strings`);
      await shows(p, Object.fromEntries(SUBJECTS.map((s) => [s, 'strings'])));
      ok((await storage(p)) === 'all:strings', `localStorage.illoPick is ${await storage(p)}`);
      noConsoleErrors(p);
      await close(p);
    }
  });

  await check('picker: a later entry wins (?illo=all:grid,care:circles), and unknown names are ignored', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/values/?illo=all:grid,care:circles,health:../../x,nobody:strings,openness:toString');
    await shows(p, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), care: 'circles' });
    noConsoleErrors(p);
    await close(p);
  });

  await check('picker: the Copy link falls back to the link in an input when the clipboard refuses', async () => {
    const p = await newPage(browser, vp.desktop);
    await clipboard(p, false);
    await visit(p, base, '/initiatives/?pick&illo=health:isometric');
    await panelUp(p);
    ok(await p.locator('[data-illo-panel] [data-link]').isHidden(), 'the input shows before anything was refused');
    await p.locator('[data-illo-panel] [data-act="copy"]').click();
    await until(p, () => !document.querySelector('[data-illo-panel] [data-link]').hidden, 'the link never showed in the input', 3000);
    const value = await p.locator('[data-illo-panel] [data-link]').inputValue();
    ok(value === `${base}/initiatives/?illo=openness:bands,autonomy:bands,care:bands,solidarity:bands,health:isometric`, `the input holds ${value}`);
    await close(p);
  });

  await check('picker: the choice persists in localStorage, and the URL wins over it', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/values/?illo=openness:strings');
    await shows(p, { openness: 'strings' });
    ok((await storage(p)) === 'openness:strings', `stored ${await storage(p)}`);
    await visit(p, base, '/initiatives/'); // no parameter: the stored choice applies, and the panel is up for it
    await shows(p, {}); // /initiatives/ has only the health slot, still the default
    await panelUp(p);
    await visit(p, base, '/values/');
    await shows(p, { openness: 'strings' });
    await panelUp(p);
    await visit(p, base, '/values/?illo=all:grid'); // the URL wins over what is stored, then is stored
    await shows(p, Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])));
    ok((await storage(p)) === 'all:grid', `stored ${await storage(p)}`);
    await p.locator(thumb('care', 'circles')).click(); // a click replaces a ?illo= left in the address, or a reload would bring it back
    await shows(p, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), care: 'circles' });
    ok(!(await p.evaluate(() => location.search.includes('illo='))), 'the address still carries the old ?illo=');
    await p.reload({ waitUntil: 'load' });
    await arrived(p, '/values/');
    await shows(p, { ...Object.fromEntries(SUBJECTS.map((s) => [s, 'grid'])), care: 'circles' });
    noConsoleErrors(p);
    await close(p);
  });

  await check('picker: the choice and the panel survive a client-side navigation', async () => {
    const p = await newPage(browser, vp.desktop);
    await visit(p, base, '/values/?pick');
    await panelUp(p);
    await p.locator('[data-illo-panel] [data-act="same"]').click();
    await p.locator(thumb('openness', 'strings')).click();
    await shows(p, Object.fromEntries(SUBJECTS.map((s) => [s, 'strings'])));
    await p.evaluate(() => (window.__same = 'still this document'));
    await p.locator('[data-navbar] a[href="/initiatives/"]').first().click();
    await arrived(p, '/initiatives/');
    ok(await p.evaluate(() => window.__same === 'still this document'), 'the page was reloaded, not navigated client-side');
    await shows(p, { health: 'strings' });
    await panelUp(p);
    ok((await pressed(p, 'health')).join() === 'strings' && (await p.locator('[data-illo-panel] [data-act="same"]').getAttribute('aria-checked')) === 'true', 'the panel does not show the choice');
    noConsoleErrors(p);
    await close(p);
  });

  await check('picker: on a phone the panel stays inside the screen and the page is no wider', async () => {
    const p = await newPage(browser, vp.phone);
    await visit(p, base, '/values/?pick');
    await panelUp(p);
    const box = await p.locator(PANEL).boundingBox();
    ok(box.x >= 0 && box.y >= 0 && box.x + box.width <= vp.phone.width && box.y + box.height <= vp.phone.height, `the panel is at ${JSON.stringify(box)}`);
    await noOverflow(p);
    await close(p);
  });

  // ---- Everyone else: the default set and no panel ----
  await check('picker: production without ?pick shows the default set, no panel, and downloads nothing of the picker', async () => {
    for (const path of ['/values/', '/initiatives/', '/fr/valeurs/']) {
      const p = await newPage(browser, vp.desktop);
      const asked = [];
      p.on('request', (r) => /picker|\/illustrations\//.test(r.url()) && asked.push(r.url().replace(base, '')));
      await visit(p, base, path);
      await shows(p);
      ok(!(await p.locator(PANEL).count()), `${path}: a panel`);
      ok(await p.evaluate(() => !!document.getElementById('illo-picker') && !document.querySelector('[data-illo-panel]')), `${path}: the template is not the only trace of the panel`);
      ok((await storage(p)) === null, `${path}: stored ${await storage(p)}`);
      ok(!asked.length, `${path}: asked for ${asked.join(', ')}`);
      noConsoleErrors(p);
      await close(p);
    }
  });

  await check('picker: reduced motion shows the default set, and a swap under it is instant', async () => {
    const p = await newPage(browser, { ...vp.desktop, reducedMotion: true });
    await visit(p, base, '/values/');
    await shows(p, {}, 1500);
    await close(p);
    const q = await newPage(browser, { ...vp.desktop, reducedMotion: true });
    await visit(q, base, '/values/?pick');
    await panelUp(q);
    await q.evaluate((old) => {
      window.__fade = new Promise((resolve) => {
        const watch = new MutationObserver(() => {
          const svg = document.querySelector('[data-illo-slot="care"] svg');
          if (svg && svg.querySelector('desc')?.textContent !== old) (resolve(getComputedStyle(svg).opacity), watch.disconnect());
        });
        watch.observe(document.body, { childList: true, subtree: true });
      });
    }, descOf('care', 'bands'));
    await q.locator(thumb('care', 'partition')).click();
    await shows(q, { care: 'partition' });
    const start = await q.evaluate(() => window.__fade);
    ok(start === '1', `the new drawing started at opacity ${start} under reduced motion`);
    noConsoleErrors(q);
    await close(q);
  });

  await check('picker: JS disabled shows the default set, whatever the address asks for, and no panel', async () => {
    for (const path of ['/values/', '/values/?pick&illo=all:strings', '/initiatives/?pick']) {
      const p = await newPage(browser, { ...vp.desktop, js: false });
      await visit(p, base, path);
      await shows(p, {}, 1500);
      ok(!(await p.locator(PANEL).count()), `${path}: a panel`);
      await close(p);
    }
  });
}
