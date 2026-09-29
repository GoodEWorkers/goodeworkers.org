// Checks that every URL in the remote job boards list still answers HTTP 200.
// Run by CI (.github/workflows/job-board-links.yml) and with `npm run check-links`.
//
// Redirects are followed: what counts is the status of the final page. A site
// behind a Cloudflare bot challenge (403 + `cf-mitigated: challenge`) refuses
// every robot, so it is reported as a warning to check by hand, not a failure;
// so is any failure on an entry marked `linkCheck: manual` in the list.
// Anything else that does not end in a 200 fails the run; timeouts, 429 and 5xx
// are retried twice first.
import { appendFile, readFile } from 'node:fs/promises';
import yaml from 'js-yaml';

const LIST_PATH = 'src/content/job-board-list/boards.yaml';
const TIMEOUT_MS = 20_000;
const RETRIES = 2;
const CONCURRENCY = 6;
const HEADERS = {
  // A regular browser identity: some boards turn away unknown clients.
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml',
  'accept-language': 'en-US,en;q=0.9,fr;q=0.8',
};

const source = await readFile(new URL(`../${LIST_PATH}`, import.meta.url), 'utf8');
const list = yaml.load(source);
const lines = source.split('\n');
const lineOf = (url) => lines.findIndex((line) => line.includes(`"${url}"`)) + 1;

// One entry per distinct URL; a board can have one URL per language.
const targets = [];
for (const site of [...(list.boards ?? []), ...(list.tools ?? [])]) {
  const urls = typeof site.url === 'string' ? { '': site.url } : site.url;
  for (const [lang, url] of Object.entries(urls)) {
    if (targets.some((target) => target.url === url)) continue;
    targets.push({
      name: lang ? `${site.name} (${lang})` : site.name,
      url,
      line: lineOf(url),
      manual: site.linkCheck === 'manual',
    });
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function probe(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: HEADERS,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  await response.body?.cancel();
  return {
    status: response.status,
    finalUrl: response.url,
    challenged: response.headers.get('cf-mitigated') === 'challenge',
  };
}

async function check(target) {
  let last = {};
  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    if (attempt > 0) await sleep(2_000 * attempt);
    try {
      last = await probe(target.url);
      if (last.status === 200) return { ...target, ...last, verdict: 'ok' };
      if (last.challenged) return { ...target, ...last, verdict: 'blocked' };
      // A 404 or 410 will not fix itself on a retry.
      if (last.status < 500 && last.status !== 429) break;
    } catch (error) {
      last = { status: 0, error: error.cause?.code ?? error.name };
    }
  }
  return { ...target, ...last, verdict: target.manual ? 'manual' : 'fail' };
}

const results = new Array(targets.length);
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < targets.length) {
      const index = next++;
      results[index] = await check(targets[index]);
    }
  })
);

const inCi = process.env.GITHUB_ACTIONS === 'true';
const trim = (url) => url.replace(/\/$/, '');
const describe = (result) => (result.status ? String(result.status) : result.error);

for (const result of results) {
  const moved =
    result.finalUrl && trim(result.finalUrl) !== trim(result.url) ? `  (now ${result.finalUrl})` : '';
  const label = { ok: 'OK     ', blocked: 'BLOCKED', manual: 'MANUAL ', fail: 'FAIL   ' }[result.verdict];
  console.log(`${label} ${describe(result).padEnd(9)} ${result.name}: ${result.url}${moved}`);
  if (!inCi) continue;
  const where = `file=${LIST_PATH},line=${result.line}`;
  if (result.verdict === 'blocked') {
    console.log(`::warning ${where}::${result.name} is behind a Cloudflare bot challenge (${describe(result)}), so it can't be checked automatically. Check it by hand.`);
  } else if (result.verdict === 'manual') {
    console.log(`::warning ${where}::${result.name} answered ${describe(result)} and is marked linkCheck: manual. Check it by hand.`);
  } else if (result.verdict === 'fail') {
    console.log(`::error ${where}::${result.name} answered ${describe(result)}, not 200: ${result.url}`);
  }
}

const count = (verdict) => results.filter((result) => result.verdict === verdict).length;
const summary = `${results.length} URLs: ${count('ok')} OK, ${count('blocked')} behind a bot challenge, ${count('manual')} to check by hand, ${count('fail')} failed.`;
console.log(`\n${summary}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const rows = results.map(
    (result) =>
      `| ${result.verdict.toUpperCase()} | ${describe(result)} | ${result.name} | ${result.url} |`
  );
  await appendFile(
    process.env.GITHUB_STEP_SUMMARY,
    ['### Job board links', '', summary, '', '| Result | Status | Board | URL |', '|---|---|---|---|', ...rows, ''].join('\n')
  );
}

process.exit(count('fail') > 0 ? 1 : 0);
