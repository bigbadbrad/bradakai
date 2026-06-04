'use client';

import type { FC } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { BradaKaiMark } from '@/components/bradakai-mark';

/** Cream speckle tiles — screen-blended over the mark so ink looks worn, not pixelated. */
const fineGrain = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <filter id="f" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.96 0 0 0 0 0.93 0 0 0 0 0.88 0 0 0 0.28 0"/>
    </filter>
    <rect width="96" height="96" filter="url(#f)"/>
  </svg>`
);

const coarseGrain = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <filter id="c" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="4" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.97 0 0 0 0 0.94 0 0 0 0 0.9 0 0 0 0.18 0"/>
    </filter>
    <rect width="128" height="128" filter="url(#c)"/>
  </svg>`
);

const defaultWidth = { xs: 40, sm: 48, md: 52 };

type BradaKaiWeatheredMarkProps = {
  width?: { xs?: number; sm?: number; md?: number };
  sx?: SxProps<Theme>;
};

export const BradaKaiWeatheredMark: FC<BradaKaiWeatheredMarkProps> = ({
  width = defaultWidth,
  sx,
}) => (
  <Box
    sx={[
      {
        mb: { xs: 2.5, md: 3 },
        display: 'inline-block',
        position: 'relative',
        lineHeight: 0,
        isolation: 'isolate',
      },
      ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ]}
  >
    <BradaKaiMark width={width} />
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,${fineGrain}")`,
        backgroundSize: '48px 48px',
        mixBlendMode: 'screen',
        opacity: 0.42,
        pointerEvents: 'none',
      }}
    />
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,${coarseGrain}")`,
        backgroundSize: '64px 64px',
        mixBlendMode: 'soft-light',
        opacity: 0.28,
        pointerEvents: 'none',
      }}
    />
  </Box>
);
