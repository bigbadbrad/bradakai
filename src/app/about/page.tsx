import type { Metadata } from 'next';
import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import { pageH1Sx } from '@/components/bucket-hats/constants';

export const metadata: Metadata = {
  title: 'About',
  description:
    'BradaKai is a surf wear brand with old school spirit — born from van days, dawn patrols, and the California coast.',
  alternates: {
    canonical: 'https://bradakai.com/about',
  },
  openGraph: {
    title: 'About BradaKai',
    description:
      'Made by the sea. Worn by the few. Surf wear with timeless coastal style.',
    url: 'https://bradakai.com/about',
    siteName: 'BradaKai',
    type: 'website',
  },
};

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

/** Matches PDP Details heading lines (`product-pdp.module.css` `.detailsHeadingLine`). */
const sectionRuleColor = '#d6cbbd';

const stanzaSx = {
  fontFamily: sans,
  color: '#3f3a36',
  fontSize: { xs: '1rem', md: '1.0625rem' },
  lineHeight: 1.85,
  letterSpacing: '0.01em',
  whiteSpace: 'pre-line' as const,
  maxWidth: '100%',
} as const;

/** 1px rule + vertical rhythm; matches PDP Details `.detailsHeadingLine` color. */
const sectionRuleSx = {
  width: '100%',
  maxWidth: '100%',
  height: '1px',
  flexShrink: 0,
  bgcolor: sectionRuleColor,
  my: { xs: 3, md: 3.75 },
} as const;

/** Same vertical gap as a section rule: `my` above + 1px + `my` below (line omitted). */
const sectionBreakMb = { xs: 6, md: 7.5 } as const;

const ABOUT_HERO_ALT = 'BradaKai surf van on the beach at golden hour';

export default function AboutPage() {
  const navBleedXs = '64px';

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
              {`BradaKai started on the sand — not in a boardroom.

A beat-up van. Boards on the roof. Salt on everything.
Golden hour stretching forever.
The kind of day you don't post about because you were too busy living it.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={{ ...stanzaSx, mb: sectionBreakMb }}>
              {`We're a surf wear brand in spirit, not in hype.

Old school cuts. Heavyweight tees.
Graphics that feel hand-drawn, not focus-grouped.
Built for people who'd rather be in the water than on a feed.`}
            </Typography>

            <Typography sx={stanzaSx}>
              {`Every piece is made to age with you —
sun-faded, road-worn, still holding its shape
when the session runs long.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={stanzaSx}>
              {`Made by the sea.
Worn by the few.

That's the whole idea.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={stanzaSx}>
              {`This is California — the real version.
Van days. Dawn patrol. Timeless style.`}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
