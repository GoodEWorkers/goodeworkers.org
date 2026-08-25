/**
 * Single source of truth for the site's localized URLs.
 *
 * Imported by both `astro.config.mjs` (to build hreflang alternates into the
 * sitemap) and by the layout/components (canonical + <link rel="alternate">),
 * so it must stay free of any Astro-runtime import.
 *
 * When you add a translated page, add a key here — that is what wires up its
 * hreflang cluster, its sitemap alternates and the language switcher.
 */

export const SITE = 'https://goodeworkers.org';

export const languages = {
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_FR' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const langCodes = Object.keys(languages) as Lang[];

/** Canonical path of every indexable page, per language. */
export const routes = {
  home: { en: '/', fr: '/fr' },
  legal: { en: '/legal-notice', fr: '/fr/mentions-legales' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Link to an anchor on the localized homepage, e.g. `/#contact`, `/fr#contact`. */
export function homeAnchor(lang: Lang, hash: string): string {
  const home = routes.home[lang];
  return home === '/' ? `/#${hash}` : `${home}#${hash}`;
}

/** Drop the trailing slash so a path always has exactly one representation. */
export function normalizePath(path: string): string {
  const withoutSlash = path.replace(/\/+$/, '');
  return withoutSlash === '' ? '/' : withoutSlash;
}

export function absoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === '/' ? `${SITE}/` : `${SITE}${normalized}`;
}

/** Which language does this path belong to? Anything under /fr is French. */
export function getLangFromPath(path: string): Lang {
  const [, first] = normalizePath(path).split('/');
  return (langCodes as string[]).includes(first) ? (first as Lang) : defaultLang;
}

/** Find the route key a path belongs to, in any language. */
export function getRouteKey(path: string): RouteKey | undefined {
  const normalized = normalizePath(path);
  return (Object.keys(routes) as RouteKey[]).find((key) =>
    langCodes.some((lang) => normalizePath(routes[key][lang]) === normalized)
  );
}

/**
 * Every language variant of a page, as site-relative paths.
 * Falls back to swapping the locale prefix for pages missing from `routes`.
 */
export function getAlternatePaths(path: string): Record<Lang, string> {
  const key = getRouteKey(path);
  if (key) {
    return Object.fromEntries(
      langCodes.map((lang) => [lang, normalizePath(routes[key][lang])])
    ) as Record<Lang, string>;
  }

  const current = getLangFromPath(path);
  const bare =
    current === defaultLang
      ? normalizePath(path)
      : normalizePath(normalizePath(path).replace(new RegExp(`^/${current}`), '')) || '/';

  return Object.fromEntries(
    langCodes.map((lang) => [
      lang,
      lang === defaultLang ? bare : normalizePath(`/${lang}${bare === '/' ? '' : bare}`),
    ])
  ) as Record<Lang, string>;
}

/** Same as `getAlternatePaths`, as absolute URLs — for hreflang and canonicals. */
export function getAlternates(path: string): Record<Lang, string> {
  const paths = getAlternatePaths(path);
  return Object.fromEntries(
    langCodes.map((lang) => [lang, absoluteUrl(paths[lang])])
  ) as Record<Lang, string>;
}
