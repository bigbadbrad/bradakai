'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { Box, Rating, Typography } from '@mui/material';
import { getHeroAggregateReviewDisplayCount } from '@/lib/shopify/reviews';
import { ivyH1Sx } from '@/lib/typography/ivy-presto';
import { HomepageEditorialSection } from '@/components/home/homepage-editorial-section';

const reviewStarColor = '#c7b299';

const HERO_IMG = { src: '/barcelona-blonde9.png' as const, w: 1085, h: 1449, alt: 'Black bucket hat with heart' as const };
const HERO_IMG_PRODUCT_HREF = '/products/frayed-edge-bucket-hat-light-blue-denim';

const heroReviewDisplayCount = getHeroAggregateReviewDisplayCount();
const heroReviewDisplayLabel = new Intl.NumberFormat('en-US').format(heroReviewDisplayCount);

export const NuryHeroBlock: FC = () => (
  <HomepageEditorialSection
    bgcolor="#f4efe6"
    desktopImageSide="right"
    gridTemplateColumns={{ md: '1.05fr 0.95fr' }}
    pt={{ xs: 0, md: 10 }}
    pb={{ xs: 6, md: 10 }}
    image={{
      src: HERO_IMG.src,
      width: HERO_IMG.w,
      height: HERO_IMG.h,
      alt: HERO_IMG.alt,
      href: HERO_IMG_PRODUCT_HREF,
      linkAriaLabel: 'Shop light blue denim bucket hat',
      priority: true,
      sizes: '(max-width: 900px) 100vw, 45vw',
    }}
  >
    <Box sx={{ textAlign: 'left' }}>
      <Typography
        component="p"
        sx={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#a06b5f',
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          mb: 2,
        }}
      >
        Love-first essentials
      </Typography>

      <Typography
        component="h1"
        sx={{
          ...ivyH1Sx,
          fontSize: { xs: '2.75rem', sm: '3.25rem', md: '4.25rem' },
          lineHeight: 1.05,
          letterSpacing: '0.01em',
          color: '#111827',
          mb: 2.5,
        }}
      >
        Frayed
        <br />
        Bucket Hats
      </Typography>

      <Typography
        component="p"
        sx={{
          color: '#4b5563',
          fontSize: { xs: '0.95rem', md: '1rem' },
          lineHeight: 1.7,
          maxWidth: 520,
          mb: 3,
        }}
      >
        Ultra stylish hats for women with the signature heart mark.
        <br />
        Relaxed enough for women to wear every day.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          mb: 2.5,
        }}
        aria-label={`4.5 out of 5 stars, ${heroReviewDisplayLabel} reviews`}
      >
        <Rating
          value={4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{
            color: reviewStarColor,
            '& .MuiRating-iconFilled': { color: reviewStarColor },
            '& .MuiRating-iconHover': { color: reviewStarColor },
            '& .MuiRating-iconFocus': { color: reviewStarColor },
            '& .MuiRating-iconEmpty': { color: 'rgba(199, 178, 153, 0.42)' },
          }}
        />
        <Typography
          component="span"
          sx={{
            color: '#78716c',
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          ({heroReviewDisplayLabel})
        </Typography>
      </Box>

      <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <Typography
          component={Link}
          href="/frayed-bucket-hats"
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
          Shop frayed bucket hats →
        </Typography>
        <Typography
          component={Link}
          href="/bucket-hat"
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
          What is a bucket hat? Read the ultimate guide →
        </Typography>
      </Box>
    </Box>
  </HomepageEditorialSection>
);
