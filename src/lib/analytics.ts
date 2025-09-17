/**
 * Analytics hook for tracking user interactions
 */

import { useEffect } from 'react';
import { safeLocalStorageGet, safeLocalStorageSet } from './utils';

interface AnalyticsEvent {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}

const ANALYTICS_STORAGE_KEY = 'oc_analytics_events_v1';
const MAX_EVENTS = 100; // Limit to prevent storage bloat

// Get stored events
function getStoredEvents(): AnalyticsEvent[] {
  return safeLocalStorageGet<AnalyticsEvent[]>(ANALYTICS_STORAGE_KEY, []);
}

// Save events to localStorage
function saveEvents(events: AnalyticsEvent[]): void {
  // Keep only the most recent events
  const recentEvents = events.slice(-MAX_EVENTS);
  safeLocalStorageSet(ANALYTICS_STORAGE_KEY, recentEvents);
}

// Log an event
export function logEvent(type: string, payload: Record<string, unknown> = {}): void {
  const events = getStoredEvents();
  
  const event: AnalyticsEvent = {
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    payload,
    timestamp: new Date()
  };
  
  events.push(event);
  saveEvents(events);
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${type}:`, payload);
  }
}

// Hook for tracking page views
export function usePageView(pageName: string): void {
  useEffect(() => {
    logEvent('page_view', { page: pageName });
  }, [pageName]);
}

// Hook for tracking CTAs
export function useCtaClick(ctaName: string): () => void {
  return () => {
    logEvent('cta_click', { cta: ctaName });
  };
}

// Hook for tracking interactions
export function useInteraction(interactionName: string): () => void {
  return () => {
    logEvent('interaction', { interaction: interactionName });
  };
}

// Export all events for debugging
export function getAllEvents(): AnalyticsEvent[] {
  return getStoredEvents();
}

// Clear all events
export function clearEvents(): void {
  safeLocalStorageSet(ANALYTICS_STORAGE_KEY, []);
}

// Export the AnalyticsEvent type
export type { AnalyticsEvent };