import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { TermsOfServiceSections } from '@/lib/legal/terms-sections';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for bradakai.com — BradaKai.',
  alternates: { canonical: 'https://bradakai.com/terms' },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These Terms govern your use of our Site and purchases from BradaKai."
    >
      <TermsOfServiceSections />
    </LegalPageLayout>
  );
}
