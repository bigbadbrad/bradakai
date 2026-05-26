import { BradaKaiFeaturedBlock } from '@/components/home/BradaKaiFeaturedBlock';
import { BradaKaiHeroBlock } from '@/components/home/BradaKaiHeroBlock';
import { SITE_URL } from '@/lib/legal/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BradaKai | Surf Wear — Made by the Sea',
  description:
    'Old school surf spirit. Timeless tees and coastal style — made by the sea, worn by the few.',
  keywords: ['bradakai', 'surf wear', 'surf tees', 'vintage surf', 'california surf brand'],
  openGraph: {
    title: 'BradaKai | Surf Wear',
    description: 'Made by the sea. Worn by the few. Old school spirit. Timeless style.',
    url: SITE_URL,
    siteName: 'BradaKai',
    type: 'website',
    images: [{ url: '/hero-16-9.png', alt: 'BradaKai surf van on the beach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BradaKai | Surf Wear',
    description: 'Made by the sea. Worn by the few.',
    images: ['/hero-16-9.png'],
  },
};

export default function Page() {
  return (
    <>
      <BradaKaiHeroBlock />
      <BradaKaiFeaturedBlock />
    </>
  );
}
