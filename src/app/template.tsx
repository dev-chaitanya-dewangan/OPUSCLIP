import { ReactNode } from 'react';
import { RouteTransitionProvider } from '@/components/route-transition-provider';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <RouteTransitionProvider>
      {children}
    </RouteTransitionProvider>
  );
}