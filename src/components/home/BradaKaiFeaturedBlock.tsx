'use client';

import type { FC } from 'react';
import Link from 'next/link';
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
    src: '/product3.png',
    alt: 'BradaKai product 3 tee',
    label: 'Product 3',
  },
] as const;

export const BradaKaiFeaturedBlock: FC = () => (
  <Box
    component="section"
    sx={{
      bgcolor: BRADAKAI_CREAM,
      pt: { xs: 5, md: 8 },
      pb: { xs: 8, md: 12 },
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
            The originals
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
            Quality threads.
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
            Heavyweight tees. Classic fits. Inspired by the past, made for today.
          </Typography>

          <Typography
            component={Link}
            href="/shop"
            sx={{
              ...bradakaiDisplaySx,
              fontSize: '0.9rem',
              color: BRADAKAI_ORANGE,
              textDecoration: 'none',
              letterSpacing: '0.16em',
              '&:hover': { textDecoration: 'underline', textUnderlineOffset: '0.2em' },
            }}
          >
            Shop the collection →
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: { xs: 1.5, md: 2 },
          }}
        >
          {FEATURED_TEES.map((tee) => (
            <Box
              key={tee.label}
              component={Link}
              href="/shop"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                bgcolor: '#fff',
                borderRadius: 0.5,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(30,58,95,0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 28px rgba(30,58,95,0.14)',
                },
              }}
            >
              <Box sx={{ position: 'relative', aspectRatio: '1 / 1' }}>
                <Image src={tee.src} alt={tee.alt} fill sizes="(max-width: 900px) 33vw, 200px" style={{ objectFit: 'cover' }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);
