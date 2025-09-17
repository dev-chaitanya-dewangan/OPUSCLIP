'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import dynamic from 'next/dynamic'

// Dynamically import heavy components
const CaptionPanel = dynamic(() => import('./caption-panel').then(mod => mod.CaptionPanel), { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading...</div>
})

const ReframeControls = dynamic(() => import('./reframe-controls').then(mod => mod.ReframeControls), { 
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center">Loading...</div>
})

const Timeline = dynamic(() => import('./timeline').then(mod => mod.Timeline), { 
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center">Loading timeline...</div>
})

const VideoPane = dynamic(() => import('./video-pane').then(mod => mod.VideoPane), { 
  ssr: false,
  loading: () => <div className="flex-1 flex items-center justify-center">Loading video...</div>
})

export function EditorShell() {
  const { 
    playing, 
    currentTime, 
    duration,
    play,
    pause,
    setCurrentTime,
    setDuration
  } = useStore((state) => ({
    playing: state.playing,
    currentTime: state.currentTime,
    duration: state.duration,
    play: state.play,
    pause: state.pause,
    setCurrentTime: state.setCurrentTime,
    setDuration: state.setDuration
  }))
  
  // Simulate video loading
  useEffect(() => {
    setDuration(120) // 2 minutes
    setCurrentTime(30) // Start at 30 seconds
  }, [setDuration, setCurrentTime])
  
  // Keyboard shortcuts
  useKeyboardShortcuts({
    ' ': (e) => {
      e.preventDefault()
      playing ? pause() : play()
    },
    'K': () => { playing ? pause() : play() },
    'J': () => setCurrentTime(Math.max(0, currentTime - 10)),
    'L': () => setCurrentTime(Math.min(duration, currentTime + 10)),
    'S': () => { 
      // Split clip at current time - implementation would go here
    },
    'I': () => { 
      // Set in point at current time - implementation would go here
    },
    'O': () => { 
      // Set out point at current time - implementation would go here
    },
    'Ctrl+S': (e) => {
      e.preventDefault()
      // Save project - implementation would go here
    },
    'Cmd+S': (e) => {
      e.preventDefault()
      // Save project - implementation would go here
    }
  })

  return (
    <div className="flex h-full flex-col">
      {/* Top Controls Bar */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Project Title</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
              aria-label="Undo last action"
            >
              Undo
            </button>
            <button 
              className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
              aria-label="Redo last action"
            >
              Redo
            </button>
            <button 
              className="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
              aria-label="Export project"
            >
              Export
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Controls */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="border-b border-border p-4">
            <h2 className="text-sm font-semibold">Layout</h2>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">F</span>
              <button 
                className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded transition-all duration-200"
                aria-label="Reset layout to default"
              >
                Reset to Default
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <CaptionPanel />
            <ReframeControls />
          </div>
        </div>
        
        {/* Center - Timeline */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden">
            <VideoPane 
              isPlaying={playing}
              currentTime={currentTime}
              onTogglePlay={() => playing ? pause() : play()}
            />
          </div>
          
          <div className="h-48 border-t border-border">
            <Timeline 
              currentTime={currentTime}
              duration={duration}
              onTimeChange={setCurrentTime}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}