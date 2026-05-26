'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';
import { MainNavbar } from '@/components/main-navbar';
import { Footer } from '@/components/footer';
import { BRADAKAI_CREAM, BRADAKAI_NAVY } from '@/lib/bradakai/brand';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const NAVBAR_OFFSET = { xs: '80px', md: '104px' };

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isDashboardAppRoute = pathname?.startsWith('/dashboard') && !pathname?.startsWith('/dashboard/how-it-works');
  const isHome = pathname === '/';
  const isPrintPage = pathname === '/print';
  const isBradaKaiSurface =
    isHome ||
    pathname === '/shop' ||
    pathname === '/collections' ||
    pathname === '/lookbook' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/terms' ||
    pathname === '/privacy' ||
    pathname === '/shipping' ||
    pathname === '/returns';

  if (isDashboardAppRoute) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  if (isPrintPage) {
    return (
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          minHeight: '100dvh',
        }}
      >
        <Box component="main" sx={{ flex: '1 1 auto', paddingTop: 0 }}>
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        backgroundColor: isBradaKaiSurface ? BRADAKAI_CREAM : '#FFFFFF',
        minHeight: '100dvh',
      }}
    >
      <MainNavbar />
      <Box
        component="main"
        sx={{
          flex: '1 1 auto',
          paddingTop: NAVBAR_OFFSET,
          backgroundColor: isBradaKaiSurface ? BRADAKAI_CREAM : '#FFFFFF',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
