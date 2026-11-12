import type { CollectionEntry } from 'astro:content';

const WORDS_PER_MINUTE = 200;

export function readingTime(article: CollectionEntry<'articles'>): string {
  const words = article.body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

export function coverUrl(article: CollectionEntry<'articles'>, w = 1200, h = 630): string {
  return article.data.cover ?? `https://picsum.photos/seed/${article.slug}/${w}/${h}`;
}
