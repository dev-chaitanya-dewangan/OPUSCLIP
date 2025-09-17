import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { DebugPanel } from '@/components/debug-panel';
import { DebugShortcuts } from '@/components/debug-shortcuts';
import { ErrorBoundary } from '@/components/error-boundary';
import { ToastProvider } from '@/components/toast-context';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

// Define the font to be used across all routes
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist-mono',
  display: 'swap',
});

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
    <html lang="en" className={`dark ${geistMono.variable}`}>
      <body className="font-mono dark relative min-h-screen">
        <FlickeringGrid
          className="fixed inset-0 z-[-1]"
          squareSize={4}
          gridGap={6}
          color="#C65BA7"
          maxOpacity={0.5}
          flickerChance={0.3}
        />
        <ErrorBoundary>
          <ToastProvider>
            <AnalyticsProvider />
            <main className="relative z-10">{children}</main>
            <Toaster />
            <DebugPanel />
            <DebugShortcuts />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}