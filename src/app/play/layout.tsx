import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play',
  robots: { index: false, follow: false },
};

export default function PlayLayout({ children }: { children: ReactNode }): ReactNode {
  return children;
}
