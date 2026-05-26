import { absoluteUrl } from '@/lib/legal/site';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { pageH1Sx } from '@/components/bucket-hats/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'BradaKai is surf wear for the tribe — ocean bros only. Old school spirit, built for the crew that shows up at dawn.',
  alternates: {
    canonical: absoluteUrl('/about'),
  },
  openGraph: {
    title: 'About BradaKai',
    description: 'Ocean bros only. Surf wear for the tribe — not everyone gets in.',
    url: absoluteUrl('/about'),
    siteName: 'BradaKai',
    type: 'website',
  },
};

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

const stanzaSx = {
  fontFamily: sans,
  color: '#3f3a36',
  fontSize: { xs: '1rem', md: '1.0625rem' },
  lineHeight: 1.85,
  letterSpacing: '0.01em',
  whiteSpace: 'pre-line' as const,
  maxWidth: '100%',
} as const;

const ABOUT_HERO_ALT = 'BradaKai surf van on the beach at golden hour';

export default function AboutPage() {
  const navBleedXs = '80px';

  return (
    <Box
      component="article"
      sx={{
        bgcolor: '#f5f0e8',
        pt: { xs: 0, md: 8 },
        pb: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            columnGap: { xs: 0, md: 5, lg: 7 },
            rowGap: 0,
            alignItems: 'start',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: { xs: '4 / 5', md: '3 / 4' },
              maxHeight: { md: 'min(88vh, 920px)' },
              /* Pull into main’s top padding so the photo meets the navbar (same pattern as home / PDP). */
              mt: { xs: `calc(-1 * ${navBleedXs})`, md: 0 },
            }}
          >
            <Image
              src="/hero.png"
              alt={ABOUT_HERO_ALT}
              fill
              sizes="(max-width: 899px) 100vw, 45vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center center' }}
            />
          </Box>

          <Box
            sx={{
              minWidth: 0,
              maxWidth: { md: '32rem' },
              justifySelf: { md: 'start' },
              px: { xs: 2, md: 0 },
              pt: { xs: 4, md: 0 },
            }}
          >
            <Typography
              component="h1"
              sx={{
                ...pageH1Sx,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: { xs: 4, md: 5 },
              }}
            >
              About BradaKai
            </Typography>

            <Typography sx={stanzaSx}>
              {`BradaKai isn't for everyone.

Ocean bros only.

This is for the people who feel more at home near the water than anywhere else. The ones who plan their days around tides, swell, wind, and sunset. The ones who know the smell of salt air before they even see the ocean.

Built from dawn patrol mornings, cold beer in the sand, beach fires that stay lit long after dark, sea turtles gliding through clear water, sun-faded surfboards, cracked parking lots above the break, and the sound of waves rolling in while the whole crew watches the horizon.

This is the ocean life. The breeze. The salt. The long summer days that nobody wants to end.

We're protecting a feeling.

A tribe built around the water and the people who belong there.

If you know, you know.

BradaKai.

Ocean bros only.`}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
