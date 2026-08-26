import { getEntry } from 'astro:content';
import type { Lang } from './routes';

/**
 * Homepage copy, loaded from `src/content/home/<lang>.md` so it can be edited
 * without touching the components. Chrome copy (nav, footer, forms, meta)
 * stays in `ui.ts`.
 */
export async function homeContent(lang: Lang) {
  const entry = await getEntry('home', lang);
  if (!entry) {
    throw new Error(`Missing homepage content file: src/content/home/${lang}.md`);
  }
  return entry.data;
}
