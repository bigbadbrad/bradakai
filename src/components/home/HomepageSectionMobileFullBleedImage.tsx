'use client';

import type { FC } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

/** Only below `md`. Sits **outside** `Container` so `width: 100%` is true edge-to-edge — no vw/calc. */
export const HomepageSectionMobileFullBleedImage: FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}> = ({ src, alt, width, height, priority }) => (
  <Box sx={{ display: { xs: 'block', md: 'none' }, width: '100%', lineHeight: 0 }}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="100vw"
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  </Box>
);
