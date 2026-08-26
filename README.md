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
  content/        content collections (legals/en/, legals/fr/)
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

## Deployment

Hosted on Netlify. Build command `npm run build`, publish dir `dist/`. The contact form uses Netlify Forms (`data-netlify="true"`).
