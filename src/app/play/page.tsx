'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { GuideBreadcrumbs } from '@/components/bucket-hats/GuideBreadcrumbs';
import { PopularBucketHatsBlock } from '@/components/home/PopularBucketHatsBlock';
import { PLAY_PAGE_BUCKET_HAT_SKUS } from '@/lib/shopify/mock-storefront';

const avantGardeStack =
  '"Futura PT", "ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", Futura, Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const POSITANO_HERO_IMG = '/products/positano/positano1.png';

const POPULAR_HAT_TILE_GRAY = '#f9f8f6';

const hatTileSx = {
  position: 'relative',
  width: '100%',
  aspectRatio: '3 / 4',
  bgcolor: POPULAR_HAT_TILE_GRAY,
  overflow: 'hidden',
  borderRadius: 0,
} as const;

const metaSx = {
  mt: 1.25,
  textAlign: 'left',
  pl: 0,
} as const;

const hatImageInsetSx = {
  position: 'absolute',
  inset: '8%',
} as const;

/** Static tiles — links are inert (no navigation). */
const POSITANO_TILES = [
  {
    key: 'pink',
    src: '/products/positano/positano-pink-hat.png',
    title: 'Positano',
    colorName: 'Pink',
  },
  {
    key: 'blue',
    src: '/products/positano/positano-blue-hat.png',
    title: 'Positano',
    colorName: 'Blue',
  },
  {
    key: 'pink-hearts',
    src: '/products/positano/positano-pink-hearts-hat.png',
    title: 'Positano',
    colorName: 'Pink hearts',
  },
  {
    key: 'purple',
    src: '/products/positano/positano-purple-hat.png',
    title: 'Positano',
    colorName: 'Purple',
  },
] as const;

/** Lifestyle / alternate angles — same folder. */
const POSITANO_ALT_TILES = [
  {
    key: 'blue-alt1',
    src: '/products/positano/positano-blue-alt1.png',
    title: 'Positano',
    colorName: 'Blue — alternate 1',
  },
  {
    key: 'blue-alt2',
    src: '/products/positano/positano-blue-alt2.png',
    title: 'Positano',
    colorName: 'Blue — alternate 2',
  },
  {
    key: 'blue-alt3',
    src: '/products/positano/positano-blue-alt3.png',
    title: 'Positano',
    colorName: 'Blue — alternate 3',
  },
  {
    key: 'purple-alt1',
    src: '/products/positano/positano-purple-alt1.png',
    title: 'Positano',
    colorName: 'Purple — alternate 1',
  },
] as const;

/** Moon + remaining folder assets (after main + alt rows). Starts with positano-moon-blue. */
const POSITANO_MOON_ROW_TILES = [
  {
    key: 'moon-blue',
    src: '/products/positano/positano-moon-blue.png',
    title: 'Positano',
    colorName: 'Moon blue',
  },
  {
    key: 'purple-alt2',
    src: '/products/positano/positano-purple-alt2.png',
    title: 'Positano',
    colorName: 'Purple — alternate 2',
  },
  // {
  //   key: 'editorial',
  //   src: '/products/positano/positano1.png',
  //   title: 'Positano',
  //   colorName: 'Editorial',
  // },
] as const;

const tileGridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, minmax(0, 1fr))',
    sm: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(4, minmax(0, 1fr))',
  },
  columnGap: { xs: 2, sm: 1.75, md: 1.5 },
  rowGap: { xs: 5, sm: 6, md: 7 },
  alignItems: 'start',
} as const;

/** Three tiles — xs/sm use 2 columns (2 + 1), md three equal columns */
const tileGridThreeSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'repeat(2, minmax(0, 1fr))',
    sm: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(3, minmax(0, 1fr))',
  },
  columnGap: { xs: 2, sm: 1.75, md: 1.5 },
  rowGap: { xs: 5, sm: 6, md: 7 },
  alignItems: 'start',
} as const;

function HatCardFigure({ src, alt }: { src: string; alt: string }) {
  return (
    <Box sx={{ ...hatTileSx }}>
      <Box sx={hatImageInsetSx}>
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src={src} alt={alt} fill sizes="(max-width: 899px) 45vw, 22vw" style={{ objectFit: 'contain' }} />
        </Box>
      </Box>
    </Box>
  );
}

