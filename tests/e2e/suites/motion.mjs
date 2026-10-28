// The motion of the site, as a reader meets it: the home intro, the hero window, the About photos, the nav, a client navigation,
// the mobile menu. It times the page, so run.mjs runs it alone.
import { arrived, check, close, insets, jump, newPage, ok, open, settle, tap, until, vp } from '../lib.mjs';

const [WINDOW, NAV] = ['[data-window]', '[data-navbar]'];
// Closed, the hero window's side insets (px) by viewport width: 8% of the sheet, capped at the room the hero's row leaves (32px up to
// xl, 96px from there; the plan said 64px at 1024).
const SIDE = { 1024: 32, 1280: 96, 1440: 96, 1920: 96, 2560: 96 };
const HEIGHT = { 1024: 768, 1280: 800, 1440: 900, 1920: 1080, 2560: 1440 };

const navShown = (page, timeout = 5000) =>
  until(page, (sel) => {
    const nav = document.querySelector(sel);
    return getComputedStyle(nav).opacity === '1' && nav.getBoundingClientRect().top >= -1 && nav.getBoundingClientRect().bottom > 0;
  }, 'the nav never showed', timeout, NAV);

async function intro(browser, base) {
  await check('home intro is done within 1.5 s: nav and pills at opacity 1', async () => {
    const page = await newPage(browser, vp.desktop);
    // From the start of the document: when the engine booted, and when the nav and both pills reached opacity 1.
    await page.addInitScript(() => {
      const t = (window.__intro = {});
      const tick = () => {
        if (document.documentElement?.dataset.engine && !t.boot) t.boot = performance.now();
        const shown = [document.querySelector('[data-navbar]'), ...document.querySelectorAll('[data-intro="cta"]')];
        if (t.boot && shown.length > 1 && shown.every((e) => e && getComputedStyle(e).opacity === '1')) t.done = performance.now();
        if (!t.done) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto(`${base}/`, { waitUntil: 'load' });
    const t = await until(page, () => window.__intro.done && window.__intro, 'the nav and pills never reached opacity 1', 5000);
    await close(page);
    ok(t.done <= 1500, `done at ${Math.round(t.done)} ms`);
    return `done at ${Math.round(t.done)} ms, engine up at ${Math.round(t.boot)} ms`;
  });
}

async function heroWindow(browser, base) {
  for (const [width, side] of Object.entries(SIDE)) {
    const page = await newPage(browser, { width: Number(width), height: HEIGHT[width] });
    await open(page, base, '/');
    const clipOf = () => page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).clipPath, WINDOW);
    const topOf = () => page.evaluate((sel) => document.querySelector(sel).getBoundingClientRect().top + scrollY, WINDOW);
    // The engine writes the closed clip in pixels; before that the sheet has the first-paint CSS (percentages).
    await until(page, (sel) => /^inset\([\d.]+px/.test(getComputedStyle(document.querySelector(sel)).clipPath), 'the engine never closed the window', 5000, WINDOW);

    await check(`hero window @${width}: closed, its side insets are ${side}px`, async () => {
      const { left, right } = insets(await clipOf());
      ok(Math.abs(left - side) < 0.5 && Math.abs(right - side) < 0.5, `left ${left}px, right ${right}px`);
      return `${left}px`;
    });

    await check(`hero window @${width}: never clips the H2, lede or cards at 6 scrub samples, and is open at the last`, async () => {
      const top = await topOf();
      const [start, end] = [Math.max(0, top - HEIGHT[width] * 0.9), top - HEIGHT[width] * 0.35]; // the scrub: clamp(top 90%) to top 35%
      for (let i = 0; i <= 5; i++) {
        const y = await jump(page, start + ((end - start) * i) / 5);
        const { clip, box, rects } = await page.evaluate((sel) => {
          const sheet = document.querySelector(sel);
          const rects = [...sheet.querySelectorAll('h2, p, [data-stagger]')].map((e) => ({ name: e.tagName.toLowerCase(), ...e.getBoundingClientRect().toJSON() }));
          return { clip: getComputedStyle(sheet).clipPath, box: sheet.getBoundingClientRect().toJSON(), rects };
        }, WINDOW);
        const inset = insets(clip);
        const cut = rects.find((r) => r.left < box.left + inset.left - 0.5 || r.right > box.right - inset.right + 0.5 || r.top < box.top + inset.top - 0.5 || r.bottom > box.bottom - inset.bottom + 0.5);
        ok(!cut, `at scrollY ${Math.round(y)} the window cuts a ${cut?.name} (insets ${JSON.stringify(inset)})`);
        ok(i < 5 || Object.values(inset).every((v) => Math.abs(v) < 0.01), `still inset ${JSON.stringify(inset)} at the end of its scrub`);
      }
      return `scrollY ${Math.round(start)}..${Math.round(end)}`;
    });
    await close(page);
  }
}

// What two rects share: [width, height] of the overlap (negative: none).
const share = (p, q) => [Math.min(p.right, q.right) - Math.max(p.left, q.left), Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top)];
const atRest = (b) => ({ ...b, top: b.top - b.drift, bottom: b.bottom - b.drift }); // the parallax drift taken back out

async function aboutPhotos(browser, base) {
  // Across the pass of the pair, at the scroll positions where both photos are on screen: they overlap at a corner by design (the
  // rest overlap); the parallax may add 24px to it at most, and Alice may not reach the Join Us pill.
  for (const size of [vp.phone, vp.desktop, vp.wide, { width: 2560, height: 1440 }]) {
    await check(`About photos @${size.width}x${size.height}: never overlap beyond the rest overlap plus 24px, nor touch the pill`, async () => {
      const page = await newPage(browser, size);
      await open(page, base, '/');
      const geo = () =>
        page.evaluate(() => {
          const [richard, alice] = [...document.querySelectorAll('[data-story] img')];
          const rect = (img) => Object.assign(img.getBoundingClientRect().toJSON(), { drift: new DOMMatrix(getComputedStyle(img.closest('[data-parallax]')).transform).m42 });
          const pill = [...document.querySelectorAll('a[data-from^="joinus"]')].find((a) => a.offsetParent);
          return {
            r: rect(richard), a: rect(alice), label: alice.parentElement.querySelector('p').getBoundingClientRect().toJSON(), pill: pill.getBoundingClientRect().toJSON(),
            vh: innerHeight, max: document.documentElement.scrollHeight - innerHeight,
          };
        });
      // The scroll range in which both photos rest on screen, with the room a drift takes.
      const g0 = await geo();
      const [r0, a0, room] = [atRest(g0.r), atRest(g0.a), 0.06 * g0.vh];
      const [lo, hi] = [Math.max(0, Math.max(r0.top, a0.top) - g0.vh - room), Math.min(g0.max, Math.min(r0.bottom, a0.bottom) + room)];
      let [seen, worst, rest] = [0, -Infinity, 0];
      for (let i = 0; i < 30; i++) {
        const y = await jump(page, lo + ((hi - lo) * i) / 29);
        const g = await geo();
        if (![g.r, g.a].every((b) => b.bottom > 0 && b.top < g.vh)) continue;
        seen++;
        const [across, overlap] = share(g.r, g.a);
        rest = share(atRest(g.r), atRest(g.a))[1];
        const more = across > 0 ? overlap - rest : -Infinity;
        worst = Math.max(worst, more);
        ok(![g.a, g.label].some((b) => share(b, g.pill).every((v) => v > 0)), `Alice reaches the Join Us pill at scrollY ${Math.round(y)}`);
        ok(more <= 24, `the photos overlap ${overlap.toFixed(0)}px at scrollY ${Math.round(y)}: ${more.toFixed(0)}px more than at rest (${rest.toFixed(0)}px)`);
      }
      await close(page);
      ok(seen >= 20, `only ${seen} positions with both photos on screen`);
      return `${seen} positions, at most +${worst.toFixed(1)}px over the rest overlap of ${rest.toFixed(0)}px`;
    });
  }
}

async function nav(browser, base) {
  await check('nav hides on scroll down and shows on scroll up on /', async () => {
    const page = await newPage(browser, vp.desktop);
    await open(page, base, '/');
    await navShown(page); // the intro has finished with it
    await jump(page, 900);
    await until(page, (sel) => getComputedStyle(document.querySelector(sel)).opacity === '0' && document.querySelector(sel).getBoundingClientRect().bottom <= 1, 'the nav stayed on screen while scrolling down', 5000, NAV);
    await jump(page, 800);
    await navShown(page);
    await close(page);
  });
  await check('nav stays on the job boards page while scrolling', async () => {
    const page = await newPage(browser, vp.desktop);
    await open(page, base, '/remote-job-boards/');
    await jump(page, 1200);
    await settle(page, NAV).catch(() => { throw new Error('the nav faded or moved on scroll down'); });
    await navShown(page, 1000);
    await close(page);
  });
}

async function navigation(browser, base) {
  await check('client navigation / to /initiatives/ runs the curtain and lands with aria-current', async () => {
    const page = await newPage(browser, vp.desktop);
    await open(page, base, '/');
    await navShown(page);
    ok(await page.evaluate(() => !!document.getElementById('curtain')), 'the page has no #curtain');
    // The curtain's highest point over the navigation, every frame (this document, and so this loop, survive a client navigation).
    await page.evaluate(() => {
      window.__curtain = Infinity;
      const tick = () => { window.__curtain = Math.min(window.__curtain, document.getElementById('curtain').getBoundingClientRect().top); requestAnimationFrame(tick); };
      tick();
    });
    await page.locator(`${NAV} a[href="/initiatives/"]:visible`).click();
    await arrived(page, '/initiatives/');
    const reached = await page.evaluate(() => window.__curtain);
    ok(reached <= 1, `the curtain only rose to y=${Math.round(reached)}`);
    await until(page, () => document.getElementById('curtain').getBoundingClientRect().top >= innerHeight - 1, 'the curtain never parked below the viewport', 5000);
    const current = await page.evaluate(() => [...document.querySelectorAll('[data-navbar] [aria-current="page"]')].map((a) => a.getAttribute('href')));
    ok(current.length && current.every((href) => href === '/initiatives/'), `aria-current is on ${JSON.stringify(current)}`);
    await close(page);
  });
}

async function mobileMenu(browser, base) {
  const [TOGGLE, PANEL] = ['[data-menu-toggle]', '#mobile-menu'];
  for (const how of ['the toggle', 'Escape', 'a link']) {
    await check(`mobile menu opened at scrollY 1500 covers the viewport, links hit-testable, closes by ${how}, scroll restored`, async () => {
      const page = await newPage(browser, vp.phone);
      await open(page, base, '/');
      await navShown(page);
      await jump(page, 1560);
      await jump(page, 1500); // up: the bar comes back, as it does for a reader about to open the menu
      await navShown(page);
      await tap(page, TOGGLE);
      await until(page, () => document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded') === 'true' && document.getElementById('mobile-menu').classList.contains('is-open'), 'the menu never opened', 5000);
      await settle(page, PANEL);

      const seen = await page.evaluate(() => {
        const panel = document.getElementById('mobile-menu');
        const r = panel.getBoundingClientRect();
        const on = (x, y) => panel.contains(document.elementFromPoint(x, y));
        const covers = r.left <= 0.5 && r.right >= innerWidth - 0.5 && r.top <= 0.5 && r.bottom >= innerHeight - 0.5 && [[4, 4], [innerWidth - 4, 4], [4, innerHeight - 4], [innerWidth - 4, innerHeight - 4]].every(([x, y]) => on(x, y));
        const links = [...panel.querySelectorAll('[data-menu-link]')].map((a) => {
          const b = a.getBoundingClientRect();
          return a.contains(document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2));
        });
        return { covers, links, y: scrollY };
      });
      ok(seen.covers, 'the menu does not cover the viewport');
      ok(seen.links.length >= 4 && seen.links.every(Boolean), `menu links hit-testable: ${seen.links}`);
      ok(Math.abs(seen.y - 1500) < 2, `opening moved the page to ${seen.y}`);
      await page.mouse.wheel(0, 400);
      await settle(page, PANEL);
      ok(Math.abs((await page.evaluate(() => scrollY)) - 1500) < 2, 'the page scrolls behind the open menu');

      if (how === 'the toggle') await tap(page, TOGGLE);
      else if (how === 'Escape') await page.keyboard.press('Escape');
      else await tap(page, `${PANEL} [data-menu-link]`);
      if (how === 'a link') await arrived(page, '/initiatives/');
      await until(page, () => {
        const root = document.documentElement;
        return document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded') === 'false' && document.getElementById('mobile-menu').classList.contains('hidden') && !root.style.overflow && !root.classList.contains('lenis-stopped');
      }, 'the menu did not close and give the scroll back', 5000);
      const before = await page.evaluate(() => scrollY);
      if (how !== 'a link') ok(Math.abs(before - 1500) < 2, `closing moved the page to ${before}`);
      await page.mouse.wheel(0, 300);
      await until(page, (y) => scrollY > y + 100, 'the page does not scroll after the menu closed', 5000, before);
      await close(page);
    });
  }
}

export async function run({ browser, base }) {
  for (const part of [intro, heroWindow, aboutPhotos, nav, navigation, mobileMenu]) await part(browser, base);
}
