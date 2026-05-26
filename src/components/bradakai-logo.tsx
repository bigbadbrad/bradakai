'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

type BradaKaiLogoProps = {
  width?: { xs?: number; sm?: number; md?: number };
  priority?: boolean;
};

export const BradaKaiLogo: FC<BradaKaiLogoProps> = ({
  width = { xs: 260, sm: 290, md: 380 },
  priority = false,
}) => (
  <Box
    sx={{
      position: 'relative',
      width,
      height: { xs: 70, sm: 76, md: 92 },
      lineHeight: 0,
    }}
  >
    <Image
      src="/logo.png"
      alt="BradaKai"
      fill
      priority={priority}
      sizes="(max-width: 600px) 260px, 380px"
      style={{ objectFit: 'contain', objectPosition: 'center' }}
    />
  </Box>
);
