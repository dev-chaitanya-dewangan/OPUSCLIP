'use client';

import { useTransition } from '@/components/route-transition-provider';

export function useNavigationTransition() {
  const { startTransition } = useTransition();
  
  const navigateWithTransition = (
    direction: 'forward' | 'backward',
    callback: () => void
  ) => {
    startTransition(direction);
    setTimeout(callback, 50); // Small delay to allow transition to start
  };
  
  return { navigateWithTransition };
}