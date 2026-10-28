# Illustrations

The site's illustrations are a commission: six generative systems from The Book of 100, each drawn five times, once per subject
(`openness`, `autonomy`, `care`, `solidarity`, and `health` for the Initiatives focus). Every piece comes from a small node script and a
seed (the book's rule: structure, then process, then mark), and its `<desc>` holds the recipe: parent plates, parameters, seed.
Nothing here is drawn by hand. The files the site serves are `public/illustrations/<subject>/<style>.svg` (30 of them); this folder
holds only this note. How the slots and the picker work is under Illustrations in `DESIGN.md`.

## The styles

The picker lists them in this order; the first is the default (`Illustration.astro` inlines it).

| slug | research folder | system | parent plates (Book of 100) |
|---|---|---|---|
| `bands` | `07-warped-bands` | warped bands, parting around a quiet zone | B045 Warped Bands, B042 Apparitions in Blue |
| `strings` | `10-strings` | string-art chords: peg i strung to peg k*i+s | B032 String Figures, B099 Clock of Pegs, B014, B038 |
| `partition` | `01-partition` | recursive partition in flat colour | B012 Mondrian Misremembered, B011, B019, B092 |
| `circles` | `05-circles` | circle-packing colonies and dot fields | B021 Stipple Moon, B023, B024, B027, B028 |
| `grid` | `03-grid-disorder` | a grid with growing disorder, one accent cell | B017 Irregular Census, B067 Repetition with Fatigue |
| `isometric` | `06-isometric` | isometric partitions and terraces | B015 Isometric Allotment, B018, B068, B098 |

Drawn and dropped in the art-direction review, so never copied: `02-flow-field`, `04-truchet`, `08-growth`, `09-engraving`.
`07-warped-bands` sets each path's `pathLength` to its length over the longest in its piece, so that a dash reveal would draw along the
flow; the site does not use a dash reveal, which makes it harmless.

## Where the sources are, and how to resync

Generators, contact sheets and notes (`gen.mjs`, `contact-sheet.png`, `notes.md` in each folder) are outside the repo:
`/Users/richard.raduly/research/goodeworkers-illos/<research folder>/`. The book is at
`/Users/richard.raduly/research/generative-art/site/book.html`. After a generator changes and `node gen.mjs` has rewritten its SVGs:

```
node scripts/sync-illustrations.mjs [path to the research folder]
```

It copies the five files of each set to `public/illustrations/<subject>/<slug>.svg` (`health-and-hospitals.svg` becomes `health.svg`),
strips any XML prolog, keeps `<desc>`, prints a table (bytes, elements), and wipes the target first so it mirrors the script's list.
It writes nothing and exits 1 if a file is missing, is over 8 KB or 120 elements, carries an id (a page shows several copies of a
drawing), or has no `<desc>`. To add or drop a style, edit `SETS` in the script, the list in `src/scripts/motion/picker.ts`, and
the default in `src/components/Illustration.astro` if it moves.

## The contract of a drawing

viewBox `0 0 400 300` (`health`: `0 0 800 400`); brand palette only (one ink, at most two accents); strokes 1.5 to 6 units; no
filter, gradient, mask, clip path, text, raster, external reference or id. Colours come from custom properties with fallbacks, so one file
works on all three grounds: `var(--ink, #111111)`, `var(--light, #F8F8F8)`, `var(--spill, <the subject's colour>)`. The slot's context
sets them (`src/styles/illustrations.css`): `tile` (value colour), `night` (#111 or #1D1D1D) and `paper` (the sheet).
Classes `.frame`, `.light` and `.idle` may be present; the site animates nothing inside a drawing.

## The picker

`?pick` on any page shows the panel. `?illo=` sets the choice, as `subject:style` pairs, or `all:style` for every subject; a later
entry wins:

```
/values/?illo=openness:strings,care:grid
/initiatives/?illo=all:strings
/values/?illo=all:grid,care:circles
```

The URL wins over what the browser stored (`localStorage.illoPick`), and is then stored. The panel's Copy link writes the whole
choice in this form; Reset clears storage; Close hides the panel for the session and keeps the choice. Without `?pick`, `?illo=` or a
stored choice, a page shows the default set and carries no panel.
