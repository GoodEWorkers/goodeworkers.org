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

/**
 * Canonical path of every indexable page, per language.
 *
 * Paths use the trailing-slash form: Astro's directory build makes Netlify
 * serve `/fr/` with a 200 and 301 `/fr` onto it, so the slashed form is the
 * only one that never costs a redirect — canonicals, hreflang, the sitemap
 * and internal links must all agree on it.
 */
export const routes = {
  home: { en: '/', fr: '/fr/' },
  legal: { en: '/legal-notice/', fr: '/fr/mentions-legales/' },
  contributors: { en: '/contributors/', fr: '/fr/contributeurs/' },
  projects: { en: '/projects/', fr: '/fr/projets/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Link to an anchor on the localized homepage, e.g. `/#contact`, `/fr/#contact`. */
export function homeAnchor(lang: Lang, hash: string): string {
  return `${routes.home[lang]}#${hash}`;
}

/**
 * Localized contact-section link carrying a `from` attribution param the
 * contact form forwards with the submission, e.g. `/?from=nav#contact`.
 */
export function contactAnchor(lang: Lang, from: string): string {
  return `${routes.home[lang]}?from=${from}#contact`;
}

/**
 * Localized URL of one contributor's page. Slugs come from the content
 * collection (the file name) and are shared by both languages, so the French
 * twin of `/contributors/alice-perchaud/` is `/fr/contributeurs/alice-perchaud/`.
 */
export function contributorPath(lang: Lang, slug: string): string {
  return `${routes.contributors[lang]}${slug}/`;
}

/**
 * The slug portion of a contributor page URL, whatever the language —
 * `/contributors/x/` and `/fr/contributeurs/x/` both yield `x`.
 * Index pages (`/contributors/`, `/fr/contributeurs/`) yield undefined.
 */
export function getContributorSlug(path: string): string | undefined {
  const match = normalizePath(path).match(
    /^\/(?:fr\/)?(?:contributors|contributeurs)\/([^/]+)\/$/
  );
  return match?.[1];
}

/**
 * Localized URL of one project's page. Like contributors, the slug is shared
 * across languages.
 */
export function projectPath(lang: Lang, slug: string): string {
  return `${routes.projects[lang]}${slug}/`;
}

/**
 * The slug portion of a project page URL, whatever the language —
 * `/projects/x/` and `/fr/projets/x/` both yield `x`.
 */
export function getProjectSlug(path: string): string | undefined {
  const match = normalizePath(path).match(
    /^\/(?:fr\/)?(?:projects|projets)\/([^/]+)\/$/
  );
  return match?.[1];
}

/** Canonical form: exactly one trailing slash (see the note on `routes`). */
export function normalizePath(path: string): string {
  const withoutSlash = path.replace(/\/+$/, '');
  return withoutSlash === '' ? '/' : `${withoutSlash}/`;
}
export function absoluteUrl(path: string): string {
  return `${SITE}${normalizePath(path)}`;
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

  // Contributor pages are dynamic and share their slug across languages.
  const contributorSlug = getContributorSlug(path);
  if (contributorSlug) {
    return Object.fromEntries(
      langCodes.map((lang) => [lang, contributorPath(lang, contributorSlug)])
    ) as Record<Lang, string>;
  }

  // Project pages work the same way.
  const projectSlug = getProjectSlug(path);
  if (projectSlug) {
    return Object.fromEntries(
      langCodes.map((lang) => [lang, projectPath(lang, projectSlug)])
    ) as Record<Lang, string>;
  }

  const current = getLangFromPath(path);
  const bare =
    current === defaultLang
      ? normalizePath(path)
      : normalizePath(normalizePath(path).replace(new RegExp(`^/${current}/`), '/'));

  return Object.fromEntries(
    langCodes.map((lang) => [
      lang,
      lang === defaultLang ? bare : normalizePath(`/${lang}${bare}`),
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

/**
 * Hreflang links of a contributor page in the sitemap's `<xhtml:link>` shape.
 * The static-route alternates map in astro.config.mjs only covers the paths in
 * `routes`; contributor pages are dynamic, so the sitemap falls back to this.
 * Accepts either a site-relative path or an absolute URL (the sitemap passes
 * absolute URLs). Returns undefined for non-contributor URLs.
 */
export function getContributorAlternateLinks(
  url: string
): { lang: string; url: string }[] | undefined {
  const path = url.replace(/^https?:\/\/[^/]+/, '');
  const slug = getContributorSlug(path);
  if (!slug) return undefined;
  return langCodes.map((lang) => ({
    lang: languages[lang].htmlLang,
    url: absoluteUrl(contributorPath(lang, slug)),
  }));
}

/**
 * Same as getContributorAlternateLinks, for project pages.
 */
export function getProjectAlternateLinks(
  url: string
): { lang: string; url: string }[] | undefined {
  const path = url.replace(/^https?:\/\/[^/]+/, '');
  const slug = getProjectSlug(path);
  if (!slug) return undefined;
  return langCodes.map((lang) => ({
    lang: languages[lang].htmlLang,
    url: absoluteUrl(projectPath(lang, slug)),
  }));
}
