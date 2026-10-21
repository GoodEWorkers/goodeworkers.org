/**
 * Motion engine for the "lit window at night" concept.
 *
 * One clock: gsap.ticker drives Lenis, ScrollTrigger and the lamp.
 * One lifecycle: initPage() builds the current DOM inside a gsap.context and cleanupPage() reverts it,
 * so a client-side router only has to call that pair around its DOM swap.
 * No DOM access at import time (SSR-safe); everything starts from boot().
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

/** The only curves in the project. Never invent per-component ones. */
export const ease = { out: 'expo.out', inOut: 'expo.inOut', soft: 'power3.out' } as const;

/** html.motion is set before paint by the inline script in BaseLayout (JS on, reduced motion off). */
export const motionOn = () => document.documentElement.classList.contains('motion');
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;

/** What an onPage fn receives. `intro` stays paused until playIntro(); `signal` aborts in cleanupPage(). */
export type Page = { intro: gsap.core.Timeline; path: string; signal: AbortSignal };
type PageFn = (page: Page) => void | (() => void);

const pageFns = new Set<PageFn>();
let lenis: Lenis | undefined;
let ctx: gsap.Context | undefined;
let abort: AbortController | undefined;
let intro: gsap.core.Timeline | undefined;
const cleanups: (() => void)[] = [];
const unplayed = new Map<Element, gsap.core.Tween>(); // scroll reveals by element, for showFocused()
let ready = false; // a page is initialised and motion is on
let held = false; // built behind a curtain: what is on the first screen waits for the page intro (see holds)
let booted = false;

const $$ = (selector: string) => document.querySelectorAll<HTMLElement>(selector);
const num = (value: string | undefined, fallback: number) => (value ? parseFloat(value) : fallback);
const listen = <K extends keyof HTMLElementEventMap>(el: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void) =>
  el.addEventListener(type, fn, { signal: abort!.signal });

