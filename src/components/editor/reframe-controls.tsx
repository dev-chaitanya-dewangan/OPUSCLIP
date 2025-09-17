'use client'

import { memo } from 'react'
import { useStore } from '@/lib/store'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const ReframeControls = memo(function ReframeControls() {
  const { reframeEnabled, aspect, toggleReframe, setAspect } = useStore((state) => ({
    reframeEnabled: state.reframeEnabled,
    aspect: state.aspect,
    toggleReframe: state.toggleReframe,
    setAspect: state.setAspect
  }))

  return (
    <div className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Reframe</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="reframe-toggle" className="text-sm text-muted-foreground">
            ON
          </Label>
          <Switch
            id="reframe-toggle"
            checked={reframeEnabled}
            onCheckedChange={toggleReframe}
          />
        </div>
      </div>
      
      <div className="mt-4">
        <Label className="text-sm font-medium">Aspect Ratio</Label>
        <Select value={aspect} onValueChange={setAspect}>
          <SelectTrigger className="mt-1 transition-all duration-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
            <SelectItem value="1:1">1:1 (Square)</SelectItem>
            <SelectItem value="16:9">16:9 (Horizontal)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-4">
        <Label className="text-sm font-medium">Tracking Mode</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button className="rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200 hover:bg-accent">
            Face
          </button>
          <button className="rounded-md border border-input bg-background px-3 py-2 text-sm transition-all duration-200 hover:bg-accent">
            Object
          </button>
          <button className="rounded-md border border-primary bg-primary px-3 py-2 text-sm text-primary-foreground transition-all duration-200 hover:bg-primary/90">
            Scene
          </button>
        </div>
      </div>
    </div>
  )
})