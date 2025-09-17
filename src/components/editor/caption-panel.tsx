'use client'

import { useState, memo } from 'react'
import { useStore } from '@/lib/store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export const CaptionPanel = memo(function CaptionPanel() {
  const { captionsVisible, toggleCaptions } = useStore((state) => ({
    captionsVisible: state.captionsVisible,
    toggleCaptions: state.toggleCaptions
  }))
  
  // For simplicity, we'll use a local state for the caption text
  const [captionsText, setCaptionsText] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Captions</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="captions-toggle" className="text-sm text-muted-foreground">
            Visible
          </Label>
          <Switch
            id="captions-toggle"
            checked={captionsVisible}
            onCheckedChange={toggleCaptions}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="captions-text" className="text-sm font-medium">
            Caption Text
          </Label>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-primary hover:underline transition-colors duration-200"
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
        </div>
        
        {isEditing ? (
          <Textarea
            id="captions-text"
            value={captionsText}
            onChange={(e) => setCaptionsText(e.target.value)}
            placeholder="Enter your caption text here..."
            className="min-h-[120px] transition-all duration-200"
          />
        ) : (
          <div 
            className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 cursor-pointer hover:border-primary/50"
            onClick={() => setIsEditing(true)}
          >
            {captionsText || (
              <span className="text-muted-foreground">Click to add caption text...</span>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Font</Label>
          <div className="mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors duration-200 hover:border-primary/50">
            Inter
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Size</Label>
          <div className="mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors duration-200 hover:border-primary/50">
            24px
          </div>
        </div>
      </div>
    </div>
  )
})