// One behaviour per element, each on its own: a throw must not skip the rest, and must not leave gsap's active
// context stuck on ours. CSS hides the revealable elements (opacity) until the engine reveals them: show a failed one.
function each(selector: string, setup: (el: HTMLElement) => void, hidden: (el: HTMLElement) => Element[] = (el) => [el]) {
  for (const el of $$(selector)) {
    try {
      setup(el);
    } catch (e) {
      console.error(e);
      for (const node of hidden(el)) (node as HTMLElement).style.opacity = '1';
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------------------------

/**
 * Register a per-page init. It runs inside the page's gsap.context on every initPage(), and right
 * away if a page is already up (a script that arrives with a client-side navigation). Return a
 * cleanup for anything gsap does not track; tweens, ScrollTriggers and splits are reverted for you.
 * Never called when motion is off, so there is no need to check motionOn().
 * Global, not route-scoped: every fn runs on every page, so each must no-op when its own markup is missing.
 */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) run(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function run(fn: PageFn) {
  ctx!.add(() => {
    try {
      const done = fn({ intro: intro!, path: location.pathname, signal: abort!.signal });
      if (typeof done === 'function') cleanups.push(done);
    } catch (e) {
      console.error(e);
    }
  });
}

// A router can swap the root attributes, so the flags are re-applied on every page (data-engine too: the inline
// failsafe in BaseLayout reads it). data-engine="off" is that failsafe having given up on us: the page stays static.
function syncFlags() {
  const root = document.documentElement;
  if (root.dataset.engine !== 'off') root.dataset.engine = '1';
  root.classList.add('js');
  root.classList.toggle('motion', root.dataset.engine !== 'off' && !matchMedia('(prefers-reduced-motion: reduce)').matches);
}

/**
 * Build the current DOM: flags, nav, the data-attribute behaviours, then the onPage fns.
 * Synchronous, so a router can call it in astro:after-swap and nothing paints half-built. Idempotent.
 * `hold`: the page arrives behind a curtain. Its first-screen scroll reveals would play on the first tick, unseen; they
 * wait for the page intro instead, which the router starts as the curtain clears. A full load never holds.
 */
export function initPage({ hold = false }: { hold?: boolean } = {}) {
  cleanupPage();
  syncFlags();
  abort = new AbortController();
  ctx = gsap.context(() => {}); // assigned before the work, so boot() can still revert a half-built page
  held = hold && motionOn();
  ctx.add(() => {
    each('[data-navbar]', nav);
    if (!motionOn()) return;
    intro = gsap.timeline({ paused: true });
    document.addEventListener('focusin', showFocused, { capture: true, signal: abort!.signal });
    each('[data-split]', split);
    each('[data-reveal]', reveal);
    each('[data-stagger]', stagger, (el) => [...el.children]);
    each('svg[data-draw]', draw);
    each('svg[data-ring]', ring);
    each('[data-parallax]', parallax);
    each('[data-roll]', roll);
    if (!isTouch()) each('[data-tilt]', tilt);
    each('[data-logo]', logo);
  });
  ready = motionOn();
  if (ready) [...pageFns].forEach(run); // a copy: a page fn may register another
}

/** Revert everything initPage() made (tweens, ScrollTriggers, splits, listeners, onPage cleanups). Call it
 *  before the DOM is replaced, and always follow it with initPage(). Never throws: a failing cleanup is logged. */
export function cleanupPage() {
  ready = false;
  abort?.abort();
  unplayed.clear();
  for (const fn of cleanups.splice(0)) {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  }
  try {
    ctx?.revert();
  } catch (e) {
    console.error(e);
  }
  ctx = abort = intro = undefined;
  held = false;
}

/** Play the page intro once fonts are in (600 ms cap) and every deferred script has had its onPage turn. */
export async function playIntro() {
  const timeline = intro;
  if (!timeline) return;
  // Not readyState alone: the deferred scripts, boot() among them, run in "interactive" before DOMContentLoaded, which
  // has already fired by the same state once the page is a little older (a click before load): then there is nothing to wait for.
  const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const parsed = new Promise<void>((resolve) =>
    document.readyState === 'complete' || navigation?.domContentLoadedEventEnd
      ? resolve()
      : addEventListener('DOMContentLoaded', () => resolve(), { once: true }),
  );
  await Promise.race([Promise.all([document.fonts.ready, parsed]), new Promise((resolve) => setTimeout(resolve, 600))]);
  if (timeline === intro) timeline.play(); // the page may have been swapped while waiting
}

/** First full page load, once. Starts Lenis and the lamp, builds the page, plays the intro.
 *  Returns whether the engine is up: false when the failsafe gave up on it or boot threw (the page stays static). */
export function boot() {
  const root = document.documentElement;
  if (booted || root.dataset.engine === 'off') return false;
  // A fresh load has no data-engine (only this file sets "1"; the inline failsafe only ever sets "off"). Finding it here
  // means another copy of the engine is running in this document: a deploy changed the hashed chunks and the router ran
  // the new entry. Two engines would double Lenis, the ticker and every handler: start over on a clean load.
  if (root.dataset.engine === '1') {
    location.reload();
    return false;
  }
  booted = true;
  syncFlags(); // sets data-engine="1": the inline failsafe in BaseLayout sees that the engine is alive
  try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (motionOn()) {
      smoothScroll();
      lamp();
    }
    initPage();
    void playIntro();
    void document.fonts.ready.then(() => ScrollTrigger.refresh());
    return true;
  } catch (e) {
    // A broken engine must never leave content hidden by the html.motion rules.
    cleanupPage();
    root.classList.remove('motion');
    console.error(e);
    return false;
  }
}

// ---------------------------------------------------------------------------------------------
// Scroll: Lenis on the gsap clock
// ---------------------------------------------------------------------------------------------

function smoothScroll() {
  // allowNestedScroll: the wheel over a scrollable box (the contact textarea) scrolls the box, then the page.
  // anchors off: Lenis would also glide for a same-path link with a query string (?from=...#contact) while the router
  // navigates; transitions.ts scrolls to the hash itself, after the swap. The skip link is a native jump.
  lenis = new Lenis({ lerp: 0.1, anchors: false, allowNestedScroll: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

/** Smooth by default, `immediate` jumps (a new page starts at the top). Native scrolling when Lenis is off.
 *  A selector string may be any selector (Lenis alone reads "#..." as a bare id). */
export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  const to = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (to === null) return;
  if (lenis) {
    lenis.resize(); // it learns a new page height 250 ms late, and would clamp a jump made right after a swap to the old one
    // An element becomes a whole number here: Lenis ends a glide when the rounded position meets the rounded target, so one
    // that lands on x.5 never ends and keeps pushing the page back for seconds. It honours the element's scroll-margin and
    // aims at where its reveal leaves it: a data-reveal target that has not played sits low by the reveal's offset.
    const low = typeof to !== 'number' && to.hasAttribute('data-reveal') ? Number(gsap.getProperty(to, 'y')) || 0 : 0;
    const at = typeof to === 'number' ? to : to.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(to).scrollMarginTop) || 0) - low;
    lenis.scrollTo(Math.round(at), { immediate, force: true });
  } else if (typeof to === 'number') scrollTo({ top: to, behavior: 'instant' });
  else to.scrollIntoView();
}

// ---------------------------------------------------------------------------------------------
// The lamp: one {x, y} in viewport percent, written as --lamp-x / --lamp-y on #lamp
// ---------------------------------------------------------------------------------------------

function lamp() {
  const el = document.getElementById('lamp');
  if (!el) return;
  // On #lamp itself, not <html>: a custom property on the root restyles the whole tree every frame.
  const setX = gsap.quickSetter(el, '--lamp-x', '%');
  const setY = gsap.quickSetter(el, '--lamp-y', '%');
  const touch = isTouch();
  const aim = { x: 50, y: 40 }; // matches the CSS fallback, so the first frame does not jump
  const pos = { x: 50, y: 40, drift: 0 };
  const sent = { x: NaN, y: NaN }; // last values written
  let moved = -Infinity; // ticker time of the last pointer move

  if (!touch) {
    addEventListener(
      'pointermove',
      (e) => {
        aim.x = (e.clientX / innerWidth) * 100;
        aim.y = (e.clientY / innerHeight) * 100;
        moved = gsap.ticker.time;
      },
      { passive: true },
    );
  }

  const tick = (time: number) => {
    if (document.hidden) return;
    const k = 1 - Math.pow(0.92, gsap.ticker.deltaRatio()); // same feel at 60 and 120 Hz
    const progress = lenis && lenis.limit > 0 ? lenis.scroll / lenis.limit : 0;
    pos.drift += ((time - moved > 1.5 ? 1 : 0) - pos.drift) * k; // idle drift fades in when the pointer rests
    // Touch has no pointer: the scroll position carries the lamp down the page instead.
    const x = (touch ? 50 : aim.x) + Math.sin(time * 0.35) * 4 * pos.drift;
    const y = (touch ? 25 + progress * 50 : aim.y + (progress - 0.5) * 10) + Math.cos(time * 0.27) * 3 * pos.drift;
    pos.x += (x - pos.x) * k;
    pos.y += (y - pos.y) * k;
    // 0.05% steps, written only when a step is crossed: the slow idle drift restyles #lamp every few frames, not every frame.
    const qx = Math.round(pos.x * 20) / 20;
    const qy = Math.round(pos.y * 20) / 20;
    if (qx !== sent.x) setX((sent.x = qx));
    if (qy !== sent.y) setY((sent.y = qy));
  };
  gsap.ticker.add(tick);

  // Reduced motion switched on mid-session: stop, and let the CSS fallback (a still glow) take over.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      gsap.ticker.remove(tick);
      el.style.removeProperty('--lamp-x');
      el.style.removeProperty('--lamp-y');
      sent.x = sent.y = NaN;
    } else gsap.ticker.add(tick);
  });
}

