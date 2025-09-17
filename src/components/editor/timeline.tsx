'use client'

import { memo } from 'react'
import { Play, Pause, Scissors, ZoomIn, ZoomOut } from 'lucide-react'
import { useStore } from '@/lib/store'

export const Timeline = memo(function Timeline({ 
  currentTime,
  duration,
  onTimeChange
}: { 
  currentTime: number
  duration: number
  onTimeChange: (time: number) => void
}) {
  const { playing, togglePlay } = useStore((state) => ({
    playing: state.playing,
    togglePlay: state.togglePlay
  }))
  
  // For simplicity, we'll use local state for in/out points
  const inPoint = null
  const outPoint = null
  
  // Generate timeline segments
  const segments = [
    { id: '1', start: 0, end: 30, label: 'Intro' },
    { id: '2', start: 30, end: 60, label: 'Main Content' },
    { id: '3', start: 60, end: 90, label: 'Demo' },
    { id: '4', start: 90, end: 120, label: 'Outro' },
  ]
  
  // Calculate position of playhead
  const playheadPosition = (currentTime / duration) * 100
  
  // Calculate position of in/out points
  const inPointPosition = inPoint !== null ? (inPoint / duration) * 100 : 0
  const outPointPosition = outPoint !== null ? (outPoint / duration) * 100 : 0

  return (
    <div 
      className="h-full flex flex-col"
      role="region"
      aria-label="Timeline editor"
    >
      {/* Timeline Controls */}
      <div className="flex items-center justify-between border-b border-border p-2">
        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className="rounded-md p-1.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            aria-label={playing ? "Pause timeline" : "Play timeline"}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
          
          <div className="h-4 w-px bg-border mx-1" role="separator" />
          
          <button 
            className="rounded-md p-1.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            aria-label="Split clip at current position"
          >
            <Scissors className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="rounded-md p-1.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            aria-label="Zoom out timeline"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <div className="text-xs text-muted-foreground">100%</div>
          <button 
            className="rounded-md p-1.5 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            aria-label="Zoom in timeline"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Timeline Ruler */}
      <div 
        className="relative h-8 border-b border-border bg-muted/50"
        role="group"
        aria-label="Timeline ruler"
      >
        <div className="absolute inset-0 flex items-center">
          {Array.from({ length: 13 }).map((_, i) => (
            <div 
              key={i} 
              className="relative h-full flex-1 border-r border-border/50"
              role="separator"
            >
              <div className="absolute top-1 left-1 text-xs text-muted-foreground">
                {i * 10}s
              </div>
            </div>
          ))}
        </div>
        
        {/* Playhead */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 transition-all duration-100"
          style={{ left: `${playheadPosition}%` }}
          role="slider"
          aria-label="Playhead position"
          aria-valuenow={currentTime}
          aria-valuemin={0}
          aria-valuemax={duration}
        >
          <div className="absolute -top-1 -ml-1.5 h-3 w-3 rounded-full bg-red-500"></div>
        </div>
        
        {/* In/Out Points */}
        {inPoint !== null && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-green-500 z-10 transition-all duration-100"
            style={{ left: `${inPointPosition}%` }}
            role="slider"
            aria-label="In point position"
            aria-valuenow={inPoint}
            aria-valuemin={0}
            aria-valuemax={duration}
          >
            <div className="absolute -top-1 -ml-1.5 h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        )}
        
        {outPoint !== null && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-10 transition-all duration-100"
            style={{ left: `${outPointPosition}%` }}
            role="slider"
            aria-label="Out point position"
            aria-valuenow={outPoint}
            aria-valuemin={0}
            aria-valuemax={duration}
          >
            <div className="absolute -top-1 -ml-1.5 h-3 w-3 rounded-full bg-blue-500"></div>
          </div>
        )}
      </div>
      
      {/* Timeline Tracks */}
      <div className="flex-1 overflow-auto">
        <div className="relative h-full">
          {/* Video Track */}
          <div 
            className="absolute inset-0 flex h-16 items-center border-b border-border"
            role="group"
            aria-label="Video track"
          >
            {segments.map((segment) => (
              <div
                key={segment.id}
                className="relative h-full border-r border-border bg-primary/10 hover:bg-primary/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                style={{ width: `${((segment.end - segment.start) / duration) * 100}%` }}
                onClick={() => onTimeChange(segment.start)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onTimeChange(segment.start)
                  }
                }}
                role="button"
                aria-label={`Go to ${segment.label} segment at ${segment.start} seconds`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{segment.label}</span>
                </div>
                <div className="absolute bottom-1 left-1 text-xs text-muted-foreground">
                  {segment.start}s
                </div>
              </div>
            ))}
          </div>
          
          {/* Audio Track */}
          <div 
            className="absolute top-16 inset-x-0 h-16 border-b border-border flex items-center"
            role="group"
            aria-label="Audio track"
          >
            <div className="h-12 w-full bg-secondary/10 rounded mx-2 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Audio Track</span>
            </div>
          </div>
          
          {/* Caption Track */}
          <div 
            className="absolute top-32 inset-x-0 h-16 flex items-center"
            role="group"
            aria-label="Caption track"
          >
            <div className="h-12 w-full bg-accent/10 rounded mx-2 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Caption Track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})