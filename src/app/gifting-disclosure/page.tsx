import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';
import { pageH1Sx } from '@/components/bucket-hats/constants';
import { LegalBreadcrumb } from '@/components/legal/legal-breadcrumb';

export const metadata: Metadata = {
  title: 'Gifted product disclosure',
  description: 'Disclosure language for creators and recipients of gifted Nury products.',
  alternates: { canonical: 'https://bradakai.com/gifting-disclosure' },
};

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const CARD_COPY =
  'If you post about Nury, please clearly disclose that the product was gifted. Examples: “Gifted by Nury,” “Nury sent me this hat,” or “Ad/gifted.” Please share your honest opinion.';

export default function GiftingDisclosurePage() {
  return (
    <Box component="article" sx={{ bgcolor: '#f4efe6', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="sm">
        <Box sx={{ maxWidth: 560, mx: 'auto' }}>
          <LegalBreadcrumb currentLabel="Gifted product disclosure" />
          <Typography component="h1" sx={{ ...pageH1Sx, fontSize: { xs: '1.5rem', md: '1.875rem' }, mb: 2 }}>
            Gifted product disclosure
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: '0.9rem', color: '#6b6560', mb: 3, lineHeight: 1.65 }}>
            Use this language on printed cards, packing slips, or emails included with gifted hats (per internal legal
            policy checklist). Do not require positive reviews or five-star ratings.
          </Typography>
          <Box
            sx={{
              p: 3,
              bgcolor: '#faf7f2',
              border: '1px solid #e8dfd2',
              borderRadius: 0,
            }}
          >
            <Typography sx={{ fontFamily: sans, fontSize: '1rem', color: '#3f3a36', lineHeight: 1.85, fontStyle: 'italic' }}>
              {CARD_COPY}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
