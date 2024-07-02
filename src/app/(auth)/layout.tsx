import React from 'react';
import { SafariBrowser } from '@/app/_components/SafariBrowser';
import { Layout } from '../_components/Layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="grid w-full max-w-3xl">
        <SafariBrowser>{children}</SafariBrowser>
      </div>
    </Layout>
  );
}
