'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { BradaKaiMark } from '@/components/bradakai-mark';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_NAVY_MUTED,
  BRADAKAI_ORANGE,
} from '@/lib/bradakai/brand';

const bodySx = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  color: BRADAKAI_NAVY_MUTED,
  fontSize: { xs: '1rem', md: '1.0625rem' },
  lineHeight: 1.85,
  letterSpacing: '0.01em',
} as const;

/** Cream speckle tiles — screen-blended over the mark so ink looks worn, not pixelated. */
const storyMarkFineGrain = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <filter id="f" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.96 0 0 0 0 0.93 0 0 0 0 0.88 0 0 0 0.28 0"/>
    </filter>
    <rect width="96" height="96" filter="url(#f)"/>
  </svg>`
);

const storyMarkCoarseGrain = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <filter id="c" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="4" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.97 0 0 0 0 0.94 0 0 0 0 0.9 0 0 0 0.18 0"/>
    </filter>
    <rect width="128" height="128" filter="url(#c)"/>
  </svg>`
);

export const BradaKaiStoryBlock: FC = () => (
  <Box
    component="section"
    sx={{
      bgcolor: BRADAKAI_CREAM,
      pt: { xs: 10, md: 14 },
      pb: { xs: 10, md: 22 },
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ maxWidth: 640, mx: 'auto', px: { xs: 0.5, sm: 0 } }}>
        <Box
          sx={{
            mb: { xs: 2.5, md: 3 },
            display: 'inline-block',
            position: 'relative',
            lineHeight: 0,
            isolation: 'isolate',
          }}
        >
          <BradaKaiMark width={{ xs: 44, sm: 52, md: 56 }} />
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,${storyMarkFineGrain}")`,
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
              backgroundImage: `url("data:image/svg+xml,${storyMarkCoarseGrain}")`,
              backgroundSize: '64px 64px',
              mixBlendMode: 'soft-light',
              opacity: 0.28,
              pointerEvents: 'none',
            }}
          />
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'var(--font-old-press), "Bebas Neue", system-ui, sans-serif',
            fontWeight: 400,
            fontSize: { xs: '2rem', md: '2.5rem' },
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            color: BRADAKAI_NAVY,
            mb: { xs: 3, md: 4 },
          }}
        >
          What is BradaKai?
        </Typography>

        <Typography sx={{ ...bodySx, mb: 2 }}>Some say it&apos;s a tribe.</Typography>

        <Typography sx={{ ...bodySx, mb: 2 }}>
          Others say it&apos;s a feeling you only understand near the sea.
        </Typography>

        <Typography sx={{ ...bodySx, mb: 2 }}>
          The old surfers believed the ocean called certain people back again and again — before dawn, after
          sunset, through changing tides, salt air, and years of chasing waves across the Pacific.
        </Typography>

        <Typography sx={{ ...bodySx, mb: 2 }}>BradaKai was born from that belief.</Typography>

        <Typography sx={{ ...bodySx, mb: { xs: 3, md: 4 } }}>
          A respect for the ocean. For the people who protect it. For the ones who understand that the sea gives
          everything and takes everything back.
        </Typography>

        <Typography sx={{ ...bodySx, color: BRADAKAI_NAVY, mb: 0 }}>
          Many seek the tribe.
          <br />
          Few earn the salt.
        </Typography>

        <Typography component="p" sx={{ ...bodySx, color: BRADAKAI_ORANGE, mt: 2, mb: 0 }}>
          Ocean bros only.
        </Typography>
      </Box>
    </Container>
  </Box>
);
