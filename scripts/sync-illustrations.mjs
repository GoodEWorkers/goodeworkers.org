// Copies the shipped illustration sets from the commission's generators into public/illustrations/<subject>/<style>.svg, where the
// site (src/components/Illustration.astro) and the picker (src/scripts/motion/picker.ts) read them. Rerun it whenever an illustrator
// revises a set or a late one lands: `node scripts/sync-illustrations.mjs [research dir]` (default ~/research/goodeworkers-illos).
// Nothing is written unless every file passes; the target folder is wiped first, so it always mirrors SETS and SUBJECTS exactly.
// A set that has no drawings yet is skipped with a warning (the default may not be: the site inlines it at build).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const from = process.argv[2] ?? join(homedir(), 'research/goodeworkers-illos');
const to = fileURLToPath(new URL('../public/illustrations/', import.meta.url));

// The commission's folder, under the research dir -> the style's slug on the site. Round 1 sits at its root (only warped bands stayed),
// round 2 in v2/. The first is the default (Illustration.astro reads it); the order is the picker's.
const SETS = {
  '07-warped-bands': 'bands',
  'v2/pictogram': 'pictogram',
  'v2/leaded': 'leaded',
  'v2/cutout': 'cutout',
  'v2/halftone': 'halftone',
  'v2/monoline': 'monoline',
  'v2/isoscene': 'isoscene',
  'v2/brush': 'brush',
};
const [DEFAULT] = Object.values(SETS);
// The commission's file -> the subject's slug on the site.
const SUBJECTS = { openness: 'openness', autonomy: 'autonomy', care: 'care', solidarity: 'solidarity', 'health-and-hospitals': 'health' };
const MAX_BYTES = 12 * 1024; // round 2's contract: under 12 KB and 160 elements, no ids (the page inlines several copies)
const MAX_ELEMENTS = 160;

const rows = [];
const problems = [];
const warnings = [];
for (const [dir, style] of Object.entries(SETS)) {
  if (style !== DEFAULT && !Object.keys(SUBJECTS).some((file) => existsSync(join(from, dir, `${file}.svg`)))) {
    warnings.push(`${style}: no drawings in ${join(from, dir)} yet, skipped (rerun when it lands)`);
    continue;
  }
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
      bytes > MAX_BYTES && `${bytes} bytes, over ${MAX_BYTES}`,
      elements > MAX_ELEMENTS && `${elements} elements, over ${MAX_ELEMENTS}`,
      /\sid\s*=/.test(svg) && 'carries an id',
    ].filter(Boolean);
    problems.push(...faults.map((fault) => `${name}: ${fault}`));
    if (!svg.includes('<desc>')) warnings.push(`${name}: has no <desc>`);
    rows.push({ subject, style, dir, bytes, elements, svg });
  }
}

const warn = () => warnings.forEach((warning) => console.warn(`warning: ${warning}`));
if (problems.length) {
  warn();
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
warn();
