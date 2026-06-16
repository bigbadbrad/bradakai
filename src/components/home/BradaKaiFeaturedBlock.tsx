'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Box, Container, Typography, type SxProps, type Theme } from '@mui/material';
import { BradaKaiWeatheredMark } from '@/components/bradakai-weathered-mark';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_ORANGE,
  BRADAKAI_NAVY_MUTED,
  bradakaiDisplaySx,
} from '@/lib/bradakai/brand';

const HERO_PRODUCT = {
  src: '/products/north-shore-shirt-final.png',
  alt: 'BradaKai North Shore shirt',
  width: 1122,
  height: 1402,
} as const;

const MAIN_PRODUCTS = [
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
  {
    src: '/breathable-hat-black-gray.png',
    alt: 'BradaKai breathable hat black gray',
    label: 'Breathable hat black gray',
  },
  {
    src: '/breathable-hat-gray-black.png',
    alt: 'BradaKai breathable hat gray black',
    label: 'Breathable hat gray black',
  },
  {
    src: '/breathable-hat-gray-orange.png',
    alt: 'BradaKai breathable hat gray orange',
    label: 'Breathable hat gray orange',
  },
  {
    src: '/breathable-hat-gray-green.png',
    alt: 'BradaKai breathable hat gray green',
    label: 'Breathable hat gray green',
  },
] as const;

const SAND_HATS = [
  {
    src: '/brown-hat-side.png',
    alt: 'BradaKai brown hat side',
    label: 'Brown hat side',
  },
  {
    src: '/sand-hat-angle-black-no-puff.png',
    alt: 'BradaKai sand hat angle',
    label: 'Sand hat angle',
  },
] as const;

function ProductCard({
  src,
  alt,
  sizes,
  aspectRatio = '1 / 1',
  sx,
}: {
  src: string;
  alt: string;
  sizes: string;
  aspectRatio?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={[
        {
          bgcolor: '#fff',
          borderRadius: 0.5,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(30,58,95,0.08)',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box sx={{ position: 'relative', aspectRatio }}>
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      </Box>
    </Box>
  );
}

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
          <BradaKaiWeatheredMark sx={{ mb: { xs: 1.5, md: 2 } }} />

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
              fontFamily: 'var(--font-old-press), "Bebas Neue", system-ui, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '2rem', md: '2.5rem' },
              lineHeight: 1.1,
              letterSpacing: '0.04em',
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

        <ProductCard
          src={HERO_PRODUCT.src}
          alt={HERO_PRODUCT.alt}
          aspectRatio={`${HERO_PRODUCT.width} / ${HERO_PRODUCT.height}`}
          sizes="(max-width: 900px) 100vw, 42vw"
        />
      </Box>

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr)) minmax(0, 1fr)',
          },
          gap: { xs: 1.5, sm: 2, md: 2.5 },
        }}
      >
        {MAIN_PRODUCTS.map((product) => (
          <ProductCard
            key={product.label}
            src={product.src}
            alt={product.alt}
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
          />
        ))}
        {SAND_HATS.map((hat, index) => (
          <ProductCard
            key={hat.label}
            src={hat.src}
            alt={hat.alt}
            sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
            sx={{
              gridColumn: { md: 5 },
              gridRow: { md: index + 1 },
            }}
          />
        ))}
      </Box>
    </Container>
  </Box>
);
