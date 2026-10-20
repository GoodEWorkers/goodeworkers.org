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
    fontSize: "2.25rem → 6rem (job-boards H1 36px → 72px; shared split-header H1 48px → 96px; homepage hero to 74px)"
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
    fontSize: "1.5rem → 3.75rem (24–30px in lists; 36px → 60px on charter tiles)"
    fontWeight: 600
    lineHeight: 1
  door-action:
    fontFamily: "ClashDisplay, Arial Narrow, Impact, system-ui, sans-serif"
    fontSize: "1.5rem → 1.875rem"
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
  button-cta-black:
    backgroundColor: "{colors.black}"
    textColor: "{colors.grey}"
    typography: "{typography.cta}"
    rounded: "{rounded.pill}"
    padding: "20px 48px"
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
    rounded: "{rounded.panel-md}"
    padding: "40px 32px"
  feature-card:
    backgroundColor: "{colors.grey}"
    textColor: "{colors.black}"
    rounded: "{rounded.card}"
  value-tile-openness:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "{rounded.panel-lg}"
    padding: "24px → 40px"
  value-tile-autonomy:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "{rounded.panel-lg}"
    padding: "24px → 40px"
  value-tile-care:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.black}"
    typography: "{typography.value-name}"
    rounded: "{rounded.panel-lg}"
    padding: "24px → 40px"
  value-tile-solidarity:
    backgroundColor: "{colors.pantone}"
    textColor: "{colors.white-pure}"
    typography: "{typography.value-name}"
    rounded: "{rounded.panel-lg}"
    padding: "24px → 40px"
  door-card-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.black}"
    typography: "{typography.door-action}"
    rounded: "{rounded.panel-lg}"
    padding: "28px → 48px"
  door-card-purple:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.black}"
    typography: "{typography.door-action}"
    rounded: "{rounded.panel-lg}"
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

Four colours also stand for the four values (Openness, Autonomy, Care, Solidarity) and keep that meaning wherever a value appears: the tile fill, the station and dashed line beside its text, the dot by its name, and the accent in its doodle. The illustrations are hand-drawn CC0 line doodles and people, recoloured to the palette, so the "made by people" feeling carries into the pictures.

The system is flat. It builds depth from the contrast between the two grounds, from panels overlapping, and from scale on hover. Shadows are not part of it.

**Key Characteristics:**
- Two grounds: #111 near-black and the #F8F8F8 rounded sheet, alternating down the page.
- One orange ring around one word per heading.
- Accents work as fills (pills, cards, value tiles, door cards), as dots and lines, or as a state (hover, current page). They never set reading text.
- Four value colours with fixed roles: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone.
- CC0 line illustrations (Open Doodles, Open Peeps) in #111 line, recoloured to tokens, self-hosted as SVG.
- Fat rounded pill CTAs with a ClashDisplay bold label; `hover` scales them to 105%.
- Flat surfaces; no resting shadows.
- Inter for reading and UI; ClashDisplay for the brand name, names you click, and CTA labels.

## Colors

A warm three-accent palette on near-black, with off-white as the working surface.

### Primary
- **Signal Orange** (orange): The one action per view: the Join and Send pills, the values page "Putting our values into practice" pill, the nav Contact outline, the encircled-word ring, focus rings and outlines, the search caret, and link hover. Also the "e" of the wordmark, Care's value colour, and the dashed heartbeat line on the Initiatives focus card.

### Secondary
- **Marigold** (yellow): The "I am a nonprofit" pill, a Why card fill, the skip-link background, text selection on the job-boards, values and initiatives pages, the `:target` row tint (at 30%), the "remote-only" kind dot, the current-page state of the nav Initiatives link, and the organisations door card. Openness's value colour.

### Tertiary
- **Lavender** (purple): The "I want to help" pill, a Why card fill, the About list heading, the "startups and niches" kind dot, and the contributors door card. Autonomy's value colour.
- **Pantone Periwinkle** (pantone): Solidarity's value colour. It began as the job-boards "search engines" kind dot and is now also a large tile fill, line and doodle accent. It is the only fill dark enough to need light text: pure white reads at about 5.1:1 on it, #111 only 3.7:1. `BRAND.md` does not list it yet.

