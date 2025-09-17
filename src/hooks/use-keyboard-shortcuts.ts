'use client'

import { useCallback, useEffect } from 'react'

type ShortcutHandler = (e: KeyboardEvent) => void

export function useKeyboardShortcuts(handlers: Record<string, ShortcutHandler>) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Skip if typing in an input or textarea
    if (e.target instanceof HTMLElement && 
        (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      return
    }
    
    // Create a unique key for the combination
    const key = [
      e.ctrlKey ? 'Ctrl' : '',
      e.metaKey ? 'Cmd' : '',
      e.altKey ? 'Alt' : '',
      e.shiftKey ? 'Shift' : '',
      e.key.toUpperCase()
    ].filter(Boolean).join('+')
    
    // Call the handler if it exists
    if (handlers[key]) {
      handlers[key](e)
    }
  }, [handlers])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown])
}