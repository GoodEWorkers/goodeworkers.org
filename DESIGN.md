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
**The Brand Voice Rule.** ClashDisplay appears only for the brand name, CTA pill labels, the footer contact heading, and names or actions a visitor clicks (board and tool names, value names on tiles and in the homepage list, door-card actions). Headings, taglines, prose and UI are set in Inter.

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

The system is flat. Depth comes from the two grounds, from panels overlapping (hero pills sit over the sheet's top edge with a negative top margin), from offset photos, from a 105% scale on CTA hover, and from a gentler 102% scale on value tiles and door cards. `BRAND.md` records this explicitly, and issue #46 removed the shadows.

### Shadow Vocabulary
- **Stuck toolbar hairline** (`box-shadow: 0 1px 0 rgb(17 17 17 / 0.1), 0 10px 18px -16px rgb(17 17 17 / 0.45)`): Appears only while the job-board toolbar is stuck over scrolling rows, fading in over 200ms ease-out. It shows state (content is passing underneath) and isn't used as decoration.

### Named Rules
**The Flat At Rest Rule.** Nothing casts a shadow at rest. A shadow may appear only to show a live state, as the stuck toolbar does. Hover is shown with scale, colour fill, or a small nudge of an arrow or doodle.

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
- **Hover:** the tile scales to 102% (200ms ease-in), the arrow drops 4px, and the doodle lifts 1% and tilts −2° (300ms ease-out). Focus is the 2px orange outline, 2px offset.

### Value Row
- A 20px station (3px ring in the value colour, #111 fill) at the row's top-left, with a 2px dashed line in the same colour running from it to the row's bottom edge. Consecutive rows read as one continuous line per value.
- Name in Inter 500 30–48px, Inter bold tagline at 18–20px, prose in Ash at 14–16px.

### Interchange (drawn lines)
- Four dashed value lines leave four stations (r 5, #111 fill, 3px ring) and curve together onto the orange pill directly below, under a ringed, centred headline.
- **Draw-on-view:** each line is revealed through an SVG mask whose stroke has `pathLength="1"` and animates `stroke-dashoffset` 1 → 0 over 1400ms `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 120ms per line, when half the figure is in view. The lines are drawn by default: only a figure still below the fold is hidden first, so without JS, with reduced motion, or when the page loads past it, the lines simply show.
- The Initiatives focus card reuses the same mechanism for an orange dashed heartbeat line on its yellow field. Any future drawn line uses this mechanism, not a second one.

### Door Card
- A yellow (organisations) or lavender (contributors) colour field, echoing the homepage's two path pills. #111 text: an Inter 500 question at 24–30px, an Inter line at 16–18px, then at the foot the ClashDisplay 700 action with a 44px black arrow-right circle.
- The action link is stretched over the whole card; the card shows the orange focus outline (`focus-within`), scales to 102% on hover, and the arrow slides 4px right.

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
- **Do** show hover with scale (CTAs) or fill (#ECECEC on the sheet, orange on the nav pill), with transitions of 150–200ms.
- **Do** keep `prefers-reduced-motion` switching off smooth scroll and transitions, and keep drawn lines fully drawn and static under it.
- **Do** give each value its own colour everywhere it appears, and keep the four roles fixed.
- **Do** set labels on a pantone fill in pure white, and on every other value fill in #111.
- **Do** draw value lines dashed, and reveal drawn lines with the shared draw-on-view mask.
- **Do** source new illustrations from Open Doodles or Open Peeps, recolour them to #111 line plus one token accent, self-host them, and put a provenance comment in the file.

### Don't:
- **Don't** add resting shadows. The only shadow in the system is the state hairline on a stuck toolbar.
- **Don't** place the logo, or any surface, on a mid-value ground (`BRAND.md`).
- **Don't** set small text in white on orange. Below large-bold size, labels on orange are black.
- **Don't** use Tailwind's stock palette (gray-500/600/900, indigo-600) or stock UI recipes. Use the brand tokens and black alpha steps.
- **Don't** add a second horizontal padding layer inside the shared column.
- **Don't** use glyph or emoji icons. Icons are inline SVG line icons from `src/assets/icons/`, drawn in `currentColor`.
- **Don't** add small uppercase labels above headings. The system has no eyebrow or kicker device.
- **Don't** hotlink or rasterise illustrations, or mix in drawings from another illustration style.
- **Don't** colour reading text with a value colour. Values show their colour as fills, dots, lines and underlines.
