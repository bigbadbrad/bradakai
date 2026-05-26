import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false, follow: false },
};

export default function CheckoutCompleteLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
