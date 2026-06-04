'use client';

import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';
import { LOVE_FASHION_EDITORIAL_FRAME_ENABLED } from '@/lib/homepage/editorial-frame-experiment';
import { BRADAKAI_CREAM, BRADAKAI_NAVY, BRADAKAI_NAVY_MUTED } from '@/lib/bradakai/brand';

const IMG = {
  src: '/gray-lime-green-hat-blonde-dude2.png' as const,
  w: 1122,
  h: 1402,
  alt: 'Model wearing a BradaKai gray lime green hat' as const,
};

export const BradaKaiLimeGreenHatModelBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor={BRADAKAI_CREAM}
    desktopImageSide="right"
    pt={{ xs: 0, md: 10 }}
    pb={{ xs: 6, md: 14 }}
    image={{
      src: IMG.src,
      width: IMG.w,
      height: IMG.h,
      alt: IMG.alt,
    }}
    editorialFrame={LOVE_FASHION_EDITORIAL_FRAME_ENABLED}
  >
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
        Dawn patrol.
        <br />
        All day wear.
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
        From first light to last call — a hat that moves with you. Easy fit, ocean-ready color, and built for bros who
        never sit still.
      </Typography>
    </Box>
  </HomepageEditorialSection>
);
