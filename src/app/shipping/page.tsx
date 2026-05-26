import type { Metadata } from 'next';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { ShippingPolicySections } from '@/lib/legal/shipping-sections';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping and delivery information for orders from nury.love.',
  alternates: { canonical: 'https://nury.love/shipping' },
};

export default function ShippingPage() {
  return (
    <LegalPageLayout
      title="Shipping Policy"
      description="How we process, ship, and deliver orders placed on our Site."
    >
      <ShippingPolicySections />
    </LegalPageLayout>
  );
}
