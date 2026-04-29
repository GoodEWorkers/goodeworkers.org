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
  pages/          routes (index, 404, [slug] for legal pages)
  layouts/        BaseLayout
  components/     Astro components (Navbar, Footer, Landing/*, Common/*, Miscs/*, icons/*)
  content/        content collections (legals/)
  assets/         fonts, icons, images (processed by Astro)
  styles/         global.css (Tailwind + @font-face)
public/           favicon and other static files
scripts/          smoke.sh, shoot.mjs (Playwright), crop.mjs, inspect.mjs
```

## Deployment

Hosted on Netlify. Build command `npm run build`, publish dir `dist/`. The contact form uses Netlify Forms (`data-netlify="true"`).
