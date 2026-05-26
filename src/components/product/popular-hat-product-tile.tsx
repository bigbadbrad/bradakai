'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import type { PopularBucketHatHomeRow } from '@/lib/shopify/mock-storefront';
import { ivySectionTitleSx } from '@/lib/typography/ivy-presto';
import productCardStyles from '@/components/product/product-card-treatment.module.css';

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
const tileCharcoal = '#2b2b2f';
const tileMuted = '#6b6560';

export const POPULAR_HAT_TILE_GRAY = '#f9f8f6';

const hatTileSx = {
  position: 'relative',
  width: '100%',
  aspectRatio: '3 / 4',
  bgcolor: POPULAR_HAT_TILE_GRAY,
  overflow: 'hidden',
  borderRadius: 0,
} as const;

const hatImageInsetSx = {
  position: 'absolute',
  inset: '8%',
} as const;

function formatTilePrice(priceFormatted: string): string {
  return priceFormatted.replace(/\.00$/, '');
}

export type PopularHatProductTileProps = {
  row: PopularBucketHatHomeRow;
  compact?: boolean;
  /** Homepage PopularBucketHatsBlock: smaller color on mobile, hide product line title. */
  homepageMobileMeta?: boolean;
  /** Homepage PopularBucketHatsBlock: framed product card experiment. */
  productCardTreatment?: boolean;
};

const hoverImageSx = {
  '@media (hover: hover)': {
    '&:hover .popular-hat-gallery-hover': { opacity: 1 },
    '&:hover .popular-hat-tile-meta': { opacity: 0 },
  },
} as const;

const tileMetaSx = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  px: { xs: 1.25, md: 1.5 },
  py: { xs: 1.25, md: 1.5 },
  pointerEvents: 'none',
  opacity: 1,
  transition: 'opacity 0.22s ease',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: { xs: 1, md: 1.25 },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
} as const;

/** Homepage / collection product tile — in-image meta, hides on hover when a gallery image exists. */
export function PopularHatProductTile({
  row,
  compact,
  homepageMobileMeta,
  productCardTreatment,
}: PopularHatProductTileProps) {
  const hasHover = Boolean(row.galleryHoverSrc);
  const imageSizes = compact ? '(max-width: 899px) 45vw, 11rem' : '(max-width: 899px) 45vw, 22vw';

  const galleryHover = hasHover ? (
    <Box
      className="popular-hat-gallery-hover"
      sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0,
        transition: 'opacity 0.22s ease',
        pointerEvents: 'none',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      }}
    >
      <Image
        src={row.galleryHoverSrc!}
        alt={row.galleryHoverAlt ?? row.heroAlt}
        fill
        sizes={imageSizes}
        style={{ objectFit: 'contain' }}
      />
    </Box>
  ) : null;

  const images = (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Image
        src={row.heroSrc}
        alt={row.heroAlt}
        fill
        sizes={imageSizes}
        style={{ objectFit: 'contain' }}
      />
      {galleryHover}
    </Box>
  );

  const meta = (
    <Box className="popular-hat-tile-meta" sx={tileMetaSx}>
      <Box sx={{ minWidth: 0, flex: '1 1 auto' }}>
        <Typography
          component="p"
          sx={{
            ...ivySectionTitleSx,
            fontSize: homepageMobileMeta
              ? { xs: '0.72rem', sm: '0.78rem', md: '1.15rem', lg: '1.25rem' }
              : { xs: '0.95rem', sm: '1rem', md: '1.15rem', lg: '1.25rem' },
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            color: tileCharcoal,
            mb: homepageMobileMeta ? { xs: 0, md: 0.35 } : 0.35,
          }}
        >
          {row.colorName}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontFamily: sans,
            fontSize: { xs: '0.75rem', md: '0.8125rem' },
            fontWeight: 500,
            lineHeight: 1.35,
            color: tileMuted,
            m: 0,
            ...(homepageMobileMeta ? { display: { xs: 'none', md: 'block' } } : {}),
          }}
        >
          {row.title}
        </Typography>
      </Box>
      <Typography
        component="p"
        sx={{
          fontFamily: sans,
          fontSize: { xs: '0.75rem', md: '0.8125rem' },
          fontWeight: 400,
          lineHeight: 1.35,
          color: '#78716c',
          flexShrink: 0,
          m: 0,
          pb: '0.05em',
        }}
      >
        {formatTilePrice(row.priceFormatted)}
      </Typography>
    </Box>
  );

  if (productCardTreatment) {
    return (
      <Box className={productCardStyles.productCard}>
        <Box
          className={productCardStyles.productImageWrap}
          sx={hasHover ? hoverImageSx : undefined}
        >
          {images}
          {meta}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...hatTileSx,
        ...(hasHover ? hoverImageSx : {}),
      }}
    >
      <Box sx={hatImageInsetSx}>{images}</Box>
      {meta}
    </Box>
  );
}
