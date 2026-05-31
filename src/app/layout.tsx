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
import { BRADAKAI_META_DESCRIPTION, BRADAKAI_META_TITLE } from '@/lib/bradakai/brand';
import { oldPress } from '@/lib/fonts/old-press';

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
    default: BRADAKAI_META_TITLE,
    template: '%s | BradaKai',
  },
  description: BRADAKAI_META_DESCRIPTION,
  openGraph: {
    title: BRADAKAI_META_TITLE,
    description: BRADAKAI_META_DESCRIPTION,
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
    title: BRADAKAI_META_TITLE,
    description: BRADAKAI_META_DESCRIPTION,
    images: ['/hero-16-9.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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
      <body className={oldPress.variable}>
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