function PositanoTileRow({
  tiles,
  gridSx,
}: {
  tiles: readonly { key: string; src: string; title: string; colorName: string }[];
  /** Defaults to four-column desktop grid */
  gridSx?: typeof tileGridSx | typeof tileGridThreeSx;
}) {
  return (
    <Box sx={{ ...(gridSx ?? tileGridSx) }}>
      {tiles.map((tile) => (
        <Box key={tile.key} sx={{ width: '100%', minWidth: 0 }}>
          <Box
            component="div"
            sx={{
              width: '100%',
              textDecoration: 'none',
              color: 'inherit',
              display: 'block',
              cursor: 'default',
            }}
          >
            <HatCardFigure src={tile.src} alt={`${tile.title} — ${tile.colorName}`} />
            <Box sx={metaSx}>
              <Typography
                sx={{
                  fontFamily: sans,
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#111827',
                  lineHeight: 1.35,
                  mb: 0.35,
                }}
              >
                {tile.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: sans,
                  fontWeight: 400,
                  fontSize: '0.8125rem',
                  color: '#78716c',
                  lineHeight: 1.45,
                }}
              >
                {tile.colorName}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const PlayPage: FC = () => {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: '#f4efe6',
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 10 },
          overflowX: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <GuideBreadcrumbs currentLabel="The Positano Collection" />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            <Box sx={{ order: { xs: 2, md: 1 } }}>
              <Typography
                component="p"
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#a06b5f',
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  mb: 2,
                }}
              >
                Capsule
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontFamily: avantGardeStack,
                  fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#111827',
                  mb: 2.5,
                }}
              >
                The Positano
                <br />
                Collection
              </Typography>
              <Typography
                component="p"
                sx={{
                  color: '#4b5563',
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.75,
                  maxWidth: 520,
                  fontFamily: sans,
                }}
              >
                A small edit of bucket hats inspired by the Amalfi coast—sun-washed color, relaxed texture, and Nury’s
                signature heart. Wear them from vacation mornings to city weekends.
              </Typography>
            </Box>
            <Box
              sx={{
                order: { xs: 1, md: 2 },
                position: 'relative',
                width: '100%',
                maxWidth: 560,
                mx: { xs: 'auto', md: 0 },
                ml: { md: 'auto' },
                aspectRatio: '4 / 5',
                borderRadius: 0,
                overflow: 'hidden',
                bgcolor: 'rgba(255,255,255,0.35)',
              }}
            >
              <Image
                src={POSITANO_HERO_IMG}
                alt="Positano collection hero — coastal-inspired bucket hats"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          bgcolor: '#ffffff',
          pt: { xs: 6, md: 12 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 2 } }}>
          <Typography
            component="h2"
            sx={{
              textAlign: 'center',
              fontFamily: avantGardeStack,
              fontSize: { xs: '1.25rem', md: '1.35rem' },
              letterSpacing: '0.08em',
              color: '#111827',
              mb: 4,
            }}
          >
            POSITANO COLLECTION
          </Typography>

          <PositanoTileRow tiles={POSITANO_TILES} />

          <Typography
            component="h3"
            sx={{
              textAlign: 'center',
              fontFamily: avantGardeStack,
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              letterSpacing: '0.08em',
              color: '#111827',
              mt: { xs: 6, md: 9 },
              mb: 4,
            }}
          >
            Alternate views
          </Typography>

          <PositanoTileRow tiles={POSITANO_ALT_TILES} />

          <Typography
            component="h3"
            sx={{
              textAlign: 'center',
              fontFamily: avantGardeStack,
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              letterSpacing: '0.08em',
              color: '#111827',
              mt: { xs: 6, md: 9 },
              mb: 4,
            }}
          >
            Moon and editorial
          </Typography>

          <PositanoTileRow tiles={POSITANO_MOON_ROW_TILES} gridSx={tileGridThreeSx} />
        </Container>
      </Box>

      <PopularBucketHatsBlock skus={PLAY_PAGE_BUCKET_HAT_SKUS} />
    </>
  );
};

export default PlayPage;