// ---------------------------------------------------------------------------------------------
// Nav: floating hairline, hide on scroll down, show on scroll up
// ---------------------------------------------------------------------------------------------

function nav(bar: HTMLElement) {
  const canHide = motionOn() && !document.querySelector('[data-nav-static]');
  const menuToggle = bar.querySelector('[data-menu-toggle]');
  let shown = true;
  const show = (on: boolean) => {
    if (on === shown) return;
    shown = on;
    gsap.to(bar, { yPercent: on ? 0 : -100, opacity: on ? 1 : 0, duration: 0.25, ease: ease.soft, overwrite: 'auto' });
  };
  bar.classList.toggle('is-floating', scrollY > 0);
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      bar.classList.toggle('is-floating', y > 0);
      // Never hide a bar that is in use: an open mobile menu lives inside it, and Space/PageDown on a focused link scrolls the page.
      if (canHide) show(self.direction < 0 || y <= 80 || menuToggle?.getAttribute('aria-expanded') === 'true' || bar.matches(':focus-within'));
    },
  });
  // A keyboard user tabbing into a hidden bar brings it back.
  listen(bar, 'focusin', () => show(true));
}

// Logo star burst: a slow spin while the pointer or focus is on the logo link.
function logo(link: HTMLElement) {
  const star = link.querySelector<SVGPathElement>('svg path:last-of-type');
  if (!star || isTouch()) return;
  const spin = gsap.to(star, { rotation: 360, transformOrigin: '50% 50%', duration: 6, ease: 'none', repeat: -1, paused: true });
  for (const type of ['pointerenter', 'focus'] as const) listen(link, type, () => spin.play());
  for (const type of ['pointerleave', 'blur'] as const) listen(link, type, () => spin.pause());
}

