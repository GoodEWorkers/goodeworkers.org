// Punctuation only, applied where copy is rendered (the copy files stay as written). Apostrophes are left as written
// in the copy. Adds a non-breaking hyphen inside words (so "health-related" never breaks at its hyphen) and, in French, a
// non-breaking space before : ; ? ! and inside « ». Inter and ClashDisplay both carry these glyphs.
export const typeset = (text: string, lang: string) => {
  const out = text.replace(/(\p{L})-(\p{L})/gu, '$1\u2011$2');
  return lang === 'fr' ? out.replace(/ ([:;?!\u00bb])/g, '\u00a0$1').replace(/\u00ab /g, '\u00ab\u00a0') : out;
};
