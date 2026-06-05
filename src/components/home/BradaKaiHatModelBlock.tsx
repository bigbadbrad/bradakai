'use client';

import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { BradaKaiWeatheredMark } from '@/components/bradakai-weathered-mark';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';
import { LOVE_FASHION_EDITORIAL_FRAME_ENABLED } from '@/lib/homepage/editorial-frame-experiment';
import { BRADAKAI_CREAM, BRADAKAI_NAVY, BRADAKAI_NAVY_MUTED } from '@/lib/bradakai/brand';

const IMG = {
  src: '/black-hat-brunette-dude.png' as const,
  w: 1122,
  h: 1402,
  alt: 'Model wearing a BradaKai black hat' as const,
};

export const BradaKaiHatModelBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor={BRADAKAI_CREAM}
    desktopImageSide="left"
    pt={{ xs: 0, md: 14 }}
    pb={{ xs: 6, md: 10 }}
    image={{
      src: IMG.src,
      width: IMG.w,
      height: IMG.h,
      alt: IMG.alt,
    }}
    editorialFrame={LOVE_FASHION_EDITORIAL_FRAME_ENABLED}
  >
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <BradaKaiWeatheredMark sx={{ mb: { xs: 1.5, md: 2 } }} />

      <Typography
        component="h2"
        sx={{
          fontFamily: 'var(--font-old-press), "Bebas Neue", system-ui, sans-serif',
          fontWeight: 400,
          fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.6rem' },
          lineHeight: 1.08,
          letterSpacing: '0.04em',
          color: BRADAKAI_NAVY,
          mb: 2,
        }}
      >
        Salt and sun.
        <br />
        Tribe approved.
      </Typography>

      <Typography
        component="p"
        sx={{
          color: BRADAKAI_NAVY_MUTED,
          fontSize: { xs: '0.95rem', md: '1rem' },
          lineHeight: 1.7,
          maxWidth: 520,
          mx: { xs: 'auto', md: 0 },
          mb: 3,
        }}
      >
        Our first hat — clean lines, salt-worn attitude, and zero pretension. Built for ocean bros who show up before
        the crowd.
      </Typography>
    </Box>
  </HomepageEditorialSection>
);
