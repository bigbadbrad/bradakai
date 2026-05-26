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
  title: 'Collections',
  description: 'BradaKai collections — originals and coastal essentials.',
};

export default function CollectionsPage() {
  return (
    <Box sx={{ bgcolor: BRADAKAI_CREAM, minHeight: '60vh' }}>
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
          Collections
        </Typography>
        <Typography sx={{ color: BRADAKAI_NAVY_MUTED, maxWidth: 520, lineHeight: 1.6 }}>
          The originals and coastal favorites — curated for riders who keep it old school.
        </Typography>
      </Container>
      <PopularBucketHatsBlock sectionTitle="Explore" collectionHref="/shop" collectionLinkLabel="Shop all" />
    </Box>
  );
}
