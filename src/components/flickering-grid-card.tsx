'use client'

import { FlickeringGrid } from "@/components/ui/flickering-grid"

export function FlickeringGridCard() {
  return (
    <div className="relative rounded-2xl border border-accent/20 bg-card/50 backdrop-blur-sm overflow-hidden w-full max-w-md mx-auto">
      <FlickeringGrid
        className="absolute inset-0 -z-10"
        squareSize={3}
        gridGap={5}
        color="#8A5D96"
        maxOpacity={0.15}
        flickerChance={0.05}
      />
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">MagicUI Component</h3>
            <p className="text-sm text-muted-foreground">Flickering Grid Example</p>
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          This card demonstrates the flickering grid as a subtle background effect. 
          The grid is contained within the card boundaries and uses a low opacity for a refined look.
        </p>
        <div className="flex gap-3">
          <div className="flex-1 h-2 rounded-full bg-primary/20"></div>
          <div className="flex-1 h-2 rounded-full bg-primary/20"></div>
          <div className="flex-1 h-2 rounded-full bg-primary/40"></div>
        </div>
      </div>
    </div>
  )
}