import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goodeworkers.org',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      // Google uses lastmod as a recrawl-scheduling hint when it is consistent
      // and honest. Deliberately no `priority` or `changefreq` — Google has
      // confirmed it ignores both.
      lastmod: new Date(),
      // /thanks/ is a post-submission state, not a destination.
      filter: (page) => !page.includes('/thanks'),
    }),
  ],
});