### Neutral
- **Night Ground** (black): The page background and the default text colour on light surfaces. Black pills and rules on the light sheet use it too.
- **Raised Night** (black-light): Inset cards on the dark ground (About panel, legal and thanks panels).
- **Paper** (white): The light sheet (hero, job-board table, footer). This is the brand off-white.
- **Pure White** (white-pure): Two uses only. Large labels on an orange fill (`#F8F8F8` on orange is 2.92:1; pure white reaches 3.10:1, which passes the large-text floor), and every label on a pantone tile (about 5.1:1, so taglines at 16–18px bold pass too).
- **Light Grey** (grey): Headings and text on the dark ground, light feature cards, and the hover fill of rows and pills on the sheet.
- **Ash** (ashgray): Body copy and ledes on the dark ground. At 70% it is used for secondary meta such as "links checked".

Text on the sheet steps down by alpha on black: 80% for supporting prose, 70% for meta and table secondary columns, 60% for placeholders, counts, and visited links. `BRAND.md` lists two reserve tokens, `primary` (#DEB36F) and `background` (#2B0E45). Both are in the Tailwind config but nothing uses them yet.

### Named Rules
**The Two Grounds Rule.** Every surface is either the #111 ground or the #F8F8F8 sheet, with #1D1D1D insets on dark and #ECECEC cards on light. Don't use a mid-value ground.

**The Orange Label Rule.** A label on an orange fill is pure white only at large bold sizes (the 30–40px ClashDisplay CTA). Smaller text on orange is black.

**The Dot Never Speaks Alone Rule.** A kind dot (10px circle) always sits beside its text label. The yellow dot on paper is well under 3:1, so the dot is only a wayfinding echo and can't be the only signal. Kind colours: remote-only yellow, vetted orange, startups and niches purple, freelance black, search engines pantone. On a pressed black pill, the dot gets a 1px grey ring so the black dot stays visible. The homepage values list uses the same 10px dot beside each value name.

**The Value Colour Rule.** Each value owns one colour, everywhere it appears: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone. The colour fills its tile, rings its station, dashes its line, marks its dot, underlines its name when linked from prose, and accents its doodle on paper. Never swap or reuse a value colour for a different value. Care's orange tile is a value field, not an action: on a page with the Care tile, the orange pill is still the only orange action.

## Typography

**Display Font:** ClashDisplay, variable 200–700 (with Arial Narrow, Impact, system-ui)
**Body Font:** Inter (with Arial)

**Character:** Inter carries almost everything, set at medium and bold, with generous leading. ClashDisplay is the brand's own voice, a geometric face kept for the moments the brand speaks: its name, the pill labels, and names a visitor clicks.

### Hierarchy
- **Display** (Inter 500, line-height 1.25): Page H1s on the dark ground. The job-boards H1 runs 36px → 72px; the shared split header (values, initiatives) runs 48px → 96px. The homepage hero goes to 74px/83px, with the brand words set in ClashDisplay in yellow, orange and purple. The two split-header scales are a known divergence (see Layout).
- **Headline** (Inter 500, 30px → 54px, line-height 1.2 → ~1.17): Section headings on either ground, such as the Why, About, and Join sections and the hero panel. The emphasised or encircled word is bold.
- **Title** (ClashDisplay 600, 18px → 20px): Clickable names in a list, such as the board names and tool names in the job-board table. The footer contact heading uses ClashDisplay 700 at 30–36px.
- **Value Name** (ClashDisplay 600, line-height 1): A value name that is a link. 36px → 60px on the charter tiles, 24–30px in the homepage values list. On the values page rows, where the name is a heading and not a link, it is Inter 500 at 30px → 48px.
- **Door Action** (ClashDisplay 700, 24px → 30px): The action line at the foot of a door card, followed by the black arrow circle.
- **CTA** (ClashDisplay 700, 30px → 40px; 26px on narrow screens when the label must stay on one line): The label inside the large pill buttons.
- **Body** (Inter 500, 14px → 16px, line-height 1.6875 ≈ 27px at 16px): All reading copy and ledes. Ledes run at most 42rem wide (`max-w-2xl`), and centred copy at most 48rem.
- **Label** (Inter 700, 12px → 14px): Nav, filter pills, field labels, and table headers.

### Named Rules
**The Brand Voice Rule.** ClashDisplay appears only for the brand name (the H1 wordmark and the footer's closing band), CTA pill labels, the footer contact heading, the 404 numeral, and names or actions a visitor clicks (board and tool names, value names on tiles and in the homepage list, door-card actions). Headings, taglines, prose and UI are set in Inter.

**The Balanced Headings Rule.** H1s and H2s are set with `text-wrap: balance`, so none ends on a lone word. The homepage H1 is the exception: SplitText keeps it split for good, and a layout balanced before the split is not the one its lines end up in. The Encircled wrapper ends in a zero-width joiner (`.encircled::after`) so Chromium's balanced breaking keeps the ring with its word.

**The Hollow Bold Rule (known gap).** The system intends Inter at 500 and 700. But `src/styles/global.css` maps the single `Inter-Regular.ttf` to weights 400–700, so every Inter `font-medium` and `font-bold` currently renders at 400. Record and design to the intended weights. Don't retune sizes or colours to make up for the missing weight. This is pre-existing drift, reported to the owner, and not fixed here.

**Divergence from BRAND.md.** `BRAND.md` says section headings use `font-clash font-medium`. In the shipped code, every section heading and H1 (homepage Why/About/hero panel and the job-boards page) is Inter, and ClashDisplay is used only as described in the Brand Voice Rule. The owner should decide which one is canonical.

## Layout

There is one shared column. It is max 1536px wide, centred, with 16px gutters (32px from `md`), and it is the same column the navbar and footer use. Content inside it never adds a second layer of horizontal padding. A surface that has to be wider than the column (the hero sheet, the job-board sheet) breaks out with negative margins of the same size and re-applies them as padding. The panel bleeds to the column edge, but its content stays aligned with the logotype. A card that sits *within* the column (About, legal) keeps its own padding and is inset on purpose.

- **Navbar:** sticky at the top, #111, 101px tall once stuck at `lg` (with a 64px top margin before sticking).
- **Split page header** (job-boards, values, initiatives): on the dark ground, the H1 sits left and a lede-plus-meta column (max 27rem) sits right, bottom-aligned, from `lg`. Below `lg` they stack. This lets the sheet below start inside the first viewport. Values and initiatives share one `SplitHeader` component; the job-boards page still carries its own copy of the layout at a smaller H1 scale (see Typography).
- **Charter** (values): a paper sheet holding the four value tiles as two rows of two. From `lg` each row has a label column (11rem, 14rem from `xl`) beside a two-up tile grid with 12–20px gaps. Tiles are at least 19rem tall (22rem from `sm`, 25rem from `xl`). An Open Peeps lineup (max 64rem) stands on the sheet's lower edge, with no bottom padding under it.
- **Value rows** (values): on the night ground, each pair gets an Inter headline, then rows separated by grey/15% hairlines with 40–56px vertical padding. From `lg` a row is a 12-column grid: name and tagline in 4 columns, prose (max 42rem) from column 6. Rows indent 40–56px on the left to make room for the station and line. A row targeted by a tile's anchor fills #1D1D1D.
- **Homepage values section:** a paper sheet between Why and About. A split heading (ringed headline left, bold lede right, max 24rem). Below, two pairs side by side from `lg`, the second pair dropped 96px so the four don't read as one even row. It closes with the black pill and an underlined text link to Initiatives.
- **Doors** (initiatives): two colour cards side by side from `md`, 12–20px gap, at least 18rem tall (22rem from `md`), under a centred ringed headline.
- **Sticky toolbar:** from `lg`, a filter-and-search toolbar on the light sheet sticks at `top: 101px`, just under the stuck navbar. It uses the same break-out recipe as the sheet, so its paper background spans the sheet edge to edge.
- **Dense table:** one row per item. Headers are Inter bold 14px over a 2px black rule, and rows are separated by 1px black/10% hairlines with 20px vertical padding. Below `md`, each row becomes a two-column grid: name and kind on top, then the note, then the host. The header is hidden visually but kept for screen readers.
- **Closing section:** centred on the dark ground with generous margins (96–128px above, 80–112px below). A headline with one encircled word, a ≤42rem lede, then the orange pill.
- **Breakpoints:** Tailwind defaults (640 / 768 / 1024 / 1280 / 1536), plus local one-offs at 360, 580 and 1200px in homepage components.

### Named Rules
**The Shared Column Rule.** Content aligns to the logotype. Break out with `-mx` and re-pad; never pad twice.

## Elevation & Depth

The system is flat. Depth comes from the two grounds, from panels overlapping (hero pills sit over the sheet's top edge with a negative top margin), from offset photos, from a 105% scale on CTA hover, and from the pointer tilt on the cards, value tiles and door cards (no CSS scale on them). The one addition is light, not shadow: the lamp is a warm glow on the #111 ground, kept under 10% alpha so the ground still reads #111 (see Motion). `BRAND.md` records this explicitly, and issue #46 removed the shadows.

### Shadow Vocabulary
- **Stuck toolbar hairline** (`box-shadow: 0 1px 0 rgb(17 17 17 / 0.1), 0 10px 18px -16px rgb(17 17 17 / 0.45)`): Appears only while the job-board toolbar is stuck over scrolling rows, fading in over 200ms ease-out. It shows state (content is passing underneath) and isn't used as decoration.
- **Floating nav hairline** (`box-shadow: 0 1px 0 rgb(248 248 248 / 0.08)`): Appears once the page has scrolled and the nav floats over the content. It shows state and isn't used as decoration.

### Named Rules
**The Flat At Rest Rule.** Nothing casts a shadow at rest. A shadow may appear only to show a live state, as the stuck toolbar and the floating nav do. Hover is shown with scale, colour fill, the pointer tilt and highlight on cards, or a small nudge of an arrow or doodle.

## Shapes

- **Pills** (fully rounded): Every button and filter, including the big CTAs, the nav Contact outline, the kind filters, and the Thanks-page back button.
- **Sheets** (12px → 16px → 24px, stepping up at `sm` and `lg`): The light sheet and the dark inset cards.
- **Cards** (16px): Square-aspect feature cards and team photos.
- **Colour fields** (16px → 24px from `lg`): value tiles, door cards and the Initiatives focus card. They clip their illustration.
- **Arrow circles** (44px, fully round): a 2px `currentColor` outline on value tiles, a solid black disc on door cards, each holding a 20px SVG arrow.
- **Circles:** 10px kind and value dots, value-row stations (20px, 3px ring in the value colour, #111 fill), and the encircled-word ring (1px, 2px from `md`) drawn as a fully rounded orange outline covering the lower ~62% of the word.
- **Fields** have no radius and no box, only a 2px bottom rule.
- **Borders** are 2px black on the light sheet (pills, field rule, table header rule), 2px orange for the nav Contact, 1px black/10% for row hairlines on paper, and 1px grey/15% for row hairlines on the night ground.
- **Value lines:** dashed, never solid. In CSS a 2px vertical `repeating-linear-gradient` (8px dash, 8px gap); in SVG a 3–4px round-capped stroke with 8–10px dashes and 9–10px gaps.

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
- **Lamp.** `#lamp` is a fixed layer behind the content, with no pointer events and `aria-hidden`. It paints a warm radial glow on the #111 ground, under 10% alpha, so the ground still reads #111. The centre eases toward the pointer, scrolling nudges it a few percent, and it drifts once the pointer has rested. On touch there is no pointer, so the glow moves down the page with the scroll. It pauses while the tab is hidden.

### Data attributes

The engine in `src/scripts/motion/engine.ts` reads these:

- `data-split="lines|words|chars"`: masked text reveal on scroll, lines by default. Text that holds a link, button or field fades up instead, so no link is split.
- `data-split-intro`: plays the split in the page intro instead of on scroll. No markup uses it yet.
- `data-reveal="up|fade|clip|scale"`, with `data-delay`: one element reveals on scroll (1.0–1.4s, `expo.out`).
- `data-stagger`: the children of a grid reveal one after another, 60ms apart.
- `data-pop`: a mark inside a reveal or stagger, such as a value's dot, that grows from 60% to full size as its container plays (0.8s, 0.2s delay, 60ms apart).
- `data-draw` (on an `<svg>`): each `path.draw[pathLength]` draws in once, when the figure's top reaches 80% of the viewport (1.2s, `expo.out`, 120ms apart). The Why arrow's own `path[data-draw]` is scrubbed by `home.ts` instead.
- `data-parallax="0.15"`: the element drifts through its pass by up to that fraction of the viewport height in each direction. Put it on a wrapper.
- `data-tilt`: a pointer tilt of up to 2.5 degrees, with a light that follows the pointer. `data-tilt="glow"` is the light alone. Skipped on touch.
- `data-roll`: letter roll on a text link or button (CSS, 0.5s). The engine adds an `aria-hidden` second row.
- `data-navbar` and `data-nav-static`: the floating nav hides on scroll down past 80px and returns on scroll up. The static flag, set on the job boards `<main>`, keeps it from hiding.
- `data-logo`: the logo's star burst turns while the pointer or focus is on the logo.
- `data-title`: the 3D word swing on a homepage H2, read by `home.ts` (see Homepage choreography). A ringed word inside it never wraps.
- `#lamp`: the lamp layer, moved through `--lamp-x` and `--lamp-y`.

### Homepage choreography

Home only, in `src/scripts/motion/home.ts`, with the hooks `data-intro`, `data-window`, `data-title`, `data-draw`, `data-head`, `data-story` and `data-rule`.

- **Intro.** One timeline that starts when the fonts are ready (600ms at most) and runs 1.3s at most. The wordmark's letters rise first (0.8s). The second line of the H1 rises from 0.3s, and the orange ring draws around its word from 0.6s. The two lede paragraphs fade up from 0.45s, the CTA pills settle in (up 24px, scale .96 to 1) from 0.5s, and the nav fades in last.
- **Hero window.** The sheet closes to an inset window: 14% of its height from the top, 6% of its width at each side and 10% of its height at the bottom. On desktop each inset stops where the content starts, so the heading, lede and cards are never clipped. Below 640px it closes to 6% at the top and sides and 4% at the bottom, with 24px corners (40px above). It opens to the sheet's own corner radius. The scrub runs from the sheet's top reaching 90% of the viewport to its top reaching 35%. The CTA pills sit outside the sheet, so they are never clipped.
- **3D titles.** The five section titles (hero, Why, About, the values section and the footer contact) split into words that start turned in 3D (`translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)`) and settle with `power2.inOut`, 0.02s apart. They play as the heading comes up from the bottom of the viewport and reverse when it scrolls back past. The Encircled ring fades in last.
- **Cards.** The service cards and the Why cards are `data-stagger` grids. Each card rises 32px and scales up from .96 over 1s, 60ms apart, once the grid's top reaches 80% of the viewport. Each card is also `data-tilt`.
- **Why arrow.** The arrow is inline SVG. Its white mask path (`data-draw`) sweeps along the dashed arrow as the arrow scrolls from 80% to 40% of the viewport, and the head (`data-head`) fades in last.
- **About.** The inset card rises (`data-reveal="up"`), the paragraphs split into lines, and the benefits rise one after another. The two photos drift in opposite directions on their own wrappers (`data-parallax` 0.08 and -0.08). The photo pair (`data-story`) tilts up to 10 degrees toward the pointer over 0.3s (`power1.inOut`) and levels again on leave. Touch skips the tilt.
- **CTA pills.** `data-tilt="glow"` adds the pointer light with no rotation. The press (`:active`) scales the pill to 97%, on top of the existing 105% hover.
- **Footer.** The email's local part and domain each roll on hover and focus (`data-roll`). Each contact field's bottom rule wipes in from the left, one after another (1.2s, 80ms apart), once the form's top reaches 80% of the viewport (`data-rule`). The contact sheet has the hero sheet's rounded corners (12, 16 and 24px) on both ends, and on every page a closing band below it on the dark ground sets the H1's wordmark at `clamp(2rem, 11vw, 12rem)`, centred and `aria-hidden`. Its letters rise through a mask as the band comes into view (`data-split="chars"`, 0.9s, `expo.out`, 0.35s across all letters).

### Other pages

- **Job boards.** Table rows rise as a batch as soon as any of them is on screen (24px, 40ms apart, once). A filter change stops waiting for scroll, and only the rows it newly shows rise (12px, 20ms apart, 0.4s, `power3.out`), so typing never re-fades the rows that stay; the page re-measures once typing pauses. The page sets `data-nav-static` on `<main>`, so the nav stays put above the sticky toolbar at 101px. The H1 splits into lines, the lede rises, and the join heading splits into words.
- **404, thanks and legal pages.** The headings split into lines and the panels rise (`data-reveal="up"`). The 404 opens with a giant `404` in ClashDisplay bold, one brand accent per digit (`data-split="chars"`, `aria-hidden`), and its text and button rise 0.15s and 0.3s after the heading. The legal copy's four-space blocks are set as prose, not as code boxes.

### Values and initiatives

The homepage values section, between Why and About, is a paper sheet that rises into view. Its ringed H2 takes the 3D word swing like the other homepage titles, the lead rises 0.1s later, and each pair of values rises one item after another, 60ms apart, with a dot that pops beside each name. On the values page, the charter's pairs sentence splits into lines and each row of tiles rises in turn. Each tile tilts toward the pointer (`data-tilt`) and has no CSS hover scale, so GSAP owns its transform. Each value row rises, its station dot pops and its dashed line wipes down as the row passes through the viewport. The interchange heading splits into words, and its four value lines draw in once, converging on the orange pill. On the initiatives page, the focus sheet rises, its pulse line draws in and the illustration scales in. The two door cards stagger in and tilt, and a focused door link gives its card the same ring and highlight (`:has(:focus-visible)`). A link to a row on the same page, such as a charter tile, keeps its Back entry, glides there with Lenis (honouring the row's scroll margin), and the row takes a `:target` tint (`#1D1D1D`) once it arrives. Back restores the previous place without a glide, and skip links stay native. A link from another page, such as the homepage's `/values/#openness`, lands under the curtain, and the row fades in place rather than rising.

### Page transitions

Navigation uses Astro view transitions with a paper curtain (`#curtain`, a #F8F8F8 sheet with 24px top corners, `aria-hidden`): it slides up over the page while the next one loads (0.8s, `expo.inOut`), the engine is torn down and rebuilt under it, then it lifts off (0.9s, `expo.inOut`) and the page intro starts at 55% of that lift. Back and forward and reduced motion swap at once with no sheet, the Netlify form post keeps a full browser load, and a link to the page you are on, such as the CTA pills (`#contact`, with the source in `data-from`) or the nav's `/?from=nav#contact`, does not swap: it updates history and glides to the hash. The lamp and the curtain persist across swaps, and links prefetch on hover.

### Reduced motion and no JS

`html.motion` is set before first paint by an inline script in `<head>`, and only when JS runs and reduced motion is off. Everything that starts hidden is hidden by CSS gated on that class, by opacity, so without JS or under reduced motion the page is complete and still. Under reduced motion the engine skips its motion: no Lenis, scrubs, intro, tilts, logo spin, letter roll or lamp motion. The lamp rests as a still glow at 50% across and 40% down, and hover colours, underlines and the CTA scale stay. A failsafe covers an engine that never boots: after 4s the inline script sets `data-engine="off"` and removes `motion`, so content cannot stay hidden. It also covers a homepage chunk that fails alone: `home.ts` sets `data-home` on load, and a page with `[data-intro]` but no `data-home` after 4s loses `motion` too. The nav's transparent top state (the lamp shows through the bar) holds in every mode that has JS, reduced motion included, since the engine toggles `is-floating` in all of them. Without JS, or once the failsafe has switched the engine off, the bar stays solid.

### Accessibility

- Hover effects also run on focus: the card highlight, the letter roll, the logo spin and the CTA scale. The focus ring itself does not change.
- The cursor is the native one. There is no custom cursor.
- The motion's hover rules sit inside `@media (hover: hover)`, and so do Tailwind's `hover:` utilities (`future.hoverOnlyWhenSupported`), so a tap never leaves a hover state stuck. Touch devices get no tilt, and the lamp follows the scroll.
- Hidden states use opacity, never `visibility` or `display`. A link that is still hidden stays in the tab order, and focus on it plays its reveal at once (and so for the form's field wipe and the job-board rows), even when it is already on screen below the trigger line, so its ring is never invisible. Whatever sits on the first screen at load is revealed at load.
- Decorative layers are `aria-hidden`: the lamp, the letter roll's second row and the Why arrow. Split headings keep their text as an accessible name.
- The mobile menu keeps Escape and the scroll lock (Lenis stops while it is open), and the nav never hides while the menu is open or focus is inside it.

### Named Rules

**The Hyphen Rule.** A hyphenated word that wraps at its hyphen reflows when the split reverts. Check the heading at both widths, or use a reveal instead. The French initiatives help heading ("Aidez-nous") was measured stable at 1440 and 390, so it keeps its split.

## Components

### Buttons
Big pill buttons are made to be pressed with the whole hand.
- **Shape:** fully rounded pill, full width up to 336px (the job-boards Join pill widens to fit from `sm`, with 48px side padding).
- **Primary:** orange fill with a pure-white ClashDisplay 700 label at 30–40px, padding 20px 28px. There is an optional small Inter label above, at 14–16px medium.
- **Hover:** scales to 105%, ease-in, with no shadow.
- **Variants:** yellow ("I am a nonprofit") and purple ("I want to help") use black labels.
- **Nav Contact:** a 2px orange outline pill with an Inter bold label. On hover it fills orange and the text turns black over 200ms.
- **Black pill:** on the paper sheet, where an orange pill would compete with the page's real primary action (the homepage "Read our values"): #111 fill, grey ClashDisplay label, 48px side padding from `sm`, same 105% hover.
- **Text action:** an underlined Inter link (4px offset, 2px decoration) that turns orange on hover. It is used for "clear filters", inline links, and the homepage "See our initiatives" link (with a 16px arrow-right SVG).

### Chips (filter pills)
- **Style:** 2px black outline pill with an Inter bold label at 12–14px, an optional 10px kind dot on the left, and a count on the right in medium black/60.
- **State:** hover fills #ECECEC. When pressed (`aria-pressed="true"`), the pill fills black, the text turns grey, and the count turns grey/70. Pills are toggle buttons in a labelled group, and only one kind is active at a time.

### Cards / Containers
- **Light sheet:** paper ground, black text, 12→16→24px corners, bleeds to the column edges. No border, no shadow.
- **Dark inset card:** #1D1D1D, grey text, 12→16px corners, own padding (40px top, 24–32px sides).
- **Feature cards:** square, 16px corners, a #ECECEC fill (or orange, yellow, or purple for highlighted cards), an SVG line icon at 20–24px, and a bold Inter label.

### Inputs / Fields
- **Style:** a form-field line with a transparent or paper background, no side or top border, a 2px black bottom rule, no horizontal padding, and 16px text. The contact form floats the label up from the placeholder position. The job-board search uses a fixed bold 14px label above the field, black/60 placeholder, and an orange caret.
- **Focus:** the bottom rule turns orange and a 2px orange ring with a 1px offset appears. The ring must stay visible (see the WCAG 2.4.7 note in `ContactForm.astro`).

### Navigation
- **Style:** sticky #111 bar holding the logotype (110px wide, 160px from `md`), the Initiatives text link, the Contact pill, and the EN/FR switcher, 32px apart. Text is Inter bold, grey.
- **Text link (Initiatives):** a 2px transparent bottom border with 4px padding below. Hover turns the text orange (200ms). On the current page (`aria-current="page"`) the text and border are yellow.
- **Mobile:** a hamburger opens a full-height #111 overlay that slides and fades in over 100ms ease-in and locks page scroll. Escape closes it. The current page's link is yellow there too.
- **Footer:** Values and Initiatives join the centred small links (above Job boards) that underline on hover.

### Encircled Word (signature)
A single word in a heading is wrapped in a fully rounded orange outline, with 6px horizontal padding and the word set bold. The job-boards content model stores each heading as `before / encircled / after`, so the circled word is chosen in copy and not hard-coded.

### Comparison Table Row (job-boards)
- The name is ClashDisplay 600 at 18–20px. It underlines on hover (4px offset, 2px decoration) and dims to black/60 once `:visited`, so the reader sees where they stopped.
- The name link is stretched over the whole row (`after:inset-0`), and its focus outline is drawn on that stretched area in orange.
- The row fills #ECECEC on hover (150ms). A row targeted by its anchor is tinted yellow/30%. Each row has a stable slug id.
- The host is shown with a 14px `arrow-up-right` SVG to mark an external link that opens in a new tab. A screen-reader-only "new tab" note sits inside the link.

### Value Tile (signature)
A whole value, as one fat colour field you can press.
- **Field:** the value's colour fill (Value Colour Rule), 16px → 24px corners, 24–40px padding. Labels are #111, pure white on pantone.
- **Content:** the value name in ClashDisplay 600 (36–60px), an Inter bold tagline (16–18px, max ~13–17rem), and a 44px outlined arrow-down circle pinned to the bottom-left. The whole tile is the link and jumps to the value's row.
- **Doodle:** the value's CC0 doodle in #111 line with a paper accent, bottom-right, about half the tile wide and nudged 4% past the corner so the field clips it.
- **Hover:** the tile tilts toward the pointer (`data-tilt`: up to 2.5 degrees at 97% size over 0.3s, with a soft light under the pointer, behind the text) and has no CSS scale. The arrow drops 4px, and the doodle lifts 1% and tilts −2° (300ms ease-out). Focus shows the same light and the 2px orange outline, 2px offset.

### Value Row
- A 20px station (3px ring in the value colour, #111 fill) at the row's top-left, with a 2px dashed line in the same colour running from it to the row's bottom edge. Consecutive rows read as one continuous line per value.
- Name in Inter 500 30–48px, Inter bold tagline at 18–20px, prose in Ash at 14–16px.

### Interchange (drawn lines)
- Four dashed value lines leave four stations (r 5, #111 fill, 3px ring) and curve together onto the orange pill directly below, under a ringed, centred headline.
- **Draw on view:** each line is revealed through an SVG mask whose stroke is a `path.draw` with `pathLength="1"`. The figure carries `data-draw`, and the engine animates `stroke-dashoffset` 1 → 0 once, over 1.2s `expo.out`, 120ms apart, when the figure's top reaches 80% of the viewport. Only the engine hides the lines, so without JS or with reduced motion they simply show.
- The Initiatives focus card reuses the same mechanism for an orange dashed heartbeat line on its yellow field. Any future drawn line uses this mechanism, not a second one.

### Door Card
- A yellow (organisations) or lavender (contributors) colour field, echoing the homepage's two path pills. #111 text: an Inter 500 question at 24–30px, an Inter line at 16–18px, then at the foot the ClashDisplay 700 action with a 44px black arrow-right circle.
- The action link is stretched over the whole card. The card tilts toward the pointer like a value tile (`data-tilt`, no CSS scale) and the arrow slides 4px right. The card is not focusable, so a keyboard-focused link gives it the 2px orange outline and the same light (`:has(:focus-visible)`).

### Illustrations
- **Sources:** Open Doodles (one per value) and Open Peeps (the community lineup, the two-person Initiatives scene), both by Pablo Stanley, CC0 1.0.
- **Colour:** line and solid shapes in #111; one accent colour, either paper (#F8F8F8) when the drawing sits on a colour field, or the value's colour when it sits on the paper sheet. No other colours.
- **Delivery:** self-hosted SVG in `src/assets/illustrations/` (the CSP allows only same-origin images), each file opening with a provenance comment naming the source drawing, author and licence. Illustrations are decorative (`alt=""`); they never stand for a real partner or project.

## Do's and Don'ts

### Do:
- **Do** alternate the #111 ground and the #F8F8F8 sheet, and break the sheet out to the column edge with `-mx-4 md:-mx-8 px-4 md:px-8`.
- **Do** give each view one orange action, and use a pure-white label only on the large CTA pill.
- **Do** encircle at most one word per heading, and pick it in the copy.
- **Do** put a text label next to every kind dot.
- **Do** use a 2px orange outline (or ring) with a 2px offset on every focusable element.
- **Do** keep ClashDisplay for the brand name, CTA labels, the footer contact heading, and names a visitor clicks.
- **Do** show hover with scale (CTAs), fill (#ECECEC on the sheet, orange on the nav pill) or the pointer tilt (cards), and keep CSS transitions to 150–200ms.
- **Do** keep `prefers-reduced-motion` switching off smooth scroll and transitions, and keep drawn lines fully drawn and static under it.
- **Do** keep one clock. Everything runs on `gsap.ticker`: Lenis, ScrollTrigger and the lamp. Add no `requestAnimationFrame` loop and no `scroll` listener of your own; use ScrollTrigger or Lenis callbacks.
- **Do** gate every hidden state on `html.motion`, and hide it with opacity, never `visibility`.
- **Do** give each value its own colour everywhere it appears, and keep the four roles fixed.
- **Do** set labels on a pantone fill in pure white, and on every other value fill in #111.
- **Do** draw value lines dashed, and reveal drawn lines with a masked `path.draw` inside an `svg[data-draw]`.
- **Do** source new illustrations from Open Doodles or Open Peeps, recolour them to #111 line plus one token accent, self-host them, and put a provenance comment in the file.

### Don't:
- **Don't** add resting shadows. The only shadows in the system are the state hairlines on a stuck toolbar and the floating nav.
- **Don't** place the logo, or any surface, on a mid-value ground (`BRAND.md`).
- **Don't** set small text in white on orange. Below large-bold size, labels on orange are black.
- **Don't** use Tailwind's stock palette (gray-500/600/900, indigo-600) or stock UI recipes. Use the brand tokens and black alpha steps.
- **Don't** add a second horizontal padding layer inside the shared column.
- **Don't** use glyph or emoji icons. Icons are inline SVG line icons from `src/assets/icons/`, drawn in `currentColor`.
- **Don't** add small uppercase labels above headings. The system has no eyebrow or kicker device.
- **Don't** put a CSS `transform` on an element GSAP animates. Put Tailwind offsets on a wrapper, as the About photos do.
- **Don't** add a second signature moment. The hero window and the lamp are the two.
- **Don't** hotlink or rasterise illustrations, or mix in drawings from another illustration style.
- **Don't** colour reading text with a value colour. Values show their colour as fills, dots, lines and underlines.
