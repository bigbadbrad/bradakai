'use client';

import type { FC } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });

const bodyColor = '#374151';

const HERO_IMAGE = '/lucky-star-ranch.png';

/** Square Payment Link or hosted checkout URL; set in Netlify as NEXT_PUBLIC_SQUARE_PAYMENT_URL */
const SQUARE_PAYMENT_URL = process.env.NEXT_PUBLIC_SQUARE_PAYMENT_URL;

export const HeroBlock: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF' }}>
      {/* Background image with title and subtitle overlaid */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 280, sm: 360, md: 420 },
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 2 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              mb: 1,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Spring Ride 2026
          </Typography>
          <Typography
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: '#FFFFFF',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Lucky Star Ranch
          </Typography>
          <Typography
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              color: '#FFFFFF',
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Coulterville, CA
          </Typography>
        </Box>
      </Box>

      {/* Body text below the hero image */}
      <Box sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111827',
              mb: 2,
            }}
          >
            When
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, mb: 6 }}>
            Friday April 24 — Sunday April 26
          </Typography>

          <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mt: 8,
            mb: 1,
          }}
        >
          Lucky Star Ranch
        </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111827',
              mb: 2,
            }}
          >
            About The Ranch
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, textAlign: 'left', mb: 2 }}>
            The historic ranch is located in beautiful Coulterville, CA. It is a spectacular ranch, with natural springs, wildlife and lots of open space. The climate is excellent and the elevation is 2000 feet.
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, textAlign: 'left', mb: 4 }}>
            We are afforded this opportunity by the generosity of Kip Witter and his family. The ranch has been in their family since the 1980's.
          </Typography>

          <Typography
            component="p"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#CD7A66',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              mt: 8,
              mb: 1,
            }}
          >
            Epic Riding & Views
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111827',
              mb: 2,
            }}
          >
            About The Ride
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, textAlign: 'left', mb: 2 }}>
            Join us for a weekend of riding, food, drinks, and fun.  There are over 75 miles of trails, with stunning views of the surrounding countryside and mountains.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 1,
                p: 2,
                backgroundColor: '#fafafa',
                textAlign: 'center',
              }}
            >
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1, display: 'block', mb: 1 }}>
                🍽️
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                Meals
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', color: bodyColor, lineHeight: 1.4 }}>
                Friday Dinner — Sunday Breakfast<br />Chef Dave Jabs
              </Typography>
            </Box>
            <Box
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 1,
                p: 2,
                backgroundColor: '#fafafa',
                textAlign: 'center',
              }}
            >
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1, display: 'block', mb: 1 }}>
                🎵
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                Entertainment
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', color: bodyColor, lineHeight: 1.4 }}>
                Local Cowboy Folklore Included
              </Typography>
            </Box>
            <Box
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: 1,
                p: 2,
                backgroundColor: '#fafafa',
                textAlign: 'center',
              }}
            >
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1, display: 'block', mb: 1 }}>
                🐴
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#111827', fontSize: '1rem', mb: 0.5 }}>
                Essentials
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', color: bodyColor, lineHeight: 1.4 }}>
                Bring your own hay &amp; water bucket
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', mt: 2, mb: 2 }}>
            Cost: $150 per rider
          </Typography>
          {SQUARE_PAYMENT_URL ? (
            <Button
              component="a"
              href={SQUARE_PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              disableElevation
              sx={{
                mt: 2,
                alignSelf: 'flex-start',
                width: { xs: '100%', sm: 'auto' },
                py: 1.5,
                px: 4,
                backgroundColor: '#000000',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 1,
                '&:hover': { backgroundColor: '#222222' },
              }}
            >
              Pay online with Square
            </Button>
          ) : null}
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, textAlign: 'left', mt: 3 }}>
            Or write a check payable to MPSMC and send it to 521 Kings Mountain Rd. Woodside, CA
          </Typography>

          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', mt: 5 }}>
            Questions: 
          </Typography>
          <Typography sx={{ fontSize: '1.125rem', lineHeight: 1.7, color: bodyColor, textAlign: 'left', mt: 0.5 }}>
          Contact Ride Chairman, Brad Meinert, at 650[dash ]450[dash ]2723 or email brad_meinert[at ]yahoo[dot ]com
          </Typography>

          <Typography
            component="p"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#CD7A66',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              mt: 8,
              mb: 1,
            }}
          >
            Horse Rental
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: ultra.style.fontFamily,
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111827',
              mt: 0,
              mb: 1,
            }}
          >
            NEED A HORSE?
          </Typography>
          <Typography
            sx={{
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: bodyColor,
              textAlign: 'left',
            }}
          >
            Contact Ziggy (Terry Zygalinski) if you need a horse: cowboyterry[at]aol[dot]com, Cell 831[dash]818[dash]5932.
          </Typography>

        </Container>
      </Box>
    </Box>
  );
};
