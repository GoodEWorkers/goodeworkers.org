import { getEntry, type CollectionEntry } from 'astro:content';
import { SITE, absoluteUrl, languages, routes, type Lang } from './routes';

type PageCopy = CollectionEntry<'job-boards'>['data'];
type BoardList = CollectionEntry<'job-board-list'>['data'];

export type CategoryColor = BoardList['categories'][number]['color'];

export interface Category {
  id: string;
  color: CategoryColor;
  label: string;
  /** Boards in this category; categories with none are left out. */
  count: number;
}

export interface Tool {
  name: string;
  url: string;
  note: string;
}

export interface Board extends Tool {
  category: string;
}

/** Everything the page renders in one language: its copy plus the list. */
export type JobBoardsContent = PageCopy & {
  linksChecked: string;
  categories: Category[];
  /** The job boards alone: what the count and the structured data cover. */
  boards: Board[];
  /** What the table lists: the boards and the Google searches, grouped by category. */
  rows: Board[];
  tools: Tool[];
};

const pick = (value: string | Record<Lang, string>, lang: Lang) =>
  typeof value === 'string' ? value : value[lang];

/**
 * A Google search for `query`, kept to pages Google added within `period`
 * (tbs=qdr:<period>, the time filter under Google's Tools; d = past 24 hours).
 */
export function googleSearchUrl(query: string, period: string): string {
  const url = new URL('https://www.google.com/search');
  url.searchParams.set('q', query);
  url.searchParams.set('tbs', `qdr:${period}`);
  return url.toString();
}

/**
 * The page copy from `src/content/job-boards/<lang>.md` merged with the list
 * in `src/content/job-board-list/boards.yaml`, resolved to one language.
 * Rows are grouped in category order and keep their file order within a
 * category, so a board added at the end of the file still lands in its group.
 * Fills the `{count}`, `{searches}` and `{year}` tokens.
 */
export async function jobBoardsContent(lang: Lang): Promise<JobBoardsContent> {
  const page = await getEntry('job-boards', lang);
  if (!page) throw new Error(`Missing job boards page copy: src/content/job-boards/${lang}.md`);
  const list = await getEntry('job-board-list', 'boards');
  if (!list) throw new Error('Missing job boards list: src/content/job-board-list/boards.yaml');

  const { categories, boards, searches, searchPeriod, tools, linksChecked } = list.data;
  const rank = new Map(categories.map((category, index) => [category.id, index]));
  const byCategory = (a: Board, b: Board) => (rank.get(a.category) ?? 0) - (rank.get(b.category) ?? 0);

  const resolvedBoards: Board[] = boards
    .map((board) => ({
      name: board.name,
      url: pick(board.url, lang),
      category: board.category,
      note: board.note[lang],
    }))
    .sort(byCategory);

  const resolvedSearches: Board[] = searches.map((search) => ({
    name: pick(search.name, lang),
    url: googleSearchUrl(search.query, searchPeriod),
    category: search.category,
    note: search.note[lang],
  }));

  const rows = [...resolvedBoards, ...resolvedSearches].sort(byCategory);

  const resolvedCategories: Category[] = categories
    .map((category) => ({
      id: category.id,
      color: category.color,
      label: category.label[lang],
      count: rows.filter((row) => row.category === category.id).length,
    }))
    .filter((category) => category.count > 0);

  const fill = (text: string) =>
    text
      .replaceAll('{count}', String(resolvedBoards.length))
      .replaceAll('{searches}', String(resolvedSearches.length))
      .replaceAll('{year}', linksChecked.slice(0, 4));

  const copy = page.data;
  return {
    ...copy,
    title: fill(copy.title),
    description: fill(copy.description),
    intro: fill(copy.intro),
    table: { ...copy.table, title: fill(copy.table.title) },
    linksChecked,
    categories: resolvedCategories,
    boards: resolvedBoards,
    rows,
    tools: tools.map((tool) => ({ name: tool.name, url: pick(tool.url, lang), note: tool.note[lang] })),
  };
}

/** A circled heading as plain text, e.g. "Remote job boards". */
export function headingText(heading: JobBoardsContent['heading']): string {
  return [heading.before, heading.encircled, heading.after].filter(Boolean).join(' ');
}

/** "Links checked in September 2026.", split around the date so it can be marked up as a <time>. */
export function checkedParts(content: JobBoardsContent, lang: Lang) {
  const date = new Date(`${content.linksChecked}T12:00:00Z`);
  const label = new Intl.DateTimeFormat(languages[lang].htmlLang, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  const [before, after = ''] = content.checked.split('{date}');
  return { before, label, after, datetime: content.linksChecked };
}

/**
 * Stable in-page anchor for a board, e.g. "We Work Remotely" -> "we-work-remotely",
 * so a link can point straight at one entry (`/remote-job-boards/#flexjobs`).
 */
export function boardSlug(name: string): string {
  return foldText(name)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Lowercase, strip accents and collapse spaces (French copy uses no-break
 * spaces), so "teletravail" finds "télétravail". The table's filter script
 * folds what the visitor types the same way.
 */
export function foldText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

/** The host a visitor will land on, for display: "https://www.flexjobs.com" -> "flexjobs.com". */
export function boardHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}

/**
 * schema.org nodes for the page: a CollectionPage whose main entity is the
 * list of boards. Linked by @id into the site-wide graph in BaseLayout. The
 * board URLs here are the plain ones, without UTM tags.
 */
export function jobBoardsGraph(content: JobBoardsContent, lang: Lang) {
  const url = absoluteUrl(routes.jobBoards[lang]);
  const name = headingText(content.heading);
  return [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name,
      description: content.description,
      inLanguage: languages[lang].htmlLang,
      dateModified: content.linksChecked,
      isPartOf: { '@id': `${SITE}/#website` },
      publisher: { '@id': `${SITE}/#organization` },
      mainEntity: { '@id': `${url}#boards` },
    },
    {
      '@type': 'ItemList',
      '@id': `${url}#boards`,
      name,
      numberOfItems: content.boards.length,
      itemListElement: content.boards.map((board, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebSite',
          name: board.name,
          url: board.url,
          description: board.note,
        },
      })),
    },
  ];
}