// ---------------------------------------------------------------------------------------------
// Data-attribute behaviours (all built inside initPage's context)
// ---------------------------------------------------------------------------------------------

// Where a reveal starts: the element's top at `fraction` of the viewport height, but never past the last scroll
// position, so the last screen of a page (or a page shorter than the viewport) still reveals. Not clamp(): that also
// lifts a negative start to 0, and everything already on screen would then wait for the first scroll. For the same
// reason whatever sits on the first screen starts before 0: between the line and the fold it would stay hidden in plain view.
const startAt = (el: HTMLElement, fraction: number) => () => {
  const top = el.getBoundingClientRect().top + scrollY;
  return Math.min(top - innerHeight * fraction, top < innerHeight ? -1 : Infinity, ScrollTrigger.maxScroll(window) - 1);
};

// A page built behind a curtain holds the reveals whose line already lies behind the scroll position: they would play on
// the first tick, unseen. Held, they are paused without a trigger and let go by the page intro (see withIntro).
const holds = (el: HTMLElement, fraction: number) => held && startAt(el, fraction)() <= scrollY;

/** Run `fn` with the page intro when this page is held for it and the intro has not started; otherwise now. */
export function withIntro(fn: () => void) {
  if (held && intro && intro.paused() && intro.time() === 0) intro.call(fn, [], 0);
  else fn();
}

/** Register a scroll reveal so that focus landing inside `el` before it plays finishes it at once (see showFocused). */
export function finishOnFocus(el: Element, tween: gsap.core.Tween) {
  unplayed.set(el, tween);
  return tween;
}

// A reveal waits for its trigger line, but focus can land inside content that is already on screen below that line
// (Tab, a skip link): at opacity 0 its ring would be invisible. Focus plays out the reveals around it.
function showFocused(e: FocusEvent) {
  // The nav and the hero pills sit at opacity 0 until the intro reaches them, and a ring on an invisible link is no ring:
  // focus there plays the intro out.
  if (intro && intro.time() < intro.duration() && e.target instanceof Element && e.target.closest('[data-intro], [data-navbar]')) {
    intro.progress(1);
  }
  for (let el = e.target as Element | null; el; el = el.parentElement) {
    const tween = unplayed.get(el);
    if (!tween || tween.progress() === 1) continue;
    tween.scrollTrigger?.kill(false, true); // keep the tween, drop the wait for scroll
    tween.progress(1);
  }
}

const SPLIT = {
  lines: { type: 'lines', duration: 1.2, stagger: 0.08 },
  words: { type: 'lines,words', duration: 1, stagger: 0.06 },
  // An amount, not a step: however many chars there are (the 404's three-digit numeral), they cascade over 0.35 s (the intro's chars take 0.3 s).
  chars: { type: 'lines,chars', duration: 0.9, stagger: { amount: 0.35 } },
} as const;

