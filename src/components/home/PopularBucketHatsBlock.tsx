'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { PopularHatProductTile } from '@/components/product/popular-hat-product-tile';
import { POPULAR_BUCKET_HATS_PRODUCT_CARD_TREATMENT_ENABLED } from '@/lib/homepage/product-card-treatment-experiment';
import {
  getPopularBucketHatHomeRowsForSkus,
  POPULAR_BUCKET_HAT_HOMEPAGE_SKUS,
  POPULAR_BUCKET_HATS_SECTION_TITLE,
} from '@/lib/shopify/mock-storefront';
import { ivySectionTitleSmSx } from '@/lib/typography/ivy-presto';

export type PopularBucketHatsBlockProps = {
  /** Catalogue SKUs to show; defaults to homepage Explore Icons list. */
  skus?: readonly string[];
  sectionTitle?: string;
  /** Optional link below the product grid (e.g. frayed collection landing page). */
  collectionHref?: string;
  collectionLinkLabel?: string;
};

export const PopularBucketHatsBlock: FC<PopularBucketHatsBlockProps> = ({
  skus = POPULAR_BUCKET_HAT_HOMEPAGE_SKUS,
  sectionTitle = POPULAR_BUCKET_HATS_SECTION_TITLE,
  collectionHref,
  collectionLinkLabel = 'Shop frayed bucket hats',
}) => {
  const rows = getPopularBucketHatHomeRowsForSkus(skus);
  /** Few tiles: cap grid width so each card ≈ one column of the 4-up homepage row. */
  const compactGrid = rows.length <= 2;
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#ffffff',
        pt: { xs: 6, md: 12 },
        /* Extra breathing room before the next homepage section on small screens only */
        pb: { xs: 10, md: 12 },
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 2 } }}>
        <Typography
          component="h2"
          sx={{
            ...ivySectionTitleSmSx,
            textAlign: 'center',
            fontSize: { xs: '1.25rem', md: '1.35rem' },
            letterSpacing: '0.02em',
            color: '#111827',
            mb: 4,
          }}
        >
          {sectionTitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: compactGrid ? 'repeat(2, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))',
            },
            ...(compactGrid
              ? {
                  maxWidth: { xs: '100%', md: 640, lg: 720 },
                  mx: 'auto',
                }
              : {}),
            columnGap: { xs: 2, sm: 1.75, md: 1.5 },
            rowGap: { xs: 2, sm: 2.5, md: 3 },
            alignItems: 'start',
          }}
        >
          {rows.map((row) => (
            <Box key={row.sku} sx={{ width: '100%', minWidth: 0 }}>
              <Link
                href={`/products/${row.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <PopularHatProductTile
                  row={row}
                  compact={compactGrid}
                  homepageMobileMeta
                  productCardTreatment={POPULAR_BUCKET_HATS_PRODUCT_CARD_TREATMENT_ENABLED}
                />
              </Link>
            </Box>
          ))}
        </Box>
        {collectionHref ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography
              component={Link}
              href={collectionHref}
              sx={{
                display: 'inline-block',
                color: '#4b5563',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                textDecoration: 'underline',
                textUnderlineOffset: '0.18em',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontWeight: 600,
                '&:hover': { color: '#111827' },
              }}
            >
              {collectionLinkLabel} →
            </Typography>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};
