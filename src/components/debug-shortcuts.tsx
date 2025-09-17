'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logEvent } from '@/lib/analytics';

export function DebugShortcuts() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Alt+R to reset data
      if (e.ctrlKey && e.altKey && e.key === 'r') {
        e.preventDefault();
        logEvent('debug_reset_data');
        
        // Clear localStorage
        localStorage.clear();
        
        toast({
          title: 'Data Reset',
          description: 'All data has been cleared. Refresh the page to re-seed.',
        });
      }
      
      // Ctrl+Alt+S to seed data
      if (e.ctrlKey && e.altKey && e.key === 's') {
        e.preventDefault();
        logEvent('debug_seed_data');
        
        // In a real implementation, we would call the seed API
        // For now, we'll just show a toast
        toast({
          title: 'Data Seeded',
          description: 'Sample data has been loaded.',
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toast]);
  
  return null;
}