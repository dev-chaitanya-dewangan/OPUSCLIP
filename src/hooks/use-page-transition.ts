'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTransition } from '@/components/route-transition-provider';

export function usePageTransition() {
  const { isTransitioning, transitionDirection } = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (isTransitioning) {
      setIsAnimating(true);
    } else {
      // Add a small delay before removing animation classes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  return {
    isAnimating,
    transitionDirection,
  };
}