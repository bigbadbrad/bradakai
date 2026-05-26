import type { Metadata } from 'next';
import { FrayedBucketHatsPage } from '@/components/frayed-bucket-hats/FrayedBucketHatsPage';
import { FRAYED_BUCKET_HATS_FAQ } from '@/components/frayed-bucket-hats/frayed-faq-items';

const title = 'Frayed Bucket Hats for Women | Nury';
const description =
  'Shop Nury frayed bucket hats for women, designed around The Nury Proportion: a 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, and balanced outer silhouette.';

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
    canonical: 'https://bradakai.com/frayed-bucket-hats',
  },
  openGraph: {
    title,
    description:
      'Not oversized. Not floppy. Nury frayed bucket hats are designed around The Nury Proportion: 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, and balanced outer silhouette.',
    url: 'https://bradakai.com/frayed-bucket-hats',
    siteName: 'nury',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description:
      'Not oversized. Not floppy. Nury frayed bucket hats are designed around The Nury Proportion: 9 cm / 3.5 in crown, 7 cm / 2.75 in brim, and balanced outer silhouette.',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FRAYED_BUCKET_HATS_FAQ.map((item) => ({
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
      item: 'https://bradakai.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Frayed bucket hats',
      item: 'https://bradakai.com/frayed-bucket-hats',
    },
  ],
};

export default function FrayedBucketHatsRoutePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FrayedBucketHatsPage />
    </>
  );
}
