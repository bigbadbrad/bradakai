/** Site-wide legal / policy copy — BradaKai at bradakai.com */
export const LEGAL_ENTITY = 'BradaKai';
export const SITE_DOMAIN = 'bradakai.com';
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Customer-facing inbox — used on /contact and legal policy links. */
export const CONTACT_EMAIL = 'hello@bradakai.com';
/** Alias for policy copy imports; same address as {@link CONTACT_EMAIL}. */
export const SUPPORT_EMAIL = CONTACT_EMAIL;

/** Placeholder copy when no public mailing address is listed on policies. */
export const MAILING_ADDRESS_PLACEHOLDER =
  'California, United States — for our business mailing address, contact us at the email below.';

export const LEGAL_LAST_UPDATED_DISPLAY = 'May 13, 2026';

export const VARIATION_DISCLAIMER_MICROCOPY =
  'Each BradaKai piece is made with fabric and finishing details that may vary slightly from piece to piece. Color, texture, fit, stitching, and graphics may vary slightly and may appear different depending on your screen.';

/** Absolute URL for metadata, JSON-LD, and canonicals. */
export function absoluteUrl(path = ''): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
