'use client';

import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_ORANGE,
  bradakaiDisplaySx,
} from '@/lib/bradakai/brand';

const HERO_MIN_HEIGHT = { xs: 'min(72vh, 640px)', md: 'min(78vh, 720px)' };

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
      minHeight: HERO_MIN_HEIGHT,
      overflow: 'hidden',
      bgcolor: '#2a3540',
    }}
  >
    <Image
      src="/hero.png"
      alt="Vintage surf van on the beach with BradaKai boards"
      fill
      priority
      sizes="100vw"
      style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
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
      }}
    />

    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        minHeight: HERO_MIN_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
        py: { xs: 6, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: { xs: '100%', md: 520 } }}>
        <Typography
          component="h1"
          sx={{
            ...bradakaiDisplaySx,
            fontSize: { xs: '2.35rem', sm: '2.85rem', md: '3.5rem' },
            lineHeight: 1.05,
            color: { xs: BRADAKAI_CREAM, md: BRADAKAI_NAVY },
            mb: { xs: 1.5, md: 2 },
            textShadow: {
              xs: '0 2px 24px rgba(0,0,0,0.35)',
              md: 'none',
            },
          }}
        >
          Made by the sea.
          <br />
          Worn by the few.
        </Typography>

        <Typography
          component="p"
          sx={{
            ...bradakaiDisplaySx,
            fontSize: { xs: '1rem', md: '1.15rem' },
            letterSpacing: '0.14em',
            color: { xs: 'rgba(245,240,232,0.92)', md: BRADAKAI_NAVY },
            mb: { xs: 3, md: 4 },
            textShadow: { xs: '0 1px 12px rgba(0,0,0,0.3)', md: 'none' },
          }}
        >
          Old school spirit. Timeless style.
        </Typography>

        <Button
          component={Link}
          href="/shop"
          variant="contained"
          disableElevation
          sx={{
            ...bradakaiDisplaySx,
            fontSize: '1rem',
            letterSpacing: '0.14em',
            bgcolor: BRADAKAI_ORANGE,
            color: '#fff',
            px: 3.5,
            py: 1.35,
            borderRadius: 0,
            '&:hover': { bgcolor: '#a85324' },
          }}
        >
          Shop t-shirts
        </Button>
      </Box>
    </Box>

    <TornPaperEdge />
  </Box>
);
