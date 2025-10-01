import type { ReactNode } from 'react';
import Header from '../components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper with header navigation
 * Use this for authenticated/main app pages
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-theme text-theme-primary transition-colors duration-200">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

