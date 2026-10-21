import type { valueIds } from '../../content/config';

export type ValueId = (typeof valueIds)[number];

interface ValueStyle {
  /** The value's colour as text, underline and band on the dark ground. Only pantone is lifted: #6667AB is 3.7:1 there, this tint 6.2:1. */
  ink: string;
  /** Tile fill and the text colour that reads on it. Pantone is the only
   *  fill dark enough to need light text (white is 5.2:1 on it, black 3.7:1). */
  tile: string;
}

// One colour per value, used everywhere the value appears: tile, name and
// the light of its illustration (src/components/Illustrations, by value id).
export const valueStyles: Record<ValueId, ValueStyle> = {
  openness: { ink: '#FDC959', tile: 'bg-yellow text-black' },
  autonomy: { ink: '#B3A0CF', tile: 'bg-purple text-black' },
  care: { ink: '#FD5E09', tile: 'bg-orange text-black' },
  solidarity: { ink: '#8E8ED0', tile: 'bg-pantone text-white-pure' },
};

/** An inline link in a value's colour (set --c on it): an underline at rest that rises into a band under the pointer or
 *  focus, the text going dark on it. The underline skips no ink, so a phrase that wraps keeps one unbroken line. */
export const bandLink = [
  'underline decoration-[3px] underline-offset-[0.26em] [text-decoration-skip-ink:none] [text-decoration-color:var(--c)]',
  '[box-decoration-break:clone] [background-image:linear-gradient(var(--c),var(--c))] bg-no-repeat bg-left-bottom bg-[length:100%_0%]',
  'transition-[background-size,color] duration-500 ease-out',
  'hover:bg-[length:100%_100%] hover:text-black focus-visible:bg-[length:100%_100%] focus-visible:text-black',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange',
].join(' ');
