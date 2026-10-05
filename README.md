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
  components/     Astro components (Navbar, Footer, LanguageSwitcher, Landing/*,
                  Contributors/*, Projects/*, …)
  content/        content collections: legals/<lang>/, home/<lang>.md,
                  job-boards/<lang>.md (the remote job boards list),
                  contributors/ and projects/
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

French slugs are translated (`/fr/mentions-legales`, not `/fr/legal-notice`),
except for contributor and project pages, where the slug is shared across
languages so a person's or project's English and French pages always pair up
(`/contributors/alice-perchaud/` ↔ `/fr/contributeurs/alice-perchaud/`).

## Contributors

The `/contributors/` gallery and each contributor's profile page
(`/contributors/<slug>/`) are driven by a data collection — one YAML file per
person in `src/content/contributors/<slug>.yaml`, with the portrait next to it.
Language-independent data (names, photo, socials, last contribution month) lives
once per person so the two language versions can never disagree on the gallery
order; only `role` and `contributions` are per-language. To add a contributor,
drop a YAML file (and a square photo) in that folder — the build picks it up.

## Projects

The `/projects/` gallery and each project's page (`/projects/<slug>/`) are driven
by a data collection — one YAML file per project in
`src/content/projects/<slug>.yaml`. A project is either work for a nonprofit
client (which has a `logo`) or one of the association's own initiatives (which
does not). When there is no logo, the card and page render a wordmark: the
project's `title` in ClashDisplay under a theme accent colour (`markColor`), so
"no logo" is a deliberate treatment. Each project lists its contributors by slug,
which resolve to links back to the contributors pages. To add a project, drop a
YAML file in that folder.
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
- **Google tricks:** rows under `searches` open a Google search instead of a
  site, e.g. `"remote" site:greenhouse.io`. Give a name, the `query` as you
  would type it into Google, a category and a note per language.
  `searchPeriod` is the time filter for all of them (`d` = past 24 hours).
  They are not boards: the count, the structured data and the link check
  leave them out.
- **After re-checking the links,** bump `linksChecked`: it drives the "Links
  checked in…" line, the year in the title and the structured data.

Counts in the title and intro update themselves. The build stops with an
error naming the entry if a category doesn't exist, a translation is missing,
a name is used twice or a URL isn't https. Page copy (title, intro, labels)
stays in `src/content/job-boards/<lang>.md`.

`npm run check-links` checks that every URL in the list still answers 200
(after redirects). CI runs it on pull requests that touch the list and every
Monday (`.github/workflows/job-board-links.yml`), and fails on any dead link.
Sites behind a Cloudflare bot challenge can't be checked by a robot: they are
listed as warnings to check by hand. For a site that refuses automated checks
some other way (FlexJobs drops requests from cloud servers), mark its entry
`linkCheck: manual` with a comment: a failed check then warns instead of
failing.

## External links

Link to other sites with `src/components/ExternalLink.astro`, never a bare
`<a>`: it opens a new tab with `rel="noopener"` and adds
`utm_source=goodeworkers.org&utm_medium=referral` (plus `utm_campaign` when
given) from `src/lib/outbound.ts`. Keep URLs plain in content files. `npm run
smoke` fails on any outbound link without the new tab, `noopener` or
`utm_source`.

## Deployment

Hosted on Netlify. Build command `npm run build`, publish dir `dist/`. The contact form uses Netlify Forms (`data-netlify="true"`).
