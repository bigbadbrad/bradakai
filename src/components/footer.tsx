// /components/footer.tsx — BradaKai
'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BRADAKAI_CREAM, BRADAKAI_NAVY, bradakaiDisplaySx } from '@/lib/bradakai/brand';
import { isCommerceHref, PRODUCT_LINKS_ENABLED } from '@/lib/bradakai/catalog';

export const Footer: FC = () => {
  const customerServiceLinks = [
    { label: 'Shipping Policy', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Ordering & Payments', href: '/terms#payment' },
    { label: 'Contact', href: '/contact' },
  ] as const;

  const shopLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Lookbook', href: '/lookbook' },
  ].filter((item) => PRODUCT_LINKS_ENABLED || !isCommerceHref(item.href));

  const aboutLinks = [
    { label: 'About', href: '/about' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ] as const;

  const linkSx = {
    color: 'rgba(245, 240, 232, 0.88)',
    textDecoration: 'none',
    fontSize: '0.86rem',
    '&:hover': { color: BRADAKAI_CREAM },
  } as const;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: BRADAKAI_NAVY,
        color: 'rgba(245, 240, 232, 0.88)',
        pt: { xs: 6, md: 8 },
        pb: {
          xs: 'calc(env(safe-area-inset-bottom, 0px) + 48px)',
          md: 'calc(env(safe-area-inset-bottom, 0px) + 56px)',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, minmax(0, 1fr))' },
            columnGap: { xs: 4, md: 8 },
            rowGap: { xs: 4, md: 2 },
            mb: { xs: 6, md: 7 },
          }}
        >
          <Box>
            <Typography sx={{ ...bradakaiDisplaySx, fontSize: '0.85rem', color: BRADAKAI_CREAM, mb: 2.25 }}>
              Support
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.1 }}>
              {customerServiceLinks.map((item) => (
                <Box key={item.label} component={Link} href={item.href} sx={linkSx}>
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ ...bradakaiDisplaySx, fontSize: '0.85rem', color: BRADAKAI_CREAM, mb: 2.25 }}>
              Shop
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.1 }}>
              {shopLinks.map((item) => (
                <Box key={item.label} component={Link} href={item.href} sx={linkSx}>
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ ...bradakaiDisplaySx, fontSize: '0.85rem', color: BRADAKAI_CREAM, mb: 2.25 }}>
              About
            </Typography>
            <Box sx={{ display: 'grid', gap: 1.1 }}>
              {aboutLinks.map((item) => (
                <Box key={item.label} component={Link} href={item.href} sx={linkSx}>
                  {item.label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ ...bradakaiDisplaySx, fontSize: '0.85rem', color: BRADAKAI_CREAM, mb: 2.25 }}>
              Follow
            </Typography>
            <Link href="https://www.instagram.com/" aria-label="Instagram">
              <InstagramIcon sx={{ color: BRADAKAI_CREAM, fontSize: '1.35rem' }} />
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: '1px solid rgba(245, 240, 232, 0.15)',
            pt: 3,
            textAlign: 'center',
          }}
        >
          <Link href="/" aria-label="BradaKai home" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: { xs: 120, md: 140 }, mb: 1.5, mx: 'auto', filter: 'brightness(0) invert(1)' }}>
              <Image src="/logo.png" alt="" width={280} height={84} style={{ width: '100%', height: 'auto' }} />
            </Box>
          </Link>
          <Typography
            sx={{
              fontFamily: 'var(--font-old-press), "Bebas Neue", system-ui, sans-serif',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: BRADAKAI_CREAM,
              mb: 2,
            }}
          >
            Ocean bros only.
          </Typography>
          <Typography sx={{ fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} BradaKai
            <br />
            All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
