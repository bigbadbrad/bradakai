import type { Metadata } from 'next';
import { BucketHatsGuidePage } from '@/components/bucket-hats/BucketHatsGuidePage';

const title =
  'What Is a Bucket Hat? The Ultimate Guide to Bucket Hat Styles, Fit, Fabrics & Women’s Looks | Nury';
const description =
  'What is a bucket hat? Explore the ultimate guide to bucket hat styles, measurements, fabrics, fit, colors, and how women wear them - plus shop signature bucket hats from Nury.';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://bradakai.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://bradakai.com/bucket-hat',
  },
  openGraph: {
    title,
    description,
    url: 'https://bradakai.com/bucket-hat',
    siteName: 'nury',
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'nury',
      item: 'https://bradakai.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Bucket hat guide',
      item: 'https://bradakai.com/bucket-hat',
    },
  ],
};

export default function BucketHatsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BucketHatsGuidePage />
    </>
  );
}
