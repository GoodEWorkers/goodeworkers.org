import type { valueIds } from '../../content/config';

export type ValueId = (typeof valueIds)[number];

interface ValueStyle {
  /** The value's colour as text, underline and band on the dark ground. Only pantone is lifted: #6667AB is 3.7:1 there, this tint 6.2:1. */
  ink: string;
  /** The text colour on a band of that ink (a band link under the pointer): white on Care's orange like every orange surface, #111 on the others. */
  on: string;
  /** Tile fill and the text colour that reads on it. Pantone is the only fill dark enough to need light text (white is 5.2:1 on it,
   *  black 3.7:1). Care's orange takes white as well, a designer decision (3.1:1, see the Orange Label Rule in DESIGN.md). */
  tile: string;
}

// One colour per value, used everywhere the value appears: tile, name and
// the light of its illustration (src/components/Illustration.astro, by value id).
export const valueStyles: Record<ValueId, ValueStyle> = {
  openness: { ink: '#FDC959', on: '#111', tile: 'bg-yellow text-black' },
  autonomy: { ink: '#B3A0CF', on: '#111', tile: 'bg-purple text-black' },
  care: { ink: '#FD5E09', on: '#fff', tile: 'bg-orange text-white-pure' },
  solidarity: { ink: '#8E8ED0', on: '#111', tile: 'bg-pantone text-white-pure' },
};

/** An inline link in a value's colour (set --c on it, and --on for the text on the band): a 3px underline at rest that rises into
 *  a band under the pointer or focus, the text taking --on on it. Both are layers of one background, the same gradient, anchored
 *  bottom left: the underline always full width, the band growing from 0% to full height. One painter, so no seam shows between
 *  band and underline at any frame (text-decoration would sit a hair lower and let the ground through). The underline skips no
 *  ink, so a phrase that wraps keeps one unbroken line. */
export const bandLink = [
  '[background-image:linear-gradient(var(--c),var(--c)),linear-gradient(var(--c),var(--c))] bg-no-repeat [background-position:0_100%,0_100%] [background-size:0%_100%,100%_3px] [box-decoration-break:clone]',
  'transition-[background-size,color] duration-500 ease-out',
  'hover:[background-size:100%_100%,100%_3px] hover:text-[var(--on,#111)] focus-visible:[background-size:100%_100%,100%_3px] focus-visible:text-[var(--on,#111)]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
].join(' ');
