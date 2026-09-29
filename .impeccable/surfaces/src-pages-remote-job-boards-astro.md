---
version: 1
slug: "src-pages-remote-job-boards-astro"
primary_target: "src/pages/remote-job-boards.astro"
related_targets: ["src/pages/fr/offres-emploi-teletravail.astro","src/components/JobBoards/BoardTable.astro"]
---

# Surface brief: Remote job boards

Scope: new page inside the established GoodEWorkers world (BRAND.md, homepage components). EN `/remote-job-boards/`, FR `/fr/offres-emploi-teletravail/`. Mode: Read.

Audience: people searching for remote job boards; many are also potential GoodEWorkers volunteers.
Job: find the boards that fit their search (salaried vs freelance, vetted vs everything, startups, niches) and open them.
Action: open boards. Secondary: one soft invitation to join GoodEWorkers at the end (confirmed: "Searchers + soft join CTA").
Content: 30 boards from the user's list, each with name, URL, kind (the user's loose categories) and a one-line note drafted from the board's own homepage (confirmed: "Name + one-line note"). Notes are claims about third parties: only verified facts, no prices, no rankings. Describe GoodEWorkers generally ("help nonprofits achieve their goals"), not by listing services (user, 2026-09-29).
Constraints: Astro 4 + Tailwind; strict CSP (no third-party images, so no hotlinked logos); trailing-slash URLs; copy in `src/content/job-boards/<lang>.md`; indexable page ships in EN and FR.

## Candidate structures (seed 845bd598, surface scope, read mode)

Ranked: 1 field guide by intent, 2 daily rounds checklist, 3 intent chooser pills, 4 week-one hunt plan, 5 comparison table, 6 positioning map, 7 type poster. Dealt: 6 (lead), 5, 7. All three were built as previews; the user chose 5, the comparison table (2026-09-29). Map and poster previews were deleted.

Raises carried in: durable per-board anchors (from the jackfield challenger's lane anchors); visited boards change colour through `:visited` (from the cutting-bench challenger's "where you stopped" flag).

## Direction contract

THESIS: A job-board list should let people compare boards and narrow them down, not only list them. Refuses the default grid of logo cards with "Visit" buttons.
OWN-WORLD: The incumbent world: #111 ground, the #F8F8F8 rounded panel breaking out to the column edges, Inter for UI and notes, ClashDisplay for board names, the yellow/orange/purple palette as small kind dots, black pill filters, the underlined form-field input from the contact form, the orange hand-drawn circle in the H1.
STORY: The visitor lands on "Remote job boards", filters by kind or keyword, scans one line per board, opens the ones that fit, and at the end meets a community that has never had an office.
FIRST VIEWPORT: Split header on the dark ground (H1 left with one word encircled, lede and link-check date right); below, the light sheet with its title, the kind filter pills and the keyword field, and the first table rows visible at 1440x900.
FORM: Structure 5 of 7 (comparison table), seed key 845bd598. Signature interaction: instant kind filter plus accent-insensitive keyword search with a live count and an empty state that offers to clear.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Status

Shipped 2026-09-29. Finish review: fix (8 items), then all 8 scored resolved, disposition ship. DESIGN.md and .impeccable/design.json written by the documenter. No rasters ship with this page (SVG icon only).
Changes to the user's list, made for accuracy: OwlApply moved out of the boards into an "Also useful" line (it is a CV tool), HiringCafe moved to Search engines (it calls itself a job search engine). The page now counts 29 boards.

## Unresolved

- French-specific boards (Welcome to the Jungle, Malt, Jobs That Make Sense…) are not in the list yet; the FR page uses the same 30 boards.
- Navbar link to the page (a footer link ships now).
