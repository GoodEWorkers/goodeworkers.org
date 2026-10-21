/**
 * The night street behind the footer wordmark (NightStreet.astro). The lit windows flicker a little, the lamp lights the windows
 * near it and they cool when it moves on, and now and then the building turns a window on or off. One ticker callback, added
 * while the band is on screen and removed when it leaves. Reduced motion never gets here (onPage is not run): the static drawing stays.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isTouch, onPage } from './engine';

const W = 1600; // NightStreet's drawing box
const H = 220;
const REACH = 0.12; // of the screen width, either side of the lamp (each window takes its own share of it)
const WARM = 0.75; // how far the lamp lights a dark window, of the level a lit one has: a glow, not a second set of lights
const FLICKER = 0.15; // opacity
const CEIL = 0.8; // the flicker never lifts a window above this: the street stays dimmer than the wordmark, even over the lamp's glow
const STRIDE = 3; // each frame looks at a third of the windows
// A steady number in [0, 1) per window and purpose: the street flickers the same way on every visit.
const hash = (i: number, k: number) => Math.abs((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1);

type Win = {
  cx: number; // centre, in the drawing box
  wx: number; // centre, on screen
  base: number; // the opacity it lights to
  spin: number; // flicker speed, rad/s
  phase: number;
  reach: number;
  on: number; // lit when the lamp is far: 1 or 0, changed now and then by the building
  want: number; // the level l is heading to: 'on', or WARM while the lamp is near
  l: number; // 0..1, tweened
  shown: number; // the opacity last written
  set: (v: number) => void;
};

const debug = { ticks: 0, lit: 0 };

onPage(() => {
  const svg = document.querySelector<SVGSVGElement>('svg[data-street]');
  if (!svg) return;
  const lamp = document.getElementById('lamp');
  const touch = isTouch();
  const wins: Win[] = [...svg.querySelectorAll('rect')].map((el, i) => {
    const lit = +el.getAttribute('opacity')!;
    return {
      cx: +el.getAttribute('x')! + 5,
      wx: 0,
      base: lit || 0.55 + 0.15 * hash(i, 1),
      spin: 0.3 + 0.7 * hash(i, 2),
      phase: 2 * Math.PI * hash(i, 3),
      // Three windows in ten never answer the lamp, and of the rest most light only when it is close: scattered lights, not a lit facade.
      reach: hash(i, 5) < 0.3 ? 0 : 0.25 + 0.75 * hash(i, 4) ** 2,
      on: +(lit > 0),
      want: +(lit > 0),
      l: +(lit > 0),
      shown: lit,
      set: gsap.quickSetter(el, 'opacity') as (v: number) => void,
    };
  });
  let vw = innerWidth;
  let max = 0; // the page's last scroll position
  let lx = 0; // where the lamp is, on screen
  let ticks = 0;
  let t0 = -1;
  let next = 0; // ticker time of the next change in the building

  // The street is as wide as the screen, so a window's place on screen only changes with the layout: measured on refresh.
  const measure = () => {
    const box = svg.getBoundingClientRect();
    const k = Math.max(box.width / W, box.height / H); // xMidYMax slice
    vw = innerWidth;
    max = ScrollTrigger.maxScroll(window);
    for (const w of wins) w.wx = box.left + (box.width - W * k) / 2 + w.cx * k;
  };
  const lamped = (w: Win) => Math.abs(w.wx - lx) < vw * REACH * w.reach;
  const warm = (w: Win, to: number, seconds: number) => {
    w.want = to;
    gsap.to(w, { l: to, duration: seconds, ease: ease.soft, overwrite: true });
  };
  const life = () => {
    const from = Math.random() < 0.5 ? 1 : 0; // a lit window goes out, or a dark one lights
    const pool = wins.filter((w) => w.on === from && w.want === from && w.wx > 0 && w.wx < vw && !lamped(w));
    const w = pool[Math.floor(Math.random() * pool.length)];
    if (w) warm(w, (w.on = 1 - from), 1.2);
  };

  const tick = (time: number) => {
    if (t0 < 0) t0 = time;
    const amp = FLICKER * Math.min(1, (time - t0) / 3); // fades in, so no window jumps when the first frame runs
    // Pointer: the lamp's own x (percent of the screen), as the engine wrote it. Touch has no pointer: the scroll carries it.
    const pct = parseFloat(lamp?.style.getPropertyValue('--lamp-x') ?? '');
    lx = touch
      ? vw * (0.15 + 0.7 * gsap.utils.clamp(0, 1, (st.scroll() - st.start) / Math.max(1, max - st.start)))
      : (vw * (isNaN(pct) ? 50 : pct)) / 100;
    for (let i = ticks++ % STRIDE; i < wins.length; i += STRIDE) {
      const w = wins[i];
      const goal = w.on || (lamped(w) ? WARM : 0);
      if (goal !== w.want) warm(w, goal, 0.6);
      if (!w.l && !w.shown) continue; // dark, and staying dark
      const o = Math.round(w.l * Math.min(CEIL, w.base + amp * Math.sin(w.spin * time + w.phase)) * 20) / 20; // 0.05 steps
      if (o !== w.shown) w.set((w.shown = o));
    }
    if (time > next) {
      life();
      next = time + 20 + Math.random() * 20;
    }
    if (import.meta.env.DEV) {
      debug.ticks++; // shared, so a callback left running by an old page would show as a doubled rate
      debug.lit = wins.filter((w) => w.shown >= 0.25).length;
    }
  };

  const start = () => {
    measure();
    next = gsap.ticker.time + 20 + Math.random() * 20;
    gsap.ticker.add(tick);
  };
  const stop = () => gsap.ticker.remove(tick);
  const st = ScrollTrigger.create({
    trigger: svg,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: ({ isActive }) => (isActive ? start() : stop()),
  });
  ScrollTrigger.addEventListener('refresh', measure);
  if (import.meta.env.DEV) (window as unknown as { __street: typeof debug }).__street = debug;

  return () => {
    stop();
    ScrollTrigger.removeEventListener('refresh', measure);
    gsap.killTweensOf(wins);
    svg.querySelectorAll('rect').forEach((r) => r.style.removeProperty('opacity')); // back to the drawing the server made
  };
});
