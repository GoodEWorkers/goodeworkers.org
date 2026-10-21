---
name: GoodEWorkers
description: A remote-first nonprofit community, set on a near-black ground with a warm orange, yellow and lavender voice.
colors:
  orange: "#FD5E09"
  yellow: "#FDC959"
  purple: "#B3A0CF"
  pantone: "#6667AB"
  black: "#111111"
  black-light: "#1D1D1D"
  white: "#F8F8F8"
  white-pure: "#FFFFFF"
  grey: "#ECECEC"
  ashgray: "#E0E0E0"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "2.25rem → 6rem (job-boards H1 36px → 72px; shared split-header H1 56px → 96px; homepage hero to 74px)"
    fontWeight: 500
    lineHeight: 1.25
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1.875rem → 54px"
    fontWeight: 500
    lineHeight: 1.2
  title:
    fontFamily: "ClashDisplay, Arial Narrow, Impact, system-ui, sans-serif"
    fontSize: "1.125rem → 1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  value-name:
    fontFamily: "ClashDisplay, Arial Narrow, Impact, system-ui, sans-serif"
    fontSize: "2.25rem → 4.5rem (tile names 36px → 60px fluid; homepage list 36px → 40px; value-row headings 36px → 72px)"
    fontWeight: 600
    lineHeight: 1
  door-action:
    fontFamily: "ClashDisplay, Arial Narrow, Impact, system-ui, sans-serif"
    fontSize: "1.5rem → 2rem"
    fontWeight: 700
    lineHeight: 1.25
  cta:
    fontFamily: "ClashDisplay, Arial Narrow, Impact, system-ui, sans-serif"
    fontSize: "1.875rem → 40px"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.875rem → 1rem"
    fontWeight: 500
    lineHeight: 1.6875
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.75rem → 0.875rem"
    fontWeight: 700
    lineHeight: 1.25
rounded:
  panel-sm: "12px"
  panel-md: "16px"
  panel-lg: "24px"
  card: "16px"
  pill: "9999px"
spacing:
  column-gutter-sm: "16px"
  column-gutter-md: "32px"
  column-max: "1536px"
  field-gap: "64px"
components:
  button-cta-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.white-pure}"
    typography: "{typography.cta}"
    rounded: "{rounded.pill}"
    padding: "20px 28px"
    width: "336px"
  button-cta-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.black}"
    typography: "{typography.cta}"
    rounded: "{rounded.pill}"
    padding: "20px 28px"
  button-cta-purple:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.black}"
    typography: "{typography.cta}"
    rounded: "{rounded.pill}"
    padding: "20px 28px"
  button-cta-orange-two-line:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
    typography: "{typography.cta}"
    rounded: "{rounded.pill}"
    padding: "20px 28px (48px sides from sm)"
  nav-link:
    textColor: "{colors.grey}"
    typography: "{typography.label}"
    padding: "0 0 4px"
  nav-link-current:
    textColor: "{colors.yellow}"
  nav-contact:
    textColor: "{colors.grey}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  nav-contact-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
  filter-pill:
    textColor: "{colors.black}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  filter-pill-hover:
    backgroundColor: "{colors.grey}"
  filter-pill-pressed:
    backgroundColor: "{colors.black}"
    textColor: "{colors.grey}"
  input-field:
    textColor: "{colors.black}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "6px 0"
  panel-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
    rounded: "{rounded.panel-lg}"
    padding: "48px 32px 56px"
  card-dark:
    backgroundColor: "{colors.black-light}"
    textColor: "{colors.grey}"
    rounded: "12px → 24px (stepped at sm and lg)"
    padding: "40px top, 24px sides (32px from md), as About"
  feature-card:
    backgroundColor: "{colors.grey}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
  value-tile-openness:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "16px → 24px (from lg)"
    padding: "24px → 40px"
  value-tile-autonomy:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "16px → 24px (from lg)"
    padding: "24px → 40px"
  value-tile-care:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "16px → 24px (from lg)"
    padding: "24px → 40px"
  value-tile-solidarity:
    backgroundColor: "{colors.pantone}"
    textColor: "{colors.white-pure}"
    typography: "{typography.value-name}"
    rounded: "16px → 24px (from lg)"
    padding: "24px → 40px"
  door-card-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.black}"
    typography: "{typography.door-action}"
    rounded: "16px → 24px (from lg)"
    padding: "28px → 48px"
  door-card-purple:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.black}"
    typography: "{typography.door-action}"
    rounded: "16px → 24px (from lg)"
    padding: "28px → 48px"
motion:
  ease:
    out: "expo.out"
    inOut: "expo.inOut"
    soft: "power3.out"
  timing:
    hover: "0.25-0.5s, soft"
    lineReveal: "1.0-1.3s, stagger 0.06-0.1, out"
    clipReveal: "1.2-1.6s, out"
    curtain: "0.8-1.1s, inOut"
    scrollLinked: "scrub: true, linear to scroll"
    stagger: "20-80ms"
---

# Design System: GoodEWorkers

This file describes the visual system as it ships in code. `BRAND.md` is the committed brand authority (logo rules, palette, typefaces, core components); this file agrees with it and adds the patterns built since. Where the code and `BRAND.md` differ, the divergence is noted here and left for the owner to resolve. Neither file silently overrides the other.

## Overview

**Creative North Star: "The Lit Window at Night"**

