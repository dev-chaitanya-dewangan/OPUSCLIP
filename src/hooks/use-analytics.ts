'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Mock analytics function - in a real app, this would integrate with an analytics service
export function useAnalytics() {
  const pathname = usePathname()
  
  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Mock analytics call
      console.log(`Page view: ${pathname}`)
      
      // In a real implementation, you might do:
      // analytics.page(pathname)
    }
  }, [pathname])
  
  // Track events
  const trackEvent = (eventName: string, properties?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined') {
      // Mock analytics call
      console.log(`Event: ${eventName}`, properties)
      
      // In a real implementation, you might do:
      // analytics.track(eventName, properties)
    }
  }
  
  return { trackEvent }
}