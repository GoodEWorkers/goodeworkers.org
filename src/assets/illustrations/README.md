# Illustrations

The site's illustrations are a commission in two rounds, drawn once per subject (`openness`, `autonomy`, `care`, `solidarity`, and `health`
for the Initiatives focus). Round 1 was ten abstract generative systems from The Book of 100; the client found them far too abstract, and
all were retired but `bands` (warped bands), which stays as the one abstract option and the default. Round 2 is figurative: drawing styles a
visitor reads in two seconds, each a distinct, recognisable method, still flat and geometric, with confident constructed shapes (no wobble,
no faces; a pictogram figure, a circle head on a geometric body, is allowed). Every piece comes from a small node script (`gen.mjs`) and its
`<desc>` says what it shows. Nothing here is drawn by hand in the SVG. The files the site serves are
`public/illustrations/<subject>/<style>.svg` (five per style); this folder holds only this note. How the slots and the picker work is under
Illustrations in `DESIGN.md`.

## The styles

The picker lists them in this order; the first is the default (`Illustration.astro` inlines it).

| slug | research folder | style | method |
|---|---|---|---|
| `bands` | `07-warped-bands` | Warped bands (round 1, kept) | bands parting around a quiet zone; B045 Warped Bands, B042 Apparitions in Blue |
| `pictogram` | `v2/pictogram` | Pictogram | Swiss pictograms after Aicher and Isotype: discs, capsules and polygons on one 6-unit module, angles at 0, 45 and 90 |
| `leaded` | `v2/leaded` | Leaded window | glass cells between 6-unit cames (lead lines) in three values, a transom across the top |
| `cutout` | `v2/cutout` | Paper cut-out | three papers (dark, tint, light) stacked and scissor-cut, no outlines |
| `halftone` | `v2/halftone` | Halftone | Ben-Day dots on one 45-degree lattice, dot size meaning light |
| `monoline` | `v2/monoline` | One line | a single even stroke weight |
| `isoscene` | `v2/isoscene` | Isometric scene | a flat scene on the isometric grid |

Retired, no longer copied: round 1's `01-partition`, `03-grid-disorder`, `05-circles`, `06-isometric` and `10-strings`, which had been in
the picker. Never copied: `02-flow-field`, `04-truchet`, `08-growth` and `09-engraving`, dropped in round 1's art-direction review.
`07-warped-bands` sets each path's `pathLength` to its length over the longest in its piece, so that a dash reveal would draw along the
flow; the site does not use a dash reveal, which makes it harmless.

## Where the sources are, and how to resync

Generators, contact sheets and notes (`gen.mjs`, `contact-sheet.png`, `notes.md` in each folder) are outside the repo, in
`/Users/richard.raduly/research/goodeworkers-illos/`: round 1 in `<NN-name>/` (`07-warped-bands/`), round 2 in `v2/<slug>/` (its brief is
`BRIEF-v2.md`). The book is at `/Users/richard.raduly/research/generative-art/site/book.html`. After a generator changes and `node gen.mjs`
has rewritten its SVGs:

```
node scripts/sync-illustrations.mjs [path to the research folder]
```

It copies the five files of each set to `public/illustrations/<subject>/<slug>.svg` (`health-and-hospitals.svg` becomes `health.svg`),
strips any XML prolog, prints a table (bytes, elements), and wipes the target first so it mirrors the script's list. A set that has no
drawings yet is skipped with a warning (the default may not be), so the script can be rerun when it lands. It writes nothing and exits 1 if
a file of a set is missing, is over 12 KB or 160 elements, or carries an id (a page shows several copies of a drawing); a file with no
`<desc>` is only a warning. To add or drop a style, edit `SETS` in the script, `STYLES` in `src/scripts/motion/picker.ts`, and the default
in `src/components/Illustration.astro` if it moves.

## The contract of a drawing

viewBox `0 0 400 300` (`health`: `0 0 800 400`); under 12 KB and 160 elements (round 1 was 8 KB and 120); brand palette only (one ink, at
most two accents); strokes 2 to 8 units (`bands`: 1.5 to 6); no filter, gradient, mask, clip path, text, raster, external reference or id.
Colours come from custom properties with fallbacks, so one file works on all three grounds: `var(--ink, #111111)`,
`var(--light, #F8F8F8)`, `var(--spill, <the subject's colour>)`. The slot's context sets them (`src/styles/illustrations.css`): `tile`
(value colour), `night` (#111 or #1D1D1D) and `paper` (the sheet). Classes `.frame`, `.light` and `.idle` may be present; the site animates
nothing inside a drawing.

## The picker

`?pick` on any page shows the panel. `?illo=` sets the choice, as `subject:style` pairs, or `all:style` for every subject; a later
entry wins:

```
/values/?illo=openness:pictogram,care:cutout
/initiatives/?illo=all:pictogram
/values/?illo=all:cutout,care:halftone
```

The URL wins over what the browser stored (`localStorage.illoPick`), and is then stored. The panel's Copy link writes the whole
choice in this form; Reset clears storage; Close hides the panel for the session and keeps the choice. Without `?pick`, `?illo=` or a
stored choice, a page shows the default set and carries no panel. A style whose files are not there (a set not synced yet) is a disabled
thumbnail, and a link that asks for it leaves the slot's drawing as it is.