The site is a near-black room with one bright, warm sheet laid on it. The dark ground (#111) carries the big statements, and the off-white sheet (#F8F8F8), rounded and pulled out to the column edges, carries the working material: the hero's service grid, the job-board table, the contact form. Colour is warm and used sparingly: orange for the one thing to do, yellow and lavender for the other paths, and a single hand-circled word in orange that marks what the heading is about.

It feels made by people, not by a template. Photos overlap at offset angles, the card grid is irregular, and the CTAs are fat pills with a heavy geometric label that grow slightly when hovered. Density depends on the ground: statements on the dark ground are centred and roomy, while working content on the light sheet can be dense, down to one line per row, because that is where the visitor gets things done.

Four colours also stand for the four values (Openness, Autonomy, Care, Solidarity) and keep that meaning wherever a value appears: the tile fill, the value's name on the dark ground, and the underline under its phrase in the Initiatives statement. The illustrations are drawn for the site: one small window at night per value, in pen line with one light colour, so the "made by people" feeling carries into the pictures.

The system is flat. It builds depth from the contrast between the two grounds, from panels overlapping, and from scale on hover. Shadows are not part of it.

**Key Characteristics:**
- Two grounds: #111 near-black and the #F8F8F8 rounded sheet, alternating down the page.
- One orange ring around one word per heading.
- Accents work as fills (pills, cards, value tiles, door cards), as dots and lines, or as a state (hover, current page). They never set reading text.
- Four value colours with fixed roles: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone.
- A series of windows at night (one drawing per value, plus the hospital): pen line and one light, inline SVG that draws itself in and breathes at rest.
- Fat rounded pill CTAs with a ClashDisplay bold label; `hover` scales them to 105%.
- Flat surfaces; no resting shadows.
- Inter for reading and UI; ClashDisplay for the brand name, names you click, value names, the 404 numeral and heading, and CTA labels.

## Colors

A warm three-accent palette on near-black, with off-white as the working surface.

### Primary
- **Signal Orange** (orange): The one action per view: the Join and Send pills, the values page "Explore our initiatives" pill, the nav Contact outline, the encircled-word ring, focus rings and outlines, the search caret, and link hover. Also the "e" of the wordmark, Care's value colour, and the solid heartbeat line on the Initiatives focus card, and one or two lit windows on the footer street.

### Secondary
- **Marigold** (yellow): The "I am a nonprofit" pill, a Why card fill, the skip-link background, text selection on the job-boards, values and initiatives pages, the job-board `:target` row tint (at 30%), the "remote-only" kind dot, the current-page state of the nav text links (Initiatives, Contributors, Projects), the organisations door card, and the lit windows on the footer street (one or two are orange). Openness's value colour.

### Tertiary
- **Lavender** (purple): The "I want to help" pill, a Why card fill, the About list heading, the "startups and niches" kind dot, and the contributors door card. Autonomy's value colour.
- **Pantone Periwinkle** (pantone): Solidarity's value colour. It began as the job-boards "search engines" kind dot and is now also the Solidarity tile fill. Its text on the night ground uses a lighter ink, `valueStyles.ink` (#8E8ED0, 6.2:1 on #111, where the fill would be 3.7:1), and the fill stays #6667AB. It is the only fill dark enough to need light text: pure white reads at about 5.1:1 on it, #111 only 3.7:1. `BRAND.md` does not list it yet.

### Neutral
- **Night Ground** (black): The page background and the default text colour on light surfaces. Black pills and rules on the light sheet use it too.
- **Raised Night** (black-light): Inset cards on the dark ground: the About panel, the homepage and values charter cards, the values row a link points at, and the legal, thanks and 404 panels.
- **Paper** (white): The light sheet (hero, job-board table, footer). This is the brand off-white.
- **Pure White** (white-pure): Two uses only. Large labels on an orange fill (`#F8F8F8` on orange is 2.92:1; pure white reaches 3.10:1, which passes the large-text floor), and every label on a pantone tile (about 5.1:1, so the 18–20px bold taglines pass too).
- **Light Grey** (grey): Headings and text on the dark ground, light feature cards, and the hover fill of rows and pills on the sheet.
- **Ash** (ashgray): Body copy and ledes on the dark ground. At 70% it is used for secondary meta such as "links checked".

Text on the sheet steps down by alpha on black: 80% for supporting prose, 70% for meta and table secondary columns, 60% for placeholders, counts, and visited links. `BRAND.md` lists two reserve tokens, `primary` (#DEB36F) and `background` (#2B0E45). Both are in the Tailwind config but nothing uses them yet.

### Named Rules
**The Two Grounds Rule.** Every surface is either the #111 ground or the #F8F8F8 sheet, with #1D1D1D insets on dark and #ECECEC cards on light. Don't use a mid-value ground.

**The Orange Label Rule.** A label on an orange fill is pure white only at large bold sizes (ClashDisplay 700 from 24px up, as on the CTA pills and the 404 button). Smaller text on orange is black, as on the two-line pill.

**The Dot Never Speaks Alone Rule.** A kind dot (10px circle) always sits beside its text label. The yellow dot on paper is well under 3:1, so the dot is only a wayfinding echo and can't be the only signal. Kind colours: remote-only yellow, vetted orange, startups and niches purple, freelance black, search engines pantone. On a pressed black pill, the dot gets a 1px grey ring so the black dot stays visible.

**The Value Colour Rule.** Each value owns one colour, everywhere it appears: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone. The colour fills its tile, sets its name on the dark ground (Solidarity uses its lighter ink, see Pantone), and underlines its phrase in the Initiatives statement. A tile's drawing keeps a black pen and a paper light; on the night ground the value's colour is the light that spills. Never swap or reuse a value colour for a different value. Care's orange tile is a value field, not an action: on a page with the Care tile, the orange pill is still the only orange action.

## Typography

**Display Font:** ClashDisplay, variable 200–700 (with Arial Narrow, Impact, system-ui)
**Body Font:** Inter (with Arial)

**Character:** Inter carries almost everything, set at medium and bold, with generous leading. ClashDisplay is the brand's own voice, a geometric face kept for the moments the brand speaks: its name, the pill labels, and names a visitor clicks.

### Hierarchy
- **Display** (Inter 500, line-height 1.25): Page H1s on the dark ground. The job-boards H1 runs 36px → 72px; the shared split header (values, initiatives) runs 56px → 96px (60px from `md`, 72px from `lg`). The homepage hero goes to 74px/83px, with the brand words set in ClashDisplay in yellow, orange and purple. The two split-header scales are a known divergence (see Layout).
- **Headline** (Inter 500, 30px → 54px, line-height 1.2 → ~1.17): Section headings on either ground, such as the Why, About, and Join sections and the hero panel. The emphasised or encircled word is bold.
- **Title** (ClashDisplay 600, 18px → 20px): Clickable names in a list, such as the board names and tool names in the job-board table. The footer contact heading uses ClashDisplay 700 at 30–36px.
- **Value Name** (ClashDisplay 600, line-height 1): A value's name wherever it appears. On the charter tiles it is 36px, 40px from `lg`, and fluid from 48px to 60px at `xl`, in the tile's text colour. In the homepage list it is 36px, 40px at `xl`, in the value's ink. As a value row's heading it is 36px, 48px from `md`, 64px at `xl` and 72px at `2xl`, in the value's ink.
- **Door Action** (ClashDisplay 700, 24px → 30px from `lg`, 32px at `xl`): The action line at the foot of a door card, followed by the black arrow circle.
- **CTA** (ClashDisplay 700, 30px → 40px): The label inside the large pill buttons. The values page's closing pill is 24px on phones, so its one line fits, and it scales with its column from `lg`.
- **Body** (Inter 500, 14px → 16px, line-height 1.6875 ≈ 27px at 16px): All reading copy and ledes. Ledes run at most 42rem wide (`max-w-2xl`), and centred copy at most 48rem.
- **Label** (Inter 700, 12px → 14px): Nav, filter pills, field labels, and table headers.

### Named Rules
**The Brand Voice Rule.** ClashDisplay appears only for the brand name (the H1 wordmark; the footer closes with the logotype itself, drawn and not set), CTA pill labels, the footer contact heading, the 404 numeral and heading, value names (on tiles, in the homepage list and as value-row headings), and names or actions a visitor clicks (board and tool names, door-card actions). Other headings, taglines, prose and UI are set in Inter.

**The Balanced Headings Rule.** H1s and H2s are set with `text-wrap: balance`, so none ends on a lone word. The homepage H1 is the exception: SplitText keeps it split for good, and a layout balanced before the split is not the one its lines end up in. The Encircled wrapper ends in a zero-width joiner (`.encircled::after`) so Chromium's balanced breaking keeps the ring with its word.

**The One-Weight Inter Rule.** Inter ships as one static Regular face, `Inter-Regular.woff2`, declared over weights 400–700 in `src/styles/global.css` on purpose. So every Inter `font-medium` and `font-bold` renders as Regular, with no synthetic bold, as the site was approved. The 500 and 700 weights written in this file are the intended tokens, not what renders. Don't retune sizes or colours to make up for the weight. A change of weight is a design change, made in the font declaration and in this rule together.

**The Word Space Rule.** ClashDisplay's word space is 0.14em, so `.font-clash` at semibold and bold opens it to 0.1em (`global.css`). A single word has no space to open.

**The Typeset Rule.** Copy is typeset where it renders, in `src/components/Common/typeset.ts`, and the copy files stay as written. A hyphen inside a word is non-breaking (U+2011), so the word never wraps at it. Apostrophes stay as written. In French, a no-break space goes before `: ; ? ! »` and after `«`.

**Divergence from BRAND.md.** `BRAND.md` says section headings use `font-clash font-medium`. In the shipped code, every section heading and H1 (homepage Why/About/hero panel and the job-boards page) is Inter, and ClashDisplay is used only as described in the Brand Voice Rule. The owner should decide which one is canonical.

## Layout

There is one shared column. It is max 1536px wide, centred, with 16px gutters (32px from `md`), and it is the same column the navbar and footer use. Content inside it never adds a second layer of horizontal padding. A surface that has to be wider than the column (the hero sheet, the job-board sheet, the Initiatives focus sheet) breaks out with negative margins of the same size and re-applies them as padding. The panel bleeds to the column edge, but its content stays aligned with the logotype. A card that sits *within* the column (About, the charter and homepage values card, legal, thanks and 404) keeps its own padding and is inset on purpose.

- **Navbar:** sticky at the top, #111, 101px tall once stuck at `lg` (with a 64px top margin before sticking).
- **Split page header** (job-boards, values, initiatives): on the dark ground, the H1 sits left and the lede sits right, bottom-aligned from `lg`, in a column one charter tile wide (the second of two equal columns after an 11rem label column, 14rem from `xl`). So the lede lines up with the charter's second tile and the value rows' text. Below `lg` they stack. This lets the sheet below start inside the first viewport. Values and initiatives share one `SplitHeader` component; the job-boards page still carries its own copy of the layout at a smaller H1 scale (see Typography).
- **Charter** (values): a dark inset card (`bg-black-light`, About's side padding and stepped radius, no breakout) holding the four value tiles as two rows of two, under the pairs sentence. From `lg` each row has a label column (11rem, 14rem from `xl`) beside a two-up tile grid with 12px gaps (20px from `md`). Tiles are at least 19rem tall (22rem from `sm`, 24rem from `md`, 25rem from `xl`). There is no community row.
- **Value rows** (values): on the night ground, each group gets an Inter headline, then one row per value with no stations, dashed lines or hairlines. Each row has the charter's side padding and stepped radius, and 40px of vertical padding (56px from `md`, 64px at `xl`). From `lg` the name, tagline and window figure hang from the first tile's left edge, and the prose from the second's. The prose has no max width in that column, so its measure grows with the screen (about 340px at 1024px wide, 440px at 1280px), and is capped at 38rem below `lg`. A row that a tile's link points at takes a #1D1D1D card that fades in over 0.7s.
- **Homepage values section:** a dark inset card between Why and About, the same width and radius as the About card, inset with no breakout. From `xl` it has two columns. At the left sit the ringed headline, the bold lead (max 26rem), the two-line orange pill ("Read / our values") and the underlined "Explore our initiatives" link. At the right, the four values sit as a two-by-two register, each pair's names in a two-column grid from `sm`. Each name is ClashDisplay semibold, 36px (40px from `xl`), in the value's ink, and its 2px underline draws in on hover or focus over 0.5s. Under each name sits the value's text in Ash, 16px. There are no dots. On a phone the pairs stack, with 24px from each pair's label to its names, 36px between names and 88px between the pairs.
- **Doors** (initiatives): under a left-aligned ringed headline, two colour cards side by side from `md`, 12px apart (20px from `md`), at least 18rem tall (22rem from `md`). From `md` the two cards share their rows through subgrid, so the questions, sublines and actions line up across them.
- **Focus sheet** (initiatives): a paper sheet that breaks out to the column edge, on the same two-column grid as the split header from `lg`. The heading sits at the top left, the focus name and its text at the bottom left, and the hospital at night, drawn on the paper, as tall as the sheet, at the right.
- **Sticky toolbar:** from `lg`, a filter-and-search toolbar on the light sheet sticks at `top: 101px`, just under the stuck navbar. It uses the same break-out recipe as the sheet, so its paper background spans the sheet edge to edge.
- **Dense table:** one row per item. Headers are Inter bold 14px over a 2px black rule, and rows are separated by 1px black/10% hairlines with 20px vertical padding. Below `md`, each row becomes a two-column grid: name and kind on top, then the note, then the host. The header is hidden visually but kept for screen readers.
- **Closing section:** centred on the dark ground with generous margins (96–128px above, 80–112px below). A headline with one encircled word, a ≤42rem lede, then the orange pill.
- **Breakpoints:** Tailwind defaults (640 / 768 / 1024 / 1280 / 1536), plus local one-offs at 360, 580 and 1200px in homepage components.

### Named Rules
**The Shared Column Rule.** Content aligns to the logotype. Paper sheets break out with `-mx` and re-pad; dark cards stay inset with their own padding. Never pad twice.

## Elevation & Depth

The system is flat. Depth comes from the two grounds, from panels overlapping (hero pills sit over the sheet's top edge with a negative top margin), from offset photos, from a 105% scale on CTA hover, and from the pointer tilt on the cards, value tiles and door cards (no CSS scale on them). The one addition is light, not shadow: the lamp is a warm glow on the #111 ground, kept at about 10% alpha so the ground still reads #111 (see Motion). `BRAND.md` records this explicitly, and issue #46 removed the shadows.

### Shadow Vocabulary
- **Stuck toolbar hairline** (`box-shadow: 0 1px 0 rgb(17 17 17 / 0.1), 0 10px 18px -16px rgb(17 17 17 / 0.45)`): Appears only while the job-board toolbar is stuck over scrolling rows, fading in over 200ms ease-out. It shows state (content is passing underneath) and isn't used as decoration.
- **Floating nav hairline** (`box-shadow: 0 1px 0 rgb(248 248 248 / 0.08)`): Appears once the page has scrolled and the nav floats over the content. It shows state and isn't used as decoration.

### Named Rules
**The Flat At Rest Rule.** Nothing casts a shadow at rest. A shadow may appear only to show a live state, as the stuck toolbar and the floating nav do. Hover is shown with scale, colour fill, the pointer tilt on cards, or a small nudge of an arrow or a drawing's light.

## Shapes

- **Pills** (fully rounded): Every button and filter, including the big CTAs, the nav Contact outline, the kind filters, and the Thanks-page back button.
- **Sheets** (12px → 16px → 24px, stepping up at `sm` and `lg`): The light sheet and the dark inset cards.
- **Cards** (16px): Square-aspect feature cards and team photos.
- **Colour fields** (16px → 24px from `lg`): value tiles and door cards. A tile clips its illustration.
- **Arrow circles** (44px, fully round): a 2px `currentColor` outline on value tiles, a solid black disc on door cards, each holding a 20px SVG arrow.
- **Circles:** 10px kind dots, and the encircled-word ring (1px, 2px from `md`) drawn as a fully rounded orange outline covering the lower ~62% of the word.
- **Fields** have no radius and no box, only a 2px bottom rule.
- **Borders** are 2px black on the light sheet (pills, field rule, table header rule), 2px orange for the nav Contact, 1px black/10% for row hairlines on paper.
- **Drawn line:** the hospital's heartbeat is the one orange line on the surfaces: a solid 4-unit stroke in the drawing's own scale, square at its two ends, drawn in once by `data-draw`, with a bolder short segment that travels along it (see Illustrations).

## Motion

The motion comes from one concept. Its card:

```
Idea:        A lit window at night. The site is a dark room; the warm paper sheet is the window where work happens.
Metaphor:    Late-evening remote work: one lit window on a dark street. The visitor's pointer is the lamp.
Signature:   (1) The hero paper sheet opens like a window as you scroll into it (clip-path scrub).
             (2) A warm lamp glow follows the pointer and drifts at rest on the dark ground (one driver variable).
Emotion:     Warm, calm, handmade. Nothing bounces, nothing glows neon.
Motion verb: "settle like paper". Sheets slide and settle (expo.out). Big things move slower than small things.
Screenshot:  The hero mid-scroll with the window half open, pills overlapping the sheet edge.
```

**The motion verb is "settle like paper".** Sheets slide in and settle on `expo.out`, and big things move slower than small things. Every animation is a variant of it. Lenis smooths the scroll. Lenis, ScrollTrigger and the lamp all run on `gsap.ticker`. The timings and ease names are in the frontmatter, and new motion uses those names. Three existing effects are exceptions: the 3D title swing (`power2.inOut`), the About photo tilt (`power1.inOut`) and the letter roll's CSS curve (`cubic-bezier(0.165, 0.84, 0.44, 1)`).

### Signatures

The motion has two signatures.

- **Hero window.** The hero sheet (`data-window`) starts as a closed window and opens as you scroll into it. The clip is scrubbed to the scroll. The insets are under Homepage choreography.
- **Lamp.** `#lamp` is a fixed layer behind the content, with no pointer events and `aria-hidden`. It paints a warm radial glow on the #111 ground: an amber core at about 10% alpha that falls off through orange, so the ground still reads #111. The centre eases toward the pointer, scrolling nudges it a few percent, and it drifts once the pointer has rested. On touch there is no pointer, so the glow moves down the page with the scroll. It pauses while the tab is hidden.

### Data attributes

The engine in `src/scripts/motion/engine.ts` reads these:

- `data-split="lines|words|chars"`: masked text reveal on scroll, lines by default. Text that holds a link, button or field fades up instead, so no link is split.
- `data-split-intro`: plays the split in the page intro instead of on scroll. No markup uses it yet.
- `data-reveal="up|fade|clip|scale"`, with `data-delay`: one element reveals on scroll (1.0–1.4s, `expo.out`).
- `data-stagger`: the children of a grid reveal one after another, 60ms apart. The footer logo's `<svg>` wears it too, so its five paths rise in file order.
- `data-pop`: a mark inside a reveal or stagger grows from 60% to full size as its container plays (0.8s, 0.2s delay, 60ms apart). The hero and Why card icons use it, so each icon grows in with its card.
- `data-draw` (on an `<svg>`): each `path.draw[pathLength]` draws in once, when the figure's top reaches 80% of the viewport (1.2s, `expo.out`, 120ms apart). On the surfaces only the hospital's heartbeat uses it. The Why arrow's own `path[data-draw]` is scrubbed by `home.ts` instead.
- `data-illo` (on an `<svg>`, its value the piece's name): the drawing draws itself in, then lives at rest, in `illos.ts`, which the values and initiatives pages import. The rules are under Illustrations.
- `data-parallax="0.15"`: the element drifts through its pass by up to that fraction of the viewport height in each direction. Put it on a wrapper.
- `data-tilt`: a pointer tilt of up to 2.5 degrees, and nothing else: no highlight or sheen is painted over the card. Skipped on touch.
- `data-roll`: letter roll on a text link or button (CSS, 0.5s). The engine adds an `aria-hidden` second row.
- `data-navbar` and `data-nav-static`: the floating nav hides on scroll down past 80px and returns on scroll up. The static flag, set on the job boards `<main>`, keeps it from hiding.
- `data-logo`: the logo's star burst turns while the pointer or focus is on the logo. The footer logo wears it on its wrapper: that logo is decorative and takes no focus, so its star turns on hover only.
- `data-title`: the 3D word swing on a homepage H2, read by `home.ts` (see Homepage choreography). A ringed word inside it never wraps.
- `#lamp`: the lamp layer, moved through `--lamp-x` and `--lamp-y`.
- `data-street` (on the `<svg>` of the night street behind the footer logo): `street.ts` lights and flickers its windows, and the street follows `--lamp-x`. See Generative drawings.

### Homepage choreography

Home only, in `src/scripts/motion/home.ts`, with the hooks `data-intro`, `data-window`, `data-title`, `data-draw`, `data-head`, `data-story` and `data-rule`.

- **Intro.** One timeline that starts when the fonts are ready (600ms at most) and runs 1.3s at most. The wordmark's letters rise first (0.8s). The second line of the H1 rises from 0.3s, and the orange ring draws around its word from 0.6s. The two lede paragraphs fade up from 0.45s, the CTA pills settle in (up 24px, scale .96 to 1) from 0.5s, and the nav fades in last.
- **Hero window.** The sheet closes to an inset window: 14% of its height from the top, 6% of its width at each side and 10% of its height at the bottom. On desktop each inset stops where the content starts, so the heading, lede and cards are never clipped. Below 640px it closes to 6% at the top and sides and 4% at the bottom, with 24px corners (40px above). It opens to the sheet's own corner radius. The scrub runs from the sheet's top reaching 90% of the viewport to its top reaching 35%. The CTA pills sit outside the sheet, so they are never clipped.
- **3D titles.** The five section titles (hero, Why, About, the values section and the footer contact) split into words that start turned in 3D (`translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)`) and settle with `power2.inOut`, 0.02s apart. They play as the heading comes up from the bottom of the viewport and reverse when it scrolls back past. The Encircled ring fades in last.
- **Cards.** The service cards and the Why cards are `data-stagger` grids. Each card rises 32px and scales up from .96 over 1s, 60ms apart, once the grid's top reaches 80% of the viewport. Each card is also `data-tilt`.
- **Why arrow.** The arrow is inline SVG. Its white mask path (`data-draw`) sweeps along the dashed arrow as the arrow scrolls from 80% to 40% of the viewport, and the head (`data-head`) fades in last.
- **About.** The inset card rises (`data-reveal="up"`), the paragraphs split into lines, and the benefits rise one after another. The two photos drift in opposite directions on their own wrappers (`data-parallax` 0.08 and -0.08). The photo pair (`data-story`) tilts up to 10 degrees toward the pointer over 0.3s (`power1.inOut`) and levels again on leave. Touch skips the tilt.
- **CTA pills.** No `data-tilt` and no pointer light: the 105% hover scale is all they show. The press (`:active`) scales the pill to 97%, on top of that hover.
- **Footer.** The email's local part and domain each roll on hover and focus (`data-roll`). Each contact field's bottom rule wipes in from the left, one after another (1.2s, 80ms apart), once the form's top reaches 80% of the viewport (`data-rule`). The contact sheet has the hero sheet's rounded corners (12, 16 and 24px) on both ends, and on every page a closing band below it on the dark ground closes with the logotype itself, on one line: the inline `goodeworkers-line.svg`, the logo's own shapes with its two lines set on one baseline ("Go d" with the star burst for its second o, then "eWorkers", a word space apart: 0.4 of the cap height; nothing redrawn, no font), centred, `min(100%, 72rem)` wide (about 9:1, so about 130px tall at 72rem and 40px on a phone) and `aria-hidden`, since the copyright line spells the name. Its five paths are the engine's stagger (`data-stagger` on the `<svg>`): each rises out of the svg's bottom edge (32 units, more than the lockup is tall, so the edge is its mask), scales up from .96 and fades in over 1s (`expo.out`), 60ms apart in file order (the orange e, Workers, the lavender k, Good, and the yellow star burst last), once the logo's top reaches 80% of the viewport. The star burst turns on hover (`data-logo` on its wrapper, 6s a turn, hover only). The night street lies behind the logo, held at 75% (see Generative drawings).

### Other pages

- **Job boards.** Table rows rise as a batch as soon as any of them is on screen (24px, 40ms apart, once). A filter change stops waiting for scroll, and only the rows it newly shows rise (12px, 20ms apart, 0.4s, `power3.out`), so typing never re-fades the rows that stay; the page re-measures once typing pauses. The page sets `data-nav-static` on `<main>`, so the nav stays put above the sticky toolbar at 101px. The H1 splits into lines, the lede rises, and the join heading splits into words.
- **404, thanks and legal pages.** The headings split into lines and the panels rise (`data-reveal="up"`). On the 404 the orange numeral splits into characters (`data-split="chars"`, `aria-hidden`), and its copy rises 0.15s after the card. The pill has no reveal of its own. The legal copy's four-space blocks are set as prose, not as code boxes.
- **Contributors and projects.** On both galleries the H1 splits into lines, the lede rises 0.15s later and the grid is a `data-stagger` list. Each card is `data-tilt` on its link (no CSS transform of its own); the portrait or logo tile inside it keeps its hover zoom (105%, 102%) as a child, and that zoom and the name's orange both have `:focus-visible` twins. A person's page and a project's page split the H1, then rise the role line, the fact sheet and the sections in 0.08s steps (0.24s at most); the social pills and the contributors' pills are `data-stagger`. Neither page sets `data-nav-static`: nothing sticks under the nav.

### Values and initiatives

Both pages' headers split their H1 into lines and rise their lede 0.15s later. The homepage values card rises into view. Its ringed H2 takes the 3D word swing, the lead rises 0.1s later, and each pair's names rise one after another, 60ms apart. On the values page, the charter's pairs sentence splits into lines, the card rises, and its tiles rise in turn. Each tile tilts toward the pointer (`data-tilt`) and has no CSS hover scale, so GSAP owns its transform; its drawing, a child of the tile, moves only through its own inner groups. Each value row rises as it passes through the viewport. The interchange heading splits into words, its copy rises 0.1s later, and its pill takes the same 105% hover scale as the other pills. On the initiatives page, the values statement rises, and each phrase has a 3px underline in its value's ink, drawn without skipping descenders (`text-decoration-skip-ink: none`). On hover or focus the underline rises into a band of that ink over 0.5s, and the text goes black on the band. The focus sheet rises, its heading splits into lines, and the hospital draws itself in, its heartbeat once. The two door cards stagger in and tilt, and a focused door link gives its card the focus ring (`:has(:focus-visible)`). A link to a row on the same page, such as a charter tile, keeps its Back entry, glides there with Lenis (honouring the row's scroll margin), and the row takes a `:target` tint (`#1D1D1D`) that fades in over 0.7s. Back restores the previous place without a glide, and skip links stay native. A link from another page, such as the homepage's `/values/#openness`, lands under the curtain, and the row fades in place rather than rising.

### Page transitions

Navigation uses Astro view transitions with a paper curtain (`#curtain`, a #F8F8F8 sheet with 24px top corners, `aria-hidden`): it slides up over the page while the next one loads (0.8s, `expo.inOut`), the engine is torn down and rebuilt under it, then it lifts off (0.9s, `expo.inOut`) and the page intro starts at 55% of that lift. Back and forward and reduced motion swap at once with no sheet, the Netlify form post keeps a full browser load, and a link to the page you are on, such as the CTA pills (`#contact`, with the source in `data-from`) or the nav's `/?from=nav#contact`, does not swap: it updates history and glides to the hash. The lamp and the curtain persist across swaps, and links prefetch on hover.

### Generative drawings

One drawing is generated by code rather than stored: the night street. `src/lib/gen.ts` is the toolkit: a seeded generator (an FNV-1a hash of the seed text, then xorshift32), triangular draws, 1D value noise, jitter, a hand-drawn `loop` (with `start` and `power` options), a pen brush (`penD`) and Catmull-Rom curves (`smoothD`, `polylineD`). No stored art: the same seed draws the same picture.

- **Street.** `NightStreet.astro` draws the skyline behind the footer logo once at build time, seeded by the page path, so each page has its own: 11 to 16 buildings, 3 to 9 floors, 10 by 14 windows with 12 to 18% lit (yellow, one or two orange), rooftop details, a 1px ashgray pen at 18%, and at most 208 elements. The footer holds the whole drawing at 75%, so the brightest window reads 42% and the street stays quiet behind the logo's grey letters. `street.ts` runs one ticker callback while the band is on screen: a slow flicker, the lamp warming the windows near it (within 12% of the viewport width at most; touch follows the scroll), and one window changing every 20 to 40s, written in 0.05 steps. Static under reduced motion and without JS.
- **Icons.** The hero and Why card icons are stored filled SVG shapes, and `data-pop` grows each from 60% to full size with its card.

The street is not part of the Windows at night series (see Illustrations), so that series' drawing rules do not apply to it: it has its own 1px pen.

### Reduced motion and no JS

`html.motion` is set before first paint by an inline script in `<head>`, and only when JS runs and reduced motion is off. Everything that starts hidden is hidden by CSS gated on that class, by opacity, so without JS or under reduced motion the page is complete and still. Under reduced motion the engine skips its motion: no Lenis, scrubs, intro, tilts, logo spin, letter roll or lamp motion. The lamp rests as a still glow at 50% across and 40% down, and hover colours, underlines and the CTA scale stay. A failsafe covers an engine that never boots: after 4s the inline script sets `data-engine="off"` and removes `motion`, so content cannot stay hidden. It also covers a homepage chunk that fails alone: `home.ts` sets `data-home` on load, and a page with `[data-intro]` but no `data-home` after 4s loses `motion` too. The illustrations follow the same gate: with motion off a drawing shows whole (frames drawn, light on, nothing moving), and a drawing whose script fails shows itself whole. The street follows the same gate: it keeps its static drawing. The nav's transparent top state (the lamp shows through the bar) holds in every mode that has JS, reduced motion included, since the engine toggles `is-floating` in all of them. Without JS, or once the failsafe has switched the engine off, the bar stays solid.

### Accessibility

- Hover effects also run on focus: the letter roll, the logo spin and the CTA scale. The focus ring itself does not change.
- The cursor is the native one. There is no custom cursor.
- The motion's hover rules sit inside `@media (hover: hover)`, and so do Tailwind's `hover:` utilities (`future.hoverOnlyWhenSupported`), so a tap never leaves a hover state stuck. Touch devices get no tilt, and the lamp follows the scroll.
- Hidden states use opacity, never `visibility` or `display`. A link that is still hidden stays in the tab order, and focus on it plays its reveal at once (and so for the form's field rules and the job-board rows), even when it is already on screen below the trigger line, so its ring is never invisible. Whatever sits on the first screen at load is revealed at load.
- Decorative layers are `aria-hidden`: the lamp, the letter roll's second row, the Why arrow, the night street and the footer's closing logo. Split headings keep their text as an accessible name.
- The mobile menu keeps Escape and the scroll lock (Lenis stops while it is open), and the nav never hides while the menu is open or focus is inside it.

### Named Rules

**The Hyphen Rule.** A hyphen inside a word is non-breaking (see The Typeset Rule), so a hyphenated word never breaks at its hyphen and a split heading cannot reflow there. Other line breaks still need a check at both widths, or a reveal instead of a split. The French initiatives help heading ("Aidez-nous") keeps its split.

## Components

### Buttons
Big pill buttons are made to be pressed with the whole hand.
- **Shape:** fully rounded pill, full width up to 336px (the job-boards Join pill widens to fit from `sm`, with 48px side padding).
- **Primary:** orange fill with a pure-white ClashDisplay 700 label at 30–40px, padding 20px 28px. There is an optional small Inter label above, at 14–16px medium.
- **Hover:** scales to 105%, ease-in, with no shadow.
- **Variants:** yellow ("I am a nonprofit") and purple ("I want to help") use black labels.
- **Nav Contact:** a 2px orange outline pill with an Inter bold label. On hover it fills orange and the text turns black over 200ms.
- **Two-line pill:** the homepage values pill is orange, with a small Inter line ("Read") over a black ClashDisplay 700 label ("our values", 30px, 36px from `sm`, 40px at `xl`). The label is black because the white small line sat at 3.1:1 on orange. It has 48px side padding from `sm`, and the same 105% hover.
- **Text action:** an underlined Inter link (4px offset, 2px decoration) that turns orange on hover. It is used for "clear filters", inline links, and the homepage "Explore our initiatives" link (with a 16px arrow-right SVG).

### Chips (filter pills)
- **Style:** 2px black outline pill with an Inter bold label at 12–14px, an optional 10px kind dot on the left, and a count on the right in medium black/60.
- **State:** hover fills #ECECEC. When pressed (`aria-pressed="true"`), the pill fills black, the text turns grey, and the count turns grey/70. Pills are toggle buttons in a labelled group, and only one kind is active at a time.

### Cards / Containers
- **Light sheet:** paper ground, black text, 12→16→24px corners, bleeds to the column edges. No border, no shadow.
- **Dark inset card:** #1D1D1D, grey text, 12 → 16 → 24px corners (stepping at `sm` and `lg`), About's padding (40px top, 24px sides, 32px from `md`). Inset in the column, never broken out. The About, charter, homepage values, legal, thanks and 404 cards all use it.
- **Feature cards:** square, 16px corners, a #ECECEC fill (or orange, yellow, or purple for highlighted cards), a filled SVG icon at 20–24px that grows in with the card (`data-pop`), and a bold Inter label.

### Inputs / Fields
- **Style:** a form-field line with a transparent or paper background, no side or top border, a 2px black bottom rule, no horizontal padding, and 16px text. The contact form floats the label up from the placeholder position. The job-board search uses a fixed bold 14px label above the field, black/60 placeholder, and an orange caret.
- **Focus:** the bottom rule turns orange and a 2px orange ring with a 1px offset appears. The ring must stay visible (see the WCAG 2.4.7 note in `ContactForm.astro`).

### Navigation
- **Style:** sticky #111 bar holding the logotype (110px wide, 160px from `md`), the Initiatives, Contributors and Projects text links, the Contact pill, and the EN/FR switcher, 32px apart. Text is Inter bold, grey.
- **Text links (Initiatives, Contributors, Projects):** a 2px transparent bottom border with 4px padding below, each with the letter roll (`data-roll`). Hover turns the text orange (200ms). On the current page (`aria-current="page"`) the text and border are yellow; Contributors and Projects stay lit on a person's or a project's own page. The nav is rebuilt on every page change, so the state always belongs to the page you are on.
- **Mobile:** a hamburger opens a full-height #111 overlay that slides and fades in over 100ms ease-in and locks page scroll. Escape closes it. The current page's link is yellow there too.
- **Footer:** Values and Initiatives join the centred small links (above Job boards) that underline on hover.
- **Footer logo:** the page ends on the logotype itself, drawn and not set: the inline `goodeworkers-line.svg`, the logo's own shapes on one line (it carries its provenance in a comment; the navbar keeps the two-line `goodeworkers.svg`), on the #111 ground (`BRAND.md`: black or white grounds only, so the night street behind it stays a faint pen and dim windows). Centred, `min(100%, 72rem)` wide at about 9:1, `aria-hidden`. Its five paths stagger in on view and the star burst turns on hover (see Motion).

### Encircled Word (signature)
A single word in a heading is wrapped in a fully rounded orange outline, with 6px horizontal padding and the word set bold. The job-boards content model stores each heading as `before / encircled / after`, so the circled word is chosen in copy and not hard-coded.

### Comparison Table Row (job-boards)
- The name is ClashDisplay 600 at 18–20px. It underlines on hover (4px offset, 2px decoration) and dims to black/60 once `:visited`, so the reader sees where they stopped.
- The name link is stretched over the whole row (`after:inset-0`), and its focus outline is drawn on that stretched area in orange.
- The row fills #ECECEC on hover (150ms). A row targeted by its anchor is tinted yellow/30%. Each row has a stable slug id.
- The host is shown with a 14px `arrow-up-right` SVG to mark an external link that opens in a new tab. A screen-reader-only "new tab" note sits inside the link.

### Value Tile (signature)
A whole value, as one fat colour field you can press. The tiles sit in the charter's dark inset card.
- **Card:** the charter is a dark inset card (`bg-black-light`, About's side padding, 12 → 16 → 24px corners, no breakout) holding the four tiles as two rows of two. There is no community row.
- **Field:** the value's colour fill (Value Colour Rule), 16px → 24px corners (from `lg`), 24px → 32px → 40px padding. Labels are #111, pure white on pantone.
- **Content:** the value name in ClashDisplay 600 (36px, 32px at `sm`, 40px from `lg`, and fluid from 48px to 60px at `xl`), an Inter bold tagline at 18px (20px from `md`, max 14rem, 16rem from `md`, balanced), and a 44px outlined arrow-down circle pinned to the bottom-left. The whole tile is the link and jumps to the value's row.
- **Illustration:** the value's window at night (`tile` context: black pen, paper light), at the bottom-right, 52% of the tile's width (max 21rem) and nudged 4% past the corner so the field clips it. It draws itself in when it comes into view and then breathes.
- **Hover:** the tile tilts toward the pointer (`data-tilt`: up to 2.5 degrees at 97% size over 0.3s, tilt only), with no CSS scale. The arrow drops 4px, and the drawing's light holds at full while its swell and its moving parts double, eased over about half a second. Focus shows a 2px orange outline, 2px offset, and the same drawing.

### Value Row
A value as text on the night ground: a ClashDisplay name in the value's ink, an Inter bold tagline and Ash prose. There are no stations, dashed lines or hairlines.
- **Name:** ClashDisplay 600 at line-height 1: 36px, 48px from `md`, 64px at `xl`, 72px at `2xl`. Solidarity uses its lighter ink.
- **Tagline:** Inter bold, 20px (24px from `md`), balanced, max 22rem.
- **Prose:** Ash at 16px and 1.6875 line-height, in the third grid column from `lg` (see Layout).
- **Figure:** from `lg`, the value's window at night in small (18rem wide, 25:18, `night` context) sits 40px under the tagline, in a rounded box one night step up (#1D1D1D, #111 when the row is targeted) that clips what spills over its edge, so it reads as a window into the night.
- **Target:** a row that a tile's link points at takes a #1D1D1D card, which fades in over 0.7s.

### Interchange
The closing statement, set like the page header. The H2 sits at the left edge, capped at 40rem so it breaks to two lines at the larger sizes, with its words split in on view. The copy sits in the right column, one charter tile wide, and the orange pill sits below it in that column.
- **Pill:** "Explore our initiatives" on one line, with a pure-white ClashDisplay 700 label: 24px on phones, 36px from `sm`, and `clamp(24px, 2.4vw, 40px)` from `lg`, so it fits its column in both languages.
- **Motion:** the heading splits into words, the copy rises 0.1s later, and the pill takes the 105% hover scale.
- There are no drawn lines.

### Door Card
A way in: a yellow (organisations) or lavender (contributors) colour field, echoing the homepage's two path pills. The text is #111: an Inter 500 question at 24px (28px from `xl`), balanced and capped at 22ch; an Inter line at 16px (18px from `md`); and at the foot the ClashDisplay 700 action (24px, 30px from `lg`, 32px at `xl`) with a 44px black arrow-right circle.
- **Size:** at least 18rem tall (22rem from `md`), 16px corners (24px from `lg`), 28px padding (40px from `md`, 48px at `xl`).
- **Rows:** from `md` the two cards share their rows through subgrid, so the questions, sublines and actions line up whatever they wrap to.
- **Link:** the action link is stretched over the whole card. The card tilts toward the pointer like a value tile (`data-tilt`, no CSS scale), and the arrow slides 4px right.
- **Focus:** the card is not focusable, so a keyboard-focused link gives it the 2px orange outline (`:has(:focus-visible)`).

### 404 Card
The 404 page is a dark inset card in the column, with About's radius and side padding. Its picture is the numeral, `404`, which is `aria-hidden`.
- **Numeral:** ClashDisplay 700 in orange, at 27vw between 15rem and 25rem from `lg`. There it sits at the right and bleeds 0.07em off the card's right edge and 0.25em off its bottom edge, and the card clips it. Below `lg` it sits above the words at about 140px on phones (less on the narrowest screens), 176px from `sm` and 224px from `md`.
- **Words:** on the card's own padding, the H1 in ClashDisplay 700 (30px, 36px from `sm`, 48px at `xl`), then the copy in Ash, then the orange pill ("Go back home") with a pure-white ClashDisplay 700 label at 24px.
- **Focus:** the pill's focus outline is white, as on the thanks page's pill, because it sits on the dark card. It is the exception to the orange outline.
- **Motion:** the numeral splits into characters, the copy rises 0.15s after the card, and the pill has no reveal of its own.

### Illustrations
The "Windows at night" series: one drawing per value and one for the Initiatives focus, in one hand. Each is a window at night with a small scene that says the value, and light tells it: what is lit, where it spills, who shares it. Drawn for GoodEWorkers in 2026, as SVG by hand.
- **Subjects:** Openness, a window thrown wide on bare ground, pages lifting into the night and the light pouring out under the sill. Autonomy, one window lit at an hour of its own (lamp, plant, clock, moon) between two that sleep. Care, a mug handed from one window to the next across one shared pool of light. Solidarity, a facade whose windows light up one after another, the window with the hospital's H sign last and brightest. Health, the hospital as a dark silhouette with lit windows and an H sign on a pole on its roof, and a heartbeat across the sky, the one orange line.
- **Drawing rules:** viewBox 400x300 (the hospital 800x400), a 4-unit pen with round caps and joins, no fill but light, flat: no gradient, filter, shadow, clip path, mask, text or raster (the H of the hospital sign is drawn with the pen, one outline thin enough for the 4-unit stroke to fill, not set in type). Under 6 KB and 60 elements each. The window (120x150, radius 14), the sill and the margin (every stroke 12 units inside the box, but for the light under Openness) are shared by all five. Frames stay straight; the hand shows in scribbles, steam, stems, hands and the heartbeat.
- **Layers, as classes (a page shows each value twice, so no drawing carries an id):** `.frame` (every path is one stroke with `pathLength="1"`, in reveal order), `.light` (the spill, the panes and `.stars`; `.idle-glow` is the spill), `.idle-*` (parts that move at rest), `.late` (fades in with the light), `.pulse` with `.draw` (the heartbeat's line) and `.beat` (its travelling segment).
- **Grounds, as custom properties set by the component's `context` prop (`illustration.css`; each drawing carries a default for every property):** `tile`, on a value's colour: `--ink` #111, `--light` #F8F8F8, `--spill` paper at 60%, `--dim` .75. `night`, on #111 or #1D1D1D: `--ink` #ECECEC, `--light` #F8F8F8, `--dim` .6, and the value's colour spills (the default). `paper`, the hospital on the sheet: `--light` yellow, `--spill` yellow at 55%, `--star` transparent, `--dim` .6. Over a lit shape the pen is #111 on every ground, and `--dim` is the only opacity a line has (unlit things).
- **Where each lives:** inline SVG components in `src/components/Illustrations/` on one `Illustration` root (`Openness`, `Autonomy`, `Care`, `Solidarity`, `Health`; `ValueIllustration` picks one by value id). The charter tile: bottom right, `tile` context. The value row, from `lg`: a 288x207 box in `night` context. The focus sheet: the hospital on the paper itself, `paper` context, the width of its column. The homepage values section has no illustration.
- **Reveal (`data-illo`):** when the drawing's top reaches 85% of the viewport (at load if it is on the first screen, held for the page intro behind a curtain) the `.frame` paths draw in document order, so the window frame comes first: `stroke-dashoffset` 1 to 0, 1.1s, `expo.out`, 0.04s apart. `.light` and the `.late` parts fade in over 0.6s (`power3.out`), from 70% of the draw. Solidarity's windows then switch on from the bottom, 1.2s each and 3s in all. Once only. Hidden states are in `illustration.css`, gated on `html.motion`.
- **Life at rest:** from the end of the reveal, one `gsap.ticker` callback per drawing that is on screen, added and removed by a ScrollTrigger and idle while the tab is hidden. Every motion is a function of the ticker's time, eases in over 2s, and is written through `gsap.quickSetter` only when its value, rounded to what the eye can tell apart, has changed (under one write per frame in practice, three at most). The spill breathes (opacity 0.9 to 1 and a 2.5% swell, 4 to 6s; the phase comes from the piece's name, so a tile and the row of one value breathe together). Openness: the pages lift 2 to 6 units and tilt up to 2 degrees, 5s. Autonomy: the moon drifts 2 units over 20s, the leaf sways 2 degrees about its stem in 4s. Care: the two curls of steam rise 2 units and thin to 60%, 3s, half a cycle apart. Solidarity: one window blinks off and on (0.8s) every 25 to 40s. Health: a bold short segment leaves the heartbeat's left end every 2.4s and crosses in two thirds of that, and one window flickers twice every 20s.
- **Hover and focus (tiles):** pointing at the tile, or keyboard focus on it, holds the light at full and doubles the swell and the moving parts, eased; leaving eases them back. Touch has the same life at rest and no hover.
- **Accessibility:** decorative: `aria-hidden`, `focusable="false"`, no role, no `<img>`.

## Do's and Don'ts

### Do:
- **Do** alternate the #111 ground and the #F8F8F8 sheet, and break the sheet out to the column edge with `-mx-4 md:-mx-8 px-4 md:px-8`.
- **Do** give each view one orange action, and use a pure-white label only on the large CTA pill.
- **Do** encircle at most one word per heading, and pick it in the copy.
- **Do** put a text label next to every kind dot.
- **Do** use a 2px orange outline (or ring) with a 2px offset on every focusable element, except the pills on the dark thanks and 404 cards, which take a white outline.
- **Do** keep ClashDisplay for the brand name, CTA labels, the footer contact heading, and names a visitor clicks.
- **Do** show hover with scale (CTAs), fill (#ECECEC on the sheet, orange on the nav pill) or the pointer tilt (cards), and keep CSS transitions to 150–200ms.
- **Do** keep `prefers-reduced-motion` switching off smooth scroll and transitions, and keep drawn lines fully drawn and static under it.
- **Do** keep one clock. Everything runs on `gsap.ticker`: Lenis, ScrollTrigger and the lamp. Add no `requestAnimationFrame` loop and no `scroll` listener of your own; use ScrollTrigger or Lenis callbacks.
- **Do** gate every hidden state on `html.motion`, and hide it with opacity, never `visibility`.
- **Do** give each value its own colour everywhere it appears, and keep the four roles fixed.
- **Do** set labels on a pantone fill in pure white, and on every other value fill in #111.
- **Do** reveal a drawn line with `path.draw[pathLength]` inside an `svg[data-draw]`, and a whole drawing with `svg[data-illo]`.
- **Do** draw a new illustration in the Windows at night series: the shared window, the 4-unit pen, the layer classes and the three grounds, inline in a component that says it was drawn for GoodEWorkers.

### Don't:
- **Don't** add resting shadows. The only shadows in the system are the state hairlines on a stuck toolbar and the floating nav.
- **Don't** place the logo, or any surface, on a mid-value ground (`BRAND.md`).
- **Don't** set small text in white on orange. Below large-bold size, labels on orange are black.
- **Don't** use Tailwind's stock palette (gray-500/600/900, indigo-600) or stock UI recipes. Use the brand tokens and black alpha steps.
- **Don't** add a second horizontal padding layer inside the shared column.
- **Don't** use glyph or emoji icons. Icons are inline SVG from `src/assets/icons/`, drawn in `currentColor`: line arrows, and filled shapes on the feature cards.
- **Don't** add small uppercase labels above headings. The system has no eyebrow or kicker device.
- **Don't** put a CSS `transform` on an element GSAP animates. Put Tailwind offsets on a wrapper, as the About photos do.
- **Don't** add a second signature moment. The hero window and the lamp are the two.
- **Don't** hotlink or rasterise illustrations, add a gradient, filter or shadow to one, or mix in drawings from another illustration style.
- **Don't** colour prose or taglines with a value colour. Values show their colour as fills, as the ink of their names, and as underlines.
