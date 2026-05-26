import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { bgCream } from '@/components/bucket-hats/constants';
import { GuideBreadcrumbs } from '@/components/bucket-hats/GuideBreadcrumbs';

const fullBleedImageWrapSx = {
  width: { xs: '100vw', md: '100%' },
  maxWidth: { xs: '100vw', md: '100%' },
  position: 'relative',
  left: { xs: '50%', md: 0 },
  marginLeft: { xs: '-50vw', md: 0 },
  marginRight: { xs: '-50vw', md: 0 },
  lineHeight: 0,
} as const;

export type GuidePageHeroProps = {
  breadcrumbLabel: string;
  lead: ReactNode;
  image: ReactNode;
  pt?: { xs?: number; md?: number };
  pb?: { xs?: number; md?: number };
  /** Below `md`: hide breadcrumbs, zero top padding, image flush under navbar (homepage hero style). */
  mobileFlushHero?: boolean;
};

/** One semantic hero — responsive order + mobile full-bleed image via CSS. */
export function GuidePageHero({
  breadcrumbLabel,
  lead,
  image,
  pt = { xs: 4, md: 6 },
  pb = { xs: 6, md: 9 },
  mobileFlushHero = false,
}: GuidePageHeroProps) {
  const sectionPt = mobileFlushHero ? { xs: 0, md: pt?.md ?? 6 } : pt;

  return (
    <Box component="section" sx={{ bgcolor: bgCream, pt: sectionPt, pb, overflowX: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={mobileFlushHero ? { display: { xs: 'none', md: 'block' } } : undefined}>
          <GuideBreadcrumbs currentLabel={breadcrumbLabel} />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 0, md: 6 },
            alignItems: 'center',
            mt: mobileFlushHero ? { xs: 0, md: 3 } : 3,
          }}
        >
          <Box sx={{ order: { xs: 2, md: 1 }, mt: { xs: 4, md: 0 }, minWidth: 0 }}>{lead}</Box>
          <Box sx={{ order: { xs: 1, md: 2 }, ...fullBleedImageWrapSx }}>{image}</Box>
        </Box>
      </Container>
    </Box>
  );
}
