'use client';

import type { FC } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';
import Image from 'next/image';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const avantGardeStack =
  '"Futura PT", "ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", Futura, Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

export const BabyTee: FC = () => {
  return (
    <Box component="section" sx={{ bgcolor: '#f4efe6', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Image
              src="/baby-tee.png"
              width={900}
              height={1100}
              alt="Model wearing a bucket hat"
              style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
            />
          </Box>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: avantGardeStack,
                fontSize: { xs: '1.9rem', sm: '2.2rem', md: '2.6rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#111827',
                mb: 2,
              }}
            >
              THE PERFECT
              <br />
              BABY TEE
            </Typography>

            <Typography
              component="p"
              sx={{
                color: '#4b5563',
                fontSize: { xs: '0.95rem', md: '1rem' },
                lineHeight: 1.7,
                maxWidth: 520,
                mx: { xs: 'auto', md: 0 },
                mb: 3,
              }}
            >
              Soft, fitted, and made to flatter—finished with the signature heart icon. Our baby tees are designed with an easy close-to-the-body fit, a clean neckline, and the kind of everyday feel you’ll want in every color.
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: 0,
                borderColor: '#d6cbbd',
                color: '#111827',
                px: 3,
                py: 1.1,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontSize: '0.75rem',
                '&:hover': { borderColor: '#c8bbaa', bgcolor: 'rgba(0,0,0,0.02)' },
              }}
            >
              View all baby tees →
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

