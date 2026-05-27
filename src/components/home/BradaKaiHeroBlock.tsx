'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
} from '@/lib/bradakai/brand';

const HERO_SRC = '/hero-16-9.png';
const HERO_WIDTH = 1672;
const HERO_HEIGHT = 941;

/** Deckled bottom edge — cream fill matches featured section below. */
function TornPaperEdge() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: { xs: 36, md: 48 },
        zIndex: 2,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 48' preserveAspectRatio='none'>
            <path fill='${BRADAKAI_CREAM}' d='M0,48 L0,18 C80,8 160,38 240,22 C360,2 480,42 600,28 C720,14 840,40 960,24 C1040,12 1120,36 1200,20 L1200,48 Z'/>
          </svg>`
        )}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    />
  );
}

export const BradaKaiHeroBlock: FC = () => (
  <Box
    component="section"
    sx={{
      position: 'relative',
      width: '100%',
      bgcolor: BRADAKAI_CREAM,
    }}
  >
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        /* Shorter crop on phones — full 16:9 is too tall and clips the headline */
        height: { xs: 420, sm: 440, md: 'auto' },
        aspectRatio: { md: `${HERO_WIDTH} / ${HERO_HEIGHT}` },
        overflow: 'hidden',
      }}
    >
      <Image
        src={HERO_SRC}
        alt="Vintage surf van on the beach with BradaKai boards"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 38%' }}
      />

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: 'linear-gradient(180deg, rgba(30,58,95,0.55) 0%, rgba(30,58,95,0.2) 45%, transparent 70%)',
            md: 'linear-gradient(90deg, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.75) 38%, rgba(245,240,232,0.15) 58%, transparent 72%)',
          },
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          pt: { xs: 7, sm: 5, md: 6 },
          /* Clear the torn-paper edge (36px on xs) so “ONLY.” isn’t clipped */
          pb: { xs: 'calc(36px + 16px)', md: 6 },
        }}
      >
        <Box sx={{ maxWidth: { xs: 360, sm: 480, md: 640, lg: 720 } }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--font-old-press), "Bebas Neue", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '2.75rem', sm: '4.25rem', md: '5.5rem', lg: '6.5rem' },
              lineHeight: 0.95,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              color: { xs: BRADAKAI_CREAM, md: BRADAKAI_NAVY },
              mb: 0,
              textShadow: {
                xs: '0 2px 24px rgba(0,0,0,0.35)',
                md: 'none',
              },
            }}
          >
            OCEAN
            <br />
            BROS
            <br />
            ONLY.
          </Typography>
        </Box>
      </Box>

      <TornPaperEdge />
    </Box>
  </Box>
);
