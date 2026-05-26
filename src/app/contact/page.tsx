import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import { LegalBreadcrumb } from '@/components/legal/legal-breadcrumb';
import { pageH1Sx } from '@/components/bucket-hats/constants';
import { CONTACT_EMAIL } from '@/lib/legal/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact BradaKai — ${CONTACT_EMAIL}`,
  alternates: { canonical: 'https://bradakai.com/contact' },
};

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

export default function ContactPage() {
  return (
    <Box component="article" sx={{ bgcolor: '#f4efe6', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="sm">
        <Box sx={{ maxWidth: 520, mx: 'auto' }}>
          <LegalBreadcrumb currentLabel="Contact" />
          <Typography component="h1" sx={pageH1Sx}>
            Contact
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: '1rem', color: '#3f3a36', lineHeight: 1.8, mb: 2 }}>
            For orders, shipping, returns, and general questions, email us at{' '}
            <Box component="span" sx={{ color: '#5c4d3d', fontWeight: 600, userSelect: 'all' }}>
              {CONTACT_EMAIL}
            </Box>
            .
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: '0.9375rem', color: '#6b6560', lineHeight: 1.75, mb: 3 }}>
            Customer service hours: Monday–Friday, 9am–5pm Pacific.
          </Typography>
          <Typography sx={{ fontFamily: sans, fontSize: '0.9rem', color: '#57534e' }}>
            Policies:{' '}
            <Link href="/terms" style={{ color: '#5c4d3d' }}>
              Terms
            </Link>
            {' · '}
            <Link href="/privacy" style={{ color: '#5c4d3d' }}>
              Privacy
            </Link>
            {' · '}
            <Link href="/shipping" style={{ color: '#5c4d3d' }}>
              Shipping
            </Link>
            {' · '}
            <Link href="/returns" style={{ color: '#5c4d3d' }}>
              Returns
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
