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
  pages/          routes (index, 404, articles/, [slug] for legal pages)
  layouts/        BaseLayout
  components/     Astro components (Navbar, Footer, Landing/*, Articles/*, Common/*, Miscs/*, icons/*)
  content/        content collections (legals/, articles/)
  assets/         fonts, icons, images (processed by Astro)
  styles/         global.css (Tailwind + @font-face)
public/           favicon and other static files
scripts/          smoke.sh, shoot.mjs (Playwright), crop.mjs, inspect.mjs
```

## Adding an article

Articles are markdown files in `src/content/articles/`. The filename (minus `.md`) becomes the URL slug — `my-article.md` → `/articles/my-article`.

```markdown
---
title: "Your article title"
date: "2025-04-29"
description: "One-line summary shown in cards and meta description."
author: "Your name"            # optional
tags: ["remote", "nonprofit"]  # optional
draft: false                   # optional, set true to hide from listings
---

Your article body in markdown. Headings, links, lists, code blocks, etc.
```

After writing the file, commit and push to `main`. Netlify rebuilds and the article appears on `/articles` and (if it's one of the three most recent) on the home page's "Latest articles" section.

## Deployment

Hosted on Netlify. Build command `npm run build`, publish dir `dist/`. The contact form uses Netlify Forms (`data-netlify="true"`).
