'use client';

import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface MotionSectionProps {
  children: ReactNode;
  id?: string;
}

export function MotionSection({ children, id }: MotionSectionProps) {
  return (
    <Box
      id={id}
      component={motion.section}
      // Keep opacity at 1 so content is never stuck invisible if whileInView does not run
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </Box>
  );
}

