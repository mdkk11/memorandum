import React from 'react';
import { Navigation } from '@/app/(main)/documents/_components/Navigation';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
