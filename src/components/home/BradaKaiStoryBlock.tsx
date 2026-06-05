'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { BradaKaiWeatheredMark } from '@/components/bradakai-weathered-mark';
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
        <BradaKaiWeatheredMark />
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
          A respect for the ocean. For those who understand that the sea is never conquered, only borrowed from.
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
