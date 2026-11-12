/**
 * Page transitions. Astro's router (<ViewTransitions />) fetches and swaps the next page; this module wires the
 * engine around that swap and runs the curtain: a paper sheet (#curtain) that slides up over the page while the next
 * one loads, stays down while the engine is torn down and rebuilt under it, then lifts off the new page. The page is
 * built held (initPage({ hold })): what is on its first screen plays with the page intro, as the sheet clears, not unseen under it.
 * A page that does not arrive in SLOW ms, or cannot be swapped in (offline, another origin, not HTML), is handed back to the browser.
 * No sheet for back/forward or without html.motion: those swap at once. A link to the page you are on that only changes the
 * query (the nav's /?from=nav#contact on the homepage) keeps the page as it is, since a swap would replay every reveal and wipe
 * the form, and only scrolls; so does a link to a place on the page (#openness, the CTA pills' #contact), which Astro leaves to
 * the browser's jump: it glides there instead.
 * Registered once per full load by index.ts, and only when the engine is alive.
 */
import { gsap } from 'gsap';
import { navigate } from 'astro:transitions/client';
import { cleanupPage, ease, initPage, motionOn, playIntro, scrollToTarget, startScroll, stopScroll } from './engine';

const COVER = 0.8; // the sheet slides up over the old page
const LIFT = 0.9; // and off the new one
const SLOW = 4000; // ms a page may take to arrive before the browser is left to do it
// The page intro starts while the sheet is still leaving: the sheet's trailing edge sweeps the top of the page last,
// so by then only the nav is still under it.
const INTRO_AT = LIFT * 0.55;

let covering = false; // the sheet is down, or on its way
let latest = 0; // the newest navigation that sent the sheet down
let swapping = false; // a swap has run since the last astro:page-load (so the next one is not the first load)
let kept = false; // that swap keeps the DOM: a link to the page you are on
let type = 'push'; // navigationType of the swap in progress
let backTo = 0; // scroll position when a kept swap started
let introCall: gsap.core.Tween | undefined;

const sheet = () => document.getElementById('curtain');

// y: 0 as well as yPercent: on first touch GSAP reads the sheet's CSS translateY(100%) as pixels and would add the two.
const move = (yPercent: number, duration: number, vars: gsap.TweenVars = {}) =>
  gsap.to(sheet(), { y: 0, yPercent, duration, ease: ease.inOut, overwrite: true, ...vars });

// The sheet goes back down: the navigation it was covering for never reached a swap.
const uncover = () => move(100, COVER, { onComplete: () => (covering = false) });
// Lifted off: park it below again, instantly, for the next one.
const park = () => {
  move(100, 0); // a zero-length tween renders at once and overwrites any other
  covering = false;
};

