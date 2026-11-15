/**
 * Meta description text: whitespace collapsed to single spaces. Longer than
 * 160 characters, it is cut at the last whole word that fits in 157 and ends
 * with "…".
 */
export function metaDescription(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= 160) return flat;
  return flat.slice(0, flat.lastIndexOf(' ', 157)).replace(/[\s,;:.—-]+$/, '') + '…';
}
