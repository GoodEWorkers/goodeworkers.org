// One suite in its own process with its own browser: `node worker.mjs <suite>`, BASE and BROWSER from run.mjs.
import { launch, newPage } from './lib.mjs';

const [name] = process.argv.slice(2);
const { run } = await import(`./suites/${name}.mjs`);
const browser = await launch(process.env.BROWSER);
try {
  await run({ page: await newPage(browser), browser, base: process.env.BASE });
} catch (e) {
  console.log(`FAIL ${name} suite crashed (${String(e?.stack ?? e).split('\n').slice(0, 3).join(' | ')})`);
}
await browser.close();
process.exit(0);
