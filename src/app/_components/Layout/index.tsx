import React from 'react';
import { Footer } from '@/app/_components/Layout/Footer';
import { Header } from '@/app/_components/Layout/Header';
import { getSession } from '@/libs/auth';

export const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();
  return (
    <div className="flex min-h-full w-full flex-col">
      <Header session={session} />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-y-8 px-6 py-10 md:justify-start md:pt-20">{children}</div>
      <Footer />
    </div>
  );
};
