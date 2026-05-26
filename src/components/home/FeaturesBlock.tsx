import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

const sans = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
const barBg = '#f5f1e9';
const barInk = '#3c3633';
const dividerColor = 'rgba(60, 54, 51, 0.22)';

const items = [
  {
    title: 'Free shipping over $50',
    body: 'Enjoy complimentary standard shipping on all U.S. orders over $50.',
    icon: '/icons/shipping.svg',
  },
  {
    title: 'Easy 14-day returns',
    body: 'Changed your mind? Returns are simple, quick, and hassle-free.',
    icon: '/icons/returns.svg',
  },
  {
    title: 'Secure checkout',
    body: 'Your payment and personal details are always protected.',
    icon: '/icons/secure-payments.svg',
  },
] as const;

export const FeaturesBlock: FC = () => {
  return (
    <Box
      component="section"
      id="features"
      aria-label="Shipping, returns, and checkout"
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        bgcolor: barBg,
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            columnGap: { md: 0 },
            rowGap: { xs: 4, md: 0 },
            alignItems: 'start',
          }}
        >
          {items.map((item, index) => (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'center' },
                textAlign: 'center',
                px: { xs: 1, md: 3 },
                ...(index < items.length - 1 && {
                  borderRight: { md: `1px solid ${dividerColor}` },
                  borderBottom: { xs: `1px solid ${dividerColor}`, md: 'none' },
                  pb: { xs: 4, md: 0 },
                }),
              }}
            >
              <Box
                component="img"
                src={item.icon}
                alt=""
                width={42}
                height={42}
                sx={{ display: 'block', mb: 1.75, width: 42, height: 42 }}
              />
              <Typography
                component="h3"
                sx={{
                  fontFamily: sans,
                  fontSize: { xs: '0.7rem', md: '0.72rem' },
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: barInk,
                  lineHeight: 1.35,
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                component="p"
                sx={{
                  fontFamily: sans,
                  color: barInk,
                  lineHeight: 1.55,
                  fontSize: { xs: '0.8125rem', md: '0.875rem' },
                  maxWidth: 300,
                  mx: 'auto',
                  opacity: 0.92,
                }}
              >
                {item.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
