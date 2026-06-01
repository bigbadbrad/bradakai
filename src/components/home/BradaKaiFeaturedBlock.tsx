'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_ORANGE,
  BRADAKAI_NAVY_MUTED,
  bradakaiDisplaySx,
} from '@/lib/bradakai/brand';
const FEATURED_TEES = [
  {
    src: '/product1.png',
    alt: 'BradaKai product 1 tee',
    label: 'Product 1',
  },
  {
    src: '/product2.png',
    alt: 'BradaKai product 2 tee',
    label: 'Product 2',
  },
  {
    src: '/hat-bitchin.png',
    alt: 'BradaKai hat',
    label: 'Hat bitchin',
  },
  {
    src: '/hat-white.png',
    alt: 'BradaKai white hat',
    label: 'Hat white',
  },
] as const;

export const BradaKaiFeaturedBlock: FC = () => (
  <Box
    component="section"
    sx={{
      bgcolor: BRADAKAI_CREAM,
      pt: { xs: 5, md: 8 },
      pb: { xs: 18, md: 24 },
    }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            component="p"
            sx={{
              ...bradakaiDisplaySx,
              fontSize: '0.85rem',
              color: BRADAKAI_ORANGE,
              letterSpacing: '0.2em',
              mb: 1.5,
            }}
          >
            Ocean bros only
          </Typography>

          <Typography
            component="h2"
            sx={{
              ...bradakaiDisplaySx,
              fontSize: { xs: '1.85rem', md: '2.25rem' },
              lineHeight: 1.1,
              color: BRADAKAI_NAVY,
              mb: 2,
            }}
          >
            Tribe threads.
            <br />
            Built to last.
          </Typography>

          <Typography
            sx={{
              color: BRADAKAI_NAVY_MUTED,
              fontSize: { xs: '0.95rem', md: '1rem' },
              lineHeight: 1.65,
              maxWidth: 400,
              mb: 3,
            }}
          >
            Classic fits for dawn patrol, beach fires, and the long days that end with salt on your skin.
          </Typography>

          <Typography
            component="p"
            sx={{
              ...bradakaiDisplaySx,
              fontSize: '0.9rem',
              color: BRADAKAI_ORANGE,
              letterSpacing: '0.16em',
              m: 0,
            }}
          >
            Shop the collection →
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {FEATURED_TEES.map((tee) => (
            <Box
              key={tee.label}
              sx={{
                bgcolor: '#fff',
                borderRadius: 0.5,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(30,58,95,0.08)',
              }}
            >
              <Box sx={{ position: 'relative', aspectRatio: '1 / 1' }}>
                <Image src={tee.src} alt={tee.alt} fill sizes="(max-width: 900px) 50vw, 220px" style={{ objectFit: 'cover' }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);
