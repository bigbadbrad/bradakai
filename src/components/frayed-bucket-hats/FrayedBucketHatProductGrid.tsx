'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { PopularHatProductTile } from '@/components/product/popular-hat-product-tile';
import { FRAYED_BUCKET_HAT_PAGE_SKUS } from '@/lib/frayed-bucket-hats/page-content';
import { getPopularBucketHatHomeRowsForSkus } from '@/lib/shopify/mock-storefront';
import { h2Sx } from '@/components/bucket-hats/constants';
import { PRODUCT_LINKS_ENABLED } from '@/lib/bradakai/catalog';

export const FrayedBucketHatProductGrid: FC = () => {
  const rows = getPopularBucketHatHomeRowsForSkus(FRAYED_BUCKET_HAT_PAGE_SKUS);

  return (
    <Box
      id="shop-frayed-bucket-hats"
      component="section"
      sx={{ bgcolor: '#ffffff', pt: { xs: 6, md: 9 }, pb: { xs: 8, md: 10 } }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 2 } }}>
        <Typography component="h2" sx={{ ...h2Sx, textAlign: 'center', fontSize: { xs: '1.35rem', md: '1.65rem' } }}>
          The Frayed Edit
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: '#4b5563',
            fontSize: { xs: '0.95rem', md: '1rem' },
            lineHeight: 1.75,
            maxWidth: 640,
            mx: 'auto',
            mb: 5,
          }}
        >
          Each color carries the same Nury Proportion: soft, wearable, feminine, and finished with our heart mark.
          Choose the shade that fits your everyday world.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            columnGap: { xs: 2, md: 1.5 },
            rowGap: { xs: 2, sm: 2.5, md: 3 },
            alignItems: 'start',
          }}
        >
          {rows.map((row) => {
            const tile = <PopularHatProductTile row={row} homepageMobileMeta />;
            return (
              <Box key={row.sku} sx={{ width: '100%', minWidth: 0 }}>
                {PRODUCT_LINKS_ENABLED ? (
                  <Link
                    href={`/products/${row.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    {tile}
                  </Link>
                ) : (
                  tile
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};
