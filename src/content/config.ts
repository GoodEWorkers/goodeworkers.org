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
      /** Line after the benefits pointing job seekers at the remote job
       *  boards page. `link` is the linked words; `before` and `after`
       *  carry their own spaces. */
      jobBoards: z.object({ before: z.string(), link: z.string(), after: z.string() }),
      cta: z.string(),
      roleFounder: z.string(),
      roleDirector: z.string(),
    }),
  }),
});

// The remote job boards page has two sources:
// - job-boards/<lang>.md: the page copy (title, intro, labels), per language.
// - job-board-list/boards.yaml: the boards and categories, once for all
//   languages, with a note and a label per language.
//
// Tokens filled in by `jobBoardsContent()`: `{count}` is the number of boards
// (title, description, intro, table title), `{searches}` the number of Google
// searches (table title), `{year}` the year of the list's `linksChecked` date
// (title), and `{date}` its month and year (`checked`).

/** A heading with one word drawn inside the hand-drawn orange circle. */
const circledHeading = z.object({
  before: z.string().default(''),
  encircled: z.string(),
  after: z.string().default(''),
});

const jobBoards = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: circledHeading,
    intro: z.string(),
    checked: z.string(),
    /** Label before the tools listed under the table ("Also useful:"). */
    toolsLabel: z.string(),
    table: z.object({
      title: z.string(),
      all: z.string(),
      kindFilter: z.string(),
      search: z.string(),
      searchPlaceholder: z.string(),
      /** `{shown}` and `{total}` are filled in by the filter script. */
      showing: z.string(),
      empty: z.string(),
      clear: z.string(),
      board: z.string(),
      goodFor: z.string(),
      kind: z.string(),
      site: z.string(),
    }),
    join: z.object({
      title: circledHeading,
      text: z.string(),
      cta: z.string(),
      /** Replaces the footer's "Tell us about your project" on this page:
       *  the invitation here is to join, not to bring a project. */
      formTitle: z.string(),
      mailSubject: z.string(),
    }),
  }),
});

/** Colours a category can take; mapped to brand classes in JobBoards/categoryColors.ts. */
const categoryColors = ['yellow', 'orange', 'purple', 'black', 'pantone', 'gold', 'plum'] as const;

/** Text in every language the site ships. */
const localized = z.object({ en: z.string().min(1), fr: z.string().min(1) });

// https is checked in the superRefine below, where the error can name the entry.
const httpsUrl = z.string().url();

const listedSite = z.object({
  name: z.string().min(1),
  /** One URL, or one per language when the target is localised. */
  url: z.union([httpsUrl, z.object({ en: httpsUrl, fr: httpsUrl })]),
  note: localized,
  /** `manual`: the site refuses automated checks, so a failed link check is
   *  reported as a warning instead of failing CI (scripts/check-links.mjs). */
  linkCheck: z.literal('manual').optional(),
});

/** A table row that opens a Google search instead of a site of its own. */
const googleSearch = z.object({
  /** One name, or one per language. */
  name: z.union([z.string().min(1), localized]),
  /** Sent to Google exactly as written, e.g. '"remote" site:greenhouse.io'. */
  query: z.string().min(1),
  category: z.string(),
  note: localized,
});

/** Name of a board, tool or search as the build errors quote it. */
const nameOf = (site: { name: string | { en: string } }) =>
  typeof site.name === 'string' ? site.name : site.name.en;

const jobBoardList = defineCollection({
  type: 'data',
  schema: z
    .object({
      /** Day every link was last checked, YYYY-MM-DD. */
      linksChecked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      categories: z
        .array(
          z.object({
            id: z.string().regex(/^[a-z0-9-]+$/, 'Use lowercase letters, digits and dashes'),
            color: z.enum(categoryColors),
            label: localized,
          })
        )
        .min(1),
      boards: z.array(listedSite.extend({ category: z.string() })).min(1),
      /** Google's time filter for every search, sent as tbs=qdr:<searchPeriod>. */
      searchPeriod: z
        .string()
        .regex(/^[hdwmy]\d*$/, 'Use h, d, w, m or y, optionally followed by a number (h12 = past 12 hours)')
        .default('d'),
      searches: z.array(googleSearch).default([]),
      tools: z.array(listedSite).default([]),
    })
    // Mistakes a schema alone can't see, reported with the entry's name so
    // the build error says what to fix.
    .superRefine((list, ctx) => {
      const ids = list.categories.map((category) => category.id);
      ids.forEach((id, index) => {
        if (ids.indexOf(id) !== index) {
          ctx.addIssue({ code: 'custom', path: ['categories', index, 'id'], message: `Category "${id}" is listed twice.` });
        }
      });
      (['boards', 'searches'] as const).forEach((key) => {
        list[key].forEach((row, index) => {
          if (!ids.includes(row.category)) {
            ctx.addIssue({
              code: 'custom',
              path: [key, index, 'category'],
              message: `"${nameOf(row)}" uses category "${row.category}", which is not under categories (${ids.join(', ')}).`,
            });
          }
        });
      });
      [...list.boards, ...list.tools].forEach((site) => {
        const urls = typeof site.url === 'string' ? [site.url] : Object.values(site.url);
        for (const url of urls) {
          if (!url.startsWith('https://')) {
            ctx.addIssue({ code: 'custom', path: ['boards'], message: `"${site.name}": use an https:// URL, not ${url}` });
          }
        }
      });
      // A search named per language counts each distinct name once.
      const names = [
        ...[...list.boards, ...list.tools].map((site) => site.name),
        ...list.searches.flatMap((search) =>
          typeof search.name === 'string' ? [search.name] : [...new Set(Object.values(search.name))]
        ),
      ].map((name) => name.toLowerCase());
      names.forEach((name, index) => {
        if (names.indexOf(name) !== index) {
          ctx.addIssue({ code: 'custom', path: ['boards'], message: `"${name}" is listed twice.` });
        }
      });
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

export const collections = {
  legals,
  home,
  'job-boards': jobBoards,
  'job-board-list': jobBoardList,
  contributors,
  projects,
};
