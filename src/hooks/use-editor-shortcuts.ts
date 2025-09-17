/**
 * Hook for handling keyboard shortcuts in the editor
 */

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function useEditorShortcuts() {
  const { 
    playing, 
    togglePlay,
    keyboardShortcutsEnabled,
    markIn,
    markOut,
    splitAtPlayhead,
    saveProject
  } = useStore(state => ({
    playing: state.playing,
    togglePlay: state.togglePlay,
    keyboardShortcutsEnabled: state.keyboardShortcutsEnabled,
    markIn: state.markIn,
    markOut: state.markOut,
    splitAtPlayhead: state.splitAtPlayhead,
    saveProject: state.saveProject
  }));
  
  useEffect(() => {
    if (!keyboardShortcutsEnabled) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }
      
      // Spacebar - Play/Pause
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      
      // J - Rewind 10 seconds
      if (e.code === 'KeyJ') {
        // Implementation would go here
      }
      
      // K - Play/Pause
      if (e.code === 'KeyK') {
        togglePlay();
      }
      
      // L - Fast forward 10 seconds
      if (e.code === 'KeyL') {
        // Implementation would go here
      }
      
      // I - Mark In point
      if (e.code === 'KeyI') {
        markIn();
      }
      
      // O - Mark Out point
      if (e.code === 'KeyO') {
        markOut();
      }
      
      // S - Split at playhead
      if (e.code === 'KeyS') {
        splitAtPlayhead();
      }
      
      // Cmd/Ctrl + S - Save project
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyS') {
        e.preventDefault();
        saveProject();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    playing, 
    togglePlay, 
    keyboardShortcutsEnabled,
    markIn,
    markOut,
    splitAtPlayhead,
    saveProject
  ]);
}