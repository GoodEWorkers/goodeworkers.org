// End-to-end checks of the running site: `npm run e2e [-- suite...] [--jobs 4] [--serial motion] [--browser chromium|webkit]`.
//
// Starts `astro dev` on the first free port from 4390 (or uses BASE=http://localhost:PORT), waits for a 200 on /, runs every suite in
// suites/ as its own worker process with its own browser (--jobs at a time, then the --serial ones alone: they time the page), prints
// one table and writes each suite's lines to .report/<suite>.log. A check prints `PASS|FAIL|PEND name (detail)`. Exit 1 on any FAIL.
// Needs Node 22.18+: lib.mjs imports src/i18n/routes.ts as it is (type stripping).
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import { parseArgs } from 'node:util';
import { launch, newPage, pool } from './lib.mjs';

const here = new URL('.', import.meta.url).pathname;
const root = new URL('../../', import.meta.url).pathname;
const { values: opt, positionals } = parseArgs({
  allowPositionals: true,
  options: { jobs: { type: 'string', default: '4' }, serial: { type: 'string', default: 'motion' }, browser: { type: 'string', default: 'chromium' } },
});
const suites = positionals.length ? positionals : readdirSync(`${here}suites`).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4));
const serial = opt.serial.split(',').filter((s) => suites.includes(s));
const report = `${here}.report/`;
mkdirSync(report, { recursive: true });

let server;
const stop = () => { try { process.kill(-server.pid); } catch {} }; // the whole group (astro leaves esbuild behind); none if BASE is set
process.on('exit', stop);
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => process.exit(130));

const listening = (port) =>
  new Promise((resolve) => net.connect(port, 'localhost').once('connect', function () { this.destroy(); resolve(true); }).once('error', () => resolve(false)));

async function start() {
  let base = process.env.BASE?.replace(/\/$/, '');
  let log = '';
  if (!base) {
    let port = 4390;
    while (await listening(port)) port++;
    base = `http://localhost:${port}`;
    server = spawn(process.execPath, ['node_modules/astro/astro.js', 'dev', '--port', String(port)], { cwd: root, detached: true });
    for (const stream of [server.stdout, server.stderr]) stream.on('data', (d) => (log += d));
  }
  const deadline = Date.now() + 60_000;
  for (;;) {
    try {
      if ((await fetch(`${base}/`)).status === 200) return base;
    } catch {} // not listening yet
    if (server && server.exitCode !== null) throw new Error(`astro dev exited: ${log.slice(-400)}`);
    if (Date.now() > deadline) throw new Error(`no 200 on ${base}/ after 60 s`);
    await new Promise((resolve) => setTimeout(resolve, 200)); // a poll interval: the server is another process, nothing to listen for
  }
}

// Vite bundles the dependencies (gsap, lenis) when the first page asks for them, and every page open at that moment reloads. Let that
// happen now, before a suite is running: a pass that loads the home page once, with nothing after it, is a calm server.
async function warm(base) {
  const browser = await launch(opt.browser);
  const page = await newPage(browser);
  let loads = 0;
  page.on('load', () => loads++);
  for (let pass = 0; pass < 5 && loads !== 1; pass++) {
    loads = 0;
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  }
  await browser.close();
  if (loads !== 1) throw new Error('the dev server keeps reloading the home page');
}

const work = (name, base) =>
  new Promise((resolve) => {
    const started = Date.now();
    const child = spawn(process.execPath, [`${here}worker.mjs`, name], { cwd: root, env: { ...process.env, BASE: base, BROWSER: opt.browser } });
    let out = '';
    const collect = (d) => {
      out += d;
      for (const line of String(d).split('\n')) if (line.startsWith('FAIL')) console.log(`  [${name}] ${line}`); // failures as they happen
    };
    for (const stream of [child.stdout, child.stderr]) stream.on('data', collect);
    child.on('close', (code) => {
      writeFileSync(`${report}${name}.log`, out);
      const lines = out.split('\n');
      const count = (tag) => lines.filter((l) => l.startsWith(`${tag} `)).length;
      const crashed = code !== 0 && !count('FAIL'); // died without saying why: the log has its stderr
      resolve({ name, pass: count('PASS'), fail: count('FAIL') + (crashed ? 1 : 0), pend: count('PEND'), secs: (Date.now() - started) / 1000, lines, crashed });
    });
  });

const began = Date.now();
let results = [];
try {
  const base = await start();
  await warm(base);
  console.log(`e2e against ${base} (${opt.browser}): ${suites.join(', ')}`);
  const parallel = suites.filter((s) => !serial.includes(s));
  await pool(parallel, Number(opt.jobs), async (s) => results.push(await work(s, base)));
  for (const s of serial) results.push(await work(s, base));
} catch (e) {
  console.error(`e2e could not run: ${e.message}`);
  process.exitCode = 1;
}

results.sort((a, b) => suites.indexOf(a.name) - suites.indexOf(b.name));
const row = (name, pass, fail, pend, secs) => name.padEnd(10) + [pass, fail, pend].map((v) => String(v).padStart(6)).join('') + String(secs).padStart(8);
const sum = (key) => results.reduce((n, r) => n + r[key], 0);
console.log(`\n${row('suite', 'pass', 'fail', 'pend', 'secs')}`);
for (const r of results) console.log(row(r.name, r.pass, r.fail, r.pend, r.secs.toFixed(1)));
console.log(row('total', sum('pass'), sum('fail'), sum('pend'), ((Date.now() - began) / 1000).toFixed(1)));

for (const r of results) {
  const lines = r.lines.filter((l) => l.startsWith('FAIL') || l.startsWith('PEND'));
  if (lines.length || r.crashed) console.log(`\n${r.name}:\n  ${lines.join('\n  ')}${r.crashed ? `worker died, see ${report}${r.name}.log` : ''}`);
}
if (sum('fail')) process.exitCode = 1;
stop();
process.exit();
