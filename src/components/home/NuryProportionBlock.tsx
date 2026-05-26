import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { accentMuted } from '@/components/bucket-hats/constants';
import { ivySectionTitleSx } from '@/lib/typography/ivy-presto';

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
/** Matches `/public/nury-proportion-drawing.png` matte background (~#f7f1ea). */
const blockBg = '#f7f1ea';
const blockInk = '#2b2b2f';
const dividerColor = '#d6cbbd';

const PROPORTION_IMG = {
  src: '/nury-proportion-drawing2.png',
  width: 1122,
  height: 1402,
  alt: 'Nury bucket hat photograph and proportion diagram showing 9 cm crown and 7 cm brim',
} as const;

function SectionRule() {
  return (
    <Box
      component="hr"
      sx={{
        border: 0,
        height: '1px',
        bgcolor: dividerColor,
        width: '100%',
        maxWidth: 420,
        my: { xs: 2, md: 2.5 },
        mx: { xs: 'auto', md: 0 },
      }}
    />
  );
}

export const NuryProportionBlock: FC = () => {
  return (
    <Box
      component="section"
      aria-labelledby="nury-proportion-heading"
      sx={{
        bgcolor: blockBg,
        py: { xs: 6, md: 10 },
        width: '100%',
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.05fr' },
            gap: { xs: 4, md: 5 },
            alignItems: 'center',
          }}
        >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, px: { xs: 0.5, md: 1 } }}>
              <Typography
                component="p"
                sx={{
                  fontFamily: sans,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: accentMuted,
                  mb: { xs: 2, md: 2.5 },
                }}
              >
                Nury design standard
              </Typography>

              <Typography
                id="nury-proportion-heading"
                component="h2"
                sx={{
                  ...ivySectionTitleSx,
                  fontSize: { xs: '2.25rem', sm: '2.6rem', md: '3rem' },
                  lineHeight: 1.08,
                  letterSpacing: '0.01em',
                  color: blockInk,
                  mb: 0,
                }}
              >
                The Nury
                <br />
                Proportion
              </Typography>

              <SectionRule />

              <Typography
                sx={{
                  fontFamily: sans,
                  color: '#4b5563',
                  fontSize: { xs: '0.9375rem', md: '1rem' },
                  lineHeight: 1.75,
                  maxWidth: 420,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Our fashion-first interpretation of a classic bucket hat:
                <br />
                a 9 cm crown, 7 cm brim, and balanced outer silhouette. Enough shade to feel useful. Enough
                structure to look styled. Never so oversized that it turns floppy.
              </Typography>

              <Typography
                sx={{
                  ...ivySectionTitleSx,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.0625rem' },
                  lineHeight: 1.65,
                  color: blockInk,
                  mt: 2,
                  maxWidth: 420,
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Structured enough to frame the face. Soft enough to feel effortless.
              </Typography>

              <SectionRule />

              <Typography
                component="p"
                sx={{
                  fontFamily: sans,
                  fontSize: { xs: '0.62rem', md: '0.65rem' },
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: blockInk,
                  lineHeight: 1.5,
                }}
              >
                9 cm crown&nbsp;&nbsp;·&nbsp;&nbsp;7 cm brim&nbsp;&nbsp;·&nbsp;&nbsp;balanced fashion silhouette
              </Typography>

              <Typography
                component={Link}
                href="/hat-sizes"
                sx={{
                  display: 'inline-block',
                  mt: { xs: 4, md: 8 },
                  color: '#4b5563',
                  fontFamily: sans,
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  textDecoration: 'underline',
                  textUnderlineOffset: '0.18em',
                  '&:hover': { color: '#111827' },
                }}
              >
                Bucket hat sizes: fit vs. silhouette →
              </Typography>
            </Box>

            <Box
              sx={{
                lineHeight: 0,
                mx: { xs: 'auto', md: 0 },
                maxWidth: { xs: 420, md: '100%' },
                width: '100%',
              }}
            >
              <Image
                src={PROPORTION_IMG.src}
                width={PROPORTION_IMG.width}
                height={PROPORTION_IMG.height}
                alt={PROPORTION_IMG.alt}
                sizes="(max-width: 899px) 90vw, 45vw"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>
      </Container>
    </Box>
  );
};
