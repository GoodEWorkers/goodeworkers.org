import { defineCollection, z } from 'astro:content';

// Legal documents live in a per-language folder: legals/<lang>/<slug>.md
// The folder is the URL segment for French (/fr/...) and is stripped for
// English, which is served from the root.
const legals = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    /** Per-page meta description. Without this every legal page inherited the
     *  homepage default, so two indexable URLs shared one description. */
    description: z.string().optional(),
    lang: z.enum(['en', 'fr']),
  }),
});

// Homepage copy lives in home/<lang>.md (all of it in the frontmatter), so it
// can be edited without touching the components. The file name is the
// language. Icons and colours stay in the components, zipped by index — which
// is why the card arrays have fixed lengths.
const home = defineCollection({
  type: 'content',
  schema: z.object({
    header: z.object({
      titlePart1: z.string(),
      titleEncircled: z.string(),
      titlePart2: z.string(),
      intro: z.string(),
      introBold: z.string(),
    }),
    hero: z.object({
      ctaNonprofitSmall: z.string(),
      ctaNonprofitBig: z.string(),
      ctaHelpSmall: z.string(),
      ctaHelpBig: z.string(),
      titleMiddle: z.string(),
      titleBold: z.string(),
      text: z.string(),
      cards: z.array(z.object({ title: z.string() })).length(5),
    }),
    why: z.object({
      titlePart1: z.string(),
      titleEncircled: z.string(),
      textBold: z.string(),
      textMiddle: z.string(),
      textEnd: z.string(),
      cards: z.array(z.object({ title: z.string(), text: z.string() })).length(3),
    }),
    about: z.object({
      titlePart1: z.string(),
      titleBold: z.string(),
      titlePart2: z.string(),
      intro: z.string(),
      introBold: z.string(),
      text2: z.string(),
      text3: z.string(),
      benefitsTitle: z.string(),
      benefits: z.array(z.string()),
      /** Last benefit; rendered with the GitHub link appended after it. */
      benefitOpenSource: z.string(),
      githubCta: z.string(),
      cta: z.string(),
      roleFounder: z.string(),
      roleDirector: z.string(),
    }),
  }),
});

// Contributors live in contributors/<slug>.yaml — one file per person, with
// the photo next to it. The slug (the file name) is the URL segment and is
// shared by both languages: /contributors/<slug>/ and
// /fr/contributeurs/<slug>/. Language-independent data lives once per person
// (names, photo, socials, lastContribution) so the two language versions can
// never disagree on the gallery ordering; only prose is per-language.
const contributors = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      firstName: z.string(),
      /** Optional — some contributors are known by a single name or handle.
       *  The alphabetical sort falls back to firstName when absent. */
      lastName: z.string().optional(),
      role: z.object({ en: z.string(), fr: z.string() }),
      /** What the person does professionally now, outside GoodEWorkers. */
      currentSituation: z.object({ en: z.string(), fr: z.string() }).optional(),
      /** One or two sentences on who they are — the short summary, above the
       *  contribution list. Distinct from `contributions`, which is what they
       *  did *for GoodEWorkers*. */
      about: z.object({ en: z.string(), fr: z.string() }).optional(),
      /** Square-ish portrait, stored next to the YAML file. */
      avatar: image().optional(),
      /** YYYY-MM — the gallery's primary sort key (most recent first). */
      lastContribution: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
      /** What the person did for GoodEWorkers, per language. A blank line
       *  starts a new paragraph. */
      contributions: z.object({ en: z.string(), fr: z.string() }),
      socials: z
        .object({
          github: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          x: z.string().url().optional(),
          website: z.string().url().optional(),
        })
        .optional(),
    }),
});

// Projects live in projects/<slug>.yaml — one file per project. A project is
// either work done for a nonprofit client (which has a logo) or one of the
// association's own initiatives (open source, this website, …), which does
// not. When there is no logo, the gallery and profile render a wordmark: the
// project's `title` set in ClashDisplay under one of the theme accent colours,
// so "no logo" reads as a deliberate treatment rather than a missing image.
// The slug (the file name) is the URL segment and is shared by both languages.
const projects = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      title: z.string().max(50),
      /** Client/organization logo for nonprofit projects. Optional —
       *  initiatives have no logo and fall back to the wordmark. */
      logo: image().optional(),
      /** Accent for the wordmark fallback. Defaults to orange. */
      markColor: z.enum(['orange', 'yellow', 'purple']).default('orange'),
      /** 'ongoing' or 'completed'. Drives a status badge. */
      status: z.enum(['ongoing', 'completed']).default('ongoing'),
      /** YYYY-MM — when the project started. Drives gallery ordering
       *  (most recent start first). */
      startedOn: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
      /** External link to the project (live site, repo, …). Optional. */
      url: z.string().url().optional(),
      /** Custom link text for `url`, per language (e.g. "Go to the code" for a
       *  repo). Falls back to the default "Visit project" copy when absent. */
      linkText: z.object({ en: z.string(), fr: z.string() }).optional(),
      description: z.object({ en: z.string(), fr: z.string() }),
      why: z.object({ en: z.string(), fr: z.string() }),
      /** Slugs of contributors on this project, matching the `contributors`
       *  collection's file names. Empty array is allowed. */
      contributors: z.array(z.string()).default([]),
    }),
});

export const collections = { legals, home, contributors, projects };
