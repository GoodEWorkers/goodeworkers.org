import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import {
  SITE,
  absoluteUrl,
  langCodes,
  languages,
  normalizePath,
  routes,
} from './src/i18n/routes';

// Pre-compute the hreflang cluster of every localized page so the sitemap can
// declare <xhtml:link rel="alternate"> next to each <url>. Built from the same
// route table the pages use, so the two can never drift apart.
const alternatesByUrl = new Map();
for (const perLang of Object.values(routes)) {
  const links = langCodes.map((lang) => ({
    lang: languages[lang].htmlLang,
    url: absoluteUrl(perLang[lang]),
  }));
  for (const lang of langCodes) {
    alternatesByUrl.set(normalizePath(absoluteUrl(perLang[lang])), links);
  }
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'en',
    locales: [...langCodes],
    routing: {
      // English stays at the root (/), French lives under /fr.
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    tailwind(),
    react(),
    sitemap({
      filter: (page) => !normalizePath(page).endsWith('/404'),
      serialize: (item) => ({
        ...item,
        links: alternatesByUrl.get(normalizePath(item.url)),
      }),
    }),
  ],
});
