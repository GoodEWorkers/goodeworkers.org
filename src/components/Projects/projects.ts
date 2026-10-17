import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../../i18n/routes';

export type Project = CollectionEntry<'projects'>;

/**
 * 'YYYY-MM' -> 'April 2024' / 'avril 2024'. The Date is built with the local
 * (year, month) constructor so the label never shifts a month under a
 * non-UTC build timezone.
 */
export function formatStartMonth(month: string, lang: Lang): string {
  const [year, m] = month.split('-').map(Number);
  return new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(
    new Date(year, m - 1, 1)
  );
}

/**
 * Gallery order: most recently started project first, then title A→Z.
 * A fixed 'en' collation keeps the order identical on every build machine
 * and in both languages.
 */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const byStart = b.data.startedOn.localeCompare(a.data.startedOn);
    if (byStart !== 0) return byStart;
    return a.data.title.localeCompare(b.data.title, 'en', { sensitivity: 'base' });
  });
}

/** Map the schema's accent enum to a Tailwind text-colour class. */
export function markColorClass(color: 'orange' | 'yellow' | 'purple'): string {
  switch (color) {
    case 'yellow':
      return 'text-yellow';
    case 'purple':
      return 'text-purple';
    default:
      return 'text-orange';
  }
}