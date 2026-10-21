/**
 * The "Windows at night" pieces (src/components/Illustrations, DESIGN.md Illustrations). Each draws itself in as it comes into view,
 * then lives a little. Registered with the engine like home.ts, so it runs inside the page's gsap.context and is reverted with it,
 * and never runs under reduced motion: the still drawing stays.
 *
 * Reveal: the lines of .frame draw in document order (the window first), the light fades in as they finish, the idle parts with it.
 * Life at rest: one ticker callback per piece, added while the piece is on screen and removed when it leaves. It writes through
 * quickSetter, and only when a value, rounded to what the eye can tell apart, is new. Parts are found by class, so a piece does
 * what its drawing has parts for. Every wave is a function of the ticker's time: nothing accumulates and nothing jumps.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage, withIntro } from './engine';

// The inline failsafe in BaseLayout reads this: it tells the engine apart from this chunk, which can fail to load on its own.
document.documentElement.dataset.illos = '1';

const TAU = Math.PI * 2;
const breath = (cycles: number) => 0.5 + 0.5 * Math.sin(TAU * cycles); // 0..1

// startAt() of engine.ts, which does not export it: 85% of the viewport height, never past the last scroll position, and before 0
// for what is already on the first screen (a start at 0 exactly would wait for the first scroll).
const startAt = (el: Element) => () => {
  const top = el.getBoundingClientRect().top + scrollY;
  return Math.min(top - innerHeight * 0.85, top < innerHeight ? -1 : Infinity, ScrollTrigger.maxScroll(window) - 1);
};

/** A writer that touches the DOM only when the value, rounded to a 1/steps grid, has changed. */
const out = (el: Element, prop: string, steps: number) => {
  const set = gsap.quickSetter(el, prop) as (v: number) => void;
  let last = NaN;
  return (v: number) => {
    v = Math.round(v * steps) / steps;
    if (v !== last) set((last = v));
  };
};

/** One frame of a piece's life. t: seconds since the reveal ended. ramp: 0 to 1, eases the motion in. boost: 1, or 2 while the tile is pointed at. */
type Step = (t: number, ramp: number, boost: number) => void;

function life(svg: SVGSVGElement): Step[] {
  const $ = (selector: string) => [...svg.querySelectorAll<SVGElement>(selector)];
  // A steady number in [0, 1) per piece and purpose: a tile and the row of the same value breathe together, and no two values do.
  let seed = 2166136261;
  for (const c of svg.dataset.illo!) seed = Math.imul(seed ^ c.charCodeAt(0), 16777619);
  const ph = (n: number) => (((seed >>> 0) / 2 ** 32) + n * 0.618) % 1;
  const pivot = (el: SVGElement) => gsap.set(el, { svgOrigin: el.dataset.o }); // where it turns or swells, in the drawing's units
  const steps: Step[] = [];

  // The spill breathes: brighter and a little wider on the in-breath. Pointed at, the light holds at full and the swell doubles.
  for (const el of $('.idle-glow')) {
    pivot(el);
    const fade = out(el, 'opacity', 100);
    const wide = out(el, 'scaleX', 400); // not 'scale': quickSetter resolves that alias to a property that does not exist
    const tall = out(el, 'scaleY', 400);
    const period = 4 + 2 * ph(1);
    steps.push((t, ramp, boost) => {
      const b = breath(t / period + ph(2));
      const swell = 1 + 0.025 * b * ramp * boost;
      fade(1 - 0.1 * (1 - b) * ramp * (2 - boost));
      wide(swell);
      tall(swell);
    });
  }

  // Openness: the pages lift off the sill, 2 to 6 units, tilting up to 2 degrees as they go, 5 s, each at its own point of the cycle.
  $('.idle-page, .idle-page-2').forEach((el, i) => {
    pivot(el);
    const lift = out(el, 'y', 4);
    const tilt = out(el, 'rotation', 4);
    steps.push((t, ramp, boost) => {
      const s = breath(t / 5 + ph(3) + i * 0.37);
      lift(-(2 + 4 * s) * ramp * boost);
      tilt(2 * s * ramp * boost);
    });
  });

  // Autonomy: the moon drifts 2 units either way over 20 s, the leaf sways 2 degrees about its stem in 4 s.
  for (const el of $('.idle-moon')) {
    const drift = out(el, 'x', 10);
    steps.push((t, ramp, boost) => drift(2 * Math.sin(TAU * (t / 20 + ph(4))) * ramp * boost));
  }
  for (const el of $('.idle-leaf')) {
    pivot(el);
    const sway = out(el, 'rotation', 6);
    steps.push((t, ramp, boost) => sway(2 * Math.sin(TAU * (t / 4 + ph(5))) * ramp * boost));
  }

  // Care: the two curls of steam rise 2 units and thin out, 3 s, half a cycle apart.
  $('.idle-steam path').forEach((el, i) => {
    const rise = out(el, 'y', 5);
    const thin = out(el, 'opacity', 50);
    steps.push((t, ramp, boost) => {
      const s = breath(t / 3 + i / 2);
      rise(-2 * s * ramp * boost);
      thin(1 - 0.4 * (1 - s) * ramp);
    });
  });

  // Solidarity: the lit column has switched on (the reveal does that, see piece()); then, every 25 to 40 s, one window blinks off and on (0.8 s).
  const wins = $('.idle-windows > g');
  if (wins.length) {
    const dip = wins.map((g) => out(g, 'opacity', 50));
    const later = () => 25 + 15 * Math.random();
    let next = later();
    let who = Math.floor(Math.random() * wins.length);
    steps.push((t) => {
      const q = (t - next) / 0.8;
      dip[who](q < 0 ? 1 : 1 - 0.9 * Math.sin(Math.PI * Math.min(q, 1)));
      if (q > 1) {
        next = t + later();
        who = Math.floor(Math.random() * wins.length);
      }
    });
  }

  // Health: a short bold segment leaves the left end of the heartbeat every 2.4 s and takes two thirds of that to cross (the dash
  // offset runs from where illustration.css parks it, just before the line, to just past its end); a window flickers twice, once every 20 s.
  for (const el of $('.beat')) {
    const walk = out(el, 'strokeDashoffset', 1000);
    steps.push((t) => walk(0.075 - 1.085 * Math.min(1, ((t / 2.4 + ph(6)) % 1) * 1.5)));
  }
  for (const el of $('.idle-window')) {
    const lit = out(el, 'opacity', 20);
    steps.push((t) => {
      const q = ((t + 20 * ph(7)) % 20) / 0.9;
      lit(q < 1 ? 1 - 0.8 * Math.max(0, Math.sin(3 * Math.PI * q)) : 1);
    });
  }
  return steps;
}