// data-split="lines|words|chars": masked reveal. Lines are always the mask unit; nested spans survive
// (SplitText wraps words inside them and slices an inline span that wraps across lines).
// data-split-intro: wait for the page intro timeline (position 0) instead of the scroll trigger.
function split(el: HTMLElement) {
  // SplitText would cut a wrapped <a> into two (two tab stops, announced twice) and its masks would clip the
  // focus ring: text that holds links, buttons or fields just fades up instead.
  if (el.querySelector('a, button, input, select, textarea')) return reveal(el);
  // Held behind a curtain with the page already scrolled past it (a hash link): nobody sees it play, and splitting it only
  // moves what lies below, the row the link is for, in a browser that wraps the split text a little differently.
  if (holds(el, 0.85) && el.getBoundingClientRect().bottom <= 0) {
    gsap.set(el, { opacity: 1 });
    return;
  }
  const kind = (el.dataset.split || 'lines') as keyof typeof SPLIT;
  const { type, duration, stagger } = SPLIT[kind] ?? SPLIT.lines;
  const delay = num(el.dataset.delay, 0);
  const inIntro = el.hasAttribute('data-split-intro') || holds(el, 0.85); // a held one waits for the intro the same way
  let tween: gsap.core.Tween | undefined;
  let started = false; // the intro has reached this element

  SplitText.create(el, {
    type,
    mask: 'lines',
    autoSplit: true, // re-splits after a font swap or a width change, until the reveal has played
    linesClass: 'split-line',
    // aria-label on a <p> is not announced and the wrappers are aria-hidden: only headings get the label.
    aria: /^H[1-6]$/.test(el.tagName) ? 'auto' : 'none',
    onSplit(self) {
      gsap.set(el, { opacity: 1 }); // CSS holds it at 0; the masked lines hide the text from here
      const targets = kind === 'words' ? self.words : kind === 'chars' ? self.chars : self.lines;
      if (!targets.length) return;
      tween = gsap.from(targets, {
        yPercent: 110,
        duration,
        stagger,
        delay,
        ease: ease.out,
        paused: inIntro && !started,
        // Played out, the text is plain markup again, byte for byte: no masks left to clip a focus ring, no
        // autoSplit to re-slice it on resize.
        onComplete: () => self.revert(),
        scrollTrigger: inIntro ? undefined : { trigger: el, start: startAt(el, 0.85), once: true },
      });
      return finishOnFocus(el, tween);
    },
  });
  if (inIntro) {
    intro!.call(() => {
      started = true;
      tween?.play();
    }, [], 0);
  }
}

