'use client';

import type { FC } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

type BradaKaiLogoProps = {
  width?: { xs?: number; sm?: number; md?: number };
  priority?: boolean;
};

export const BradaKaiLogo: FC<BradaKaiLogoProps> = ({
  width = { xs: 140, sm: 160, md: 200 },
  priority = false,
}) => (
  <Box
    sx={{
      position: 'relative',
      width,
      height: { xs: 36, sm: 40, md: 48 },
      lineHeight: 0,
    }}
  >
    <Image
      src="/logo.png"
      alt="BradaKai"
      fill
      priority={priority}
      sizes="(max-width: 600px) 140px, 200px"
      style={{ objectFit: 'contain', objectPosition: 'center' }}
    />
  </Box>
);
