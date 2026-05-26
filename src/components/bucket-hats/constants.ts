import {
  ivyH1Sx,
  ivyPageH1Sx,
  ivySectionTitleSmSx,
  ivySectionTitleSx,
} from '@/lib/typography/ivy-presto';

/** @deprecated Use ivy title tokens; kept for pull quotes only. */
export const avantGardeStack =
  '"Futura PT", "ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", Futura, Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

export const bodyColor = '#4b5563';
export const accentMuted = '#a06b5f';
export const bgCream = '#f4efe6';
export const bgWhite = '#ffffff';

export const labelSx = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: accentMuted,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.18em',
  mb: 1.5,
};

export const h1Sx = {
  ...ivyH1Sx,
  fontSize: { xs: '2.25rem', sm: '2.85rem', md: '3.25rem' },
  lineHeight: 1.05,
  letterSpacing: '0.01em',
  color: '#111827',
  mb: 2,
};

export const pageH1Sx = {
  ...ivyPageH1Sx,
  mb: 3,
};

export const h2Sx = {
  ...ivySectionTitleSx,
  fontSize: { xs: '1.65rem', sm: '1.9rem', md: '2.15rem' },
  lineHeight: 1.08,
  letterSpacing: '0.01em',
  color: '#111827',
  mb: 2,
};

export const h3SectionSx = {
  ...ivySectionTitleSx,
  fontSize: { xs: '1.35rem', sm: '1.5rem', md: '1.65rem' },
  lineHeight: 1.12,
  letterSpacing: '0.01em',
  color: '#111827',
  mb: 2,
};

export const cardTitleSx = {
  ...ivySectionTitleSmSx,
  fontSize: '0.85rem',
  letterSpacing: '0.02em',
  color: accentMuted,
  mb: 1,
};

export const bodySx = {
  color: bodyColor,
  fontSize: { xs: '0.95rem', md: '1rem' },
  lineHeight: 1.75,
};

export const outlinedButtonSx = {
  borderRadius: 0,
  borderColor: '#d6cbbd',
  color: '#111827',
  px: 3,
  py: 1.1,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.14em',
  fontSize: '0.75rem',
  '&:hover': { borderColor: '#c8bbaa', bgcolor: 'rgba(0,0,0,0.02)' },
};

export const filledCtaSx = {
  bgcolor: '#e7dfd2',
  color: '#111827',
  borderRadius: 0,
  px: 3,
  py: 1.25,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.14em',
  fontSize: '0.75rem',
  '&:hover': { bgcolor: '#dfd4c3' },
};

/** In-guide text links (e.g. hat-sizes cross-link). */
export const guideInlineLinkSx = {
  color: accentMuted,
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: '0.18em',
  '&:hover': { color: '#111827' },
} as const;
