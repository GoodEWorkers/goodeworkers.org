// Copies the shipped illustration sets from the commission's generators into public/illustrations/<subject>/<style>.svg, where the
// site (src/components/Illustration.astro) and the picker (src/scripts/motion/picker.ts) read them. Rerun it whenever an illustrator
// revises a set: `node scripts/sync-illustrations.mjs [research dir]` (default ~/research/goodeworkers-illos). Nothing is written
// unless every file passes; the target folder is wiped first, so it always mirrors SETS and SUBJECTS exactly.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const from = process.argv[2] ?? join(homedir(), 'research/goodeworkers-illos');
const to = fileURLToPath(new URL('../public/illustrations/', import.meta.url));

// The commission's folder -> the style's slug on the site. The first is the default (Illustration.astro reads it); the order is the picker's.
const SETS = {
  '07-warped-bands': 'bands',
  '10-strings': 'strings',
  '01-partition': 'partition',
  '05-circles': 'circles',
  '03-grid-disorder': 'grid',
  '06-isometric': 'isometric',
};
// The commission's file -> the subject's slug on the site.
const SUBJECTS = { openness: 'openness', autonomy: 'autonomy', care: 'care', solidarity: 'solidarity', 'health-and-hospitals': 'health' };
const MAX_BYTES = 8 * 1024; // the commission's contract: under 8 KB and 120 elements, no ids (the page inlines several copies)
const MAX_ELEMENTS = 120;

const rows = [];
const problems = [];
for (const [dir, style] of Object.entries(SETS)) {
  for (const [file, subject] of Object.entries(SUBJECTS)) {
    const name = `${subject}/${style}`;
    let text;
    try {
      text = readFileSync(join(from, dir, `${file}.svg`), 'utf8');
    } catch {
      problems.push(`${name}: ${join(from, dir, `${file}.svg`)} is missing`);
      continue;
    }
    const svg = text.replace(/^(\s*(<\?xml[\s\S]*?\?>|<!DOCTYPE[^>]*>))*\s*/, '').trimEnd(); // no XML prolog: the file is inlined in HTML
    const bytes = Buffer.byteLength(svg);
    const elements = [...svg.matchAll(/<([a-z][\w:-]*)/gi)].filter(([, tag]) => tag !== 'svg' && tag !== 'desc').length;
    const faults = [
      !svg.startsWith('<svg') && 'does not start with <svg',
      !svg.includes('<desc>') && 'has no <desc>',
      bytes > MAX_BYTES && `${bytes} bytes, over ${MAX_BYTES}`,
      elements > MAX_ELEMENTS && `${elements} elements, over ${MAX_ELEMENTS}`,
      /\sid\s*=/.test(svg) && 'carries an id',
    ].filter(Boolean);
    problems.push(...faults.map((fault) => `${name}: ${fault}`));
    rows.push({ subject, style, dir, bytes, elements, svg });
  }
}

if (problems.length) {
  console.error(`Nothing written. ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}

rmSync(to, { recursive: true, force: true });
for (const { subject, style, svg } of rows) {
  mkdirSync(join(to, subject), { recursive: true });
  writeFileSync(join(to, subject, `${style}.svg`), `${svg}\n`);
}

const pad = (value, width) => String(value).padEnd(width);
console.log(`${pad('subject', 11)}${pad('style', 11)}${pad('set', 18)}${pad('bytes', 7)}elements`);
for (const { subject, style, dir, bytes, elements } of rows) console.log(`${pad(subject, 11)}${pad(style, 11)}${pad(dir, 18)}${pad(bytes, 7)}${elements}`);
console.log(`${rows.length} files, ${rows.reduce((sum, row) => sum + row.bytes, 0)} bytes, from ${from} into ${to}`);
