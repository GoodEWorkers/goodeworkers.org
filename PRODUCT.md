# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Nonprofits and associations** that need digital work — a website, content marketing, social media, SEO, design, an audit — and want a partner that works remotely. They arrive through the homepage's "I am a nonprofit" path and write in through the contact form.
- **Remote workers** — freelancers, employees, students, job seekers, retirees — who want to put their skills to work for nonprofits as volunteers in the GoodEWorkers community. They arrive through "I want to help" and "Join us".

## Product Purpose

GoodEWorkers is a nonprofit community of remote workers that builds for nonprofits and releases what it makes as open source. It has never had an office: every project, decision and meeting happens remotely, and the organization exists partly to prove that remote work is an advantage rather than a concession. Success is nonprofits getting digital work done that they could not otherwise afford, and remote workers finding projects that match their values.

## Positioning

Fully remote since day one, with no office ever. A community, not an agency: a team is assembled for each project from volunteers' profiles and availability, with one dedicated contact for the whole project. The work is published as open source on GitHub (github.com/GoodEWorkers), including this website.

## Operating Context

- Projects run remotely and asynchronously; every task is written down before it starts.
- A free consultation comes first, and work is scoped in writing before anyone builds.
- Contact is hello@goodeworkers.org or the site's form (Netlify Forms); Alice or Richard replies personally, usually within 3 working days.
- New volunteers get free training in remote work and the community's methods.

## Capabilities and Constraints

- Services: website creation, content marketing, SEO, audits and advice.
- Static Astro 4 + Tailwind site on Netlify, deployed from `main`.
- Bilingual: English at `/`, French under `/fr/` with translated, unaccented slugs. `src/i18n/routes.ts` is the single source for localized URLs, hreflang and sitemap alternates; indexable pages ship in both languages.
- Trailing-slash URLs are canonical.
- Strict Content-Security-Policy in `netlify.toml`: self-hosted scripts, styles, fonts and images only.

## Brand Commitments

- The name is always spelled "GoodEWorkers" in prose and metadata; the lowercase "e" wordmark is a logo treatment only.
- Visual identity is defined in `BRAND.md` (logo rules, palette, ClashDisplay + Inter, core components).

## Evidence on Hand

- Team photos of Richard (co-founder) and Alice (executive director) in `src/assets/images/`.
- Public code on GitHub (github.com/GoodEWorkers).
- Contributor profiles (`/contributors/`, one YAML file and portrait per person in `src/content/contributors/`) and project pages (`/projects/`, `src/content/projects/`): Yoon CRM, a nonprofit client shown with its logo, plus the FHIR Map and website open-source initiatives.
- No testimonials, case studies or impact metrics exist in the repository. Do not invent proof.

## Product Principles

1. Show remote work working instead of arguing for it.
2. Open by default: publish the work and the code wherever possible.
3. Serve both audiences, nonprofits and volunteers, without making either feel secondary.
4. Plain and honest: no invented proof and no inflated claims.
