import { defineCollection, z } from 'astro:content';

// Legal documents live in a per-language folder: legals/<lang>/<slug>.md
// The folder is the URL segment for French (/fr/...) and is stripped for
// English, which is served from the root.
const legals = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    lang: z.enum(['en', 'fr']),
  }),
});

// Icon names must match an svg in src/assets/icons/.
const iconName = z.enum([
  'calendar',
  'chat',
  'dollar',
  'heart',
  'hexagone',
  'lili',
  'magnify',
  'map',
  'webnet',
]);

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
      cta: z.string(),
      statNumber: z.string(),
      statLabel: z.string(),
      roleFounder: z.string(),
      roleDirector: z.string(),
    }),
    partners: z.object({
      titlePart1: z.string(),
      titleEncircled: z.string(),
      list: z.array(z.object({ icon: iconName, name: z.string() })),
    }),
  }),
});

export const collections = { legals, home };
