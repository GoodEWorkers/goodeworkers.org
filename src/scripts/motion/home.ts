/**
 * Homepage choreography: the page intro, the hero window, the 3D titles, the arrow, the About photos and
 * the form rules. Registered with the engine, so it runs inside the page's gsap.context and is reverted
 * with it. What starts hidden is hidden by CSS gated on html.motion (see LandingHeader.astro), by opacity,
 * never visibility: a link inside stays reachable with Tab, and removing html.motion shows everything.
 * So the start states here are only transforms (gsap.set) and the tweens run `to` opacity 1; this file is
 * what reveals the page.
 */
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ease, finishOnFocus, isTouch, onPage } from './engine';

// The inline failsafe in BaseLayout reads this: it tells the engine apart from this chunk, which can fail to load on its own.
document.documentElement.dataset.home = '1';

const $ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) => root.querySelector<T>(selector);
const $$ = (selector: string) => [...document.querySelectorAll<HTMLElement>(selector)];

// The Encircled ring is the last, empty child of its span.relative (the Why arrow shares a wrapper but holds an svg).
const ringOf = (el: HTMLElement) => $('span.relative > span:last-child:empty', el);
const RING = { off: 'inset(0% 100% 0% 0% round 9999px)', on: 'inset(0% 0% 0% 0% round 9999px)' };

onPage(({ intro, signal }) => {
  // A page fn runs on every page the router lands on, and only the homepage has this markup.
  if (!$('[data-intro="title"]')) return;
  // The router replaces <html>'s attributes on every swap, which drops the mark made on import: home -> other -> home inside the
  // failsafe's 4 s would find it missing and switch motion off mid-intro.
  document.documentElement.dataset.home = '1';
  try {
    pageIntro(intro);
    heroWindow();
    titles();
    whyArrow();
    aboutPhotos(signal);
    formRules();
  } catch (e) {
    document.documentElement.classList.remove('motion'); // a half-built page must not stay hidden
    throw e;
  }
});

// Everything is on the engine's intro timeline, which starts after the fonts are in: the whole thing ends by 1.3 s.
function pageIntro(intro: gsap.core.Timeline) {
  const h1 = $('[data-intro="title"]');
  let done = false; // an autoSplit re-split once the intro has played must not hide the title again

  if (h1) {
    SplitText.create(h1, {
      type: 'lines,words,chars',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true, // re-splits after a font swap or a width change
      onSplit(self) {
        gsap.set(h1, { opacity: 1 }); // the chars wait below their line masks
        if (done) return;
        const ring = ringOf(h1);
        const title = gsap
          .timeline({ onComplete: () => (done = true) })
          // the wordmark's chars first, then the words of the second line, then the ring draws around its word
          .from(self.chars.filter((c) => c.closest('.font-clash')), { yPercent: 110, duration: 0.8, stagger: { amount: 0.3 }, ease: ease.out }, 0)
          .from(self.words.filter((w) => !w.closest('.font-clash')), { yPercent: 110, duration: 0.7, stagger: { amount: 0.2 }, ease: ease.out }, 0.3);
        if (ring) title.fromTo(ring, { clipPath: RING.off }, { clipPath: RING.on, duration: 0.55, ease: ease.out, clearProps: 'clipPath' }, 0.6);
        intro.add(title, 0);
        return title; // SplitText reverts it on a re-split and carries its progress over
      },
    });
  }

  const ledes = $$('[data-intro="lede"]');
  const pills = $$('[data-intro="cta"]');
  gsap.set(ledes, { y: 24 });
  gsap.set(pills, { y: 24, scale: 0.96 });
  intro
    .to(ledes, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: ease.out }, 0.45)
    .to(pills, { y: 0, scale: 1, opacity: 1, duration: 0.7, stagger: 0.08, ease: ease.out }, 0.5)
    .to('[data-navbar]', { opacity: 1, duration: 0.4, ease: ease.soft }, 0.85);
}

