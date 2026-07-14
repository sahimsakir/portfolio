import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar';
import { ScrollToTop } from '@/components/common/ScrollToTop';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-canvas">
      <ScrollProgressBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
