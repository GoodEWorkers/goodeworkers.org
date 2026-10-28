/**
 * The illustration picker (DESIGN.md, Illustrations): a designer's tool. IllustrationPicker.astro downloads this only for a link
 * that asks for it (?pick, ?illo=...) or a browser that stored a choice (localStorage.illoPick); for everyone else the slots keep
 * the default style they were built with and no panel exists.
 *
 * A choice is a style per subject, written ?illo=openness:pictogram,care:cutout (all:pictogram for every subject; a later entry wins).
 * The URL wins over storage and is then stored. Every [data-illo-slot] gets the chosen style's drawing, fetched from
 * /illustrations/<subject>/<style>.svg, and a panel (the template in IllustrationPicker.astro) lets the designer choose, copy the
 * link or reset. Applied again after every client-side navigation: the router swaps the whole body, panel included. A style whose file
 * is missing (a set not synced yet) is a disabled thumbnail, and a slot that asks for it by link keeps the drawing it has.
 */
import { gsap } from 'gsap';
import grounds from '../../styles/illustrations.css?inline'; // the thumbnails need the grounds' properties on a page with no slot of its own
import { ease, motionOn } from './engine';

const SUBJECTS = ['openness', 'autonomy', 'care', 'solidarity', 'health'];
// The styles in the order the panel shows them; the first is the default, the one Illustration.astro inlines. Round 1's abstract sets
// are retired but for bands; the rest are round 2's figurative ones (scripts/sync-illustrations.mjs), and the last two may not have landed.
const STYLES: Record<string, string> = {
  bands: 'Warped bands',
  pictogram: 'Pictogram',
  leaded: 'Leaded window',
  cutout: 'Paper cut-out',
  halftone: 'Halftone',
  monoline: 'One line',
  isoscene: 'Isometric scene',
  brush: 'Brush ink',
};
const STYLE_IDS = Object.keys(STYLES);
const DEFAULT = STYLE_IDS[0];
const PICK = 'illoPick'; // localStorage: the choice, as the ?illo= value ('' while nothing is chosen); its existence keeps the picker awake
const CLOSED = 'illoClosed'; // sessionStorage: the panel was closed (?pick brings it back)

type Choice = Record<string, string>; // subject -> style; a subject that is not in it shows the default

// Storage can be blocked (a privacy setting): the picker then works for this page only.
const store = (area: 'localStorage' | 'sessionStorage') => ({
  get: (key: string) => {
    try {
      return window[area].getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string | null) => {
    try {
      if (value === null) window[area].removeItem(key);
      else window[area].setItem(key, value);
    } catch {
      // nothing to keep it in
    }
  },
});
const local = store('localStorage');
const session = store('sessionStorage');

let choice: Choice = {};
let active = false; // the picker has been asked for, and stays on for client-side navigation
let started = false; // the choice has been read once
let same = false; // "same style everywhere": a click sets every subject

const styleOf = (subject: string) => choice[subject] ?? DEFAULT;
const uniform = (c: Choice) => SUBJECTS.every((subject) => c[subject] && c[subject] === c[SUBJECTS[0]]);

function parse(text: string): Choice {
  const out: Choice = {};
  for (const part of text.split(',')) {
    const [subject, style] = part.trim().split(':');
    if (!STYLE_IDS.includes(style)) continue;
    for (const s of SUBJECTS) if (subject === 'all' || subject === s) out[s] = style;
  }
  return out;
}

const serialize = (c: Choice) =>
  uniform(c) ? `all:${c[SUBJECTS[0]]}` : SUBJECTS.filter((s) => c[s]).map((s) => `${s}:${c[s]}`).join(',');

// ---------------------------------------------------------------------------------------------
// The drawings
// ---------------------------------------------------------------------------------------------

const drawings = new Map<string, Promise<string>>(); // one fetch per file, shared by the slots and the thumbnails

function load(subject: string, style: string) {
  const key = `${subject}/${style}`;
  let drawing = drawings.get(key);
  if (!drawing) {
    drawing = fetch(`/illustrations/${key}.svg`)
      .then((response) => {
        if (!response.ok) throw new Error(`${key}: ${response.status}`);
        return response.text();
      })
      .then((text) => text.replace(/^<svg\b/, '<svg aria-hidden="true" focusable="false"')); // as Illustration.astro does
    drawings.set(key, drawing);
    drawing.catch(() => drawings.delete(key)); // a failed fetch may be tried again
  }
  return drawing;
}

/** Give every slot on the page the chosen style's drawing, with a short fade where the engine runs. */
const paint = () =>
  Promise.all(
    [...document.querySelectorAll<HTMLElement>('[data-illo-slot]')].map(async (slot) => {
      const subject = slot.dataset.illoSlot!;
      const style = styleOf(subject);
      if (slot.dataset.illoStyle === style) return;
      const drawing = await load(subject, style);
      if (!slot.isConnected || styleOf(subject) !== style) return; // the page or the choice moved on while it loaded
      slot.innerHTML = drawing;
      slot.dataset.illoStyle = style;
      if (motionOn()) gsap.fromTo(slot.firstElementChild, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: ease.soft, clearProps: 'opacity' });
    }),
  ).catch(console.error);

