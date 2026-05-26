import { HeroBlockCalistoga } from '@/components/home/HeroBlockCalistoga';
import { PhotosBlockCalistoga } from '@/components/home/PhotosBlockCalistoga';
import { HistorySectionBlockCalistoga } from '@/components/home/HistorySectionBlockCalistoga';
import { MotionSection } from '@/components/home/MotionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calistoga — nury',
  description: 'Calistoga-inspired stories and photos from nury.',
};

export default function CalistogaPage() {
  return (
    <>
      <MotionSection id="hero">
        <HeroBlockCalistoga />
      </MotionSection>
      <MotionSection id="photos">
        <PhotosBlockCalistoga />
      </MotionSection>
      <MotionSection id="history">
        <HistorySectionBlockCalistoga />
      </MotionSection>
    </>
  );
}
