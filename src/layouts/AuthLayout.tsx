import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * Minimal layout for authentication pages (signin, signup, etc.)
 * No header or navigation - just centered content
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-theme text-theme-primary flex items-center justify-center transition-colors duration-200">
      {children}
    </div>
  );
}

