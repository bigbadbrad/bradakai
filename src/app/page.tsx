import { BradaKaiFeaturedBlock } from '@/components/home/BradaKaiFeaturedBlock';
import { BradaKaiHatModelBlock } from '@/components/home/BradaKaiHatModelBlock';
import { BradaKaiLimeGreenHatModelBlock } from '@/components/home/BradaKaiLimeGreenHatModelBlock';
import { BradaKaiHeroBlock } from '@/components/home/BradaKaiHeroBlock';
import { BradaKaiStoryBlock } from '@/components/home/BradaKaiStoryBlock';
import { SITE_URL } from '@/lib/legal/site';
import { BRADAKAI_META_DESCRIPTION, BRADAKAI_META_TITLE } from '@/lib/bradakai/brand';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: BRADAKAI_META_TITLE,
  description: BRADAKAI_META_DESCRIPTION,
  keywords: ['bradakai', 'surf wear', 'surf tees', 'vintage surf', 'california surf brand'],
  openGraph: {
    title: BRADAKAI_META_TITLE,
    description: BRADAKAI_META_DESCRIPTION,
    url: SITE_URL,
    siteName: 'BradaKai',
    type: 'website',
    images: [{ url: '/hero-16-9.png', alt: 'BradaKai surf van on the beach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: BRADAKAI_META_TITLE,
    description: BRADAKAI_META_DESCRIPTION,
    images: ['/hero-16-9.png'],
  },
};

export default function Page() {
  return (
    <>
      <BradaKaiHeroBlock />
      <BradaKaiStoryBlock />
      <BradaKaiFeaturedBlock />
      <BradaKaiHatModelBlock />
      <BradaKaiLimeGreenHatModelBlock />
    </>
  );
}
