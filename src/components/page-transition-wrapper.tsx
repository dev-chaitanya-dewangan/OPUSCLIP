'use client';

import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/hooks/use-page-transition';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useRef, useEffect } from 'react';

export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isAnimating, transitionDirection } = usePageTransition();
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Focus management
  useEffect(() => {
    if (!isAnimating && pageRef.current) {
      // Move focus to main content landmark
      const main = pageRef.current.querySelector('main') || pageRef.current;
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    }
  }, [isAnimating, pathname]);

  if (!isAnimating) {
    return <div ref={pageRef}>{children}</div>;
  }

  return (
    <motion.div
      ref={pageRef}
      key={pathname}
      initial={{ 
        x: transitionDirection === 'forward' ? '8%' : '-8%',
        opacity: 0 
      }}
      animate={{ 
        x: 0, 
        opacity: 1 
      }}
      exit={{ 
        x: transitionDirection === 'forward' ? '-8%' : '8%',
        opacity: 0 
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
}