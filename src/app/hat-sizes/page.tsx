import type { Metadata } from 'next';
import { HatSizesPage } from '@/components/hat-sizes/HatSizesPage';
import { HAT_SIZES_FAQ } from '@/components/hat-sizes/hat-sizes-faq-items';

const title = 'Bucket Hat Size Guide: Fit vs. Silhouette | Nury';
const description =
  'Nury’s bucket hat size guide explains head fit, crown height, brim width, and The Nury Proportion — plus Bucket Silhouette Diameter, the technical measurement behind outer silhouette.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://nury.love'),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://nury.love/hat-sizes',
  },
  openGraph: {
    title: 'Bucket Hat Size Guide: Fit vs. Silhouette',
    description:
      'Most hat-size charts tell you if a hat fits. Nury explains how a bucket hat will actually look — from crown height and brim width to The Nury Proportion.',
    url: 'https://nury.love/hat-sizes',
    siteName: 'nury',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Most hat-size charts tell you if a hat fits. Nury explains how a bucket hat will actually look — from crown height and brim width to The Nury Proportion.',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HAT_SIZES_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'nury',
      item: 'https://nury.love/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Hat sizes',
      item: 'https://nury.love/hat-sizes',
    },
  ],
};

export default function HatSizesRoutePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HatSizesPage />
    </>
  );
}
