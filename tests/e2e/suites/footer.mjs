// The footer: no letter roll on the email (the nav Contact pill keeps its), no night street, the logo as wide as its column and its
// five paths revealing, the heading larger than the email.
import { arrived, check, close, newPage, ok, open, resize, scrollThrough, until, vp } from '../lib.mjs';

const PATHS = 'footer svg[data-stagger] > *'; // the logotype's paths, risen one after another by the engine
const count = (page, selector) => page.evaluate((s) => document.querySelectorAll(s).length, selector);
const none = async (page, selector) => ok((await count(page, selector)) === 0, `${await count(page, selector)} x ${selector}`);
const px = (page, selector) => page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).fontSize), selector);

export async function run({ browser, base }) {
  const page = await newPage(browser, vp.desktop);
  await open(page, base, '/');
  await check('nav Contact pill keeps its letter roll', async () => ok(await count(page, '[data-navbar] a[href*="from=nav#contact"] [data-roll-clip]'), 'no roll on the pill: the engine builds none, so the next check proves nothing'));
  await check('no letter roll on the footer email', () => none(page, 'a[href^="mailto"] [data-roll-clip]'));
  await check('no night street behind the footer logo', () => none(page, '[data-street]'));

  for (const width of [390, 1440, 1920]) {
    await check(`footer logo @${width}: as wide as its column`, async () => {
      await resize(page, width);
      const [logo, column] = await page.evaluate(() => {
        const svg = document.querySelector('footer [data-logo] svg');
        const [box, cs] = [svg.closest('.max-w-screen-2xl'), getComputedStyle(svg.closest('.max-w-screen-2xl'))];
        return [svg.getBoundingClientRect().width, box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)];
      });
      ok(Math.abs(logo - column) <= 1, `the logo is ${logo.toFixed(1)}px wide, its column ${column.toFixed(1)}px`);
    });
  }
  for (const width of [390, 1440]) {
    await check(`footer @${width}: the heading is larger than the email`, async () => {
      await resize(page, width);
      const [heading, email] = [await px(page, 'footer h2'), await px(page, 'footer a[href^="mailto"]')];
      ok(heading > email, `heading ${heading}px, email ${email}px`);
      return `${heading}px over ${email}px`;
    });
  }
  await close(page);

  for (const [when, clientNavigation] of [['at the bottom of a page', false], ['after a client navigation too', true]]) {
    await check(`footer logo: its five paths reveal ${when}`, async () => {
      const p = await newPage(browser, vp.desktop);
      await open(p, base, '/');
      if (clientNavigation) {
        await p.locator('[data-navbar] a[href="/initiatives/"]:visible').click();
        await arrived(p, '/initiatives/');
      }
      await scrollThrough(p);
      ok((await count(p, PATHS)) === 5, `${await count(p, PATHS)} paths`);
      await until(p, (s) => [...document.querySelectorAll(s)].every((e) => getComputedStyle(e).opacity === '1'), 'the logo paths never revealed', 6000, PATHS);
      await close(p);
    });
  }
}