/** Arms one piece; returns what to undo outside the gsap context. */
function piece(svg: SVGSVGElement, signal: AbortSignal) {
  const frames = svg.querySelectorAll('.frame path');
  let t0 = Infinity; // ticker time when the reveal ended, so the life starts from the still drawing
  const reveal = gsap.timeline({ paused: true, onComplete: () => (t0 = gsap.ticker.time) });
  reveal.fromTo(frames, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, stagger: 0.04, ease: ease.out });
  reveal.fromTo(svg.querySelectorAll('.light, .late'), { opacity: 0 }, { opacity: 1, duration: 0.6, ease: ease.soft }, reveal.duration() * 0.7);
  // Solidarity, once it is lit: the column switches on from the bottom, 1.2 s each, 3 s in all. Part of the reveal, so it is done by the
  // time anyone scrolls back, whether or not the piece was on screen.
  const wins = svg.querySelectorAll('.idle-windows > g');
  if (wins.length) reveal.fromTo(wins, { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 1.8 / Math.max(1, wins.length - 1), ease: ease.soft });

  const steps = life(svg);
  const calm = matchMedia('(prefers-reduced-motion: reduce)'); // switched on mid-session: the drawing rests where it is
  let boost = 1;
  let hover = false;
  let focus = false;
  const tick = (time: number) => {
    const t = time - t0;
    if (!(t >= 0) || document.hidden || calm.matches) return;
    boost += ((hover || focus ? 2 : 1) - boost) * (1 - 0.9 ** gsap.ticker.deltaRatio());
    for (const step of steps) step(t, Math.min(1, t / 2), boost);
  };

  // A tile that is pointed at, or focused from the keyboard, lights up and moves more. (Touch has no pointer, and the same life.)
  const tile = svg.closest('a');
  if (tile && !isTouch()) {
    const on = { signal };
    tile.addEventListener('pointerenter', () => (hover = true), on);
    tile.addEventListener('pointerleave', () => (hover = false), on);
    tile.addEventListener('focusin', (e) => (focus = (e.target as Element).matches(':focus-visible')), on);
    tile.addEventListener('focusout', () => (focus = false), on);
  }

  // One trigger for both: the first time it is active the piece draws in (held for the page intro behind a curtain), and while
  // it is active the ticker runs. A trigger that was passed before it ever toggled (a reload far down the page) still draws
  // when it is scrolled back into.
  let drawn = false;
  ScrollTrigger.create({
    trigger: svg,
    start: startAt(svg),
    end: 'bottom top',
    onToggle: ({ isActive }) => {
      if (!isActive) return void gsap.ticker.remove(tick);
      gsap.ticker.add(tick);
      if (!drawn) {
        drawn = true;
        withIntro(() => reveal.play());
      }
    },
  });
  return () => gsap.ticker.remove(tick);
}

// The failsafe of every hidden state: a piece that cannot be armed shows its whole drawing.
const show = (svg: Element) => {
  for (const el of svg.querySelectorAll<SVGElement>('.frame path')) el.style.strokeDashoffset = '0';
  for (const el of svg.querySelectorAll<SVGElement>('.light, .late, .idle-windows > g')) el.style.opacity = '1';
};

onPage(({ signal }) => {
  document.documentElement.dataset.illos = '1'; // the router replaces <html>'s attributes on every swap, which drops the mark made on import (see home.ts)
  const stops: (() => void)[] = [];
  for (const svg of document.querySelectorAll<SVGSVGElement>('svg[data-illo]')) {
    const arm = () => {
      const ctx = gsap.context(() => {
        try {
          stops.push(piece(svg, signal));
        } catch (e) {
          console.error(e);
          show(svg);
        }
      });
      stops.push(() => ctx.revert());
    };
    if (svg.getClientRects().length) arm();
    else {
      // display: none (a row's figure below lg): armed when it appears, as a tablet turns or a window widens.
      const watch = new ResizeObserver(() => svg.getClientRects().length && (watch.disconnect(), arm()));
      watch.observe(svg);
      stops.push(() => watch.disconnect());
    }
  }
  return () => stops.forEach((stop) => stop());
});
