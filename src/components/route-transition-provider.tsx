'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type TransitionContextType = {
  isTransitioning: boolean;
  transitionDirection: 'forward' | 'backward';
  startTransition: (direction: 'forward' | 'backward') => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPathRef = useRef(pathname);

  // Create a URL string from pathname and searchParams for comparison
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  useEffect(() => {
    // When pathname or searchParams change, it means navigation occurred
    if (currentPathRef.current !== currentUrl) {
      // We're in a popstate navigation (back/forward)
      // For simplicity, we'll assume backward for popstate
      startTransition('backward');
      currentPathRef.current = currentUrl;
    }
  }, [currentUrl]);

  const startTransition = (direction: 'forward' | 'backward') => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    
    // Reset transition state after animation duration
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match CSS transition duration
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        transitionDirection,
        startTransition,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}