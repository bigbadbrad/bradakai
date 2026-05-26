// /app/layout.tsx
import * as React from 'react';
import type { Viewport, Metadata } from 'next';

import '@/styles/global.css';
import { BagDrawer } from '@/components/bag/bag-drawer';
import { BagProvider } from '@/contexts/bag-context';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { LayoutWrapper } from '@/components/layout-wrapper';
import { GoogleAnalytics } from '@/utils/GoogleAnalytics';
import { SITE_URL } from '@/lib/legal/site';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  /** Enables `env(safe-area-inset-bottom)` — footer extends into Home Indicator gutter on iPhone. */
  viewportFit: 'cover',
} satisfies Viewport;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: 'BradaKai — surf wear made by the sea',
    template: '%s | BradaKai',
  },
  description:
    'BradaKai is a surf wear brand with old school spirit and timeless coastal style — tees and essentials for riders who keep it classic.',
  openGraph: {
    title: 'BradaKai — surf wear made by the sea',
    description:
      'Made by the sea. Worn by the few. Old school spirit. Timeless style.',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'BradaKai',
    images: [
      {
        url: '/hero-16-9.png',
        alt: 'BradaKai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BradaKai — surf wear made by the sea',
    description: 'Made by the sea. Worn by the few.',
    images: ['/hero-16-9.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.png'],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'BradaKai',
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/usd3daq.css" />
      </head>
      <body>
        <GoogleAnalytics />
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>
              <BagProvider>
                <BagDrawer />
                <LayoutWrapper>{children}</LayoutWrapper>
              </BagProvider>
            </ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
