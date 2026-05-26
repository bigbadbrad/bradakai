'use client';

import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ivySectionTitleSx } from '@/lib/typography/ivy-presto';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';
import { LOVE_FASHION_EDITORIAL_FRAME_ENABLED } from '@/lib/homepage/editorial-frame-experiment';

const IMG = { src: '/portofino-blue4a.png' as const, w: 1086, h: 1448, alt: 'Model wearing a bucket hat' as const };
const IMG_PRODUCT_HREF = '/products/frayed-edge-bucket-hat-dark-blue-denim';

export const LoveFashionBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor="#f4efe6"
    desktopImageSide="left"
    pt={{ xs: 0, md: 14 }}
    pb={{ xs: 6, md: 10 }}
    image={{
      src: IMG.src,
      width: IMG.w,
      height: IMG.h,
      alt: IMG.alt,
      href: IMG_PRODUCT_HREF,
      linkAriaLabel: 'Shop dark blue denim frayed bucket hat',
    }}
    editorialFrame={LOVE_FASHION_EDITORIAL_FRAME_ENABLED}
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
        Love and fashion
        <br />
        for everyday icons
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
        Introducing Nury—a brand defined by clean essentials, a touch of romance, and a playful spirit. Made for women who
        love to wear effortlessly.
      </Typography>
    </Box>
  </HomepageEditorialSection>
);
