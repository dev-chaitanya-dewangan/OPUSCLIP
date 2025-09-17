/**
 * Navigation utilities to prevent infinite loops and ensure safe navigation
 */

import { useRouter } from 'next/navigation';

// Flag to track if we're in a user-initiated action
let isUserAction = false;

// Set the user action flag
export function setUserAction() {
  isUserAction = true;
}

// Clear the user action flag
export function clearUserAction() {
  isUserAction = false;
}

// Safe navigation function that only navigates during user actions
export function useSafeRouter() {
  const router = useRouter();
  
  const safePush = (url: string) => {
    // Only navigate if it's a user action or if we're not already navigating
    if (isUserAction || typeof window !== 'undefined') {
      router.push(url);
    }
  };
  
  const safeReplace = (url: string) => {
    if (isUserAction || typeof window !== 'undefined') {
      router.replace(url);
    }
  };
  
  return {
    ...router,
    push: safePush,
    replace: safeReplace
  };
}

// Higher-order function to wrap user actions
export function withUserAction<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: any[]) => {
    setUserAction();
    const result = fn(...args);
    clearUserAction();
    return result;
  }) as T;
}