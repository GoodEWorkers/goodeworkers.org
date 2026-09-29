# goodeworkers.org

The website for [GoodEworkers](https://goodeworkers.org), a nonprofit network helping nonprofits go remote.

Built with [Astro](https://astro.build/) and Tailwind CSS.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
```

## Build

```bash
npm run build     # static output in dist/
npm run preview   # serve the build locally
```

## Verify

```bash
npm run smoke     # smoke test the running dev server (status + body checks)
node scripts/shoot.mjs   # full-page Playwright screenshots vs the live site
```

## Project layout

```
src/
  pages/          routes — English at the root, French mirrored under pages/fr/
  layouts/        BaseLayout (SEO head), LegalLayout
  i18n/           routes.ts (localized URLs) + ui.ts (all copy, per language)
  components/     Astro components (Navbar, Footer, LanguageSwitcher, Landing/*, …)
  content/        content collections: legals/<lang>/, home/<lang>.md and
                  job-boards/<lang>.md (the remote job boards list)
  assets/         fonts, icons, images (processed by Astro)
  styles/         global.css (Tailwind + @font-face)
public/           favicon, og-image.png, robots.txt
scripts/          smoke.sh, og-image.mjs, shoot.mjs (Playwright), crop.mjs, inspect.mjs
```

## Languages

English is served from `/`, French from `/fr`. Two files drive everything:

- **`src/i18n/ui.ts`** — every user-facing string, per language. `en` is the
  reference shape and `fr` is typed against it, so a missing key is a type error.
- **`src/i18n/routes.ts`** — the canonical URL of each page in each language.
  It is the single source for the language switcher, the `<link rel="alternate">`
  hreflang tags and the sitemap's alternates, so those three cannot drift apart.

Components read the current language from the URL (`getLangFromPath`), so a new
localized page is just a file under `src/pages/fr/` plus an entry in `routes.ts`.

French slugs are translated (`/fr/mentions-legales`, not `/fr/legal-notice`).
There is deliberately **no** automatic redirect based on browser language —
it hides one language from crawlers and traps users on the wrong version.

Regenerate the social sharing card after a brand change:

```bash
npm run og-image  # writes public/og-image.png (1200x630)
```

## Remote job boards list

The list on `/remote-job-boards/` and `/fr/offres-emploi-teletravail/` lives in
one file, **`src/content/job-board-list/boards.yaml`**, with both languages side
by side:

- **Add or edit a board:** name, url, category and a `note` in each language
  (`en`, `fr`). Boards are grouped by category, in file order.
- **Add, rename or reorder a category:** edit `categories`. Their order is the
  order of the filter buttons; colours: yellow, orange, purple, black,
  pantone, gold, plum. Empty categories are hidden.
- **After re-checking the links,** bump `linksChecked`: it drives the "Links
  checked in…" line, the year in the title and the structured data.

Counts in the title and intro update themselves. The build stops with an
error naming the entry if a category doesn't exist, a translation is missing,
a name is used twice or a URL isn't https. Page copy (title, intro, labels)
stays in `src/content/job-boards/<lang>.md`.

## External links

Link to other sites with `src/components/ExternalLink.astro`, never a bare
`<a>`: it opens a new tab with `rel="noopener"` and adds
`utm_source=goodeworkers.org&utm_medium=referral` (plus `utm_campaign` when
given) from `src/lib/outbound.ts`. Keep URLs plain in content files. `npm run
smoke` fails on any outbound link without the new tab, `noopener` or
`utm_source`.

## Deployment

Hosted on Netlify. Build command `npm run build`, publish dir `dist/`. The contact form uses Netlify Forms (`data-netlify="true"`).
