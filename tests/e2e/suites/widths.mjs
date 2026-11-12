// One width for every surface: on every page and at five widths, each .sheet has the left and right edge of the footer's
// contact sheet (the column's own box), within 1 px. Reduced motion, so nothing is moved or hidden: only layout is measured.
import { check, close, newPage, open, pagePaths, pool, resize } from '../lib.mjs';

const WIDTHS = [390, 768, 1024, 1440, 1920];

export async function run({ browser, base }) {
  await pool(pagePaths(), 4, async (path) => {
    const page = await newPage(browser, { reducedMotion: true });
    await check(`${path} loads`, () => open(page, base, path));
    for (const width of WIDTHS) {
      await check(`${path} @${width} every .sheet matches the footer sheet`, async () => {
        await resize(page, width);
        const { sheets, off } = await page.evaluate(() => {
          const foot = document.querySelector('footer > .bg-white').getBoundingClientRect();
          const sheets = [...document.querySelectorAll('.sheet')].map((el) => [el, el.getBoundingClientRect()]);
          const bad = sheets.filter(([, r]) => Math.abs(r.left - foot.left) > 1 || Math.abs(r.right - foot.right) > 1);
          return { sheets: sheets.length, off: bad.map(([el, r]) => `${el.id || el.tagName.toLowerCase()} ${r.left.toFixed(1)}..${r.right.toFixed(1)} vs ${foot.left.toFixed(1)}..${foot.right.toFixed(1)}`) };
        });
        if (off.length) throw new Error(`${off.length} of ${sheets} sheets off the footer's edges: ${off.slice(0, 2).join('; ')}`);
        return `${sheets} sheets`;
      });
    }
    await close(page);
  });
}
