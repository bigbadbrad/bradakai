import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { ReturnsPolicySections } from '@/lib/legal/returns-sections';

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description: 'Returns, exchanges, and refund policy for bradakai.com — BradaKai.',
  alternates: { canonical: 'https://bradakai.com/returns' },
};

export default function ReturnsPage() {
  return (
    <LegalPageLayout
      title="Returns & Exchanges"
      description="How to return or exchange eligible items, what is final sale, and how refunds work."
    >
      <ReturnsPolicySections />
    </LegalPageLayout>
  );
}
