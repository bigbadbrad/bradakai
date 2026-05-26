'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';
import Image from 'next/image';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const bodyColor = '#374151';
const avantGardeStack =
  '"ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", Futura, Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

 export const Hats: FC = () => {
   return (
     <Box sx={{ pt: { xs: 5, md: 15 }, pb: { xs: 10, md: 30 } }}>
       <Container maxWidth="md">
        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mb: 1,
          }}
        >
          LOVE
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: avantGardeStack,
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            mb: 2,
          }}
        >
          Bucket Hat
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/bucket-hat-black-stitched.png"
            width={1051}
            height={832}
            alt="Bucket hat with heart"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
        </Box>

        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mt: 20,
            mb: 1,
          }}
        >
          LOVE
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: avantGardeStack,
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            mb: 2,
          }}
        >
          Bucket Hat
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/bucket-hat-white-stitched.png"
            width={1051}
            height={832}
            alt="Bucket hat with heart"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
        </Box>



        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mt: 20,
            mb: 1,
          }}
        >
          LOVE
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: avantGardeStack,
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            mb: 2,
          }}
        >
          Bucket Hat
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src="/bucket-hat-denim-stitched.png"
            width={1051}
            height={832}
            alt="Bucket hat with heart"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
          />
        </Box>

       </Container>
     </Box>
   );
 };

