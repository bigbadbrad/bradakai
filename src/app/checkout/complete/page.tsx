'use client';

import * as React from 'react';
import Link from 'next/link';
import { Box, Button, Container, Typography } from '@mui/material';

import { pageH1Sx } from '@/components/bucket-hats/constants';
import { BAG_STORAGE_KEY, useBag } from '@/contexts/bag-context';

export default function CheckoutCompletePage(): React.JSX.Element {
  const { clearBag } = useBag();

  React.useEffect(() => {
    clearBag();
    try {
      window.localStorage.removeItem(BAG_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [clearBag]);

  return (
    <Box
      component="main"
      sx={{
        minHeight: '55vh',
        bgcolor: '#f4efe6',
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            bgcolor: '#faf8f4',
            border: '1px solid #e8e0d4',
            p: { xs: 3.5, md: 5 },
          }}
        >
          <Typography component="h1" sx={{ ...pageH1Sx, fontSize: { xs: '1.5rem', sm: '1.75rem' }, mb: 2, textAlign: 'center' }}>
            Thank you — your order is complete.
          </Typography>
          <Typography
            sx={{
              fontFamily:
                'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              fontSize: '0.9375rem',
              lineHeight: 1.7,
              color: '#57534e',
              mb: 3,
            }}
          >
            Your bag has been cleared.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 0,
              bgcolor: '#1a1816',
              color: '#faf8f4',
              px: 3,
              py: 1.25,
              fontWeight: 600,
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              '&:hover': { bgcolor: '#111111' },
            }}
          >
            Continue shopping
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