// ---------------------------------------------------------------------------------------------
// The panel
// ---------------------------------------------------------------------------------------------

const panel = () => document.querySelector<HTMLElement>('[data-illo-panel]');
const name = (subject: string) => subject[0].toUpperCase() + subject.slice(1);

/** aria-pressed on the thumbnail of each subject's style in use, and the state of the switch. */
function mark() {
  const el = panel();
  if (!el) return;
  for (const button of el.querySelectorAll<HTMLElement>('[data-pick]')) {
    const [subject, style] = button.dataset.pick!.split(':');
    button.setAttribute('aria-pressed', String(styleOf(subject) === style));
  }
  el.querySelector('[data-act="same"]')!.setAttribute('aria-checked', String(same));
}

/** The choice changed: keep it, drop a stale ?illo= from the address (the URL would win over what was just stored), redraw. */
function commit(reset = false) {
  local.set(PICK, reset ? null : serialize(choice));
  const url = new URL(location.href);
  if (url.searchParams.has('illo')) {
    url.searchParams.delete('illo');
    history.replaceState(history.state, '', url); // the router keeps its own state in history.state
  }
  void paint();
  mark();
}

async function copy(el: HTMLElement) {
  const shown = Object.fromEntries(SUBJECTS.map((s) => [s, styleOf(s)])); // all of it, so the link does not depend on today's default
  const link = `${location.origin}${location.pathname}?illo=${serialize(shown)}`;
  const button = el.querySelector<HTMLElement>('[data-act="copy"]')!;
  try {
    await navigator.clipboard.writeText(link);
    button.textContent = 'Copied';
    setTimeout(() => (button.textContent = 'Copy link'), 1500);
  } catch {
    const input = el.querySelector<HTMLInputElement>('[data-link]')!; // refused: show it to copy by hand
    input.value = link;
    input.hidden = false;
    input.select();
  }
}

function close() {
  session.set(CLOSED, '1');
  panel()?.remove();
}

function mount() {
  const template = document.getElementById('illo-picker') as HTMLTemplateElement | null;
  if (panel() || session.get(CLOSED) || !template) return;
  // As a <style> of its own, so that only an awake picker pays for it; the router drops head elements the next page lacks, so each mount checks.
  if (!document.getElementById('illo-grounds')) document.head.append(Object.assign(document.createElement('style'), { id: 'illo-grounds', textContent: grounds }));
  const el = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
  el.querySelector('[data-rows]')!.innerHTML = SUBJECTS.map(
    (subject) => `
      <div>
        <p class="mb-1 text-xs font-medium uppercase tracking-wider text-ashgray/70">${name(subject)}</p>
        <div class="flex flex-wrap gap-1">${STYLE_IDS.map(
          (style) => `
          <button type="button" data-pick="${subject}:${style}" aria-pressed="false" aria-label="${name(subject)}: ${STYLES[style]}" title="${STYLES[style]}"
            class="h-12 w-12 shrink-0 rounded-lg outline-offset-2 aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-40">
            <span data-illo-thumb="${subject}" class="illo illo-tile block h-full w-full overflow-hidden rounded-lg bg-[var(--subject)]"></span>
          </button>`,
        ).join('')}</div>
      </div>`,
  ).join('');
  el.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button');
    if (!button || button.disabled) return;
    const { pick, act } = button.dataset;
    if (pick) {
      const [subject, style] = pick.split(':');
      for (const s of same ? SUBJECTS : [subject]) choice[s] = style;
      commit();
    } else if (act === 'same') {
      same = !same;
      mark();
    } else if (act === 'copy') void copy(el);
    else if (act === 'reset') {
      choice = {};
      same = false;
      commit(true);
    } else if (act === 'close') close();
  });
  document.body.append(el);
  mark();
  // The thumbnails are the drawings themselves, in the tile context, so they fill in as the files arrive. A file that is not there
  // (a set not synced yet) leaves a disabled thumbnail: nothing to choose, and the panel is whole without it.
  for (const thumb of el.querySelectorAll<HTMLElement>('[data-illo-thumb]')) {
    const button = thumb.closest<HTMLButtonElement>('[data-pick]')!;
    const [subject, style] = button.dataset.pick!.split(':');
    load(subject, style).then(
      (drawing) => (thumb.innerHTML = drawing),
      () => Object.assign(button, { disabled: true, title: `${STYLES[style]}: no drawing yet` }),
    );
  }
}

// ---------------------------------------------------------------------------------------------
// Waking up
// ---------------------------------------------------------------------------------------------

function start() {
  const query = new URLSearchParams(location.search);
  const stored = local.get(PICK);
  if (!active && !query.has('pick') && !query.has('illo') && stored === null) return;
  active = true;
  if (query.has('pick')) session.set(CLOSED, null); // asking for the picker brings the panel back
  // The URL wins over storage. After the first read the choice stays in memory: a Reset has emptied storage, not the page.
  const fresh = query.has('illo') ? parse(query.get('illo')!) : started ? null : parse(stored ?? '');
  if (fresh) choice = fresh;
  started = true;
  if (query.has('pick') || query.has('illo')) local.set(PICK, serialize(choice)); // from now on every page of this browser has the picker
  void paint();
  mount();
}

document.addEventListener('astro:page-load', start);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && panel()) close();
});
start();
