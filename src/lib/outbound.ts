import { SITE } from '../i18n/routes';

/**
 * Tags every outbound link carries, so the sites we send people to can see
 * the visits came from us. `utm_medium=referral` makes analytics file the
 * visit under referrals; without a medium, most tools report "(not set)".
 */
export const UTM = {
  utm_source: 'goodeworkers.org',
  utm_medium: 'referral',
} as const;

/** True for http(s) links to another site; false for our own pages, mailto:, anchors. */
export function isExternal(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  return new URL(href).origin !== new URL(SITE).origin;
}

/**
 * `href` with our UTM tags added, plus `utm_campaign` when given (e.g. the
 * page the link sits on). Tags already on the URL are kept, and internal
 * links come back untouched.
 */
export function outboundUrl(href: string, campaign?: string): string {
  if (!isExternal(href)) return href;
  const url = new URL(href);
  const tags: Record<string, string> = { ...UTM, ...(campaign ? { utm_campaign: campaign } : {}) };
  for (const [key, value] of Object.entries(tags)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
