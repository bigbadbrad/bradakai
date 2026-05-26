import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Typography } from '@mui/material';
import { GuideBreadcrumbs } from '@/components/bucket-hats/GuideBreadcrumbs';
import { h1Sx } from '@/components/bucket-hats/constants';

export const metadata: Metadata = {
  title: 'Bucket Hat Care Guide | nury',
  description:
    'How to clean, dry, and store your bucket hat: cotton, canvas, straw, faux fur, and everyday care tips.',
  alternates: {
    canonical: 'https://nury.love/bucket-hat-care',
  },
  openGraph: {
    title: 'Bucket Hat Care Guide | nury',
    description:
      'How to clean, dry, and store your bucket hat: cotton, canvas, straw, faux fur, and everyday care tips.',
    url: 'https://nury.love/bucket-hat-care',
    siteName: 'nury',
    type: 'website',
  },
};

const bodySx = {
  color: '#4b5563',
  fontSize: '1rem',
  lineHeight: 1.75,
  mb: 2.5,
} as const;

export default function BucketHatCarePage() {
  return (
    <Box component="section" sx={{ bgcolor: '#f4efe6', py: { xs: 7, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ maxWidth: 820, mx: 'auto' }}>
          <GuideBreadcrumbs currentLabel="Bucket hat care" />
          <Typography component="h1" sx={{ ...h1Sx, color: '#2b2b2f', fontSize: { xs: '2rem', md: '2.6rem' }, mb: 2.5 }}>
            Bucket hat care
          </Typography>

          <Typography sx={bodySx}>
            To keep your bucket hat looking its best, always check the care label first. For everyday upkeep, remove dust
            with a soft brush or dry cloth, and spot clean marks with a slightly damp cloth and mild detergent. Avoid
            soaking the hat unless the label specifically allows washing.
          </Typography>

          <Typography sx={bodySx}>
            For cotton and canvas styles, gentle hand washing in cold water is usually the safest option. Rinse
            thoroughly, press out excess water without twisting, reshape the crown and brim, and air dry away from
            direct heat or sunlight.
          </Typography>

          <Typography sx={bodySx}>
            For straw, raffia, and other delicate woven styles, use only a soft brush or slightly damp cloth. Do not
            soak. Too much moisture can distort the shape and damage the fibers.
          </Typography>

          <Typography sx={bodySx}>
            For faux-fur or specialty materials, follow the care label carefully. If marked dry clean only, leave
            cleaning to a professional. When in doubt, spot clean gently and let the hat air dry naturally.
          </Typography>

          <Typography sx={{ ...bodySx, mb: 0 }}>
            Store your hat only when fully dry, and keep it in a cool, dry place where the brim and crown won’t be
            crushed.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography
              component={Link}
              href="/hat-sizes"
              sx={{
                display: 'inline-block',
                color: '#4b5563',
                fontSize: '0.9rem',
                lineHeight: 1.5,
                textDecoration: 'underline',
                textUnderlineOffset: '0.18em',
                '&:hover': { color: '#111827' },
              }}
            >
              Hat size chart: find your fit →
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
