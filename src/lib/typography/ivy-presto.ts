/** Adobe Fonts — ivypresto-display (kit usd3daq). */
export const IVY_PRESTO_FAMILY = '"ivypresto-display", "Times New Roman", Times, serif';

/** H1 / major editorial headlines */
export const ivyH1Sx = {
  fontFamily: IVY_PRESTO_FAMILY,
  fontWeight: 300,
  fontStyle: 'normal',
} as const;

/** Section titles (large editorial blocks) */
export const ivySectionTitleSx = {
  fontFamily: IVY_PRESTO_FAMILY,
  fontWeight: 300,
  fontStyle: 'normal',
} as const;

/** Smaller section labels */
export const ivySectionTitleSmSx = {
  fontFamily: IVY_PRESTO_FAMILY,
  fontWeight: 400,
  fontStyle: 'normal',
} as const;

/** Legal / utility page H1 */
export const ivyPageH1Sx = {
  ...ivyH1Sx,
  fontSize: { xs: '1.75rem', md: '2.125rem' },
  lineHeight: 1.2,
  letterSpacing: '0.01em',
  color: '#1a1816',
} as const;
