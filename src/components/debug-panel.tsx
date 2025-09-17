'use client';

import { useStore } from '@/lib/store';

export function DebugPanel() {
  const { 
    ids,
    activeProjectId,
    currentTime,
    playing
  } = useStore();
  
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-xs z-50">
      <div className="container">
        <div className="flex flex-wrap gap-4">
          <div>
            <strong>Projects:</strong> {ids.length} loaded
          </div>
          <div>
            <strong>Editor:</strong> {activeProjectId || 'None'} | 
            Time: {currentTime}s | 
            Playing: {playing ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
}