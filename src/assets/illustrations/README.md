# Illustrations

The site's illustrations are one set, `isometric`, drawn five times, once per subject (`openness`, `autonomy`, `care`, `solidarity`, and
`health` for the Initiatives focus): identical cubes on one grid with one gap and one scale, stacked by whole cubes, lit tops the only
accent (the designer's choice, revised for consistency in Nov 2026). The files are `public/illustrations/<subject>/isometric.svg`;
`src/components/Illustration.astro` inlines them at build time. This folder holds only this note.

## Source and sync

The generator, contact sheet and notes are outside the repo, in `~/research/goodeworkers-illos/06-isometric/` (`gen.mjs`, `notes.md`).
After `node gen.mjs` has rewritten its SVGs, `node scripts/sync-illustrations.mjs` copies them into `public/illustrations/`, strips any
XML prolog and prints a table. It writes nothing and exits 1 if a file is missing, is over 12 KB or 160 elements, or carries an id (a
page shows several copies of a drawing).

## The contract

viewBox `0 0 400 300` (`health`: `0 0 800 400`); no filter, gradient, mask, clip path, text, raster, external reference or id. Colours come
from custom properties with fallbacks, so one file works on all three grounds: `var(--ink, #111111)`, `var(--light, #F8F8F8)`,
`var(--spill, <the subject's colour>)`. The slot's context sets them (`src/styles/illustrations.css`): `tile`, `night` and `paper`.

## Other sets

A picker and several other sets (tiles, a living mosaic, hand-drawn animals, and earlier rounds) were tried with the designer. They live on
the `values-initiatives-motion` branch and in the research folder, not here.
