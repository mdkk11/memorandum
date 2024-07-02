import React from 'react';
import { Toaster } from 'sonner';
import { Providers } from '@/app/_components/Providers';
import { AppConfig } from '@/app.config';
import type { Metadata } from 'next';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppConfig.title}`,
    default: AppConfig.title,
  },
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta content="width=device-width,initial-scale=1" name="viewport" />
      </head>

      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
