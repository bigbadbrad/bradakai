import { PopularBucketHatsBlock } from '@/components/home/PopularBucketHatsBlock';
import { Box, Container, Typography } from '@mui/material';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_NAVY_MUTED,
  bradakaiDisplaySx,
} from '@/lib/bradakai/brand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop BradaKai surf wear — tees and coastal essentials.',
};

export default function ShopPage() {
  return (
    <Box sx={{ bgcolor: BRADAKAI_CREAM }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 2 }}>
        <Typography
          component="h1"
          sx={{
            ...bradakaiDisplaySx,
            fontSize: { xs: '2.25rem', md: '3rem' },
            color: BRADAKAI_NAVY,
            mb: 1.5,
          }}
        >
          Shop
        </Typography>
        <Typography sx={{ color: BRADAKAI_NAVY_MUTED, maxWidth: 520, lineHeight: 1.6 }}>
          Heavyweight threads built for the coast. More styles coming soon — for now, explore what&apos;s in stock.
        </Typography>
      </Container>
      <PopularBucketHatsBlock sectionTitle="In the lineup" />
    </Box>
  );
}
