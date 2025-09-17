'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logEvent } from '@/lib/analytics';

export function AnalyticsProvider() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Log page view when pathname changes
    logEvent('page_view', { path: pathname });
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
}