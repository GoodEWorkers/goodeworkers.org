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
// (title, description, intro, table title), `{year}` the year of the list's
// `linksChecked` date (title), and `{date}` its month and year (`checked`).

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
      list.boards.forEach((board, index) => {
        if (!ids.includes(board.category)) {
          ctx.addIssue({
            code: 'custom',
            path: ['boards', index, 'category'],
            message: `"${board.name}" uses category "${board.category}", which is not under categories (${ids.join(', ')}).`,
          });
        }
      });
      [...list.boards, ...list.tools].forEach((site) => {
        const urls = typeof site.url === 'string' ? [site.url] : Object.values(site.url);
        for (const url of urls) {
          if (!url.startsWith('https://')) {
            ctx.addIssue({ code: 'custom', path: ['boards'], message: `"${site.name}": use an https:// URL, not ${url}` });
          }
        }
      });
      const names = [...list.boards, ...list.tools].map((site) => site.name.toLowerCase());
      names.forEach((name, index) => {
        if (names.indexOf(name) !== index) {
          ctx.addIssue({ code: 'custom', path: ['boards'], message: `"${name}" is listed twice.` });
        }
      });
    }),
});

export const collections = { legals, home, 'job-boards': jobBoards, 'job-board-list': jobBoardList };
