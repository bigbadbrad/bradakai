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

It's a line in the sand — and in the water. You know the crew: the ones who wake up before the crowd, who know which break is firing, who'd rather share a dawn session than post about it later.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={{ ...stanzaSx, mb: sectionBreakMb }}>
              {`We're a tribe, not a trend.

BradaKai is surf wear for people who belong out there — van in the lot, boards on the roof, salt still on your skin when you pull on a tee. Old school cuts. Heavyweight fabric. Graphics that look like they came off a board, not a mood board.

You wear it because you're part of something. Not because an algorithm told you to.`}
            </Typography>

            <Typography sx={stanzaSx}>
              {`The gear is simple on purpose.

Built to last through seasons of sessions, road trips, and the kind of days that don't need a caption. Sun-faded. Road-worn. Still solid when the swell picks up and the whole crew paddles out together.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={stanzaSx}>
              {`Ocean bros only.

That's the whole point. If you're in, you're in.`}
            </Typography>

            <Box role="presentation" sx={sectionRuleSx} aria-hidden />

            <Typography sx={stanzaSx}>
              {`California coast. Dawn patrol. Your people.

Welcome to the tribe.`}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
