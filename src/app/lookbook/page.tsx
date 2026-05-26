import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import {
  BRADAKAI_CREAM,
  BRADAKAI_NAVY,
  BRADAKAI_NAVY_MUTED,
  bradakaiDisplaySx,
} from '@/lib/bradakai/brand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lookbook',
  description: 'BradaKai lookbook — coastal scenes and surf spirit.',
};

const LOOKBOOK_SHOTS = [
  { src: '/malibu-surfer1.png', alt: 'Surfer at Malibu in BradaKai spirit' },
  { src: '/beach-gray3.png', alt: 'Coastal beach scene' },
  { src: '/portofino-blue1.png', alt: 'Mediterranean coast' },
  { src: '/palm-springs-light-blue1.png', alt: 'Desert coast light' },
] as const;

export default function LookbookPage() {
  return (
    <Box sx={{ bgcolor: BRADAKAI_CREAM, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <Typography
          component="h1"
          sx={{
            ...bradakaiDisplaySx,
            fontSize: { xs: '2.25rem', md: '3rem' },
            color: BRADAKAI_NAVY,
            mb: 1.5,
          }}
        >
          Lookbook
        </Typography>
        <Typography sx={{ color: BRADAKAI_NAVY_MUTED, maxWidth: 520, lineHeight: 1.6, mb: 5 }}>
          Sun-faded frames from the road — van days, dawn patrols, and everything in between.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: { xs: 2, md: 3 },
          }}
        >
          {LOOKBOOK_SHOTS.map((shot) => (
            <Box
              key={shot.src}
              sx={{
                position: 'relative',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                boxShadow: '0 8px 28px rgba(30, 58, 95, 0.12)',
              }}
            >
              <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 600px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