// Signature 1: the paper sheet opens like a window as it scrolls into view.
function heroWindow() {
  const sheet = $('[data-window]');
  if (!sheet) return;
  const content = [...sheet.querySelectorAll('h2, p, [data-stagger]')];
  // Closed, the window trims the sheet's padding and nothing else: each inset stops where the content starts, so the
  // heading, the lede and the cards are never cut at any scroll position (on a desktop that caps the sides at 32px, not 6%).
  const closed = () => {
    const box = sheet.getBoundingClientRect();
    const rects = content.map((el) => el.getBoundingClientRect());
    const room = [
      Math.min(...rects.map((r) => r.top)) - box.top,
      box.right - Math.max(...rects.map((r) => r.right)),
      box.bottom - Math.max(...rects.map((r) => r.bottom)),
      Math.min(...rects.map((r) => r.left)) - box.left,
    ];
    const small = innerWidth < 640; // the sheet is tall there and its text sits further in: no cap needed
    const [top, side, bottom] = small ? [0.06, 0.06, 0.04] : [0.14, 0.06, 0.1]; // shares of the sheet's height / width / height
    const want = [top * box.height, side * box.width, bottom * box.height, side * box.width];
    const inset = want.map((v, i) => (small ? v : Math.max(0, Math.min(v, room[i]))));
    return `inset(${inset.map((v) => `${v}px`).join(' ')} round ${small ? 24 : 40}px)`;
  };
  gsap.fromTo(
    sheet,
    { clipPath: closed },
    {
      // Open, the clip is the sheet's own rounded box (12 / 16 / 24 px by breakpoint), so nothing changes at the end.
      clipPath: () => `inset(0px 0px 0px 0px round ${getComputedStyle(sheet).borderTopLeftRadius})`,
      ease: 'none',
      // clamp(): a sheet that is already on screen at load starts closed (as the CSS paints it) instead of part open;
      // it is open by 35%, before the reader gets to the heading.
      scrollTrigger: { trigger: sheet, start: 'clamp(top 90%)', end: 'top 35%', scrub: true, invalidateOnRefresh: true },
    },
  );
}

// Zentry's title: the words swing in from the side in 3D. Perspective rides on each word (nested spans would
// stop a perspective on the heading from reaching them). CSS keeps the words and the ring at opacity 0 until their tween.
function titles() {
  for (const h of $$('[data-title]')) {
    const ring = ringOf(h);
    const { words } = SplitText.create(h, { type: 'words' });
    gsap.set(h, { opacity: 1 });
    gsap.set(words, { x: 10, y: 51, z: -60, rotationY: 60, rotationX: -40, transformOrigin: '50% 50% -150px', transformPerspective: 1000 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: '100 bottom', end: 'center bottom', toggleActions: 'play none none reverse' } });
    tl.to(words, { opacity: 1, x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, ease: 'power2.inOut', stagger: 0.02 });
    if (ring) tl.to(ring, { opacity: 1, duration: 0.6, ease: ease.soft }, '-=0.2');
    tl.set(h, { overflowX: 'visible' }); // landed: stop clipping, so the Why arrow may overhang the heading
  }
}

// The arrow is drawn by a mask path swept along it (see why_arrow.svg): a dash offset on the dashed path itself
// would only slide its dash pattern. The head fades in at the end.
function whyArrow() {
  const draw = $<SVGGeometryElement>('[data-draw]');
  const svg = draw?.ownerSVGElement;
  if (!draw || !svg) return;
  const length = draw.getTotalLength();
  gsap
    .timeline({ scrollTrigger: { trigger: svg.parentElement, start: 'top 80%', end: 'top 40%', scrub: 0.5 } })
    .fromTo(draw, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', duration: 0.85 })
    .fromTo($('[data-head]', svg), { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.15 });
}

// Zentry's Story tilt on the photo pair (the photos drift on their own wrappers, see data-parallax in About.astro).
function aboutPhotos(signal: AbortSignal) {
  const pair = $('[data-story]');
  if (!pair || isTouch()) return;
  gsap.set(pair, { transformPerspective: 500 });
  const tilt = { duration: 0.3, ease: 'power1.inOut' };
  const clamp = gsap.utils.clamp(-1, 1); // Alice's photo hangs below the tilt box: a pointer over it must not pass 10 degrees
  const rotateX = gsap.quickTo(pair, 'rotationX', tilt);
  const rotateY = gsap.quickTo(pair, 'rotationY', tilt);
  pair.addEventListener(
    'pointermove',
    (e) => {
      const box = pair.getBoundingClientRect();
      const cx = box.width / 2;
      const cy = box.height / 2;
      rotateX(clamp((e.clientY - box.top - cy) / cy) * -10);
      rotateY(clamp((e.clientX - box.left - cx) / cx) * 10);
    },
    { signal },
  );
  pair.addEventListener(
    'pointerleave',
    () => {
      rotateX(0);
      rotateY(0);
    },
    { signal },
  );
}

// A field's bottom rule is its own border, so it draws as a left-to-right wipe of the field, one after another.
function formRules() {
  const fields = $$('[data-rule]');
  const form = fields[0]?.closest('form');
  if (!form) return;
  // Focus can reach a field before its wipe has played (Tab from the address above): finishOnFocus completes the wipe,
  // or the clip would hide the field and its ring.
  finishOnFocus(
    form,
    gsap.fromTo(
      fields,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        clearProps: 'clipPath', // a clip would keep cutting the focus ring
        duration: 1.2,
        stagger: 0.08,
        ease: ease.out,
        scrollTrigger: { trigger: form, start: 'top 80%', once: true },
      },
    ),
  );
}
