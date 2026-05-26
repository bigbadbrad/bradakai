'use client';

import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ivySectionTitleSx } from '@/lib/typography/ivy-presto';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';

const IMG = { src: '/paris-brunette5.png' as const, w: 1086, h: 1448, alt: 'In Paris with a nury bucket hat' as const };
const IMG_PRODUCT_HREF = '/products/frayed-edge-bucket-hat-black-denim';

export const LoveEverydayFormBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor="#ffffff"
    desktopImageSide="left"
    py={{ xs: 10, md: 14 }}
    image={{
      src: IMG.src,
      width: IMG.w,
      height: IMG.h,
      alt: IMG.alt,
      href: IMG_PRODUCT_HREF,
      linkAriaLabel: 'Shop black frayed bucket hat',
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
        Love, in
        <br />
        everyday form
      </Typography>

      <Typography
        component="p"
        sx={{
          color: '#4b5563',
          fontSize: { xs: '0.95rem', md: '1rem' },
          lineHeight: 1.7,
          maxWidth: 520,
          mx: { xs: 'auto', md: 0 },
          mb: 0,
        }}
      >
        Tailored layers, denim, fresh flowers, a hat you throw on without thinking twice. Nury is made for the beauty of
        everyday dressing—simple frayed pieces with a signature point of view.
      </Typography>
    </Box>
  </HomepageEditorialSection>
);
