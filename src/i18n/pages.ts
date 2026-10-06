import { getEntry, type CollectionEntry } from 'astro:content';
import { SITE, absoluteUrl, languages, routes, type Lang, type RouteKey } from './routes';

export type ValuesContent = CollectionEntry<'values'>['data'];
export type InitiativesContent = CollectionEntry<'initiatives'>['data'];

/** Values page copy from `src/content/values/<lang>.md`. */
export async function valuesContent(lang: Lang): Promise<ValuesContent> {
  const entry = await getEntry('values', lang);
  if (!entry) throw new Error(`Missing values page copy: src/content/values/${lang}.md`);
  return entry.data;
}

/** Initiatives page copy from `src/content/initiatives/<lang>.md`. */
export async function initiativesContent(lang: Lang): Promise<InitiativesContent> {
  const entry = await getEntry('initiatives', lang);
  if (!entry) throw new Error(`Missing initiatives page copy: src/content/initiatives/${lang}.md`);
  return entry.data;
}

/** A circled heading as plain text, e.g. "Our values". */
export function plainHeading(heading: { before: string; encircled: string; after: string }): string {
  return [heading.before, heading.encircled, heading.after].filter(Boolean).join(' ');
}

/** Copy with its **bold** markers removed, for metadata. */
export function plainText(text: string): string {
  return text.replaceAll('**', '');
}

/**
 * schema.org node for a page about the organisation itself, linked by @id
 * into the site-wide graph in BaseLayout.
 */
export function pageGraph(
  key: RouteKey,
  type: 'AboutPage' | 'WebPage',
  page: { heading: Parameters<typeof plainHeading>[0]; description: string },
  lang: Lang
) {
  const url = absoluteUrl(routes[key][lang]);
  return [
    {
      '@type': type,
      '@id': `${url}#webpage`,
      url,
      name: plainHeading(page.heading),
      description: page.description,
      inLanguage: languages[lang].htmlLang,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#organization` },
      publisher: { '@id': `${SITE}/#organization` },
    },
  ];
}
