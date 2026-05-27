/** BradaKai surf wear — palette and typography tokens from /docs mockup. */
export { SITE_DOMAIN, SITE_URL, absoluteUrl } from '@/lib/legal/site';

export const BRADAKAI_CREAM = '#f5f0e8';
export const BRADAKAI_NAVY = '#1e3a5f';
export const BRADAKAI_ORANGE = '#c4622d';
export const BRADAKAI_NAVY_MUTED = '#4a5f7a';

/** Default site title for `<title>`, Open Graph, and Twitter. */
export const BRADAKAI_META_TITLE = 'BradaKai | Ocean bros only.';

/** Default `<meta name="description">`, Open Graph, and Twitter copy. */
export const BRADAKAI_META_DESCRIPTION =
  'Ocean bros only. Many seek the tribe. Few earn the salt.';

export const bradakaiDisplaySx = {
  fontFamily: '"Bebas Neue", "Arial Narrow", sans-serif',
  fontWeight: 400,
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
};

export const bradakaiNavLinkSx = {
  ...bradakaiDisplaySx,
  fontSize: '0.95rem',
  color: BRADAKAI_NAVY,
  textDecoration: 'none',
  letterSpacing: '0.12em',
  '&:hover': { color: BRADAKAI_ORANGE },
};