// data-reveal="up|fade|clip|scale" (+ data-delay): one element, on scroll. Opacity, not visibility: unrevealed
// content stays focusable and in the accessibility tree (focusing it scrolls it in, which fires the trigger).
const REVEAL: Record<string, [gsap.TweenVars, gsap.TweenVars, number]> = {
  up: [{ y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 1.1],
  fade: [{ opacity: 0 }, { opacity: 1 }, 1],
  // clip-path would keep clipping focus rings after the reveal: clear it at the end.
  clip: [{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath' }, 1.4],
  scale: [
    { scale: 1.15, clipPath: 'inset(12% 12% 12% 12%)', opacity: 1 },
    { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath' },
    1.4,
  ],
};

// The shape of every scroll-once reveal (data-reveal, data-stagger, data-draw): a tween that plays when `el` reaches its line, or
// with the page intro when it is held (see holds). The data-pop marks inside it (the dot beside a value's name) wait small and scale in as it starts;
// a mark belongs to the nearest reveal around it, not to the sheet that holds that one. A tween, not a timeline: ScrollTrigger
// starts a timeline's trigger a tick late, and a `once` trigger already past its end then kills itself in the middle of the
// next trigger's refresh, which throws.
function onScroll(el: HTMLElement, fraction: number, targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars) {
  const hold = holds(el, fraction);
  const pops = [...el.querySelectorAll('[data-pop]')].filter((mark) => mark.closest('[data-reveal], [data-stagger]') === el);
  if (pops.length) gsap.set(pops, { scale: 0.6 });
  const tween = gsap.fromTo(targets, from, {
    ...to,
    paused: hold,
    scrollTrigger: hold ? undefined : { trigger: el, start: startAt(el, fraction), once: true },
    onStart: () => pops.length && ctx?.add(() => gsap.to(pops, { scale: 1, duration: 0.8, delay: 0.2, stagger: 0.06, ease: ease.out })),
  });
  if (hold) withIntro(() => tween.play());
  finishOnFocus(el, tween);
}

function reveal(el: HTMLElement) {
  // What a hash link points at is placed by the scroll position, the browser's own jump included (Safari's comes late, and would
  // align the row at its offset): it fades in where it is.
  const [from, to, duration] = REVEAL[el.id && location.hash === `#${el.id}` ? 'fade' : el.dataset.reveal || 'up'] ?? REVEAL.up;
  onScroll(el, 0.85, el, from, { ...to, duration, delay: num(el.dataset.delay, 0), ease: ease.out });
}

// data-stagger: the children of a grid reveal one after another. Explicit ends: CSS holds them at opacity 0,
// which a from() tween would read as its end value.
function stagger(el: HTMLElement) {
  if (!el.children.length) return;
  onScroll(el, 0.8, el.children, { y: 32, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1, stagger: 0.06, ease: ease.out });
}

// data-draw on an <svg>: each path.draw[pathLength] (the stroke inside a mask; pathLength 1 makes its dash unit the whole
// path) draws in, one after another, as the figure comes into view. Without motion nothing touches it: no dash, a whole stroke.
function draw(svg: HTMLElement) {
  const paths = svg.querySelectorAll('path.draw[pathLength]');
  if (!paths.length) return;
  onScroll(
    svg,
    0.8,
    paths,
    { strokeDasharray: 1, strokeDashoffset: 1 },
    { strokeDashoffset: 0, clearProps: 'strokeDasharray,strokeDashoffset', duration: 1.2, stagger: 0.12, ease: ease.out },
  );
}

// svg[data-ring] (Encircled.astro): a hand-circled word draws itself, as --ring on its heading goes from 1 (hidden) to 0 (drawn);
// the CSS in global.css turns that into the pen stroke. The heading carries it, not the svg: SplitText rebuilds every node inside a
// heading when it reverts or re-splits, the heading itself stays. The home intro and the 3D titles draw their rings on their own
// timelines (home.ts); any other heading draws it once, when the ring reaches the reveal line and a beat after its words (they rise
// over 1.2 s, mostly in the first half). Pointing at the heading, or focus moving into it, draws the ring again, once per visit
// and only once it has been drawn.
function ring(svg: HTMLElement) {
  const heading = svg.closest<HTMLElement>('h1, h2, h3, h4, h5, h6');
  if (!heading) return;
  if (!heading.matches('[data-title], [data-intro]')) {
    const pen = () => heading.querySelector<HTMLElement>('svg[data-ring]') ?? heading; // looked up again: a re-split replaces the svg
    const hold = holds(pen(), 0.85);
    const tween = gsap.fromTo(
      heading,
      { '--ring': 1 },
      {
        '--ring': 0,
        duration: 0.6,
        delay: 0.35,
        ease: ease.out,
        paused: hold,
        scrollTrigger: hold ? undefined : { trigger: heading, start: () => startAt(pen(), 0.85)(), once: true },
      },
    );
    if (hold) withIntro(() => tween.play());
  }
  const again = () => {
    if (parseFloat(getComputedStyle(heading).getPropertyValue('--ring')) === 0) {
      gsap.fromTo(heading, { '--ring': 1 }, { '--ring': 0, duration: 0.8, ease: ease.out, overwrite: 'auto' });
    }
  };
  if (!isTouch()) listen(heading, 'pointerenter', again);
  listen(heading, 'focusin', again);
}

// data-parallax="0.15": y drifts from -n to +n viewport heights across the element's pass (negative n reverses).
function parallax(el: HTMLElement) {
  const amount = num(el.dataset.parallax, 0.15);
  gsap.fromTo(
    el,
    { y: () => -amount * innerHeight },
    {
      y: () => amount * innerHeight,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    },
  );
}

// data-tilt: Zentry bento tilt plus a pointer-following highlight (--px/--py, painted by CSS).
// data-tilt="glow": the highlight only, no movement (the CTA pills keep their CSS scale).
function tilt(el: HTMLElement) {
  const glow = el.dataset.tilt === 'glow';
  const settle = { duration: 0.3, ease: ease.soft, overwrite: 'auto' } as const;
  listen(el, 'pointermove', (e) => {
    const box = el.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    el.style.setProperty('--px', `${x * 100}%`);
    el.style.setProperty('--py', `${y * 100}%`);
    if (!glow) gsap.to(el, { rotateX: (y - 0.5) * 5, rotateY: (x - 0.5) * -5, scale: 0.97, transformPerspective: 700, ...settle });
  });
  if (!glow) listen(el, 'pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, ...settle }));
}

// data-roll: letter roll. The label gets a clipped two-row stack (itself plus an aria-hidden copy);
// the CSS slides it on hover and focus-visible of the element or the link/button around it.
function roll(el: HTMLElement) {
  if (el.querySelector(':scope > [data-roll-clip]')) return;
  const label = document.createElement('span');
  label.append(...el.childNodes);
  const copy = label.cloneNode(true) as HTMLElement;
  copy.setAttribute('aria-hidden', 'true');
  const clip = document.createElement('span');
  clip.setAttribute('data-roll-clip', '');
  clip.append(label, copy);
  el.append(clip);
}
