# Illustrations

The site's illustrations are three styles, each drawn five times, once per subject (`openness`, `autonomy`, `care`, `solidarity`, and
`health` for the Initiatives focus): the isometric set the designer chose, rebuilt on one cube module, and two mosaics after her Figma
frame, one still (`tiles`) and one living (`mosaic`, after the client's draft animation). Every piece comes from a small node script
(`gen.mjs`) and its `<desc>` says what it shows. The files the site serves are `public/illustrations/<subject>/<style>.svg` (15 of them);
this folder holds only this note. How the slots and the picker work is under Illustrations in `DESIGN.md`.

## The styles

The picker lists them in this order; the first is the default (`Illustration.astro` inlines it).

| slug | research folder | system | parent plates (Book of 100) |
|---|---|---|---|
| `isometric` | `06-isometric` | identical cubes on one grid with one gap, stacked by whole cubes, lit tops the only accent (revised Nov 2026) | B015 Isometric Allotment, B018, B068, B098 |
| `tiles` | `11-tiles` | rounded tiles on one module after the designer's Figma frame (4047-422), one focal tile in the light with a shape cut out, so it never reads as a loading skeleton; drawn by hand in code | none (the designer's frame) |
| `mosaic` | `12-mosaic` | the tiles mosaics animated after the client's draft (`valeurs-animation.html`): one 8 s SMIL loop per file, still frame at t = 0, paused off screen and under reduced motion by `src/scripts/motion/live.ts`; the default for `health` | none (the client's draft) |

`10-strings` (string art) and `01-partition` were in the picker until Nov 2026, replaced by `tiles` and `mosaic`; Drawn and dropped in the art-direction review, so never copied: `02-flow-field`, `04-truchet`, `08-growth`, `09-engraving`.

Round 2 (figurative: pictogram, leaded window, paper cut-out, halftone, one line, isometric scene, brush ink) was tried in the picker
and set aside for these; its generators and drawings stay in `v2/<slug>/` in the research folder, out of the sync.

## Where the sources are, and how to resync

Generators, contact sheets and notes (`gen.mjs`, `contact-sheet.png`, `notes.md` in each folder) are outside the repo:
`/Users/richard.raduly/research/goodeworkers-illos/<research folder>/`. The book is at
`/Users/richard.raduly/research/generative-art/site/book.html`. After a generator changes and `node gen.mjs` has rewritten its SVGs:

```
node scripts/sync-illustrations.mjs [path to the research folder]
```

It copies the five files of each set to `public/illustrations/<subject>/<slug>.svg` (`health-and-hospitals.svg` becomes `health.svg`),
strips any XML prolog, prints a table (bytes, elements), and wipes the target first so it mirrors the script's list. A set that has no
drawings yet is skipped with a warning (the default may not be). It writes nothing and exits 1 if a file of a set is missing, is over
12 KB or 160 elements, or carries an id (a page shows several copies of a drawing); a file with no `<desc>` is only a warning. To add or drop a style, edit `SETS` in the script, the list in `src/scripts/motion/picker.ts`, and
the default in `src/components/Illustration.astro` if it moves.

## The contract of a drawing

viewBox `0 0 400 300` (`health`: `0 0 800 400`); brand palette only (one ink, at most two accents); strokes 1.5 to 6 units; no
filter, gradient, mask, clip path, text, raster, external reference or id. Colours come from custom properties with fallbacks, so one file
works on all three grounds: `var(--ink, #111111)`, `var(--light, #F8F8F8)`, `var(--spill, <the subject's colour>)`. The slot's context
sets them (`src/styles/illustrations.css`): `tile` (value colour), `night` (#111 or #1D1D1D) and `paper` (the sheet).
Classes `.frame`, `.light` and `.idle` may be present; the site animates nothing inside a drawing except the `mosaic` set's own SMIL loop.

## The picker

`?pick` on any page shows the panel. `?illo=` sets the choice, as `subject:style` pairs, or `all:style` for every subject; a later
entry wins:

```
/values/?illo=openness:tiles,care:grid
/initiatives/?illo=all:tiles
/values/?illo=all:mosaic,care:tiles
```

The URL wins over what the browser stored (`localStorage.illoPick`), and is then stored. The panel's Copy link writes the whole
choice in this form; Reset clears storage; Close hides the panel for the session and keeps the choice. Without `?pick`, `?illo=` or a
stored choice, a page shows the default set and carries no panel.
