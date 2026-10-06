import type { ImageMetadata } from 'astro';
import opennessTile from '../../assets/illustrations/openness-tile.svg';
import autonomyTile from '../../assets/illustrations/autonomy-tile.svg';
import careTile from '../../assets/illustrations/care-tile.svg';
import solidarityTile from '../../assets/illustrations/solidarity-tile.svg';
import openness from '../../assets/illustrations/openness.svg';
import autonomy from '../../assets/illustrations/autonomy.svg';
import care from '../../assets/illustrations/care.svg';
import solidarity from '../../assets/illustrations/solidarity.svg';
import type { valueIds } from '../../content/config';

export type ValueId = (typeof valueIds)[number];

interface ValueStyle {
  /** The value's colour, for SVG strokes and CSS gradients. */
  hex: string;
  /** Tile fill and the text colour that reads on it. Pantone is the only
   *  fill dark enough to need light text (white is 5.2:1 on it, black 3.7:1). */
  tile: string;
  dot: string;
  /** Doodle drawn in black line with a paper accent, for the colour tiles. */
  tileDoodle: ImageMetadata;
  /** Same doodle with the accent in the value's colour, for the paper sheet. */
  doodle: ImageMetadata;
}

// One colour per value, used everywhere the value appears: tile, dot, line
// and doodle accent. Illustrations: Open Doodles by Pablo Stanley (CC0),
// recoloured; the source of each file is noted inside it.
export const valueStyles: Record<ValueId, ValueStyle> = {
  openness: { hex: '#FDC959', tile: 'bg-yellow text-black', dot: 'bg-yellow', tileDoodle: opennessTile, doodle: openness },
  autonomy: { hex: '#B3A0CF', tile: 'bg-purple text-black', dot: 'bg-purple', tileDoodle: autonomyTile, doodle: autonomy },
  care: { hex: '#FD5E09', tile: 'bg-orange text-black', dot: 'bg-orange', tileDoodle: careTile, doodle: care },
  solidarity: { hex: '#6667AB', tile: 'bg-pantone text-white-pure', dot: 'bg-pantone', tileDoodle: solidarityTile, doodle: solidarity },
};
