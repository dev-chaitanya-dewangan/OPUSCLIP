'use client'

import { memo } from 'react'
import { Play, Pause, Volume2, Maximize } from 'lucide-react'
import { useStore } from '@/lib/store'

export const VideoPane = memo(function VideoPane({ 
  isPlaying, 
  currentTime,
  onTogglePlay
}: { 
  isPlaying: boolean
  currentTime: number
  onTogglePlay: () => void
}) {
  const { aspect } = useStore((state) => ({
    aspect: state.aspect
  }))
  
  // Calculate dimensions based on aspect ratio
  const getDimensions = () => {
    switch (aspect) {
      case '1:1': return { width: 400, height: 400 }
      case '16:9': return { width: 640, height: 360 }
      case '9:16': 
      default: return { width: 360, height: 640 }
    }
  }
  
  const { width, height } = getDimensions()

  return (
    <div 
      className="flex h-full items-center justify-center bg-black p-8"
      role="region"
      aria-label="Video preview"
    >
      <div 
        className="relative bg-muted rounded-lg overflow-hidden transition-all duration-300"
        style={{ width, height }}
        tabIndex={-1}
      >
        {/* Video Preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm mb-4 transition-all duration-200 hover:bg-black/50">
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </div>
              <p className="text-white/80 text-sm">Video Preview</p>
            </div>
          </div>
        </div>
        
        {/* Time Indicator */}
        <div 
          className="absolute bottom-4 left-4 rounded bg-black/50 px-2 py-1 text-xs text-white transition-all duration-200"
          role="status"
          aria-live="polite"
        >
          {formatTime(currentTime)}
        </div>
        
        {/* Controls Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 focus-within:opacity-100"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onTogglePlay}
                className="rounded-full bg-black/50 p-2 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-white ml-0.5" />
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-white" aria-hidden="true" />
                <div 
                  className="h-1.5 w-20 rounded-full bg-white/30 transition-all duration-200"
                  role="group"
                  aria-label="Volume control"
                >
                  <div className="h-full w-3/4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
            
            <button 
              className="rounded-full bg-black/50 p-2 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
              aria-label="Enter fullscreen mode"
            >
              <Maximize className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}