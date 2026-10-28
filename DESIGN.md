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
    textColor: "{colors.white-pure}"
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
    padding: "40px top (About), 16px sides (32px from md): the column gutter, as every sheet"
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
    textColor: "{colors.white-pure}"
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

Four colours also stand for the four values (Openness, Autonomy, Care, Solidarity) and keep that meaning wherever a value appears: the tile fill, the value's name on the dark ground, and the underline under its phrase in the Initiatives statement. The illustrations are a commission of drawing styles, one style drawn five times: flat, geometric, one ink and one spill colour, so the "made by people" feeling carries into the pictures as a hand on the construction.

The system is flat. It builds depth from the contrast between the two grounds, from panels overlapping, and from scale on hover. Shadows are not part of it.

**Key Characteristics:**
- Two grounds: #111 near-black and the #F8F8F8 rounded sheet, alternating down the page.
- One orange ring around one word per heading.
- Accents work as fills (pills, cards, value tiles, door cards), as dots and lines, or as a state (hover, current page). They never set reading text.
- Four value colours with fixed roles: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone.
- An illustration for each value and for the hospital focus, in one of seven drawing styles (default: warped bands): one ink and one spill colour, inline SVG that fades in, swapped live by a designer's picker.
- Fat rounded pill CTAs with a ClashDisplay bold label; `hover` scales them to 105%.
- Flat surfaces; no resting shadows.
- Inter for reading and UI; ClashDisplay for the brand name, names you click, value names, the 404 numeral and heading, and CTA labels.

## Colors

A warm three-accent palette on near-black, with off-white as the working surface.

### Primary
- **Signal Orange** (orange): The one action per view: the Join and Send pills, the values page "Explore our initiatives" pill, the nav Contact outline, the encircled-word ring, focus rings and outlines, the search caret, and link hover. Also the "e" of the wordmark and Care's value colour.

### Secondary
- **Marigold** (yellow): The "I am a nonprofit" pill, a Why card fill, the skip-link background, text selection on the job-boards, values and initiatives pages, the job-board `:target` row tint (at 30%), the "remote-only" kind dot, the current-page state of the nav text links (Initiatives, Contributors, Projects), and the organisations door card. Openness's value colour.

### Tertiary
- **Lavender** (purple): The "I want to help" pill, a Why card fill, the About list heading, the "startups and niches" kind dot, and the contributors door card. Autonomy's value colour.
- **Pantone Periwinkle** (pantone): Solidarity's value colour. It began as the job-boards "search engines" kind dot and is now also the Solidarity tile fill. Its text on the night ground uses a lighter ink, `valueStyles.ink` (#8E8ED0, 6.2:1 on #111, where the fill would be 3.7:1), and the fill stays #6667AB. It is the only fill dark enough to need light text: pure white reads at about 5.1:1 on it, #111 only 3.7:1. `BRAND.md` does not list it yet.

### Neutral
- **Night Ground** (black): The page background and the default text colour on light surfaces. Black pills and rules on the light sheet use it too.
- **Raised Night** (black-light): Inset cards on the dark ground: the About panel, the homepage and values charter cards, the values row a link points at, and the legal, thanks and 404 panels.
- **Paper** (white): The light sheet (hero, job-board table, footer). This is the brand off-white.
- **Pure White** (white-pure): Two uses only. Every label and icon on an orange fill, large or small (`#F8F8F8` on orange is 2.92:1; pure white reaches 3.10:1, which passes the large-text floor and is accepted below it as a designer decision), and every label on a pantone tile (about 5.1:1, so the 18–20px bold taglines pass too).
- **Light Grey** (grey): Headings and text on the dark ground, light feature cards, and the hover fill of rows and pills on the sheet.
- **Ash** (ashgray): Body copy and ledes on the dark ground. At 70% it is used for secondary meta such as "links checked".

