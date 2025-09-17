import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { DebugPanel } from '@/components/debug-panel';
import { DebugShortcuts } from '@/components/debug-shortcuts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Opus Clip - AI-Powered Video Editing',
  description: 'Transform long videos into engaging clips automatically',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsProvider />
        <main>{children}</main>
        <Toaster />
        <DebugPanel />
        <DebugShortcuts />
      </body>
    </html>
  );
}