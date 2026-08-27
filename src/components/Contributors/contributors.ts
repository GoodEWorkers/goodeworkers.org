import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../../i18n/routes';

export type Contributor = CollectionEntry<'contributors'>;

/** Display name: "Alice Perchaud", or just "Richard" when there is no last name. */
export function contributorName(contributor: Contributor): string {
  return [contributor.data.firstName, contributor.data.lastName]
    .filter(Boolean)
    .join(' ');
}

/**
 * 'YYYY-MM' -> 'August 2026' / 'août 2026'. The Date is built with the local
 * (year, month) constructor so the label never shifts a month under a
 * non-UTC build timezone.
 */
export function formatContributionMonth(month: string, lang: Lang): string {
  const [year, m] = month.split('-').map(Number);
  return new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(
    new Date(year, m - 1, 1)
  );
}

/**
 * Gallery order: most recent contribution month first, then alphabetical by
 * last name (falling back to the first name for single-name contributors).
 * YYYY-MM strings sort chronologically on their own. A fixed 'en' collation
 * keeps the order identical on every build machine and in both languages.
 */
export function sortContributors(contributors: Contributor[]): Contributor[] {
  return [...contributors].sort((a, b) => {
    const byMonth = b.data.lastContribution.localeCompare(a.data.lastContribution);
    if (byMonth !== 0) return byMonth;
    const keyA = a.data.lastName ?? a.data.firstName;
    const keyB = b.data.lastName ?? b.data.firstName;
    return keyA.localeCompare(keyB, 'en', { sensitivity: 'base' });
  });
}

/** First letters of the name, for the portrait placeholder. */
export function contributorInitials(contributor: Contributor): string {
  return [contributor.data.firstName, contributor.data.lastName]
    .filter(Boolean)
    .map((part) => part!.charAt(0).toUpperCase())
    .join('');
}