Text on the sheet steps down by alpha on black: 80% for supporting prose, 70% for meta and table secondary columns, 60% for placeholders, counts, and visited links. `BRAND.md` lists two reserve tokens, `primary` (#DEB36F) and `background` (#2B0E45). Both are in the Tailwind config but nothing uses them yet.

### Named Rules
**The Two Grounds Rule.** Every surface is either the #111 ground or the #F8F8F8 sheet, with #1D1D1D cards on dark and #ECECEC cards on light. Don't use a mid-value ground.

**The Orange Label Rule.** Every label and icon on an orange fill is pure white, at every size: the CTA pills, the two-line pill, the Care tile with its arrow, the hero "And much more" card, the Why orange card, and the text on the band of a Care link. Pure white on #FD5E09 is 3.10:1. That passes the 3:1 large-text floor and not the 4.5:1 for small text, and the designer chose it for the smaller text on the cards and pills (14–24px) all the same (review of 28 Oct 2026), so it is recorded here as a decision and not as a WCAG pass. Not moved to white yet, because nobody asked: the nav Contact hover and the pills on the contributors' and projects' pages, which fill orange with black text under the pointer.

**The Dot Never Speaks Alone Rule.** A kind dot (10px circle) always sits beside its text label. The yellow dot on paper is well under 3:1, so the dot is only a wayfinding echo and can't be the only signal. Kind colours: remote-only yellow, vetted orange, startups and niches purple, freelance black, search engines pantone. On a pressed black pill, the dot gets a 1px grey ring so the black dot stays visible.

**The Value Colour Rule.** Each value owns one colour, everywhere it appears: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone. The colour fills its tile, sets its name on the dark ground (Solidarity uses its lighter ink, see Pantone), and underlines its phrase in the Initiatives statement. An illustration takes the colour from its ground: on the value's own tile it is black ink on paper tints, on the night ground the value's colour spills, and on paper it is the light. Never swap or reuse a value colour for a different value. Care's orange tile is a value field, not an action: on a page with the Care tile, the orange pill is still the only orange action.

## Typography

**Display Font:** ClashDisplay, variable 200–700 (with Arial Narrow, Impact, system-ui)
**Body Font:** Inter (with Arial)

**Character:** Inter carries almost everything, set at medium and bold with generous leading, all of it in the Regular face. Only the card titles reach the Bold face. ClashDisplay is the brand's own voice, a geometric face kept for the moments the brand speaks: its name, the pill labels, and names a visitor clicks.

### Hierarchy
- **Display** (Inter 500, line-height 1.25): Page H1s on the dark ground. The job-boards H1 runs 36px → 72px; the shared split header (values, initiatives) runs 56px → 96px (60px from `md`, 72px from `lg`). The homepage hero goes to 74px/83px, with the brand words set in ClashDisplay in yellow, orange and purple. The two split-header scales are a known divergence (see Layout).
- **Headline** (Inter 500, 30px → 54px, line-height 1.2 → ~1.17): Section headings on either ground, such as the Why, About, and Join sections and the hero panel. The emphasised or encircled word is bold.
- **Title** (ClashDisplay 600, 18px → 20px): Clickable names in a list, such as the board names and tool names in the job-board table. The footer contact heading uses ClashDisplay 700 at 36px, 48px from `sm`, and stays larger than the email line under it (Inter bold, 24px, 30px from 360px, 36px from `sm`).
- **Value Name** (ClashDisplay 600, line-height 1): A value's name wherever it appears. On the charter tiles it is 36px, 40px from `lg`, and fluid from 48px to 60px at `xl`, in the tile's text colour. In the homepage list it is 36px, 40px at `xl`, in the value's ink. As a value row's heading it is 36px, 48px from `md`, 64px at `xl` and 72px at `2xl`, in the value's ink.
- **Door Action** (ClashDisplay 700, 24px → 30px from `lg`, 32px at `xl`): The action line at the foot of a door card, followed by the black arrow circle.
- **CTA** (ClashDisplay 700, 30px → 40px): The label inside the large pill buttons. The values page's closing pill is 24px on phones, so its one line fits, and it scales with its column from `lg`.
- **Body** (Inter 500, 14px → 16px, line-height 1.6875 ≈ 27px at 16px): All reading copy and ledes. Ledes run at most 42rem wide (`max-w-2xl`), and centred copy at most 48rem.
- **Label** (Inter 700, 12px → 14px): Nav, filter pills, field labels, and table headers.

### Named Rules
**The Brand Voice Rule.** ClashDisplay appears only for the brand name (the H1 wordmark; the footer closes with the logotype itself, drawn and not set), CTA pill labels, the footer contact heading, the 404 numeral and heading, value names (on tiles, in the homepage list and as value-row headings), and names or actions a visitor clicks (board and tool names, door-card actions). Other headings, taglines, prose and UI are set in Inter.

**The Balanced Headings Rule.** H1s and H2s are set with `text-wrap: balance`, so none ends on a lone word. The homepage H1 is the exception: SplitText keeps it split for good, and a layout balanced before the split is not the one its lines end up in. The Encircled wrapper ends in a zero-width joiner (`.encircled::after`) so Chromium's balanced breaking keeps the ring with its word.

**The Two-Weight Inter Rule.** Inter ships as two static faces in `src/styles/global.css`. `Inter-Regular.woff2` is declared over weights 400–700 on purpose, so every Inter `font-medium` and `font-bold` renders as Regular, with no synthetic bold, as the site was approved: the nav, the labels, the ledes and the pills all keep one weight. `Inter-Bold.woff2` (a Latin subset, about 28 KB) is declared over 800–900, so only `font-extrabold` and `font-black` reach it. It is opt-in, and it is used for the Why card titles only, which are `font-extrabold`. The 500 and 700 weights written in this file are the intended tokens, not what renders. Don't retune sizes or colours to make up for the weight. A new use of the Bold face, or any other change of weight, is a design change, made in the font declaration and in this rule together.

**The Word Space Rule.** ClashDisplay's word space is 0.14em, so `.font-clash` at semibold and bold opens it to 0.1em (`global.css`). A single word has no space to open.

**The Typeset Rule.** Copy is typeset where it renders, in `src/components/Common/typeset.ts`, and the copy files stay as written. A hyphen inside a word is non-breaking (U+2011), so the word never wraps at it. Apostrophes stay as written. In French, a no-break space goes before `: ; ? ! »` and after `«`.

**Divergence from BRAND.md.** `BRAND.md` says section headings use `font-clash font-medium`. In the shipped code, every section heading and H1 (homepage Why/About/hero panel and the job-boards page) is Inter, and ClashDisplay is used only as described in the Brand Voice Rule. The owner should decide which one is canonical.

## Layout

There is one shared column. It is max 1536px wide, centred, with 16px gutters (32px from `md`), and it is the same column the navbar and footer use. Every surface in it, paper or dark, spans that full width: the hero sheet, the job-board sheet, the Initiatives focus sheet, the About, charter, homepage values, legal, thanks, 404, contributors and projects cards, and the footer's contact sheet all have the same left and right edges, and each one's content aligns with the logotype. `.sheet`, in `src/styles/global.css`, is the recipe: negative margins of the gutter's size break the surface out to the column edge (`-mx-4 md:-mx-8`), the same size comes back as padding (`px-4 md:px-8`), and the stepped radius (12, 16 and 24px) comes with it. Nothing is inset, and content never adds a second layer of horizontal padding. The footer's contact sheet sits outside the column, so it is the column's own box (`max-w-screen-2xl mx-auto px-4 md:px-8`) with the same radius, and its edges are every sheet's edges at every width. A text measure may be centred inside a sheet (legal, thanks, the profile pages), but the sheet itself is never narrower than the column. The hero sheet is the one exception to the padding: from `xl` its inner row adds 96px of its own (`xl:px-24`), so its content sits 128px from the sheet's edges, and the closed window (see Motion) can stay 32px clear of it.

- **Navbar:** sticky at the top, #111, 101px tall once stuck at `lg` (with a 64px top margin before sticking).
- **Split page header** (job-boards, values, initiatives): on the dark ground, the H1 sits left and the lede sits right, bottom-aligned from `lg`, in a column one charter tile wide (the second of two equal columns after an 11rem label column, 14rem from `xl`). So the lede lines up with the charter's second tile and the value rows' text. Below `lg` they stack. This lets the sheet below start inside the first viewport. Values and initiatives share one `SplitHeader` component; the job-boards page still carries its own copy of the layout at a smaller H1 scale (see Typography).
- **Charter** (values): a dark card (`bg-black-light`, a `.sheet`) holding the four value tiles as two rows of two, under the pairs sentence. From `lg` each row has a label column (11rem, 14rem from `xl`) beside a two-up tile grid with 12px gaps (20px from `md`). Tiles are at least 19rem tall (22rem from 440px, so the drawing, which grows with the tile's width, clears a three-line French tagline; 24rem from `md`, 25rem from `xl`). There is no community row.
- **Value rows** (values): on the night ground, each group gets an Inter headline, then one row per value with no stations, dashed lines or hairlines. Each row is a `.sheet` like the charter, so its content sits on the logotype's line under the headline, and it has 40px of vertical padding (56px from `md`, 64px at `xl`). From `lg` the name, tagline and window figure hang from the first tile's left edge, and the prose from the second's. The prose has no max width in that column, so its measure grows with the screen (about 370px at 1024px wide, 480px at 1280px), and is capped at 38rem below `lg`. A row that a tile's link points at takes a #1D1D1D card with the charter's own edges, which fades in over 0.7s.
- **Homepage values section:** a dark card between Why and About, a `.sheet` like the About card, so the two have the same edges. From `xl` it has two columns. At the left sit the ringed headline, the bold lead (max 26rem), the two-line orange pill ("Read / our values") and the underlined "Explore our initiatives" link. At the right, the four values sit as a two-by-two register, each pair's names in a two-column grid from `sm`. Each name is ClashDisplay semibold, 36px (40px from `xl`), in the value's ink, and its 2px underline draws in on hover or focus over 0.5s. Under each name sits the value's text in Ash, 16px. There are no dots. On a phone the pairs stack, with 24px from each pair's label to its names, 36px between names and 88px between the pairs.
- **Doors** (initiatives): under a left-aligned ringed headline, two colour cards side by side from `md`, 12px apart (20px from `md`), at least 18rem tall (22rem from `md`). From `md` the two cards share their rows through subgrid, so the questions, sublines and actions line up across them.
- **Focus sheet** (initiatives): a paper `.sheet`, on the same two-column grid as the split header from `lg`. The heading sits at the top left, the focus name and its text at the bottom left, and the health illustration (`paper` context) at the right, at the sheet's foot.
- **Sticky toolbar:** from `lg`, a filter-and-search toolbar on the light sheet sticks at `top: 101px`, just under the stuck navbar. It repeats the `.sheet` break-out (`-mx-4 md:-mx-8 px-4 md:px-8`) inside the sheet's own padding, so its paper background spans the sheet edge to edge.
- **Dense table:** one row per item. Headers are Inter bold 14px over a 2px black rule, and rows are separated by 1px black/10% hairlines with 20px vertical padding. Below `md`, each row becomes a two-column grid: name and kind on top, then the note, then the host. The header is hidden visually but kept for screen readers.
- **Closing section:** centred on the dark ground with generous margins (96–128px above, 80–112px below). A headline with one encircled word, a ≤42rem lede, then the orange pill.
- **Breakpoints:** Tailwind defaults (640 / 768 / 1024 / 1280 / 1536), plus local one-offs at 360, 580 and 1200px in homepage components.

### Named Rules
**The Shared Column Rule.** Every surface spans the column width, and its content aligns to the logotype. `.sheet` is the recipe: break out with `-mx-4 md:-mx-8`, re-pad with `px-4 md:px-8`. Nothing is inset, and nothing pads twice. The one exception is the hero's row, which pads again from `xl` (`xl:px-24`) to give its closed window room.

## Elevation & Depth

The system is flat. Depth comes from the two grounds, from panels overlapping (hero pills sit over the sheet's top edge with a negative top margin), from offset photos, from a 105% scale on CTA hover, and from the pointer tilt on the cards, value tiles and door cards (no CSS scale on them). The one addition is light, not shadow: the lamp is a warm glow on the #111 ground, kept at about 10% alpha so the ground still reads #111 (see Motion). `BRAND.md` records this explicitly, and issue #46 removed the shadows.

### Shadow Vocabulary
- **Stuck toolbar hairline** (`box-shadow: 0 1px 0 rgb(17 17 17 / 0.1), 0 10px 18px -16px rgb(17 17 17 / 0.45)`): Appears only while the job-board toolbar is stuck over scrolling rows, fading in over 200ms ease-out. It shows state (content is passing underneath) and isn't used as decoration.
- **Floating nav hairline** (`box-shadow: 0 1px 0 rgb(248 248 248 / 0.08)`): Appears once the page has scrolled and the nav floats over the content. It shows state and isn't used as decoration.

### Named Rules
**The Flat At Rest Rule.** Nothing casts a shadow at rest. A shadow may appear only to show a live state, as the stuck toolbar and the floating nav do. Hover is shown with scale, colour fill, the pointer tilt on cards, or a small nudge of an arrow.

## Shapes

- **Pills** (fully rounded): Every button and filter, including the big CTAs, the nav Contact outline, the kind filters, and the Thanks-page back button.
- **Sheets** (12px → 16px → 24px, stepping up at `sm` and `lg`): Every surface, paper or dark, through `.sheet`, and the footer's contact sheet with the same steps.
- **Cards** (16px): Square-aspect feature cards and team photos.
- **Colour fields** (16px → 24px from `lg`): value tiles and door cards.
- **Arrow circles** (44px, fully round): a 2px `currentColor` outline on value tiles, a solid black disc on door cards, each holding a 20px SVG arrow.
- **Circles:** 10px kind dots, and the encircled-word ring (1px, 2px from `md`) drawn as a fully rounded orange outline covering the lower ~62% of the word.
- **Fields** have no radius and no box, only a 2px bottom rule.
- **Borders** are 2px black on the light sheet (pills, field rule, table header rule), 2px orange for the nav Contact, 1px black/10% for row hairlines on paper.

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
- `data-draw` (on an `<svg>`): each `path.draw[pathLength]` draws in once, when the figure's top reaches 80% of the viewport (1.2s, `expo.out`, 120ms apart). No surface uses it now. The Why arrow's own `path[data-draw]` is scrubbed by `home.ts` instead.
- `data-illo-slot` (with `data-illo-context` and `data-illo-style`): an illustration slot, which wears `data-reveal="fade"` and nothing else of the engine. The picker swaps the drawing inside it. The rules are under Illustrations.
- `data-parallax="0.15"`: the element drifts through its pass by up to that fraction of the viewport height in each direction. Put it on a wrapper.
- `data-tilt`: a pointer tilt of up to 2.5 degrees, and nothing else: no highlight or sheen is painted over the card. Skipped on touch.
- `data-roll`: letter roll on a text link or button (CSS, 0.5s). The engine adds an `aria-hidden` second row. The nav's text links and Contact pill and the language switcher wear it; the footer email does not.
- `data-navbar` and `data-nav-static`: the floating nav hides on scroll down past 80px and returns on scroll up. The static flag, set on the job boards `<main>`, keeps it from hiding.
- `data-logo`: the logo's star burst turns while the pointer or focus is on the logo. The footer logo wears it on its wrapper: that logo is decorative and takes no focus, so its star turns on hover only.
- `data-title`: the 3D word swing on a homepage H2, read by `home.ts` (see Homepage choreography). A ringed word inside it never wraps.
- `#lamp`: the lamp layer, moved through `--lamp-x` and `--lamp-y`.

### Homepage choreography

Home only, in `src/scripts/motion/home.ts`, with the hooks `data-intro`, `data-window`, `data-title`, `data-draw`, `data-head`, `data-story` and `data-rule`.

- **Intro.** One timeline that starts when the fonts are ready (600ms at most) and runs 1.3s at most. The wordmark's letters rise first (0.8s). The second line of the H1 rises from 0.3s, and the orange ring draws around its word from 0.6s. The two lede paragraphs fade up from 0.45s, the CTA pills settle in (up 24px, scale .96 to 1) from 0.5s, and the nav fades in last.
- **Hero window.** The sheet closes to an inset window: 14% of its height from the top, 6% of its width at each side and 10% of its height at the bottom. On desktop each inset stops where the content starts, so the heading, lede and cards are never clipped: that caps the sides at 32px from `lg`, where the content sits on the sheet's own padding and the window is flush with it. From `xl` the hero's row adds 96px of its own (the hero's exception to the Shared Column Rule), so the content sits 128px from the sheet's edges and the sides are 96px: the window stays 32px clear of the heading, lede and cards. The first-paint CSS in `LandingHeader.astro` has the same caps, so the sheet is not open and then snapping shut. Below 640px it closes to 6% at the top and sides and 4% at the bottom, with 24px corners (40px above). It opens to the sheet's own corner radius. The scrub runs from the sheet's top reaching 90% of the viewport to its top reaching 35%. The CTA pills sit outside the sheet, so they are never clipped.
- **3D titles.** The five section titles (hero, Why, About, the values section and the footer contact) split into words that start turned in 3D (`translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)`) and settle with `power2.inOut`, 0.02s apart. They play as the heading comes up from the bottom of the viewport and reverse when it scrolls back past. The Encircled ring fades in last.
- **Cards.** The service cards and the Why cards are `data-stagger` grids. Each card rises 32px and scales up from .96 over 1s, 60ms apart, once the grid's top reaches 80% of the viewport. Each card is also `data-tilt`.
- **Why arrow.** The arrow is inline SVG. Its white mask path (`data-draw`) sweeps along the dashed arrow as the arrow scrolls from 80% to 40% of the viewport, and the head (`data-head`) fades in last.
- **About.** The card rises (`data-reveal="up"`), the paragraphs split into lines, and the benefits rise one after another. The two photos drift the same way at slightly different speeds on their own wrappers (`data-parallax` 0.04 and 0.03): the pair keeps a slight depth, the corner where the two meet never grows by more than about 2% of the viewport's height beyond its place at rest, and Alice's caption stays clear of the Join Us pill. The photo pair (`data-story`) tilts up to 10 degrees toward the pointer over 0.3s (`power1.inOut`) and levels again on leave. Touch skips the tilt.
- **CTA pills.** No `data-tilt` and no pointer light: the 105% hover scale is all they show. The press (`:active`) scales the pill to 97%, on top of that hover.
- **Footer.** The email has no letter roll: its underline on hover and focus is its only effect (the nav and the language switcher keep their rolls). Each contact field's bottom rule wipes in from the left, one after another (1.2s, 80ms apart), once the form's top reaches 80% of the viewport (`data-rule`). The contact sheet has the hero sheet's rounded corners (12, 16 and 24px) on both ends, and on every page a closing band below it on the dark ground closes with the logotype itself, on one line: the inline `goodeworkers-line.svg`, the logo's own shapes with its two lines set on one baseline ("Go d" with the star burst for its second o, then "eWorkers", a word space apart: 0.4 of the cap height; nothing redrawn, no font), as wide as the column's content (the contact sheet's, so the logotype's line is its edges: about 9:1, so about 150px tall on a 1440px screen and 40px on a phone) and `aria-hidden`, since the copyright line spells the name. Its five paths are the engine's stagger (`data-stagger` on the `<svg>`): each rises out of the svg's bottom edge (32 units, more than the lockup is tall, so the edge is its mask), scales up from .96 and fades in over 1s (`expo.out`), 60ms apart in file order (the orange e, Workers, the lavender k, Good, and the yellow star burst last), once the logo's top reaches 80% of the viewport. The star burst turns on hover (`data-logo` on its wrapper, 6s a turn, hover only).

### Other pages

- **Job boards.** Table rows rise as a batch as soon as any of them is on screen (24px, 40ms apart, once). A filter change stops waiting for scroll, and only the rows it newly shows rise (12px, 20ms apart, 0.4s, `power3.out`), so typing never re-fades the rows that stay; the page re-measures once typing pauses. The page sets `data-nav-static` on `<main>`, so the nav stays put above the sticky toolbar at 101px. The H1 splits into lines, the lede rises, and the join heading splits into words.
- **404, thanks and legal pages.** The headings split into lines and the panels rise (`data-reveal="up"`). On the 404 the orange numeral splits into characters (`data-split="chars"`, `aria-hidden`), and its copy rises 0.15s after the card. The pill has no reveal of its own. The legal copy's four-space blocks are set as prose, not as code boxes.
- **Contributors and projects.** On both galleries the H1 splits into lines, the lede rises 0.15s later and the grid is a `data-stagger` list. Each card is `data-tilt` on its link (no CSS transform of its own); the portrait or logo tile inside it keeps its hover zoom (105%, 102%) as a child, and that zoom and the name's orange both have `:focus-visible` twins. A person's page and a project's page split the H1, then rise the role line, the fact sheet and the sections in 0.08s steps (0.24s at most); the social pills and the contributors' pills are `data-stagger`. Neither page sets `data-nav-static`: nothing sticks under the nav.

### Values and initiatives

Both pages' headers split their H1 into lines and rise their lede 0.15s later. The homepage values card rises into view. Its ringed H2 takes the 3D word swing, the lead rises 0.1s later, and each pair's names rise one after another, 60ms apart. On the values page, the charter's pairs sentence splits into lines, the card rises, and its tiles rise in turn. Each tile tilts toward the pointer (`data-tilt`) and has no CSS hover scale, so GSAP owns its transform; its illustration is a child of the tile and moves only with it. Each value row rises as it passes through the viewport. The interchange heading splits into words, its copy rises 0.1s later, and its pill takes the same 105% hover scale as the other pills. On the initiatives page, the values statement rises, and each phrase is a band link (`bandLink` in `valueStyles.ts`): two layers of one background, the same gradient in the value's ink, anchored bottom left. One is a 3px underline that is always full width. The other is a band, as tall as the text, that grows from 0% to 100% of the width over 0.5s on hover or focus, and the text takes the value's `on` colour over the same time (#111, and white on Care's orange). Both layers are one painter on one box, so no seam shows between the band and the underline at any frame, and there is no `text-decoration`. A phrase that wraps repeats both layers on each line (`box-decoration-break: clone`). The values page's open-source link under Openness is the same link. The focus sheet rises, its heading splits into lines, and its illustration fades in. The two door cards stagger in and tilt, and a focused door link gives its card the focus ring (`:has(:focus-visible)`). A link to a row on the same page, such as a charter tile, keeps its Back entry, glides there with Lenis (honouring the row's scroll margin), and the row takes a `:target` tint (`#1D1D1D`) that fades in over 0.7s. Back restores the previous place without a glide, and skip links stay native. A link from another page, such as the homepage's `/values/#openness`, lands under the curtain, and the row fades in place rather than rising.

### Page transitions

Navigation uses Astro view transitions with a paper curtain (`#curtain`, a #F8F8F8 sheet with 24px top corners, `aria-hidden`): it slides up over the page while the next one loads (0.8s, `expo.inOut`), the engine is torn down and rebuilt under it, then it lifts off (0.9s, `expo.inOut`) and the page intro starts at 55% of that lift. Back and forward and reduced motion swap at once with no sheet, the Netlify form post keeps a full browser load, and a link to the page you are on, such as the CTA pills (`#contact`, with the source in `data-from`) or the nav's `/?from=nav#contact`, does not swap: it updates history and glides to the hash. The lamp and the curtain persist across swaps, and links prefetch on hover.

### Reduced motion and no JS

`html.motion` is set before first paint by an inline script in `<head>`, and only when JS runs and reduced motion is off. Everything that starts hidden is hidden by CSS gated on that class, by opacity, so without JS or under reduced motion the page is complete and still. Under reduced motion the engine skips its motion: no Lenis, scrubs, intro, tilts, logo spin, letter roll or lamp motion. The lamp rests as a still glow at 50% across and 40% down, and hover colours, underlines and the CTA scale stay. A failsafe covers an engine that never boots: after 4s the inline script sets `data-engine="off"` and removes `motion`, so content cannot stay hidden. It also covers a homepage chunk that fails alone: `home.ts` sets `data-home` on load, and a page with `[data-intro]` but no `data-home` after 4s loses `motion` too. The illustration slots follow the same gate: they are hidden only under `html.motion`, so with motion off, without JS, or when the engine fails, every drawing shows whole, in the default style. The nav's transparent top state (the lamp shows through the bar) holds in every mode that has JS, reduced motion included, since the engine toggles `is-floating` in all of them. Without JS, or once the failsafe has switched the engine off, the bar stays solid.

### Accessibility

- Hover effects also run on focus: the letter roll (nav and language switcher), the band links, the logo spin and the CTA scale. The focus ring itself does not change.
- The cursor is the native one. There is no custom cursor.
- The motion's hover rules sit inside `@media (hover: hover)`, and so do Tailwind's `hover:` utilities (`future.hoverOnlyWhenSupported`), so a tap never leaves a hover state stuck. Touch devices get no tilt, and the lamp follows the scroll.
- Hidden states use opacity, never `visibility` or `display`. A link that is still hidden stays in the tab order, and focus on it plays its reveal at once (and so for the form's field rules and the job-board rows), even when it is already on screen below the trigger line, so its ring is never invisible. Whatever sits on the first screen at load is revealed at load.
- Decorative layers are `aria-hidden`: the lamp, the letter roll's second row, the Why arrow and the footer's closing logo. Split headings keep their text as an accessible name.
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
- **Two-line pill:** the homepage values pill is orange, with a small Inter line ("Read") over a ClashDisplay 700 label ("our values", 30px, 36px from `sm`, 40px at `xl`), both pure white (3.1:1, see the Orange Label Rule). It has 48px side padding from `sm`, and the same 105% hover.
- **Text action:** an underlined Inter link (4px offset, 2px decoration) that turns orange on hover. It is used for "clear filters", inline links, and the homepage "Explore our initiatives" link (with a 16px arrow-right SVG).

### Chips (filter pills)
- **Style:** 2px black outline pill with an Inter bold label at 12–14px, an optional 10px kind dot on the left, and a count on the right in medium black/60.
- **State:** hover fills #ECECEC. When pressed (`aria-pressed="true"`), the pill fills black, the text turns grey, and the count turns grey/70. Pills are toggle buttons in a labelled group, and only one kind is active at a time.

### Cards / Containers
- **Sheet:** the recipe for every top-level surface (`.sheet`): the column's width, the gutter as its side padding (16px, 32px from `md`) so that its content sits on the logotype's line, and 12 → 16 → 24px corners (stepping at `sm` and `lg`). No border, no shadow. Never inset.
- **Light sheet:** a sheet on the paper ground (#F8F8F8) with black text: the hero, the job-board table, the Initiatives focus sheet and the footer's contact sheet, which sits outside the column and so carries the column's own box instead of the breakout.
- **Dark card:** a sheet on #1D1D1D with grey text: the About, charter, homepage values, legal, thanks, 404, contributors and projects cards, and a value row that a link points at. Its vertical padding is its own (About has 40px at the top).
- **Feature cards:** square, 16px corners, a #ECECEC fill (or orange, yellow, or purple for highlighted cards), a filled SVG icon at 20–24px that grows in with the card (`data-pop`), and an extra-bold Inter title on the Why cards, the one place the Bold face is used (`font-extrabold`; 20px and 24px from `md`). The orange card, "And much more" in the hero and the middle Why card, has a pure-white title, text and icon.

### Inputs / Fields
- **Style:** a form-field line with a transparent or paper background, no side or top border, a 2px black bottom rule, no horizontal padding, and 16px text. The contact form floats the label up from the placeholder position. The job-board search uses a fixed bold 14px label above the field, black/60 placeholder, and an orange caret.
- **Focus:** the bottom rule turns orange and a 2px orange ring with a 1px offset appears. The ring must stay visible (see the WCAG 2.4.7 note in `ContactForm.astro`).

### Navigation
- **Style:** sticky #111 bar holding the logotype (110px wide, 160px from `md`), the Initiatives, Contributors and Projects text links, the Contact pill, and the EN/FR switcher, 32px apart. Text is Inter bold, grey.
- **Text links (Initiatives, Contributors, Projects):** a 2px transparent bottom border with 4px padding below, each with the letter roll (`data-roll`). Hover turns the text orange (200ms). On the current page (`aria-current="page"`) the text and border are yellow; Contributors and Projects stay lit on a person's or a project's own page. The nav is rebuilt on every page change, so the state always belongs to the page you are on.
- **Mobile:** a hamburger opens a full-height #111 overlay that slides and fades in over 100ms ease-in and locks page scroll. Escape closes it. The current page's link is yellow there too.
- **Footer:** Values and Initiatives join the centred small links (above Job boards) that underline on hover.
- **Footer logo:** the page ends on the logotype itself, drawn and not set: the inline `goodeworkers-line.svg`, the logo's own shapes on one line (it carries its provenance in a comment; the navbar keeps the two-line `goodeworkers.svg`), on the #111 ground (`BRAND.md`: black or white grounds only). As wide as the column's content, so its edges are the logotype's line, at about 9:1, `aria-hidden`. Its five paths stagger in on view and the star burst turns on hover (see Motion).

### Encircled Word (signature)
A single word in a heading is wrapped in a fully rounded orange outline, with 6px horizontal padding and the word set bold. The job-boards content model stores each heading as `before / encircled / after`, so the circled word is chosen in copy and not hard-coded.

### Comparison Table Row (job-boards)
- The name is ClashDisplay 600 at 18–20px. It underlines on hover (4px offset, 2px decoration) and dims to black/60 once `:visited`, so the reader sees where they stopped.
- The name link is stretched over the whole row (`after:inset-0`), and its focus outline is drawn on that stretched area in orange.
- The row fills #ECECEC on hover (150ms). A row targeted by its anchor is tinted yellow/30%. Each row has a stable slug id.
- The host is shown with a 14px `arrow-up-right` SVG to mark an external link that opens in a new tab. A screen-reader-only "new tab" note sits inside the link. Between `md` and `lg` a host that has no room may break anywhere (the column never narrows below 8rem), and the arrow stays on its last line.

### Value Tile (signature)
A whole value, as one fat colour field you can press. The tiles sit in the charter's dark card.
- **Card:** the charter is a dark card (`bg-black-light`, a `.sheet`: the column's width, 12 → 16 → 24px corners) holding the four tiles as two rows of two. There is no community row.
- **Field:** the value's colour fill (Value Colour Rule), 16px → 24px corners (from `lg`), 24px → 32px → 40px padding. Labels, and the arrow circle with its arrow, are #111, and pure white on pantone and on Care's orange.
- **Content:** the value name in ClashDisplay 600 (36px, 32px at `sm`, 40px from `lg`, and fluid from 48px to 60px at `xl`), an Inter bold tagline at 18px (20px from `md`, max 14rem, 16rem from `md`, balanced), and a 44px outlined arrow-down circle pinned to the bottom-left. The whole tile is the link and jumps to the value's row.
- **Illustration:** the value's illustration (`tile` context: black ink, paper light and spill), at the bottom-right, 52% of the tile's width (max 21rem), in the corner and not past it. It fades in when it comes into view.
- **Hover:** the tile tilts toward the pointer (`data-tilt`: up to 2.5 degrees at 97% size over 0.3s, tilt only), with no CSS scale. The arrow drops 4px. Focus shows a 2px orange outline, 2px offset.

### Value Row
A value as text on the night ground: a ClashDisplay name in the value's ink, an Inter bold tagline and Ash prose. There are no stations, dashed lines or hairlines.
- **Name:** ClashDisplay 600 at line-height 1: 36px, 48px from `md`, 64px at `xl`, 72px at `2xl`. Solidarity uses its lighter ink.
- **Tagline:** Inter bold, 20px (24px from `md`), balanced, max 22rem.
- **Prose:** Ash at 16px and 1.6875 line-height, in the third grid column from `lg` (see Layout).
- **Figure:** from `lg`, the value's illustration in small (18rem wide, 25:18, `night` context) sits 40px under the tagline, in a rounded box one night step up (#1D1D1D, #111 when the row is targeted) that clips whatever spills over its edge.
- **Target:** a row that a tile's link points at takes a #1D1D1D card with the charter's own edges, which fades in over 0.7s.

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
The 404 page is a dark card, a `.sheet` like every surface. Its picture is the numeral, `404`, which is `aria-hidden`.
- **Numeral:** ClashDisplay 700 in orange, at 27vw between 15rem and 25rem from `lg`. There it sits at the right and bleeds 0.07em off the card's right edge and 0.25em off its bottom edge, and the card clips it. Below `lg` it sits above the words at about 140px on phones (less on the narrowest screens), 176px from `sm` and 224px from `md`.
- **Words:** on the card's own padding, the H1 in ClashDisplay 700 (30px, 36px from `sm`, 48px at `xl`), then the copy in Ash, then the orange pill ("Go back home") with a pure-white ClashDisplay 700 label at 24px.
- **Focus:** the pill's focus outline is white, as on the thanks page's pill, because it sits on the dark card. It is the exception to the orange outline.
- **Motion:** the numeral splits into characters, the copy rises 0.15s after the card, and the pill has no reveal of its own.

### Illustrations
A commission in two rounds, not a hand-drawn series: every style drawn five times, once per subject (Openness, Autonomy, Care, Solidarity and the Initiatives' Health focus). Round 1 was ten abstract generative systems from The Book of 100. The client found them far too abstract, so they were retired, all but `bands` (warped bands), which stays as the one abstract option. Round 2 is figurative: styles a visitor reads in two seconds, each a distinct, recognisable method, still flat and geometric, built from confident constructed shapes (no wobble, no faces, no noodle limbs; a pictogram figure, a circle head on a geometric body, is allowed) and never a red cross or a religious shape. Every piece comes from a small node script (`gen.mjs`), and its `<desc>` says what it shows. The designer chooses the style with the picker; until she decides the default is `bands`.
- **The styles** (slug, method; the first is the default and the order is the picker's):
  - `bands`: warped bands parting around a quiet zone (round 1, kept; the one abstract style).
  - `pictogram`: Swiss pictograms after Aicher and Isotype, parts on one 6-unit module, angles at 0, 45 and 90 degrees.
  - `leaded`: a leaded window, glass cells between 6-unit cames in three values, a transom across the top.
  - `cutout`: paper cut-out collage, three papers (dark, tint, light) stacked and scissor-cut, no outlines.
  - `halftone`: halftone pop, Ben-Day dots on one 45-degree lattice, dot size meaning light.
  - `monoline`: one line, a single even stroke weight.
  - `isoscene`: an isometric scene, a flat room on the isometric grid.
- **Retired:** round 1's other abstract sets (partition, string art, circle packing, grid and disorder, isometric partitions) are out of `public/`, the picker and the sync script, as are the four dropped in its art-direction review (flow field, Truchet, growth, engraving).
- **A drawing** is `public/illustrations/<subject>/<style>.svg` (subjects `openness`, `autonomy`, `care`, `solidarity`, `health`; five static files per style). viewBox 400x300, the `health` piece 800x400; brand palette only, one ink and at most two accents; strokes 2 to 8 units (`bands`: 1.5 to 6); under 12 KB and 160 elements; no filter, gradient, mask, clip path, text, raster or id (a page shows several copies). Its colours are `var(--ink, #111111)`, `var(--light, #F8F8F8)` and `var(--spill, <the subject's colour>)`, so one file serves all three grounds. The `.frame`, `.light` and `.idle` classes some files carry are not used: nothing inside a drawing moves, so every piece is finished when still. (`bands` sets each path's `pathLength` to its length over the longest in its piece, for a dash reveal the site does not use.)
- **Source and sync:** the generators and contact sheets live outside the repo, in `~/research/goodeworkers-illos/` (round 1 in `<NN-name>/`, round 2 in `v2/<slug>/`). `node scripts/sync-illustrations.mjs` copies the shipped sets into `public/illustrations/`, strips any XML prolog, keeps `<desc>`, prints a table, skips with a warning a set that has no drawings yet (so it can be rerun when the set lands), warns of a file with no `<desc>`, and writes nothing if a file of a set is missing, over 12 KB or 160 elements, or carries an id. The sets, their methods and the picker syntax are also in `src/assets/illustrations/README.md`.
- **The slot** (`src/components/Illustration.astro`; props `subject`, `context`, `class`): `<div data-illo-slot="<subject>" data-illo-context="tile|night|paper" data-illo-style="<style>" data-reveal="fade" class="illo illo-<context> ...">` holding the default style's SVG inline, read from `public/` at build time with `aria-hidden="true"` and `focusable="false"` added (no `<img>`, no request). The drawing fills the slot; `class` sizes and places the slot.
- **Grounds**, custom properties set by the context class (`src/styles/illustrations.css`), where `--subject` is the subject's own colour (openness and health yellow #FDC959, autonomy lavender #B3A0CF, care orange #FD5E09, solidarity periwinkle #6667AB): `tile`, on a value's colour: `--ink` #111, `--light` #F8F8F8, `--spill` paper at 60%. `night`, on #111 or #1D1D1D: `--ink` #ECECEC, `--light` #F8F8F8, `--spill` the subject's colour. `paper`, on the sheet: `--ink` #111, `--light` the subject's colour, `--spill` 55% of it.
- **Where each lives:** the charter tile, `tile` context, bottom right, 52% of the tile (max 21rem), in the corner and not past it: every system keeps its own margin, and a frame or a dust of dots pushed past the corner is cut by the tile's edge and rounded corner. The value row, from `lg`: a 288x207 box in `night` context. The focus sheet: the `health` slot in `paper` context, in the right column at the sheet's foot. The homepage has no illustration.
- **Reveal:** the slot is `data-reveal="fade"`, the engine's generic fade (opacity 0 to 1 over 1s, `expo.out`, once, when its top reaches 85% of the viewport), hidden only under `html.motion`. No system has an animation of its own. With motion off, or without JS, every piece shows whole, in the default style.
- **The picker** (`src/components/IllustrationPicker.astro`, `src/scripts/motion/picker.ts`) is the designer's tool for choosing the style. A production page carries only an inert `<template>` and a short script that fetches the picker when the URL has `?pick` or `?illo=`, or `localStorage.illoPick` exists; otherwise there is no panel and no picker code. Awake, it swaps the SVG inside every slot for `/illustrations/<subject>/<style>.svg` (same origin, fetched once) with a 300ms opacity fade where `html.motion` is set and at once otherwise, and shows a panel (any of the three triggers does, unless it was closed this session): fixed bottom right, a dark card (z-index 150, above the nav and under the curtain), a ClashDisplay "Illustrations" title, a row per subject of one 48px thumbnail per style, seven in a row (the drawings themselves, in `tile` context on the subject's colour; the one in use outlined orange and `aria-pressed`; one whose file is missing, a set not synced yet, is disabled and dimmed, and a link that asks for its style leaves the slot's drawing as it is), a "same style everywhere" switch, Copy link, Reset and Close. Every control is a button, and Escape closes. The panel takes no room in the layout (fixed, pointer events on the card only), and it is rebuilt after every client-side navigation, so a choice follows the visitor from page to page.
- **Choice syntax:** `?illo=openness:pictogram,care:cutout` sets a style per subject, `?illo=all:pictogram` every subject, and a later entry wins (`all:cutout,care:halftone`); unknown names are ignored. The URL wins over what is stored, and is then stored in `localStorage.illoPick`. `?pick` shows the panel and keeps the picker awake. Copy link writes the whole choice (all five subjects, or `all:`), so a link does not depend on today's default, and shows it in a field when the clipboard refuses. Reset clears storage and shows the default. Close hides the panel for the session (`sessionStorage`, until `?pick` again) and keeps the choice.
- **Default:** `bands`, as `style` in `Illustration.astro`, the first of the list in `picker.ts` and the first set in `scripts/sync-illustrations.mjs`. Once the designer decides, ship her system for all five subjects and remove the picker (its component, its script and its line in `BaseLayout.astro`).
- **Accessibility:** decorative (`aria-hidden`, `focusable="false"`, no role, no `<img>`). The panel's thumbnails are buttons named "Subject: System" with `aria-pressed`, and the switch is a `role="switch"`.

## Do's and Don'ts

### Do:
- **Do** alternate the #111 ground and the #F8F8F8 sheet, and put every surface, paper or dark, on `.sheet` so that it spans the column width with its content on the logotype's line.
- **Do** give each view one orange action, and set every label and icon on an orange fill in pure white.
- **Do** encircle at most one word per heading, and pick it in the copy.
- **Do** put a text label next to every kind dot.
- **Do** use a 2px orange outline (or ring) with a 2px offset on every focusable element, except the pills on the dark thanks and 404 cards, which take a white outline.
- **Do** keep ClashDisplay for the brand name, CTA labels, the footer contact heading, and names a visitor clicks.
- **Do** show hover with scale (CTAs), fill (#ECECEC on the sheet, orange on the nav pill) or the pointer tilt (cards), and keep CSS transitions to 150–200ms.
- **Do** keep `prefers-reduced-motion` switching off smooth scroll and transitions, and keep drawn lines fully drawn and static under it.
- **Do** keep one clock. Everything runs on `gsap.ticker`: Lenis, ScrollTrigger and the lamp. Add no `requestAnimationFrame` loop and no `scroll` listener of your own; use ScrollTrigger or Lenis callbacks.
- **Do** gate every hidden state on `html.motion`, and hide it with opacity, never `visibility`.
- **Do** give each value its own colour everywhere it appears, and keep the four roles fixed.
- **Do** set labels on a pantone or an orange fill in pure white, and on every other value fill in #111.
- **Do** reveal a drawn line with `path.draw[pathLength]` inside an `svg[data-draw]`, and an illustration through its slot (`data-illo-slot`, `data-reveal="fade"`).
- **Do** change an illustration in its generator, never in the SVG: keep the contract (viewBox, palette, `--ink`, `--light` and `--spill`, under 12 KB, no id), run `scripts/sync-illustrations.mjs`, and look at it on all three grounds.

### Don't:
- **Don't** add resting shadows. The only shadows in the system are the state hairlines on a stuck toolbar and the floating nav.
- **Don't** place the logo, or any surface, on a mid-value ground (`BRAND.md`).
- **Don't** set black text on an orange fill: labels and icons on orange are pure white at every size (3.1:1, a designer decision, see the Orange Label Rule). The nav Contact hover and the profile pills are not moved yet.
- **Don't** use Tailwind's stock palette (gray-500/600/900, indigo-600) or stock UI recipes. Use the brand tokens and black alpha steps.
- **Don't** add a second horizontal padding layer inside the shared column, and don't inset a card (`px-6`, `mx-4`, a narrower box). A surface is a `.sheet`. The hero's row (`xl:px-24`) is the one exception.
- **Don't** use glyph or emoji icons. Icons are inline SVG from `src/assets/icons/`, drawn in `currentColor`: line arrows, and filled shapes on the feature cards.
- **Don't** add small uppercase labels above headings. The system has no eyebrow or kicker device.
- **Don't** put a CSS `transform` on an element GSAP animates. Put Tailwind offsets on a wrapper, as the About photos do.
- **Don't** add a second signature moment. The hero window and the lamp are the two.
- **Don't** hotlink or rasterise illustrations, or add a gradient, filter, shadow or id to one. Once the system is chosen the site ships that one for all five subjects; the picker is for choosing, not a feature.
- **Don't** colour prose or taglines with a value colour. Values show their colour as fills, as the ink of their names, and as underlines.