// The id is user input (the URL): no throwing on a malformed escape.
function hashTarget(hash = location.hash) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export function transitions() {
  // A link inside the page to a place on it (the charter tiles). Astro would push the entry and jump: let it keep the
  // history (entry, hash, :target, Back), then put the scroll back where it was and glide. In the capture phase, before
  // Astro's own click handler, which then leaves the prevented event alone. Skip links outside <main> keep jumping. The click
  // is not stopped: ContactForm's listener still reads the pill's data-from into the form's source field.
  document.addEventListener(
    'click',
    (event) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link?.hash || !link.closest('main') || !motionOn() || event.defaultPrevented) return;
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
      const target = hashTarget(link.hash);
      if (!target) return;
      event.preventDefault();
      const was = scrollY;
      void navigate(link.href); // synchronous for a same-page hash: the entry is pushed and the browser has jumped
      scrollTo({ top: was, behavior: 'instant' });
      scrollToTarget(target);
    },
    true,
  );

  document.addEventListener('astro:before-preparation', (event) => {
    const { from, to, navigationType, formData } = event;
    if (formData) return;
    // The page is already here: nothing to fetch, and (before-swap) nothing to replace. Swapping an identical page
    // would reset every reveal under the reader's eyes.
    if (to.pathname === from.pathname) {
      event.loader = async () => {};
      return;
    }
    if (!motionOn() || navigationType === 'traverse' || !sheet()) return;

    // The sheet goes up in parallel with the fetch; the swap waits for both.
    const nav = ++latest;
    covering = true;
    const covered = new Promise<void>((resolve) => move(0, COVER, { onComplete: resolve, onInterrupt: resolve }));
    const load = event.loader;
    event.loader = async () => {
      // A fetch that fails or never answers hands the navigation back to the browser (a prevented event makes the router
      // set location.href), instead of rethrowing into a dead link under a sheet.
      const slow = new Promise<never>((_, reject) => setTimeout(reject, SLOW));
      try {
        await Promise.all([Promise.race([load(), slow]), covered]);
      } catch {
        event.preventDefault();
      }
      // Nothing is going to swap in (a plain page load takes over: offline, another origin, not HTML, a download; or a
      // newer navigation that does not use the sheet, a hash jump, aborted this one): put the sheet back.
      if ((event.defaultPrevented || event.signal.aborted) && nav === latest) uncover();
    };
  });

  document.addEventListener('astro:before-swap', (event) => {
    swapping = true;
    type = event.navigationType;
    kept = event.newDocument === document;
    if (kept) {
      backTo = scrollY;
      event.swap = () => {}; // Astro still moves the history entry and jumps to the hash
      // Back/forward: Astro restores the position natively next; a glide still in flight would write over it.
      if (type === 'traverse') {
        stopScroll();
        startScroll();
      }
      return;
    }
    introCall?.kill(); // that page is going away; a kept page still needs its intro
    cleanupPage();
    stopScroll();
    // Astro swaps <html>'s attributes for the new page's, which carry none of ours. Hand them over now, so the new page
    // is born hidden-before-reveal, and html.motion makes the scroll Astro restores (back/forward) instant, not CSS-smooth.
    // initPage() re-derives them from the media query right after.
    const root = event.newDocument.documentElement;
    root.classList.add('js');
    root.classList.toggle('motion', motionOn());
    root.dataset.engine = '1';
  });

  document.addEventListener('astro:after-swap', () => {
    if (kept) {
      // Astro jumped to the top, then to the hash: come back, so the glide in astro:page-load starts where the reader was.
      if (motionOn() && type !== 'traverse') scrollTo({ top: backTo, behavior: 'instant' });
      return;
    }
    if (type !== 'traverse') {
      scrollTo({ top: 0, left: 0, behavior: 'instant' }); // back/forward: Astro restores the position
      // Already at the hash when the page is built, so what is on screen there counts as its first screen.
      const target = hashTarget();
      if (target) scrollToTarget(target, true);
    }
    initPage({ hold: true }); // synchronous, under the sheet: nothing paints half-built, and nothing plays unseen
  });

  document.addEventListener('astro:page-load', () => {
    const main = document.getElementById('main-content');
    main?.setAttribute('tabindex', '-1'); // a landing point for focus after a navigation, and for the skip link
    const target = hashTarget();
    if (!swapping) {
      // The first full load: boot() built the page and plays its intro. Only the hash is left to do.
      if (target) scrollToTarget(target, true);
      return;
    }
    swapping = false;
    if (kept) {
      // Same page: glide to the hash (or the top). Without html.motion Astro's own jump has already landed.
      if (motionOn() && type !== 'traverse') scrollToTarget(target ?? 0);
      return;
    }
    startScroll();
    if (target && type !== 'traverse') scrollToTarget(target, true); // the built page may have shifted a few pixels
    main?.focus({ preventScroll: true }); // the clicked link is gone
    if (covering) {
      move(-100, LIFT, { onComplete: park });
      introCall = gsap.delayedCall(INTRO_AT, () => void playIntro());
    } else void playIntro();
  });

  // Back from another site can restore this page from the bfcache with the sheet still down.
  addEventListener('pageshow', (event) => {
    if (event.persisted && sheet()) park();
  });
}
