import { HeroBlock } from '@/components/home/HeroBlock';
import { WhereItsAtBlock } from '@/components/home/WhereItsAtBlock';
import { MotionSection } from '@/components/home/MotionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'nury — love-first essentials',
  description: 'nury is for love-first essentials that make your everyday feel special.',
  openGraph: {
    title: 'nury — love-first essentials',
    description: 'nury is for love-first essentials that make your everyday feel special.',
    url: 'https://nury.love',
    siteName: 'nury',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nury — love-first essentials',
    description: 'nury is for love-first essentials that make your everyday feel special.',
  },
};

export default function Page() {
  return (
    <>
      <MotionSection id="where">
        <WhereItsAtBlock />
      </MotionSection>
    </>
  );
}
