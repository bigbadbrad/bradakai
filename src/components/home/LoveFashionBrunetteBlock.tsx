'use client';

import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ivySectionTitleSx } from '@/lib/typography/ivy-presto';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';

const IMG = {
  src: '/blonde-beach-model-gray-hat.png' as const,
  w: 900,
  h: 1100,
  alt: 'Model wearing a nury bucket hat' as const,
};

const IMG_PRODUCT_HREF = '/products/frayed-edge-bucket-hat-gray-denim';

export const LoveFashionBrunetteBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor="#f4efe6"
    desktopImageSide="right"
    pt={{ xs: 0, md: 10 }}
    pb={{ xs: 6, md: 14 }}
    image={{
      src: IMG.src,
      width: IMG.w,
      height: IMG.h,
      alt: IMG.alt,
      href: IMG_PRODUCT_HREF,
      linkAriaLabel: 'Shop gray bucket hat',
    }}
  >
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Typography
        component="h2"
        sx={{
          ...ivySectionTitleSx,
          fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.6rem' },
          lineHeight: 1.08,
          letterSpacing: '0.01em',
          color: '#111827',
          mb: 2,
        }}
      >
        Designed to mix
        <br />
        into daily style
      </Typography>

      <Typography
        component="p"
        sx={{
          color: '#4b5563',
          fontSize: { xs: '0.95rem', md: '1rem' },
          lineHeight: 1.7,
          maxWidth: 520,
          mx: { xs: 'auto', md: 0 },
          mb: 3,
        }}
      >
        From coffee runs to late nights out, nury frayed bucket hats are made to pair effortlessly with the pieces you already love.
        Lightweight, flattering, and easy to wear on repeat.
      </Typography>
    </Box>
  </HomepageEditorialSection>
);
