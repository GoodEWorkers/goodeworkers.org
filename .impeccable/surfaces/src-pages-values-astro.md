---
version: 1
slug: "src-pages-values-astro"
primary_target: "src/pages/values.astro"
related_targets: ["src/pages/fr/valeurs.astro","src/pages/initiatives.astro","src/pages/fr/initiatives.astro","src/components/Landing/Values.astro"]
---

# Surface brief: Our values, Our initiatives, homepage values section

Scope: two new pages inside the established GoodEWorkers world (DESIGN.md, BRAND.md), plus a homepage section. EN `/values/` + `/initiatives/`, FR `/fr/valeurs/` + `/fr/initiatives/`. Homepage: "The values behind our work" sits between Why and About. Nav: Initiatives in the main nav (desktop + mobile). Values is linked from the homepage section and the footer, and the footer links Initiatives too. Mode: Read for values (a trust and identity page), Persuade for initiatives (write in).

Audience: prospective volunteers and partner organisations (nonprofits, hospitals, health-focused nonprofits).
Job: understand what GoodEWorkers commits to and where it puts that commitment in 2026, then write in.
Content: the user's draft copy, verbatim in EN. The French is written by us. One addition was approved on 2026-10-06: a "This page is open source too: suggest a change on GitHub" line under Openness. Etymologies stay out. Nothing may imply that named health projects or hospital partnerships exist.
Illustrations (user choice, 2026-10-06): Open Doodles (one per value) plus Open Peeps (the community), both CC0 by Pablo Stanley, recoloured to brand tokens and self-hosted as SVG (the CSP allows only 'self' images).
Constraints: Astro 4 + Tailwind. Copy lives in content collections, presentation in components. Trailing-slash URLs. routes.ts is the source for hreflang. No eyebrows, no resting shadows, no emoji. One ring per heading at most.

## Candidate structures (seed fa2c2684, surface scope, read mode)

Ranked: 1 two-by-two charter, 2 four lines / one interchange, 3 reading room with a sticky index, 4 four chapters on two grounds, 5 handbook page, 6 manifesto poster, 7 contributor journey. Dealt: 4 (lead), 1, 3. The user locked 1, the two-by-two charter (2026-10-06, code-led, no image generation available).

Raise carried in, from the transit-diagram challenger: one colour per value, everywhere (tile, rule, dot, doodle accent), and the four lines meet at "Putting our values into practice", which is the interchange to Initiatives.

## Direction contract

THESIS: The copy already sorts four words into two pairs, so the page shows all four at once as a 2×2 charter (How we work / Whom we care for) before any prose. It refuses the default stack of four identical icon-and-paragraph blocks.
OWN-WORLD: #111 night ground and the #F8F8F8 paper sheet breaking out to the column edge. Four value colours with fixed roles: Openness yellow, Autonomy lavender, Care orange, Solidarity pantone. Each tile is a fat colour field (16→24px corners) holding a CC0 doodle in black line. Value names on the tiles are set in ClashDisplay because they are links. Inter carries everything else. The orange ring sits on one word of the H1, and the orange pill is the single action. An Open Peeps lineup stands on the sheet's bottom edge.
STORY: The visitor reads "Our values", takes in the four values in one glance, opens the one they care about, reads its commitments as plain prose, and finds the four colour lines meeting at "Putting our values into practice", which leads to Initiatives. On Initiatives they see the 2026 focus and write in through one of two doors: health organisations or contributors.
FIRST VIEWPORT: At 1440×900, split header on night: the H1 at left, display size, with "values" ringed; the lede at right, bottom-aligned. Below it the paper sheet starts inside the viewport. Its intro line names the pairs, then the row label "How we work" sits beside the yellow Openness tile and the lavender Autonomy tile, each about 560px wide with its doodle bottom-right. No CTA in the first viewport: the tiles are the action.
FORM: Structure 1 of 7 (two-by-two charter), seed key fa2c2684. Signature interaction: the tiles anchor-jump to their prose rows, each row keeping its tile's colour as a dashed rule. At the close the four dashed lines draw in and converge on the orange pill (static under reduced motion).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Specific 2026 initiatives (purpose, status, how to contribute, links) go in when they are confirmed.
- Whether "Values" should also get a main-nav link (the user chose footer + homepage for now).
