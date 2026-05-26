import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { PrivacyPolicySections } from '@/lib/legal/privacy-sections';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BradaKai collects, uses, and protects personal information on bradakai.com.',
  alternates: { canonical: 'https://bradakai.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This policy explains how we handle personal information when you shop with BradaKai or use our Site."
    >
      <PrivacyPolicySections />
    </LegalPageLayout>
  );
}
