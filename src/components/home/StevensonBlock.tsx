'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const bodyColor = '#374151';
const eyebrowColor = '#CD7A66'; // rust, matches footer accent

export const StevensonBlock: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 10, md: 20 }, borderTop: '1px solid #e5e7eb' }}>
      <Container maxWidth="sm">
        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: eyebrowColor,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mb: 1,
          }}
        >
          HISTORY &amp; LORE
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
          Robert Louis Stevenson &amp; Montesol Ranch
        </Typography>
        <Typography
          sx={{
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: bodyColor,
            textAlign: 'left',
          }}
        >
          Freshly married in San Francisco on May 19, 1880, Robert Louis Stevenson and Fanny Van de
          Grift Osbourne headed north looking for clean air and a cheap place to recover his
          health—friends had suggested Calistoga and the upper Napa Valley&apos;s hot springs and
          mountain climate. They traveled the very 19th-century way: ferries across the Bay and then
          rail up-valley toward Calistoga (Stevenson later described the double bay-crossing and the
          rail journey in The Silverado Squatters). The couple spent the rest of May in Calistoga in
          one of the Hot Springs Hotel cottages, then—joined by Fanny&apos;s son Lloyd—went up the
          grade of Mount St. Helena to the toll road area and ultimately &quot;squatted&quot; in an
          abandoned bunkhouse at the old Silverado mining settlement until late July, turning a
          broken-down building into a makeshift honeymoon home (cloth for windows, hauling water,
          foggy nights, rattlesnakes—classic Stevenson humor about hard travel and improvised
          comfort).
        </Typography>
      </Container>
    </Box>
  );
};
